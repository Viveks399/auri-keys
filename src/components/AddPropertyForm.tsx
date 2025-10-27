"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authenticatedFetch } from "@/lib/authUtils";
import { Property } from "@/types/property";
import {
  PROPERTY_TYPES,
  FURNISHING_STATUS,
  PROPERTY_FEATURES,
  PROPERTY_STATUS,
} from "@/types/property-constants";

interface FormData {
  title: string;
  description: string;
  price: string;
  transactionType: "buy" | "rent";
  propertyType: string;
  beds: string;
  baths: string;
  size: string;
  furnishingStatus: string;
  propertyFeatures: string[];
  seller: {
    name: string;
    job: string;
    phone: string;
    email: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  amenities: string;
  status: string;
  featured: boolean;
  yearBuilt: string;
  lotSize: string;
}

interface AddPropertyFormProps {
  existingProperty?: Property;
  isEditMode?: boolean;
}

export default function AddPropertyForm({
  existingProperty,
  isEditMode = false,
}: AddPropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    transactionType: "buy",
    propertyType: "house",
    beds: "",
    baths: "",
    size: "",
    furnishingStatus: "furnished",
    propertyFeatures: [],
    seller: {
      name: "",
      job: "",
      phone: "",
      email: "",
    },
    location: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    amenities: "",
    status: "available",
    featured: false,
    yearBuilt: "",
    lotSize: "",
  });

  // Initialize form with existing property data in edit mode
  useEffect(() => {
    if (isEditMode && existingProperty) {
      setFormData({
        title: existingProperty.title,
        description: existingProperty.description,
        price: existingProperty.price.toString(),
        transactionType: existingProperty.transactionType,
        propertyType: existingProperty.propertyType,
        beds: existingProperty.beds.toString(),
        baths: existingProperty.baths.toString(),
        size: existingProperty.size.toString(),
        furnishingStatus: existingProperty.furnishingStatus,
        propertyFeatures: existingProperty.propertyFeatures || [],
        seller: existingProperty.seller,
        location: existingProperty.location,
        amenities: existingProperty.amenities?.join(", ") || "",
        status: existingProperty.status,
        featured: existingProperty.featured || false,
        yearBuilt: existingProperty.yearBuilt?.toString() || "",
        lotSize: existingProperty.lotSize?.toString() || "",
      });
      setExistingImages(existingProperty.images || []);
    }
  }, [isEditMode, existingProperty]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === "featured") {
        setFormData({ ...formData, featured: checked });
      }
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof FormData] as object),
          [child]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      propertyFeatures: prev.propertyFeatures.includes(feature)
        ? prev.propertyFeatures.filter((f) => f !== feature)
        : [...prev.propertyFeatures, feature],
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setImages((prev) => [...prev, ...newFiles]);

    // Create previews
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validate numeric fields
      const price = parseFloat(formData.price);
      const beds = parseInt(formData.beds);
      const baths = parseInt(formData.baths);
      const size = parseFloat(formData.size);

      if (isNaN(price) || price <= 0) {
        throw new Error("Please enter a valid price");
      }
      if (isNaN(beds) || beds < 0) {
        throw new Error("Please enter a valid number of bedrooms");
      }
      if (isNaN(baths) || baths < 0) {
        throw new Error("Please enter a valid number of bathrooms");
      }
      if (isNaN(size) || size <= 0) {
        throw new Error("Please enter a valid property size");
      }

      // Validate optional numeric fields
      const yearBuilt = formData.yearBuilt
        ? parseInt(formData.yearBuilt)
        : null;
      const lotSize = formData.lotSize ? parseFloat(formData.lotSize) : null;

      if (
        formData.yearBuilt &&
        (isNaN(yearBuilt!) ||
          yearBuilt! < 1800 ||
          yearBuilt! > new Date().getFullYear() + 1)
      ) {
        throw new Error("Please enter a valid year built");
      }
      if (formData.lotSize && (isNaN(lotSize!) || lotSize! <= 0)) {
        throw new Error("Please enter a valid lot size");
      }

      // Create FormData for multipart upload
      const submitData = new FormData();

      // Add property data as JSON string
      const propertyData = {
        title: formData.title,
        description: formData.description,
        price,
        transactionType: formData.transactionType,
        propertyType: formData.propertyType,
        beds,
        baths,
        size,
        furnishingStatus: formData.furnishingStatus,
        propertyFeatures: formData.propertyFeatures,
        seller: formData.seller,
        location: formData.location,
        amenities: formData.amenities
          ? formData.amenities.split(",").map((a) => a.trim())
          : [],
        status: formData.status,
        featured: formData.featured,
        ...(yearBuilt && { yearBuilt }),
        ...(lotSize && { lotSize }),
        ...(isEditMode && { images: existingImages }), // Keep existing images in edit mode
      };

      submitData.append("propertyData", JSON.stringify(propertyData));

      // Add new images
      images.forEach((image) => {
        submitData.append("images", image);
      });

      const url =
        isEditMode && existingProperty
          ? `/api/properties/${existingProperty.id}`
          : "/api/properties";

      const method = isEditMode ? "PUT" : "POST";

      const response = await authenticatedFetch(url, {
        method,
        body: submitData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || `Failed to ${isEditMode ? "update" : "create"} property`
        );
      }

      setSuccess(
        `Property ${
          isEditMode ? "updated" : "created"
        } successfully! Redirecting...`
      );

      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Failed to ${isEditMode ? "update" : "create"} property`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
            {isEditMode ? "Edit Property" : "Add New Property"}
          </h1>
          <p className="text-gray-600">
            {isEditMode
              ? "Update the property details below"
              : "Fill in the details to create a new property listing"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <div className="flex items-center">
                <span className="text-red-500 mr-3 text-xl">⚠</span>
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
              <div className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <p className="text-green-800 text-sm font-medium">{success}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-200">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="e.g., Luxury Villa in Dubai Marina"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400"
                    placeholder="Describe the property in detail..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (AED) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="5000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Transaction Type *
                  </label>
                  <select
                    name="transactionType"
                    value={formData.transactionType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                  >
                    <option value="buy">Buy/Sell</option>
                    <option value="rent">Rent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Type *
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all capitalize text-gray-900"
                  >
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type} value={type} className="capitalize">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all capitalize text-gray-900"
                  >
                    {PROPERTY_STATUS.map((status) => (
                      <option
                        key={status}
                        value={status}
                        className="capitalize"
                      >
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-200">
                Property Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bedrooms *
                  </label>
                  <input
                    type="number"
                    name="beds"
                    value={formData.beds}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bathrooms *
                  </label>
                  <input
                    type="number"
                    name="baths"
                    value={formData.baths}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.5"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Size (sq.ft) *
                  </label>
                  <input
                    type="number"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="2500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Furnishing Status *
                  </label>
                  <select
                    name="furnishingStatus"
                    value={formData.furnishingStatus}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all capitalize text-gray-900"
                  >
                    {FURNISHING_STATUS.map((status) => (
                      <option
                        key={status}
                        value={status}
                        className="capitalize"
                      >
                        {status.replace("-", " ")}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Year Built
                  </label>
                  <input
                    type="number"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="2023"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lot Size (sq.ft)
                  </label>
                  <input
                    type="number"
                    name="lotSize"
                    value={formData.lotSize}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="5000"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-200">
                Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="123 Marina Walk"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="Dubai"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State/Region *
                  </label>
                  <input
                    type="text"
                    name="location.state"
                    value={formData.location.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="Dubai"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ZIP/Postal Code *
                  </label>
                  <input
                    type="text"
                    name="location.zipCode"
                    value={formData.location.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="12345"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="location.country"
                    value={formData.location.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="UAE"
                  />
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-200">
                Seller Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Seller Name *
                  </label>
                  <input
                    type="text"
                    name="seller.name"
                    value={formData.seller.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="Ahmed Al-Mansouri"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="seller.job"
                    value={formData.seller.job}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="Senior Property Consultant"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="seller.phone"
                    value={formData.seller.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="+971-50-123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="seller.email"
                    value={formData.seller.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="ahmed@aurikeys.com"
                  />
                </div>
              </div>
            </div>

            {/* Property Features */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-200">
                Property Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {PROPERTY_FEATURES.map((feature) => (
                  <label
                    key={feature}
                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.propertyFeatures.includes(feature)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.propertyFeatures.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {feature}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-200">
                Amenities
              </h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amenities (comma-separated)
                </label>
                <input
                  type="text"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  placeholder="24/7 Security, Parking, Concierge, Swimming Pool"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Separate multiple amenities with commas
                </p>
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-200">
                Property Images
              </h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Images
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or WEBP (MAX. 10MB each)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                {/* Existing Images (Edit Mode) */}
                {isEditMode && existingImages.length > 0 && (
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Images
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {existingImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={image}
                            alt={`Existing ${index + 1}`}
                            width={128}
                            height={128}
                            className="w-full h-32 object-cover rounded-lg border-2 border-blue-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {isEditMode ? "New Images to Add" : "Image Previews"}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            width={128}
                            height={128}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Options */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-200">
                Additional Options
              </h2>
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Mark as Featured Property
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t-2 border-gray-200">
              <Link
                href="/admin/dashboard"
                className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isEditMode
                      ? "Updating Property..."
                      : "Creating Property..."}
                  </span>
                ) : isEditMode ? (
                  "Update Property"
                ) : (
                  "Create Property"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
