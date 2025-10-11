# Auri Keys - Real Estate Property Listing Platform

A modern Next.js application for listing and managing real estate properties.

## Project Overview

Auri Keys is a comprehensive real estate platform built with Next.js, featuring:

- **Landing Page**: Display all listed properties with beautiful UI
- **Admin Panel**: Create, update, and delete property listings
- **Property Management**: Full CRUD operations for property data
- **Authentication**: JWT-based admin authentication system
- **Image Upload**: Cloudinary integration for property images
- **Database**: MongoDB with Mongoose for data persistence
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Current Status

**Website Under Construction** - The initial landing page is ready with a professional "under construction" design.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken + bcryptjs)
- **Image Hosting**: Cloudinary
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP, Motion
- **Language**: TypeScript
- **Linting**: ESLint
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd auri-keys
```

2. Install dependencies:

```bash
npm install
```

3. Setup environment variables:

```bash
# Copy the example file
cp env.example .env.local

# Edit .env.local and add your credentials:
# - MONGODB_URI
# - JWT_SECRET
# - CLOUDINARY_CLOUD_NAME
# - CLOUDINARY_API_KEY
# - CLOUDINARY_API_SECRET
```

See [ENV-SETUP.md](ENV-SETUP.md) for detailed setup instructions.

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
auri-keys/
 src/
    app/
        layout.tsx          # Root layout
        page.tsx            # Home page (Under Construction)
        globals.css         # Global styles
 public/                     # Static assets
 package.json               # Dependencies
 next.config.ts             # Next.js configuration
 tailwind.config.js         # Tailwind CSS configuration
 tsconfig.json              # TypeScript configuration
```

## Features

### ✅ Completed Features

#### Core Functionality

- ✅ Property listing page with grid layout
- ✅ Property detail pages
- ✅ Search and filter functionality
- ✅ Responsive property cards

#### Admin Panel

- ✅ Admin authentication (JWT)
- ✅ Property creation API
- ✅ Property editing interface (API)
- ✅ Property deletion with confirmation
- ✅ Image upload functionality (Cloudinary)

#### Database & Storage

- ✅ MongoDB integration
- ✅ Mongoose schemas
- ✅ Database seeding script
- ✅ Cloudinary image hosting

### 🔄 In Progress

- 🔄 Admin dashboard UI
- 🔄 Property creation forms
- 🔄 Image upload UI with drag-and-drop

### 📋 Planned Features

#### Phase 3: Enhanced Features

- [ ] Property image galleries
- [ ] Advanced search filters (UI)
- [ ] Property comparison tool
- [ ] Contact forms
- [ ] Email notifications
- [ ] Property bookmarking
- [ ] Virtual tours integration

## Design System

The application uses a modern design system with:

- **Primary Colors**: Blue gradient backgrounds
- **Accent Colors**: Orange for construction elements
- **Typography**: Clean, readable fonts
- **Components**: Card-based layouts with shadows
- **Icons**: Heroicons SVG icons

## Responsive Design

The website is fully responsive and optimized for:

- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Seed database with sample properties
npm run seed
```

## API Documentation

See [README-API.md](README-API.md) for complete API documentation.

### Quick API Reference

- `POST /api/auth/signup` - Create admin account
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/[id]` - Get single property
- `POST /api/properties` - Create property
- `PUT /api/properties/[id]` - Update property
- `DELETE /api/properties/[id]` - Delete property
- `POST /api/upload/images` - Upload images to Cloudinary
- `DELETE /api/upload/images/delete` - Delete images from Cloudinary

All property endpoints require authentication.

## 📚 Documentation

All documentation is now organized in the [`docs/`](docs/) folder.

### API & Testing

- **[API Documentation](docs/README-API.md)** - Complete API reference
- **[Postman Collection Guide](docs/POSTMAN-COLLECTION-GUIDE.md)** - How to use the collection ⭐
- **[Property with Images](docs/POSTMAN-PROPERTY-WITH-IMAGES.md)** - Create property with images
- **[API Testing Guide](docs/POSTMAN-TESTING-GUIDE.md)** - General API testing
- **postman-collection.json** - Ready-to-import Postman collection

### Setup Guides

- **[Environment Setup](docs/ENV-SETUP.md)** - Environment variables guide
- **[Authentication Setup](docs/AUTH-SETUP.md)** - Authentication configuration
- **[MongoDB Setup](docs/MONGODB-SETUP.md)** - Database setup instructions
- **[Cloudinary Setup](docs/CLOUDINARY-IMAGE-UPLOAD.md)** - Image upload integration

### Reference Docs

- **[Admin Auth Summary](docs/ADMIN-AUTH-SUMMARY.md)** - Authentication overview
- **[Auth Quick Reference](docs/AUTH-QUICK-REFERENCE.md)** - Quick auth guide
- **[Postman Quick Start](docs/POSTMAN-QUICK-START.md)** - Quick Postman setup
- **[Setup Summary](docs/SETUP-SUMMARY.md)** - Complete setup overview
- **[Cloudinary Integration](docs/CLOUDINARY-SETUP-SUMMARY.md)** - Cloudinary setup summary

### Templates

- **env.example** - Environment variables template

## Environment Variables

Required environment variables (see `env.example`):

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/auri-keys

# Authentication
JWT_SECRET=your-secure-random-secret

# Image Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## License

This project is proprietary and confidential.

## Contact

For questions or support, please contact:

- Email: info@aurikeys.com
- Phone: +1 (234) 567-8900

---

**Auri Keys** - Your trusted real estate partner
