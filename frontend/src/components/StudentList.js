import React from "react";

const StudentList = ({ students, deleteStudent }) => {
  return (
    <div className="student-list">
      <h2 className="list-title">Student List</h2>
      {students.length === 0 ? (
        <p className="no-students">No students added yet.</p>
      ) : (
        students.map((student) => (
          <div key={student.id} className="student-card">
            <p>
              <strong>Name:</strong> {student.name}
            </p>
            <p>
              <strong>Course:</strong> {student.course}
            </p>
            <button
              onClick={() => deleteStudent(student.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentList;