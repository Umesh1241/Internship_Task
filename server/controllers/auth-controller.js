const User = require("../models/user-model");
const Employee = require('../models/employee-model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const path = require('path');



const home = async (req, res) => {
  try {
    res.status(200).send("welcome to home page");
  } catch (err) {
    next(err);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const userCreated = await User.create({
      username,
      email,
      password,
    });
    res
      .status(201)
      .json({
        msg: "registration successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
  } catch (err) {
    res.status(500).json("internal server error");
    next(err);
  }
};

const login = async (req, res) => {
  try {
    const {email, password}=req.body;
    const userExist=await User.findOne({email});
    if(!userExist) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const user=await userExist.comparePassword(password);
    if(!user){
      return res.status(400).json({ message: "enter correct password"});
    }
    if(user){
      return res.status(200).json({
        msg: "login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    }

    res.status(200).send("Welcome to login page");
  } catch (err) {
    next(err);
  }
};

const user=async(req, res)=>{
try {
  const userData=req.user;
  return res.status(200).json({userData});
  
} catch (error) {
  next(error);
}
};


const createEmployee = async (req, res) => {
  const { name, email, gender, phone, designation, course } = req.body;
  const image = req.file ? req.file.path : null; 

  try {
    const newEmployee = new Employee({
      name,
      email,
      gender,
      phone,
      designation,
      course: course ? course.split(',') : [],
      image, 
    });

    await newEmployee.save();

    res.status(200).json({
      message: 'Employee created successfully',
      data: newEmployee,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating employee',
      error,
    });
  }
};

const getEmployeeList = async (req, res) => {
  try {
    const employees = await Employee.find(); 
    res.status(200).json(employees); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee list", error: error.message });
  }
};


const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, gender, phone, designation, course } = req.body;
  const image = req.file ? req.file.path : null; 

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.gender = gender || employee.gender;
    employee.phone = phone || employee.phone;
    employee.designation = designation || employee.designation;
    employee.course = course || employee.course;

    if (image) {
      employee.image = image;
    }

    await employee.save(); 
    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee' });
  }
};




const deleteEmployee = async (req, res) => {
  const id  = req.params.id;

  try {
    const employee = await Employee.deleteOne({_id:id});
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee' });
  }
};

const logout = async (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
}



module.exports = { home, register, login, user, createEmployee, getEmployeeList, updateEmployee, deleteEmployee, logout };
