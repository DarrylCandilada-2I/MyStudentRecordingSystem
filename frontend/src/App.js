import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch students from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  // Add student to backend
  const addStudent = async (name, course) => {
    try {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, course }),
      });

      if (!response.ok) throw new Error("Failed to add student");

      const newStudent = await response.json();
      setStudents((prevStudents) => [...prevStudents, newStudent]); // Update state immediately
    } catch (error) {
      console.error(error);
    }
  };

  // Delete student from backend and update frontend state immediately
  const deleteStudent = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== id)
        ); // Update state
      } else {
        console.error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <div className="center-content">
        <h1 className="title">Student Management System</h1>
        <button onClick={toggleDarkMode} className="toggle-btn">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <StudentForm addStudent={addStudent} />
        <StudentList students={students} deleteStudent={deleteStudent} />
      </div>
    </div>
  );
};

export default App;