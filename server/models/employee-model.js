const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  designation: { type: String, required: true },
  course: { type: [String], required: true },
  image: { type: String, required: false }, // Store the image path
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
