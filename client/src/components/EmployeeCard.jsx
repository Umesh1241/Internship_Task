import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeCard = ({ employee, onDelete }) => {
  const {
    image,
    name,
    _id, 
    email,
    phone,
    designation,
    gender,
    course,
    createdAt,
  } = employee;

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/updateEmployee/${_id}`, { state: { employee } });
  };
   

  return (
    <div className="bg-gray-700 text-white rounded-lg shadow-lg p-6 space-y-4 flex flex-col items-center">
      <img
        src={`http://localhost:5000/uploads/${image}`}
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4 border-2 border-gray-600"
      />

      <div className="w-full">
        <h3 className="text-xl font-semibold text-center">{name}</h3>
        <hr className="w-full my-2" />
        <div className="space-y-2">
          <p className="text-sm">
            <b>ID:</b> {_id}
          </p>
          <p className="text-sm">
            <b>Email:</b> {email}
          </p>
          <p className="text-sm">
            <b>Phone:</b> {phone}
          </p>
          <p className="text-sm">
            <b>Designation:</b> {designation}
          </p>
          <p className="text-sm">
            <b>Gender:</b> {gender}
          </p>
          <p className="text-sm">
            <b>Course:</b> {course.join(", ")}
          </p>
          <p className="text-sm">
            <b>Date Created:</b> {new Date(createdAt).toLocaleDateString('en-IN')}
          </p>
        </div>
      </div>

      <div className="space-x-4 mt-4">
        <button
          onClick={handleEdit}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(_id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
