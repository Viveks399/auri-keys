"use client";

import React, { useState } from "react";

const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    listingType: "",
    propertyAddress: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9\s-]{7,15}$/.test(formData.mobile.replace(/\s/g, ""))) {
      newErrors.mobile = "Please enter a valid mobile number";
    }

    // Listing Type validation
    if (!formData.listingType) {
      newErrors.listingType = "Please select a listing type";
    }

    // Property Address validation
    if (!formData.propertyAddress.trim()) {
      newErrors.propertyAddress = "Property address is required";
    } else if (formData.propertyAddress.trim().length < 5) {
      newErrors.propertyAddress =
        "Property address must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);

      // Reset form on success
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        listingType: "",
        propertyAddress: "",
      });
      setErrors({});

      // You can add a success message here
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full dark:bg-background-dark font-display text-[#1C1917] dark:text-background-light relative z-10"
      style={{ backgroundColor: "#f8f7f6" }}
    >
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-background-light mb-4">
              Book a call with our team
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Have a question or want to schedule a viewing? Fill out the form
              and one of our experts will be in touch shortly.
            </p>
          </div>

          {/* Form Grid Layout */}
          <div className="bg-white dark:bg-background-dark rounded-2xl shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Top Row - Full Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 dark:text-background-light mb-3">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border p-4 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:ring-2 transition-all duration-200 ${
                      errors.fullName
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-zinc-300 dark:border-zinc-700 focus:border-primary focus:ring-primary/20"
                    } bg-white dark:bg-zinc-800`}
                    placeholder="Full Name*"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 dark:text-background-light mb-3">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border p-4 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:ring-2 transition-all duration-200 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-zinc-300 dark:border-zinc-700 focus:border-primary focus:ring-primary/20"
                    } bg-white dark:bg-zinc-800`}
                    placeholder="Email Address*"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Mobile Row */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-background-light mb-3">
                  Mobile*
                </label>
                <div
                  className={`flex rounded-xl border overflow-hidden focus-within:ring-2 transition-all duration-200 ${
                    errors.mobile
                      ? "border-red-500 focus-within:ring-red-500/20"
                      : "border-zinc-300 dark:border-zinc-700 focus-within:ring-primary/20"
                  } bg-white dark:bg-zinc-800`}
                >
                  {/* Country Code Dropdown */}
                  <div className="flex items-center px-4 border-r border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-700">
                    <span className="text-lg">🇦🇪</span>
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-2">
                      +971
                    </span>
                    <span className="material-symbols-outlined text-sm text-zinc-500 dark:text-zinc-400 ml-2">
                      expand_more
                    </span>
                  </div>
                  {/* Phone Number Input */}
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="flex-1 p-4 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none transition-colors"
                    placeholder="050 123 4567"
                  />
                </div>
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* Bottom Row - Listing Type and Property Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 dark:text-background-light mb-3">
                    Listing Type*
                  </label>
                  <div className="relative">
                    <select
                      name="listingType"
                      value={formData.listingType}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border p-4 text-zinc-900 dark:text-white focus:ring-2 transition-all duration-200 appearance-none cursor-pointer ${
                        errors.listingType
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-zinc-300 dark:border-zinc-700 focus:border-primary focus:ring-primary/20"
                      } bg-white dark:bg-zinc-800`}
                    >
                      <option value="" disabled>
                        Listing Type
                      </option>
                      <option value="buy">Buy</option>
                      <option value="rent">Rent</option>
                      <option value="off-plan">Off-Plan</option>
                      <option value="investment">Investment</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-500 dark:text-zinc-400 pointer-events-none">
                      expand_more
                    </span>
                  </div>
                  {errors.listingType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.listingType}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 dark:text-background-light mb-3">
                    Property Address*
                  </label>
                  <input
                    type="text"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border p-4 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:ring-2 transition-all duration-200 ${
                      errors.propertyAddress
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-zinc-300 dark:border-zinc-700 focus:border-primary focus:ring-primary/20"
                    } bg-white dark:bg-zinc-800`}
                    placeholder="Property Address*"
                  />
                  {errors.propertyAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.propertyAddress}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-zinc-900 font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? "Submitting..." : "Submit Details"}
                </button>
              </div>

              {/* Disclaimer */}
              <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center pt-4">
                By clicking Submit, you agree to our{" "}
                <a
                  href="#"
                  className="text-primary hover:underline font-medium"
                >
                  Terms
                </a>{" "}
                &{" "}
                <a
                  href="#"
                  className="text-primary hover:underline font-medium"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactFormSection;
