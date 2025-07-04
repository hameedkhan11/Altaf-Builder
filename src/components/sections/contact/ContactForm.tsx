// components/ContactForm.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

import { PersonalInfoStep } from './PersonalInfoStep';
import { PreferencesStep } from './PreferencesStep';
import { ContactHero } from './ContactHero';
import { ContactFormData } from '@/lib/contact-us/types';
import { ContactInfoCard } from './ContactInfo';
import { FormStepIndicator } from './StepIndicator';

const steps = ['Personal Information', 'Preferences & Details'];

export const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    purposeOfInquiry: '',
    apartmentType: '',
    moveInDate: '',
    message: '',
    marketingConsent: false,
    privacyConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.privacyConsent) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      // Show success message
      alert('Thank you for your interest! Our luxury property consultant will contact you within 24 hours.');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        purposeOfInquiry: '',
        apartmentType: '',
        moveInDate: '',
        message: '',
        marketingConsent: false,
        privacyConsent: false
      });
      setCurrentStep(1);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <ContactHero />
      
      {/* Contact Form Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <ContactInfoCard />

            {/* Contact Form */}
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-8 lg:p-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl mb-3">
                  Register Your Interest
                </h2>
                <p>
                  Complete this form and our luxury property consultant will contact you personally.
                </p>
              </div>

              <FormStepIndicator 
                currentStep={currentStep}
                totalSteps={steps.length}
                steps={steps}
              />

              <form className="space-y-6">
                {currentStep === 1 && (
                  <PersonalInfoStep
                    formData={formData}
                    onChange={handleInputChange}
                    onNext={nextStep}
                  />
                )}

                {currentStep === 2 && (
                  <PreferencesStep
                    formData={formData}
                    onChange={handleInputChange}
                    onPrevious={prevStep}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};