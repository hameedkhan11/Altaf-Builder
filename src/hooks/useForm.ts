import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  countryCode: "+92", // Default to Pakistan
  message: "",
};

export const useForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const validateForm = (): boolean => {
    return !!(
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.message
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
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

      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    resetForm,
    validateForm,
  };
};