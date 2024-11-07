import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const UpdateEmployee = () => {
  const location = useLocation();
  const { employee } = location.state || {}; 
  const navigate = useNavigate(); 

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    designation: "",
    course: [],
    image: null,
  });

  useEffect(() => {
    if (employee) {
      setEmployeeData({
        name: employee.name,
        email: employee.email,
        gender: employee.gender,
        phone: employee.phone,
        designation: employee.designation,
        course: employee.course || [],
        image: employee.profilePic,
      });
    }
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setEmployeeData((prevData) => ({
      ...prevData,
      course: prevData.course.includes(value)
        ? prevData.course.filter((course) => course !== value)
        : [...prevData.course, value],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployeeData((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(file),
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { _id } = employee;
    
    if (!_id) {
      toast.error("Employee ID is missing");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", employeeData.name);
    formData.append("email", employeeData.email);
    formData.append("gender", employeeData.gender);
    formData.append("phone", employeeData.phone);
    formData.append("designation", employeeData.designation);
    
    employeeData.course.forEach((course) => formData.append("course[]", course));
  
    if (employeeData.image) {
      formData.append("profilePic", employeeData.image);
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/auth/updateEmployee/${_id}`, {
        method: "PUT",
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success("Employee updated successfully!");
        navigate("/home");
      } else {
        throw new Error("Failed to update employee");
      }
    } catch (error) {
      toast.error("Error updating employee");
    }
  };
  
  

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="max-w-lg w-full p-6 bg-gray-900 rounded-lg shadow-lg mt-10 mb-10">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Update Employee
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={employeeData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 mt-2 text-white bg-gray-800 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={employeeData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 mt-2 text-white bg-gray-800 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter email"
                required
              />
            </div>

            {/* Gender Field */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-white">Gender</label>
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={employeeData.gender === "male"}
                  onChange={handleInputChange}
                  className="text-red-500 cursor-pointer"
                />
                <label htmlFor="male" className="text-sm text-white ml-2">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={employeeData.gender === "female"}
                  onChange={handleInputChange}
                  className="text-red-500 cursor-pointer"
                />
                <label htmlFor="female" className="text-sm text-white ml-2">
                  Female
                </label>
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-white"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={employeeData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 mt-2 text-white bg-gray-800 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter phone number"
                required
              />
            </div>

            <div>
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-white"
              >
                Designation
              </label>
              <select
                id="designation"
                name="designation"
                value={employeeData.designation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 mt-2 text-white bg-gray-800 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Course
              </label>
              <div className="flex space-x-4 mt-2">
                <div>
                  <input
                    type="checkbox"
                    value="BSC"
                    checked={employeeData.course.includes("BSC")}
                    onChange={handleCourseChange}
                    className="text-red-500 cursor-pointer"
                  />
                  <label className="text-sm text-white ml-2">BSC</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="MCA"
                    checked={employeeData.course.includes("MCA")}
                    onChange={handleCourseChange}
                    className="text-red-500 cursor-pointer"
                  />
                  <label className="text-sm text-white ml-2">MCA</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="BCA"
                    checked={employeeData.course.includes("BCA")}
                    onChange={handleCourseChange}
                    className="text-red-500 cursor-pointer"
                  />
                  <label className="text-sm text-white ml-2">BCA</label>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-white"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="w-full mt-2 bg-gray-800 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-red-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Update Employee
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateEmployee;
