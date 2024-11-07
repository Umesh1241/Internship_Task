import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EmployeeCard from '../components/EmployeeCard';
import { FaSearch } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [employees, setEmployees] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);
  const navigate = useNavigate();

  const refreshEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/employees');
      const data = await response.json();
      if (response.ok) {
        setEmployees(data);
      } else {
        console.error('Failed to fetch employees:', data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    refreshEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateEmployeeClick = () => {
    navigate('/createEmployee');
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
    let sortedEmployees;
    if (criteria === 'name' || criteria === 'email') {
      sortedEmployees = [...employees].sort((a, b) =>
        a[criteria].localeCompare(b[criteria])
      );
    } else if (criteria === 'id') {
      sortedEmployees = [...employees].sort((a, b) => a._id - b._id);
    } else if (criteria === 'date') {
      sortedEmployees = [...employees].sort(
        (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
      );
    }
    setEmployees(sortedEmployees);
    setIsDropdownOpen(false);
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/deleteEmployee/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEmployees(employees.filter((emp) => emp._id !== id));
        toast.success("Employees deleted successfully")
      } else {
        toast.error("some error occurred");
      }
    } catch (error) {
      // console.error('Error deleting employee:', error);
    }
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredEmployees.slice(
    indexOfFirstCard,
    indexOfLastCard
  );
  const totalPages = Math.ceil(filteredEmployees.length / cardsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search Employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 pr-10 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <FaSearch className="absolute right-3 text-gray-400" />
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={handleCreateEmployeeClick}
            >
              Create Employee
            </button>

            <div className="relative">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 flex items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                <FiChevronDown className="ml-2" />
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 bg-white border rounded-lg shadow-lg w-26 z-10">
                  {['name', 'email', 'id', 'date'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSort(option)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-200"
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='text-white flex justify-center mb-3 text-3xl'>OUR EMPLOYEES</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentCards.map((emp) => (
            <EmployeeCard
              key={emp._id}
              employee={emp}
              onDelete={() => handleDeleteEmployee(emp._id)}
            />
          ))}
        </div>

        <div className="flex justify-between mt-6">
  <button
    className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ${
      currentPage === 1 ? 'bg-gray-400 cursor-not-allowed opacity-50' : ''
    }`}
    onClick={handlePreviousPage}
    disabled={currentPage === 1}
  >
    <GrPrevious />
  </button>
  <button
    className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-4 ${
      currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed opacity-50' : ''
    }`}
    onClick={handleNextPage}
    disabled={currentPage === totalPages}
  >
    <GrNext />
  </button>
</div>
</div>
<Footer />
</>
);
};

export default Home;