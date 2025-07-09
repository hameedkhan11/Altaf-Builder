"use client";
import React, { useState } from "react";
import { CldImage } from "next-cloudinary";
import { ContactHero } from "./ContactHero";
import { ContactInfoCard } from "./ContactInfo";
import { Button } from "@/components/ui/button";

// Main ContactForm Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+92", // Default to Pakistan
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const countries = [
    { code: "+92", name: "Pakistan", flag: "🇵🇰" },
    { code: "+971", name: "UAE", flag: "🇦🇪" },
    { code: "+1", name: "USA", flag: "🇺🇸" },
    { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+44", name: "UK", flag: "🇬🇧" },
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+86", name: "China", flag: "🇨🇳" },
    { code: "+81", name: "Japan", flag: "🇯🇵" },
    { code: "+49", name: "Germany", flag: "🇩🇪" },
    { code: "+33", name: "France", flag: "🇫🇷" },
  ];

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", {
        ...formData,
        fullPhone: formData.countryCode + formData.phone,
      });

      alert(
        "Thank you for your message! Our luxury property consultant will contact you within 24 hours."
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+92",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <ContactHero />

      {/* Contact Form Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-16">
        <div className="mx-auto">
          <div className="text-center mt-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-3">Register Your Interest</h2>
            <p className="font-optima">
              Complete this form and our luxury property consultant will contact
              you personally.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - CldImage */}
            <div className="bg-white rounded-sm border border-slate-200 mt-12">
              <CldImage
                src="imgi_6_default_ar0vxg" // Replace with your actual image public ID
                alt="Luxury Property"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg object-cover"
                crop="fill"
                gravity="auto"
              />
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white  p-8 lg:p-10">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="block mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b-2 border-neutral-900 focus:border-[rgb(140,46,71)] outline-none text-md py-3 px-0 transition-all duration-300 placeholder-slate-400 font-optima"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block font-optima mb-3">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b-2 border-neutral-900 focus:border-[rgb(140,46,71)] outline-none  text-md py-3 px-0 transition-all duration-300 placeholder-slate-400 font-optima"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Phone Field with Country Code */}
                <div className="space-y-2">
                  <label className="block font-optima mb-3">Phone</label>
                  <div className="flex gap-3">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="border-b-2 border-neutral-900 focus:border-[rgb(140,46,71)] outline-none font-optima text-md py-3 px-0  transition-all duration-300"
                    >
                      {countries.map((country) => (
                        <option
                          key={country.code}
                          value={country.code}
                          className="bg-white"
                        >
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="flex-1 bg-transparent border-b-2 border-neutral-900 focus:border-[rgb(140,46,71)] outline-none text-slate-900 text-md py-3 px-0 transition-all duration-300 placeholder-neutral-400 font-optima"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="block font-optima text-md font-medium mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full bg-transparent border-b-2 border-neutral-900 focus:border-[rgb(140,46,71)] outline-none  text-md py-3 px-0 transition-all duration-300 placeholder-slate-700resize-none font-optima"
                    placeholder="Tell us about your property requirements..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-[rgb(140,46,71)] font-light text-white hover:bg-transparent hover:text-[rgb(140,46,71)] py-6 px-8 w-full rounded-full text-lg transition-all duration-300 ease-in transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-transparent cursor-pointer hover:border-[rgb(140,46,71)]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Information */}
        <ContactInfoCard />
      </div>
    </div>
  );
};

export default ContactForm;