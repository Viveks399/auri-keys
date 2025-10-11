# Admin Dashboard Documentation

## Overview

The Auri Keys admin dashboard provides a complete property management system with authentication, dashboard analytics, and CRUD operations for properties.

## 📁 File Structure

```
src/
├── app/
│   └── admin/
│       ├── login/page.tsx          # Admin login page
│       ├── signup/page.tsx         # Admin signup page
│       └── dashboard/page.tsx      # Admin dashboard page
├── components/
│   ├── AdminLogin.tsx              # Login component
│   ├── AdminSignup.tsx             # Signup component
│   ├── AdminDashboard.tsx          # Dashboard component
│   ├── ProtectedRoute.tsx          # Protected route wrapper
│   └── GuestRoute.tsx              # Guest route wrapper (for login/signup)
└── lib/
    └── authUtils.ts                # Authentication utilities
```

## 🔐 Authentication System

### Login Flow

1. User enters email and password
2. Credentials are sent to `/api/auth/login`
3. On success, JWT token and admin data are stored in localStorage
4. User is redirected to `/admin/dashboard`

### Signup Flow

1. User enters name, email, password, and confirms password
2. Password strength is validated (weak → very strong)
3. Credentials are sent to `/api/auth/signup`
4. On success, JWT token and admin data are stored
5. User is redirected to `/admin/dashboard`

### Protected Routes

The dashboard automatically checks for authentication on load:

- If no token is found → redirect to login
- If token exists → load dashboard data

## 🎨 Features

### Login Page (`/admin/login`)

**Features:**

- ✅ Email and password validation
- ✅ Password visibility toggle
- ✅ Loading states with spinner
- ✅ Error/success messages with animations
- ✅ Link to signup page
- ✅ Animated gradient background
- ✅ Glass-morphism design
- ✅ Fully responsive

**Design Elements:**

- Modern gradient background (blue/indigo theme)
- Floating blob animations
- Backdrop blur effects
- Icon-enhanced input fields
- Smooth transitions

### Signup Page (`/admin/signup`)

**Features:**

- ✅ All login features plus:
- ✅ **Real-time password strength meter**
  - Weak (red)
  - Fair (orange)
  - Good (yellow)
  - Strong (green)
  - Very Strong (emerald)
- ✅ **Password confirmation validation**
  - ✓ Passwords match (green)
  - ✗ Passwords don't match (red)
- ✅ Separate show/hide toggles for both passwords
- ✅ Full name field

**Password Strength Algorithm:**

```typescript
Score calculation:
- Length >= 6 characters: +1
- Length >= 10 characters: +1
- Contains lowercase AND uppercase: +1
- Contains numbers: +1
- Contains special characters: +1

Total score: 0-5
```

### Dashboard Page (`/admin/dashboard`)

**Features:**

- ✅ Welcome message with admin name
- ✅ **Statistics Cards:**
  - Total Properties
  - Active Listings
  - Properties For Sale
  - Properties For Rent
- ✅ **Quick Actions:**
  - Add New Property
  - View Reports
  - Settings
- ✅ **Properties Table:**
  - Property image thumbnail
  - Title, beds, baths, size
  - Location (city, state)
  - Price and transaction type
  - Property type badge
  - Status badge (active/sold/pending)
  - **Actions:**
    - 👁️ View details
    - ✏️ Edit property
    - 🗑️ Delete property
- ✅ **Header/Navigation:**
  - Auri Keys logo
  - Admin profile info
  - Logout button
  - Mobile responsive menu
- ✅ Loading states
- ✅ Error handling
- ✅ Empty state (when no properties)

**Design Elements:**

- Gradient background matching login/signup
- Glass-morphism cards
- Hover effects on cards and buttons
- Smooth animations
- Color-coded stats badges
- Responsive table design

## 🛠️ Authentication Utilities

Located in `src/lib/authUtils.ts`, these utilities handle all auth operations:

### Functions

#### `isAuthenticated()`

Checks if user is authenticated by verifying token and admin data exist.

```typescript
const isAuthed = isAuthenticated();
```

#### `getAdminData()`

Retrieves and parses admin data from localStorage.

```typescript
const admin = getAdminData();
// Returns: { id, email, name, role } or null
```

#### `getAuthToken()`

Retrieves the JWT token from localStorage.

```typescript
const token = getAuthToken();
```

#### `saveAuth(token, adminData)`

Saves authentication data to localStorage.

```typescript
saveAuth(data.token, data.admin);
```

#### `clearAuth()`

Removes all authentication data from localStorage.

```typescript
clearAuth(); // Call on logout
```

#### `authenticatedFetch(url, options)`

Makes API requests with automatic token injection.

```typescript
const response = await authenticatedFetch("/api/properties", {
  method: "GET",
});
```

## 🔒 Route Protection Components

### ProtectedRoute

Wraps components that require authentication. Redirects to login if not authenticated.

```tsx
import ProtectedRoute from "@/components/ProtectedRoute";

<ProtectedRoute>
  <YourProtectedComponent />
</ProtectedRoute>;
```

### GuestRoute

Wraps login/signup pages. Redirects to dashboard if already authenticated.

```tsx
import GuestRoute from "@/components/GuestRoute";

<GuestRoute>
  <LoginComponent />
</GuestRoute>;
```

## 🎯 Usage Examples

### Making Authenticated API Calls

```typescript
import { authenticatedFetch } from "@/lib/authUtils";

// GET request
const properties = await authenticatedFetch("/api/properties");

// POST request
const newProperty = await authenticatedFetch("/api/properties", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(propertyData),
});

// DELETE request
await authenticatedFetch(`/api/properties/${id}`, {
  method: "DELETE",
});
```

### Checking Authentication in Components

```typescript
import { isAuthenticated, getAdminData } from "@/lib/authUtils";

// Check if authenticated
if (!isAuthenticated()) {
  router.push("/admin/login");
  return;
}

// Get admin info
const admin = getAdminData();
console.log(`Welcome ${admin?.name}`);
```

### Logout Functionality

```typescript
import { clearAuth } from "@/lib/authUtils";

const handleLogout = () => {
  clearAuth();
  window.location.href = "/admin/login";
};
```

## 🎨 Design System

### Color Palette

**Primary Colors:**

- Blue: `#2563EB` (blue-600)
- Indigo: `#4F46E5` (indigo-700)
- Purple: `#7C3AED` (purple-600)

**Status Colors:**

- Success: `#10B981` (green-500)
- Warning: `#F59E0B` (yellow-500)
- Error: `#EF4444` (red-500)
- Info: `#3B82F6` (blue-500)

**Backgrounds:**

- Main: `from-slate-50 via-blue-50 to-indigo-100` (gradient)
- Cards: `white/80` with backdrop-blur
- Hover: `gray-50`

### Typography

- **Display Font:** Manrope (for headings)
- **Body Font:** Inter (for text)
- **Sizes:**
  - H1: `text-3xl` or `text-4xl`
  - H2: `text-xl`
  - Body: `text-sm` or `text-base`
  - Small: `text-xs`

### Spacing

- Card padding: `p-6` or `p-8`
- Section gaps: `space-y-6` or `space-y-8`
- Grid gaps: `gap-4` or `gap-6`

## 📱 Responsive Design

All components are fully responsive:

- **Mobile:** Single column layout, hamburger menu
- **Tablet:** 2-column stats, responsive table
- **Desktop:** 4-column stats, full table

## 🚀 Getting Started

1. **Start your development server:**

```bash
npm run dev
```

2. **Create an admin account:**

   - Navigate to `http://localhost:3000/admin/signup`
   - Fill in your details
   - Create account

3. **Login:**

   - Navigate to `http://localhost:3000/admin/login`
   - Enter credentials
   - Access dashboard

4. **Manage properties:**
   - View all properties in the dashboard
   - Use quick actions to add/edit/delete
   - Filter and search properties

## 🔐 Security Best Practices

1. **Token Storage:** Tokens are stored in localStorage (client-side)
2. **API Protection:** All API routes require valid JWT token
3. **Password Hashing:** Passwords are hashed using bcrypt (server-side)
4. **HTTPS:** Always use HTTPS in production
5. **Token Expiration:** Consider implementing token refresh mechanism

## 📊 Dashboard Statistics

The dashboard automatically calculates:

- **Total Properties:** Count of all properties
- **Active Listings:** Properties with status="active"
- **For Sale:** Properties with transactionType="sell"
- **For Rent:** Properties with transactionType="rent"

## 🎭 UI States

### Loading State

- Spinning loader with "Loading dashboard..." message
- Full-screen centered

### Error State

- Red alert banner with error message
- Appears at top of content

### Empty State

- "No properties yet" message
- Emoji illustration (🏡)
- Call-to-action button

### Success State

- Green alert banner
- Appears after successful actions

## 🔄 Data Flow

```
Login/Signup → API Call → Token Received →
Stored in localStorage → Redirect to Dashboard →
Dashboard checks auth → Fetches properties →
Displays data with stats and table
```

## 🎯 Future Enhancements

Potential additions:

- [ ] Property search and filters
- [ ] Bulk property actions
- [ ] Property form with image upload
- [ ] Analytics and reporting
- [ ] User management (for super admins)
- [ ] Activity logs
- [ ] Email notifications
- [ ] Export data (CSV, PDF)
- [ ] Dark mode toggle
- [ ] Multi-language support

## 🐛 Troubleshooting

### "Unauthorized" Error

- Check if token exists in localStorage
- Verify token hasn't expired
- Re-login if needed

### Dashboard Not Loading

- Check browser console for errors
- Verify API is running
- Check MongoDB connection

### Properties Not Showing

- Ensure you're authenticated
- Check API endpoint is working
- Verify database has properties

## 📝 Notes

- The dashboard automatically redirects unauthenticated users to login
- Login/signup pages redirect authenticated users to dashboard
- All API calls include authorization header automatically
- Password strength is calculated in real-time
- Mobile menu toggles on smaller screens

---

**Built with:** Next.js 15, React 19, TypeScript, Tailwind CSS
**Author:** Auri Keys Development Team
**Last Updated:** 2024
