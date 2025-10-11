# Admin System Architecture

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        AURI KEYS ADMIN SYSTEM                    │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│    Login     │      │    Signup    │      │  Dashboard   │
│    Page      │─────▶│    Page      │─────▶│    Page      │
│              │      │              │      │              │
└──────────────┘      └──────────────┘      └──────────────┘
       │                      │                      │
       │                      │                      │
       ▼                      ▼                      ▼
┌──────────────────────────────────────────────────────────┐
│                     Authentication Layer                  │
│  ┌────────────────────────────────────────────────────┐ │
│  │  saveAuth() │ getAuthToken() │ clearAuth()        │ │
│  │  isAuthenticated() │ authenticatedFetch()         │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│                        API Layer                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  /api/auth/login                                   │ │
│  │  /api/auth/signup                                  │ │
│  │  /api/properties (GET, POST)                       │ │
│  │  /api/properties/[id] (GET, PUT, DELETE)           │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│                      Database Layer                       │
│  ┌────────────────────────────────────────────────────┐ │
│  │  MongoDB Atlas                                     │ │
│  │  ├── admins collection                             │ │
│  │  └── properties collection                         │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

## 🔐 Authentication Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ 1. User enters credentials
       ▼
┌─────────────────┐
│  Login/Signup   │
│   Component     │
└──────┬──────────┘
       │ 2. POST to API
       ▼
┌─────────────────┐
│   API Route     │
│  /auth/login    │
│  /auth/signup   │
└──────┬──────────┘
       │ 3. Validate & hash password
       ▼
┌─────────────────┐
│    MongoDB      │
│   Find/Create   │
│     Admin       │
└──────┬──────────┘
       │ 4. Generate JWT token
       ▼
┌─────────────────┐
│   API Response  │
│ { token, admin }│
└──────┬──────────┘
       │ 5. Store in localStorage
       ▼
┌─────────────────┐
│  saveAuth()     │
│  localStorage   │
└──────┬──────────┘
       │ 6. Redirect to dashboard
       ▼
┌─────────────────┐
│   Dashboard     │
└─────────────────┘
```

## 🎯 Component Hierarchy

```
App
│
├── admin/
│   ├── login/
│   │   └── page.tsx
│   │       └── <AdminLogin />
│   │
│   ├── signup/
│   │   └── page.tsx
│   │       └── <AdminSignup />
│   │
│   └── dashboard/
│       └── page.tsx
│           └── <AdminDashboard />
│
└── components/
    ├── AdminLogin.tsx
    ├── AdminSignup.tsx
    ├── AdminDashboard.tsx
    ├── ProtectedRoute.tsx
    └── GuestRoute.tsx
```

## 📊 Data Flow - Dashboard

```
┌─────────────────┐
│   Dashboard     │
│   Component     │
└────────┬────────┘
         │ 1. Check auth on mount
         ▼
┌─────────────────┐
│ getAuthToken()  │
│ getAdminData()  │
└────────┬────────┘
         │ 2. If authenticated
         ▼
┌─────────────────┐
│authenticatedFetch│
│ /api/properties │
└────────┬────────┘
         │ 3. GET with Bearer token
         ▼
┌─────────────────┐
│  API Middleware │
│  authenticateAdmin│
└────────┬────────┘
         │ 4. Verify JWT
         ▼
┌─────────────────┐
│  MongoDB Query  │
│ propertyStore   │
│    .getAll()    │
└────────┬────────┘
         │ 5. Return properties
         ▼
┌─────────────────┐
│    Component    │
│ setProperties() │
│ calculateStats()│
└────────┬────────┘
         │ 6. Render UI
         ▼
┌─────────────────┐
│   Dashboard UI  │
│  Stats + Table  │
└─────────────────┘
```

## 🔒 Security Layers

```
┌─────────────────────────────────────────┐
│         Browser Security Layer           │
│  ┌───────────────────────────────────┐  │
│  │  • localStorage (token storage)   │  │
│  │  • HTTPS (production)              │  │
│  │  • Client-side validation          │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│      Authentication Layer (Client)       │
│  ┌───────────────────────────────────┐  │
│  │  • isAuthenticated()              │  │
│  │  • Token injection                 │  │
│  │  • Auto-redirect                   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│       API Middleware (Server)            │
│  ┌───────────────────────────────────┐  │
│  │  • JWT verification                │  │
│  │  • Token expiry check              │  │
│  │  • Admin role validation           │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         Database Layer (Server)          │
│  ┌───────────────────────────────────┐  │
│  │  • Password hashing (bcrypt)       │  │
│  │  • MongoDB access control          │  │
│  │  • Data validation                 │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## 🛣️ Route Protection

```
Request: /admin/dashboard
         │
         ▼
┌─────────────────┐
│  Is token in    │──No──▶ Redirect to /admin/login
│  localStorage?  │
└────────┬────────┘
         │ Yes
         ▼
┌─────────────────┐
│  Parse admin    │──Error──▶ Redirect to /admin/login
│     data        │
└────────┬────────┘
         │ Success
         ▼
┌─────────────────┐
│  Render         │
│  Dashboard      │
└─────────────────┘
```

## 📱 Responsive Design System

```
┌──────────────────────────────────────────────┐
│            Screen Sizes                      │
└──────────────────────────────────────────────┘

Mobile (< 768px)
┌─────────────────┐
│   Header        │
│   [☰ Menu]      │
├─────────────────┤
│   Stat Card 1   │
├─────────────────┤
│   Stat Card 2   │
├─────────────────┤
│   Stat Card 3   │
├─────────────────┤
│   Stat Card 4   │
├─────────────────┤
│   Properties    │
│   (Scrollable)  │
└─────────────────┘

Tablet (768px - 1024px)
┌─────────────────────────────┐
│      Header                 │
├──────────────┬──────────────┤
│  Stat 1      │   Stat 2     │
├──────────────┼──────────────┤
│  Stat 3      │   Stat 4     │
├──────────────┴──────────────┤
│      Properties Table       │
└─────────────────────────────┘

Desktop (> 1024px)
┌──────────────────────────────────────────┐
│           Header                         │
├─────────┬─────────┬─────────┬──────────┤
│ Stat 1  │ Stat 2  │ Stat 3  │  Stat 4  │
├─────────┴─────────┴─────────┴──────────┤
│     Quick Actions (3 columns)           │
├──────────────────────────────────────────┤
│     Properties Table (Full Width)       │
└──────────────────────────────────────────┘
```

## 🎨 State Management

```
┌─────────────────────────────────────┐
│        Component State              │
├─────────────────────────────────────┤
│  Loading State                      │
│  ┌──────────────────────────────┐  │
│  │  • loading: boolean          │  │
│  │  • Shows spinner             │  │
│  │  • Disables interactions     │  │
│  └──────────────────────────────┘  │
│                                     │
│  Success State                      │
│  ┌──────────────────────────────┐  │
│  │  • success: string           │  │
│  │  • Shows green banner        │  │
│  │  • Auto-dismiss after 3s     │  │
│  └──────────────────────────────┘  │
│                                     │
│  Error State                        │
│  ┌──────────────────────────────┐  │
│  │  • error: string             │  │
│  │  • Shows red banner          │  │
│  │  • Manual dismiss            │  │
│  └──────────────────────────────┘  │
│                                     │
│  Data State                         │
│  ┌──────────────────────────────┐  │
│  │  • properties: Property[]    │  │
│  │  • admin: AdminData          │  │
│  │  • stats: DashboardStats     │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

## 🔄 CRUD Operations Flow

### Create Property

```
Dashboard → Click "Add Property" → Property Form
    → Fill details → Submit
        → POST /api/properties
            → Validate → Save to DB → Return created property
                → Refresh list → Show success message
```

### Read Properties

```
Dashboard → Mount → authenticatedFetch(/api/properties)
    → GET request with token
        → API verifies token → Query MongoDB → Return properties
            → Update component state → Render table
```

### Update Property

```
Dashboard → Click Edit icon → Property Form (pre-filled)
    → Modify details → Submit
        → PUT /api/properties/[id]
            → Validate → Update in DB → Return updated property
                → Refresh list → Show success message
```

### Delete Property

```
Dashboard → Click Delete icon → Confirmation prompt
    → Confirm → DELETE /api/properties/[id]
        → Remove from DB → Return success
            → Remove from list → Show success message
```

## 📦 File Dependencies

```
AdminDashboard.tsx
├── @/types/property
├── @/lib/authUtils
│   ├── getAdminData()
│   ├── getAuthToken()
│   ├── clearAuth()
│   └── authenticatedFetch()
└── React (useState, useEffect)

AdminLogin.tsx
├── @/lib/authUtils
│   └── saveAuth()
├── next/link
└── React (useState)

AdminSignup.tsx
├── @/lib/authUtils
│   └── saveAuth()
├── next/link
└── React (useState)

authUtils.ts
└── Pure JavaScript (no dependencies)

ProtectedRoute.tsx
├── @/lib/authUtils
│   └── isAuthenticated()
└── React (useEffect, useState)

GuestRoute.tsx
├── @/lib/authUtils
│   └── isAuthenticated()
└── React (useEffect, useState)
```

## 🎯 API Endpoints

```
Authentication:
├── POST /api/auth/signup
│   └── Creates new admin account
└── POST /api/auth/login
    └── Authenticates admin

Properties:
├── GET /api/properties
│   └── Lists all properties (with filters)
├── POST /api/properties
│   └── Creates new property
├── GET /api/properties/[id]
│   └── Gets single property
├── PUT /api/properties/[id]
│   └── Updates property
└── DELETE /api/properties/[id]
    └── Deletes property

All require: Authorization: Bearer <token>
```

## 🚀 Performance Optimization

```
┌─────────────────────────────────────┐
│     Performance Strategies          │
├─────────────────────────────────────┤
│                                     │
│  1. Code Splitting                  │
│     • Separate route chunks         │
│     • Lazy loading components       │
│                                     │
│  2. State Management                │
│     • Local state only              │
│     • No unnecessary re-renders     │
│                                     │
│  3. API Optimization                │
│     • Cached auth token             │
│     • Single property fetch         │
│     • Optimistic updates            │
│                                     │
│  4. Asset Optimization              │
│     • Compressed images             │
│     • Minimal CSS (Tailwind)        │
│     • Tree-shaken JavaScript        │
│                                     │
│  5. Loading States                  │
│     • Skeleton screens              │
│     • Progress indicators           │
│     • Instant feedback              │
│                                     │
└─────────────────────────────────────┘
```

## 🔮 Future Architecture

```
Current:
Browser ←→ Next.js API ←→ MongoDB

Potential Enhancements:
Browser ←→ Next.js API ←→ Redis Cache ←→ MongoDB
                ↓
           Cloudinary (Images)
                ↓
           SendGrid (Emails)
                ↓
           Analytics Service
```

---

## 📚 Key Takeaways

1. **Three-Layer Architecture**: Client → API → Database
2. **JWT-Based Auth**: Stateless authentication with tokens
3. **Component Modularity**: Reusable auth utilities
4. **Protected Routes**: Automatic redirection based on auth state
5. **Responsive Design**: Mobile-first approach
6. **Type Safety**: TypeScript throughout
7. **Error Handling**: Graceful error states and messages
8. **Security First**: Password hashing, token verification, HTTPS

---

**Version:** 1.0  
**Last Updated:** 2024  
**Built with:** Next.js 15, React 19, TypeScript, MongoDB, JWT
