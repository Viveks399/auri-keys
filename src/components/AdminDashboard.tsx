"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types/property";
import {
  getAdminData,
  getAuthToken,
  clearAuth,
  authenticatedFetch,
  AdminData,
} from "@/lib/authUtils";

interface DashboardStats {
  totalProperties: number;
  activeListings: number;
  forSale: number;
  forRent: number;
}

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    activeListings: 0,
    forSale: 0,
    forRent: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const response = await authenticatedFetch("/api/properties");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch properties");
      }

      setProperties(data.data || []);
      calculateStats(data.data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load properties"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check authentication
    const token = getAuthToken();
    const adminData = getAdminData();

    if (!token || !adminData) {
      window.location.href = "/admin/login";
      return;
    }

    setAdmin(adminData);
    fetchProperties();
  }, [fetchProperties]);

  const calculateStats = (props: Property[]) => {
    const stats = {
      totalProperties: props.length,
      activeListings: props.filter((p) => p.status === "available").length,
      forSale: props.filter((p) => p.transactionType === "buy").length,
      forRent: props.filter((p) => p.transactionType === "rent").length,
    };
    setStats(stats);
  };

  const handleLogout = () => {
    clearAuth();
    window.location.href = "/admin/login";
  };

  const handleDeleteProperty = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      const response = await authenticatedFetch(`/api/properties/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete property");
      }

      // Refresh properties
      fetchProperties();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete property");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header/Navbar */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-md">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-gray-900">
                  Auri Keys
                </h1>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {admin?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {admin?.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {admin?.role}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors duration-200 border border-red-200"
              >
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    showMobileMenu
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {admin?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {admin?.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {admin?.role}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors duration-200 border border-red-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Welcome back, {admin?.name}! 👋
          </h2>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your properties today.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <div className="flex items-center">
              <span className="text-red-500 mr-3 text-xl">⚠</span>
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Properties
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalProperties}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🏢</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Active Listings
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.activeListings}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  For Sale
                </p>
                <p className="text-3xl font-bold text-indigo-600">
                  {stats.forSale}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  For Rent
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {stats.forRent}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🔑</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/properties/new"
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 text-left block"
            >
              <div className="text-3xl mb-3">➕</div>
              <h4 className="text-lg font-semibold mb-1">Add New Property</h4>
              <p className="text-sm text-blue-100">
                Create a new property listing
              </p>
            </Link>

            <button className="bg-gradient-to-r from-purple-600 to-pink-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 text-left">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="text-lg font-semibold mb-1">View Reports</h4>
              <p className="text-sm text-purple-100">
                Check analytics and insights
              </p>
            </button>

            <button className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 text-left">
              <div className="text-3xl mb-3">⚙️</div>
              <h4 className="text-lg font-semibold mb-1">Settings</h4>
              <p className="text-sm text-green-100">
                Manage your account settings
              </p>
            </button>
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-display font-bold text-gray-900">
              All Properties ({properties.length})
            </h3>
          </div>

          {properties.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">🏡</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                No properties yet
              </h4>
              <p className="text-gray-600 mb-6">
                Get started by adding your first property listing
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
                Add Property
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {properties.map((property) => (
                    <tr
                      key={property.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {property.images && property.images.length > 0 ? (
                            <Image
                              src={property.images[0]}
                              alt={property.title}
                              width={60}
                              height={60}
                              className="w-16 h-16 rounded-lg object-cover mr-4"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                              <span className="text-2xl">🏠</span>
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">
                              {property.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {property.beds} beds • {property.baths} baths •{" "}
                              {property.size} sqft
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">
                          {property.location.city}
                        </p>
                        <p className="text-xs text-gray-500">
                          {property.location.state}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(property.price)}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {property.transactionType}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize">
                          {property.propertyType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            property.status === "available"
                              ? "bg-green-100 text-green-800"
                              : property.status === "sold"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {property.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setViewingProperty(property)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                            title="View details"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <Link
                            href={`/admin/properties/${property.id}`}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-150 inline-block"
                            title="Edit property"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDeleteProperty(property.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Property View Modal */}
      {viewingProperty && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setViewingProperty(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-2xl font-display font-bold text-gray-900">
                Property Details
              </h3>
              <button
                onClick={() => setViewingProperty(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
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

            {/* Modal Content */}
            <div className="p-6">
              {/* Images Gallery */}
              {viewingProperty.images && viewingProperty.images.length > 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {viewingProperty.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        width={200}
                        height={200}
                        alt={`${viewingProperty.title} - ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Property Title and Status */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-3xl font-bold text-gray-900">
                    {viewingProperty.title}
                  </h4>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      viewingProperty.status === "available"
                        ? "bg-green-100 text-green-800"
                        : viewingProperty.status === "sold"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {viewingProperty.status}
                  </span>
                </div>
                <p className="text-4xl font-bold text-blue-600 mb-4">
                  {formatPrice(viewingProperty.price)}
                  <span className="text-lg text-gray-600 font-normal ml-2 capitalize">
                    / {viewingProperty.transactionType}
                  </span>
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Bedrooms</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {viewingProperty.beds}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Bathrooms</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {viewingProperty.baths}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Size</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {viewingProperty.size}
                  </p>
                  <p className="text-xs text-gray-500">sqft</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Type</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">
                    {viewingProperty.propertyType}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h5 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h5>
                <p className="text-gray-700 leading-relaxed">
                  {viewingProperty.description}
                </p>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h5 className="text-lg font-semibold text-gray-900 mb-3">
                  Location
                </h5>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-gray-900 font-medium">
                    {viewingProperty.location.address}
                  </p>
                  <p className="text-gray-600">
                    {viewingProperty.location.city},{" "}
                    {viewingProperty.location.state}{" "}
                    {viewingProperty.location.zipCode}
                  </p>
                  <p className="text-gray-600">
                    {viewingProperty.location.country}
                  </p>
                </div>
              </div>

              {/* Property Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">
                    Property Details
                  </h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Furnishing:</span>
                      <span className="font-medium text-gray-900 capitalize">
                        {viewingProperty.furnishingStatus}
                      </span>
                    </div>
                    {viewingProperty.yearBuilt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Year Built:</span>
                        <span className="font-medium text-gray-900">
                          {viewingProperty.yearBuilt}
                        </span>
                      </div>
                    )}
                    {viewingProperty.lotSize && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lot Size:</span>
                        <span className="font-medium text-gray-900">
                          {viewingProperty.lotSize} sqft
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Listing Date:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(
                          viewingProperty.listingDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Seller Information */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">
                    Seller Information
                  </h5>
                  <div className="bg-blue-50 p-4 rounded-xl space-y-2">
                    <p className="font-medium text-gray-900">
                      {viewingProperty.seller.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {viewingProperty.seller.job}
                    </p>
                    <div className="pt-2 border-t border-blue-200">
                      <p className="text-sm text-gray-700">
                        📞 {viewingProperty.seller.phone}
                      </p>
                      <p className="text-sm text-gray-700">
                        ✉️ {viewingProperty.seller.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Features */}
              {viewingProperty.propertyFeatures &&
                viewingProperty.propertyFeatures.length > 0 && (
                  <div className="mb-6">
                    <h5 className="text-lg font-semibold text-gray-900 mb-3">
                      Property Features
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {viewingProperty.propertyFeatures.map(
                        (feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                          >
                            {feature}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Amenities */}
              {viewingProperty.amenities &&
                viewingProperty.amenities.length > 0 && (
                  <div className="mb-6">
                    <h5 className="text-lg font-semibold text-gray-900 mb-3">
                      Amenities
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {viewingProperty.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Link
                  href={`/admin/properties/${viewingProperty.id}`}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-center"
                >
                  Edit Property
                </Link>
                <button
                  onClick={() => {
                    setViewingProperty(null);
                    handleDeleteProperty(viewingProperty.id);
                  }}
                  className="px-6 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors duration-200 border border-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
