import React, { useState } from "react";
import "./resumeDash.css";

const ResumeDash = () => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState(""); 
  const [template, setTemplate] = useState("");
  const [details, setDetails] = useState({});

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step">
            <h2>Select Resume Type</h2>
            <button onClick={() => { setType("Fresher"); handleNext(); }}>Fresher</button>
            <button onClick={() => { setType("Experienced"); handleNext(); }}>Experienced</button>
          </div>
        );
      case 2:
        return (
          <div className="step">
            <h2>Select Template</h2>
            <button onClick={() => { setTemplate("Template 1"); handleNext(); }}>Template 1</button>
            <button onClick={() => { setTemplate("Template 2"); handleNext(); }}>Template 2</button>
            <button onClick={handleBack}>Back</button>
          </div>
        );
      case 3:
        return (
          <div className="step">
            <h2>Fill Your Details</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
              <input type="text" placeholder="Full Name" onChange={(e) => setDetails({ ...details, name: e.target.value })} required />
              <input type="text" placeholder="Email" onChange={(e) => setDetails({ ...details, email: e.target.value })} required />
              <textarea placeholder="Skills" onChange={(e) => setDetails({ ...details, skills: e.target.value })}></textarea>
              <button type="submit">Next</button>
            </form>
            <button onClick={handleBack}>Back</button>
          </div>
        );
      case 4:
        return (
          <div className="step">
            <h2>Download Your Resume</h2>
            <p><strong>Type:</strong> {type}</p>
            <p><strong>Template:</strong> {template}</p>
            <p><strong>Details:</strong> {JSON.stringify(details, null, 2)}</p>
            <button onClick={() => alert("Resume Downloaded!")}>Download</button>
            <button onClick={handleBack}>Back</button>
          </div>
        );
      default:
        return <div>Error: Invalid Step</div>;
    }
  };

  return (
    <div className="resume-builder">
      <h1>Build Your Resume</h1>
      {renderStep()}
    </div>
  );
};

export default ResumeDash;
