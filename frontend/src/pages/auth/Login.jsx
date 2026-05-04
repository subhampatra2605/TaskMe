import React, { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { FaEyeSlash, FaPeopleGroup } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axioInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const { loading } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(null);

    try {
      dispatch(signInStart());

      const response = await axiosInstance.post("/auth/sign-in", {
        email,
        password,
      });

      // ✅ STORE TOKEN (CRITICAL FIX)
      localStorage.setItem("token", response.data.token);

      if (response.data.role === "admin") {
        dispatch(signInSuccess(response.data));
        navigate("/admin/dashboard");
      } else {
        dispatch(signInSuccess(response.data));
        navigate("/user/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
        dispatch(signInFailure(error.response.data.message));
      } else {
        setError("Something went wrong. Please try again!");
        dispatch(signInFailure("Something went wrong. Please try again!"));
      }
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaPeopleGroup className="text-4xl text-blue-600" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mt-4 uppercase">
                Project Flow
              </h1>

              <p className="text-gray-600 mt-1">
                Manage your projects efficiently
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 border rounded"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded"
              />

              {error && <p className="text-red-500">{error}</p>}

              <button className="w-full bg-blue-600 text-white py-2 rounded">
                {loading ? "Loading..." : "Login"}
              </button>
            </form>

            <p className="text-center mt-4">
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
