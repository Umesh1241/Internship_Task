
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import Header from '../components/Header';
import Footer from '../components/Footer';

const CreateEmployee = () => {
  const navigate = useNavigate(); // Use the React Router navigate hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    phone: '',
    designation: '',
    course: [], // Store selected courses as an array
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        course: checked
          ? [...prevData.course, value]
          : prevData.course.filter((course) => course !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.gender || !formData.phone || !formData.designation || formData.course.length === 0 || !formData.image) {
      toast.error('some fields are missing.');
      return;
    }

    if (formData.phone.length !== 10) {
      toast.error('Phone number must be 10 digits.');
      return;
    }

    // Create FormData object for the API request
    const submissionData = new FormData();
    for (const key in formData) {
      if (key === 'course') {
        formData.course.forEach((course) => submissionData.append('course', course));
      } else {
        submissionData.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/createEmployee', {
        method: 'POST',
        body: submissionData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Employee created successfully:', data);

        // Success notification
        toast.success('Employee created successfully!');

        // Navigate to the home page after submission
        navigate('/home');

        // Reset form data including the file input
        setFormData({
          name: '',
          email: '',
          gender: '',
          phone: '',
          designation: '',
          course: [],
          image: null, // Clear the image input field
        });
        // Reset the file input field after form submission
        document.getElementById('image').value = '';
      } else {
        toast.error('Error creating employee: ' + response.statusText);
        console.error('Error creating employee:', response.statusText);
      }
    } catch (error) {
      toast.error('Error submitting form: ' + error.message);
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <ToastContainer/>
        <div className="max-w-lg w-full p-6 bg-gray-900 rounded-lg shadow-lg mt-10 mb-10">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Create Employee</h2>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 text-white bg-gray-800 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter name"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  className="text-red-500 cursor-pointer"
                />
                <label htmlFor="male" className="text-sm text-white ml-2">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  className="text-red-500 cursor-pointer"
                />
                <label htmlFor="female" className="text-sm text-white ml-2">Female</label>
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 text-white bg-gray-800 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter phone number"
                required
              />
            </div>

            {/* Designation Field */}
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-white">Designation</label>
              <select
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-2 text-white bg-gray-800 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            {/* Course Field */}
            <div>
              <label className="block text-sm font-medium text-white">Course</label>
              <div className="flex space-x-4 mt-2">
                {['BSC', 'MCA', 'BCA'].map((course) => (
                  <div key={course}>
                    <input
                      type="checkbox"
                      name="course"
                      value={course}
                      checked={formData.course.includes(course)}
                      onChange={handleChange}
                      className="text-red-500 cursor-pointer"
                    />
                    <label className="text-sm text-white ml-2">{course}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Upload Field */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-white">Profile Image</label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="w-full mt-2 text-white bg-gray-800 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                accept="image/*"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
              >
                Create Employee
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateEmployee;
