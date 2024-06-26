import React, { useState, useEffect } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Navigation from "./Navigation";

const Form = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = () => {
    let stepErrors = {};
    if (currentStep === 1) {
      if (!formData.name) stepErrors.name = "Name is required";
      if (!formData.email) stepErrors.email = "Email is required";
      if (!formData.phone) {
        stepErrors.phone = "Phone is required";
      } else if (!/^\d{10}$/.test(formData.phone)) {
        stepErrors.phone = "Phone number must be exactly 10 digits";
      }
    } else if (currentStep === 2) {
      if (!formData.address1)
        stepErrors.address1 = "Address Line 1 is required";
      if (!formData.city) stepErrors.city = "City is required";
      if (!formData.state) stepErrors.state = "State is required";
      if (!formData.zip) stepErrors.zip = "Zip Code is required";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      // console.log("Form submitted:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {currentStep === 1 && (
        <Step1
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
      )}
      {currentStep === 2 && (
        <Step2
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
      )}
      {currentStep === 3 && <Step3 formData={formData} />}
      <Navigation
        currentStep={currentStep}
        nextStep={nextStep}
        prevStep={prevStep}
      />
    </form>
  );
};

export default Form;
