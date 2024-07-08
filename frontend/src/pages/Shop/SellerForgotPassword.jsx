import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../server";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const checkEmailExistence = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${server}/shop/seller-forgot-password`,
        {
          email,
        }
      );
      if (response.data.success === true) {
        // Redirect to the reset password page
        const sellerId = response.data.sellerId;
        navigate(`/seller-reset-password/${sellerId}`);
      } else {
        // Show toast message if email does not exist
        toast.error("Email does not exist");
      }
    } catch (error) {
      toast.error("Error checking email existence");
      console.error("Error checking email existence:", error);
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        <form onSubmit={checkEmailExistence}>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
