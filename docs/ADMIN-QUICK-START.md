# Admin Dashboard - Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### 1. Start Your Server

```bash
npm run dev
```

### 2. Create Your Admin Account

**Navigate to:** `http://localhost:3000/admin/signup`

Fill in:

- Full Name: `Your Name`
- Email: `admin@aurikeys.com`
- Password: `YourSecurePassword123!`
- Confirm Password: `YourSecurePassword123!`

Click **"Create Admin Account"**

✅ You'll be automatically logged in and redirected to the dashboard!

### 3. Access Your Dashboard

**URL:** `http://localhost:3000/admin/dashboard`

You'll see:

- 📊 Statistics cards (Total Properties, Active Listings, etc.)
- 🎯 Quick action buttons
- 📋 Properties table
- 👤 Your admin profile in the header

### 4. Manage Properties

From the dashboard, you can:

- 👁️ **View** property details
- ✏️ **Edit** property information
- 🗑️ **Delete** properties
- ➕ **Add** new properties (via quick actions)

## 🔑 Key Pages

| Page          | URL                | Purpose                      |
| ------------- | ------------------ | ---------------------------- |
| **Login**     | `/admin/login`     | Sign in to your account      |
| **Signup**    | `/admin/signup`    | Create a new admin account   |
| **Dashboard** | `/admin/dashboard` | Main property management hub |

## 🎨 Features at a Glance

### Login Page

- 📧 Email & password fields
- 👁️ Password visibility toggle
- 🔄 Loading states
- ✅ Success/error messages
- 🎨 Beautiful gradient design

### Signup Page

- 👤 Full name field
- 📧 Email field
- 🔒 Password with strength meter
- 🔐 Confirm password field
- ✅ Real-time validation
- 💪 Password strength indicator (Weak → Very Strong)

### Dashboard

- 📊 **4 Stat Cards:**
  - Total Properties
  - Active Listings
  - For Sale
  - For Rent
- 🎯 **Quick Actions:**
  - Add New Property
  - View Reports
  - Settings
- 📋 **Properties Table:**
  - Property thumbnails
  - Details (beds, baths, size)
  - Location
  - Price
  - Status badges
  - Action buttons
- 👤 **User Profile:**
  - Admin name
  - Role badge
  - Logout button

## 🔐 Authentication Flow

```
1. Visit /admin/signup
   ↓
2. Create account with email & password
   ↓
3. Auto-login + redirect to /admin/dashboard
   ↓
4. Token stored in browser
   ↓
5. Manage properties
   ↓
6. Click logout when done
```

## 💡 Pro Tips

### Password Strength

For a **strong password**, include:

- ✅ At least 10 characters
- ✅ Uppercase letters (A-Z)
- ✅ Lowercase letters (a-z)
- ✅ Numbers (0-9)
- ✅ Special characters (!@#$%^&\*)

Example: `AuriKeys2024!`

### Dashboard Navigation

- **Mobile:** Tap the hamburger menu (☰) to access profile & logout
- **Desktop:** Profile and logout are always visible in the header

### Property Management

- **Delete:** Confirmation prompt prevents accidental deletion
- **View:** Click the eye icon (👁️) to see full details
- **Edit:** Click the pencil icon (✏️) to modify

## 🎯 Common Tasks

### Task 1: Create Your First Admin

```bash
1. Go to http://localhost:3000/admin/signup
2. Enter your details
3. Click "Create Admin Account"
4. ✅ Done! You're logged in
```

### Task 2: Login to Existing Account

```bash
1. Go to http://localhost:3000/admin/login
2. Enter email and password
3. Click "Sign In"
4. ✅ You're in the dashboard
```

### Task 3: Delete a Property

```bash
1. In dashboard, find the property
2. Click the trash icon (🗑️)
3. Confirm deletion
4. ✅ Property removed
```

### Task 4: Logout

```bash
1. Click "Logout" in the header
2. ✅ Redirected to login page
```

## 🛠️ Troubleshooting

### Can't Login?

- ✅ Check your email and password
- ✅ Ensure password is at least 6 characters
- ✅ Try signing up if account doesn't exist

### Dashboard Not Loading?

- ✅ Make sure you're logged in
- ✅ Check browser console for errors
- ✅ Refresh the page
- ✅ Clear cache and cookies

### Forgot Password?

Currently, there's no password reset feature. You'll need to:

1. Delete your admin from the database
2. Create a new account

## 📱 Mobile Experience

The admin dashboard is fully responsive:

- **📱 Mobile (< 768px):**

  - Single column layout
  - Hamburger menu
  - Stacked cards
  - Scrollable table

- **💻 Desktop (> 768px):**
  - Multi-column layout
  - Always-visible profile
  - 4-column stat cards
  - Full-width table

## 🎨 Design Preview

### Color Scheme

- **Login:** Blue/Indigo gradient
- **Signup:** Indigo/Purple gradient
- **Dashboard:** Slate/Blue/Indigo gradient

### Status Badges

- 🟢 **Active:** Green badge
- 🔴 **Sold:** Gray badge
- 🟡 **Pending:** Yellow badge

## 🔄 Auto-Redirect Behavior

**Smart Redirects:**

- ✅ Already logged in + visit `/admin/login` → Redirects to `/admin/dashboard`
- ✅ Already logged in + visit `/admin/signup` → Redirects to `/admin/dashboard`
- ✅ Not logged in + visit `/admin/dashboard` → Redirects to `/admin/login`

## 📊 Statistics Explained

| Stat                 | Calculation                               |
| -------------------- | ----------------------------------------- |
| **Total Properties** | Count of all properties in database       |
| **Active Listings**  | Properties with `status: "active"`        |
| **For Sale**         | Properties with `transactionType: "sell"` |
| **For Rent**         | Properties with `transactionType: "rent"` |

## 🎯 Next Steps

After setting up:

1. ✅ Create your admin account
2. ✅ Explore the dashboard
3. ✅ Add your first property (via API or upcoming form)
4. ✅ Test editing and deleting
5. ✅ Customize as needed

## 🆘 Need Help?

Check out:

- 📖 [Full Documentation](./ADMIN-DASHBOARD.md)
- 🔐 [Authentication Setup](./AUTH-SETUP.md)
- 🏠 [Property Management](./PROPERTY-FIELDS-GUIDE.md)
- 📬 [API Documentation](./README-API.md)

---

**Happy Managing!** 🎉

Built with ❤️ by Auri Keys Development Team
