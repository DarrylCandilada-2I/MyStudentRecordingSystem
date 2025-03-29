import React, { useState } from "react";

const StudentForm = ({ addStudent }) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");

  const courses = [
    "Bachelor of Science in Office Administration (BSOA)",
    "Bachelor of Science in Information Technology (BSIT)",
    "Certificate in Computer Sciences (CCS)",
    "Certificate in Office Administration (COA)",
    "Associate in Business Administration (ABA)",
    "Associate in Accounting Information System (AAIS)",
    "Associate in Human Resource Development (AHRD)",
    "Associate in Hotel and Restaurant Technology (AHRT)",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !course) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Ensure name does not contain numbers but allows "."
    if (!/^[A-Za-z. ]+$/.test(name)) {
      setMessage("Name must not contain numbers.");
      return;
    }

    await addStudent(name, course);
    setName("");
    setCourse("");
    setMessage("Student added successfully!");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Student Name</label>
          <input
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Course</label>
          <select value={course} onChange={(e) => setCourse(e.target.value)}>
            <option value="">Select Course</option>
            {courses.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Add Student
        </button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default StudentForm;