import {
  Property,
  CreatePropertyDTO,
  UpdatePropertyDTO,
} from "@/types/property";
import PropertyModel from "@/models/Property";
import connectDB from "@/lib/mongodb";

// Property Store Class using MongoDB
class PropertyStore {
  // Ensure database connection before operations
  private async ensureConnection() {
    await connectDB();
  }

  // Get all properties
  async getAll(): Promise<Property[]> {
    await this.ensureConnection();
    const properties = await PropertyModel.find({}).lean();
    return properties.map((prop) => ({
      ...prop,
      id: prop._id.toString(),
      createdAt: prop.createdAt?.toString() || new Date().toISOString(),
      updatedAt: prop.updatedAt?.toString() || new Date().toISOString(),
    })) as Property[];
  }

  // Get property by ID
  async getById(id: string): Promise<Property | null> {
    await this.ensureConnection();
    const property = await PropertyModel.findById(id).lean();

    if (!property) {
      return null;
    }

    return {
      ...property,
      id: property._id.toString(),
      createdAt: property.createdAt?.toString() || new Date().toISOString(),
      updatedAt: property.updatedAt?.toString() || new Date().toISOString(),
    } as Property;
  }

  // Create new property
  async create(data: CreatePropertyDTO): Promise<Property> {
    await this.ensureConnection();

    const now = new Date().toISOString();
    const propertyData = {
      ...data,
      status: data.status || "available",
      featured: data.featured || false,
      listingDate: now,
    };

    const newProperty = await PropertyModel.create(propertyData);
    const savedProperty = await PropertyModel.findById(newProperty._id).lean();

    return {
      ...savedProperty,
      id: savedProperty!._id.toString(),
      createdAt: savedProperty!.createdAt?.toString() || now,
      updatedAt: savedProperty!.updatedAt?.toString() || now,
    } as Property;
  }

  // Update property
  async update(id: string, data: UpdatePropertyDTO): Promise<Property | null> {
    await this.ensureConnection();

    // Build update object, handling nested updates properly
    const updateData: any = { ...data };

    // Handle location partial updates
    if (data.location) {
      const existingProperty = await PropertyModel.findById(id);
      if (existingProperty) {
        updateData.location = {
          ...existingProperty.location,
          ...data.location,
        };
      }
    }

    // Handle features partial updates
    if (data.features) {
      const existingProperty = await PropertyModel.findById(id);
      if (existingProperty) {
        updateData.features = {
          ...existingProperty.features,
          ...data.features,
        };
      }
    }

    const updatedProperty = await PropertyModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!updatedProperty) {
      return null;
    }

    return {
      ...updatedProperty,
      id: updatedProperty._id.toString(),
      createdAt:
        updatedProperty.createdAt?.toString() || new Date().toISOString(),
      updatedAt:
        updatedProperty.updatedAt?.toString() || new Date().toISOString(),
    } as Property;
  }

  // Delete property
  async delete(id: string): Promise<boolean> {
    await this.ensureConnection();
    const result = await PropertyModel.findByIdAndDelete(id);
    return result !== null;
  }

  // Search/filter properties
  async search(filters: {
    minPrice?: number;
    maxPrice?: number;
    city?: string;
    propertyType?: string;
    minBedrooms?: number;
    status?: string;
  }): Promise<Property[]> {
    await this.ensureConnection();

    const query: any = {};

    if (filters.minPrice) {
      query.price = { ...query.price, $gte: filters.minPrice };
    }
    if (filters.maxPrice) {
      query.price = { ...query.price, $lte: filters.maxPrice };
    }
    if (filters.city) {
      query["location.city"] = { $regex: filters.city, $options: "i" };
    }
    if (filters.propertyType) {
      query.propertyType = filters.propertyType;
    }
    if (filters.minBedrooms) {
      query["features.bedrooms"] = { $gte: filters.minBedrooms };
    }
    if (filters.status) {
      query.status = filters.status;
    }

    const properties = await PropertyModel.find(query).lean();

    return properties.map((prop) => ({
      ...prop,
      id: prop._id.toString(),
      createdAt: prop.createdAt?.toString() || new Date().toISOString(),
      updatedAt: prop.updatedAt?.toString() || new Date().toISOString(),
    })) as Property[];
  }
}

export const propertyStore = new PropertyStore();
