import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../server";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SellerResetPassword = () => {
  const { sellerId } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // reset password handler
  const resetPassword = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const response = await axios.put(
          `${server}/shop/seller-reset-password`,
          {
            sellerId,
            password,
          }
        );
        if (response.data.success === true) {
          toast.success("Password Reset Success");
          // navigating user login page after successful password reset
          navigate("/shop-login");
        }
        // Handle successful password reset
      } catch (error) {
        toast.error("Error resetting password");
        console.error("Error resetting password:", error);
        // handle error
      }
    } else {
      setPasswordsMatch(false); // If passwords don't match, set passwordsMatch state to false
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="max-w-lg w-full mx-auto flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <form onSubmit={resetPassword}>
          <div className="relative mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center"
              onClick={toggleShowPassword}
            >
              {showPassword ? <FaEye /> : < FaEyeSlash/>}
            </button>
          </div>
          <div className="relative mb-4">
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                !passwordsMatch && "border-red-500"
              }`}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center"
              onClick={toggleShowConfirmPassword}
            >
              {showConfirmPassword ? <FaEye/> : <FaEyeSlash />}
            </button>
          </div>
          {!passwordsMatch && (
            <p className="text-red-500 text-xs italic mt-2 py-2">
              Passwords do not match
            </p>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerResetPassword;