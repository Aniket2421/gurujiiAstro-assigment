import React from "react";

const Navigation = ({ currentStep, nextStep, prevStep }) => (
  <div className="d-flex align-items-center gap-3 my-3">
    {currentStep === 1 && (
      <button className="btn btn-secondary" disabled={true} onClick={prevStep}>
        Back
      </button>
    )}

    {currentStep > 1 && (
      <button className="btn btn-secondary" onClick={prevStep}>
        Back
      </button>
    )}
    {currentStep < 3 ? (
      <button className="btn btn-primary" onClick={nextStep}>
        Next
      </button>
    ) : (
      <button className="btn btn-success" type="submit">
        Submit
      </button>
    )}
  </div>
);

export default Navigation;
