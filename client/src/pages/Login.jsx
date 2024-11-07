// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../store/auth";
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";

// const Login = () => {
//   // const [email, setEmail] = useState('');
//   // const [password, setPassword] = useState('');
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const {storeTokenInLs} = useAuth();

//   const handleInput = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e) => {
//     if(!email || !password){
//      toast.error("email or password is required")
//     }
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       });
//       console.log("login form:",response);
//       if (response.ok) {
//         toast.success("Login successful")
//         // alert("Login successful");
//         setUser({ email: "", password: "" });
        
//         const res_data=await response.json();
//         // localStorage.setItem('token', res_data.token);
//         storeTokenInLs(res_data.token);
//         // localStorage.setItem('userId', data.userId);
//         // window.location.href="/dashboard";
//         navigate('/home')
//       }
//       else{
//         alert("Login failed");
//         console.log("invalid credentials")
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-800 flex items-center justify-center">
//       <div className="w-full max-w-sm p-8 bg-gray-900 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-white text-center mb-8">
//           Login
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Email Field */}
//           <div className="relative">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-white"
//             >
//               Email address
//             </label>
//             <div className="mt-2 relative">
//               <FaEnvelope className="absolute left-3 top-3 text-gray-400 text-2xl" />
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={user.email}
//                 // onChange={(e) => setEmail(e.target.value)}
//                 onChange={handleInput}
//                 className="block w-full px-10 py-3 mt-2 text-white bg-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 placeholder="Enter your email"
//               />
//             </div>
//           </div>

//           {/* Password Field */}
//           <div className="relative">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-white"
//             >
//               Password
//             </label>
//             <div className="mt-2 relative">
//               <FaLock className="absolute left-3 top-3 text-gray-400 text-2xl" />
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 value={user.password}
//                 // onChange={(e) => setPassword(e.target.value)}
//                 onChange={handleInput}
//                 className="block w-full px-10 py-3 mt-2 text-white bg-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3 text-gray-400 text-2xl"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               className="w-full px-4 py-3 text-white font-semibold bg-red-500 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
//             >
//               Login
//             </button>
//           </div>
//         </form>

//         {/* Sign Up Link */}
//         <div className="text-center mt-4 text-white">
//           <p>
//             Don't have an account?{" "}
//             <a
//               href="/register"
//               className="font-semibold text-red-500 hover:text-red-600"
//             >
//               Sign Up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user.email || !user.password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setUser({ email: "", password: "" });
        
        const res_data = await response.json();
        storeTokenInLs(res_data.token);
        toast.success("Login successful");
        navigate("/home");
      } else {
        toast.error("Invalid credentials");
        console.log("Invalid credentials");
      }
    } catch (error) {
      toast.error("Error logging in. Please try again later.");
      console.log("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <div className="w-full max-w-sm p-8 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email address
            </label>
            <div className="mt-2 relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400 text-2xl" />
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleInput}
                className="block w-full px-10 py-3 mt-2 text-white bg-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <div className="mt-2 relative">
              <FaLock className="absolute left-3 top-3 text-gray-400 text-2xl" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={handleInput}
                className="block w-full px-10 py-3 mt-2 text-white bg-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 text-2xl"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-white font-semibold bg-red-500 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-4 text-white">
          <p>
            Don't have an account?{" "}
            <a href="/register" className="font-semibold text-red-500 hover:text-red-600">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
