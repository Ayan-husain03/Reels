import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  KeyRound,
  ChevronDown,
  ChevronUp,
  User2Icon,
  LogOut,
  User2,
  UserCircle,
} from "lucide-react";

import api from "../../lib/axios";
import toast from "react-hot-toast";
import useAuthStore from "../../store/userAuthStore";
import { useEffect } from "react";

const UserProfile = () => {
  const { user, logout } = useAuthStore();

  // console.log(user);

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    try {
      const res = await api.put("/user/changePassword", {
        oldPassword: form.oldPassword.trim(),
        newPassword: form.newPassword.trim(),
      });
      // console.log(res);
      toast.success(res?.data?.message || "password changed");
    } catch (error) {
      console.error(
        error.response?.data?.message || "error while updating password",
      );
      toast.error(
        error.response?.data?.message || "error while updating password",
      );
    } finally {
      setForm({
        oldPassword: "",
        newPassword: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="bg-[#111] border border-gray-800 shadow-2xl p-6 w-full max-w-md">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <User2Icon className="w-24 h-24 rounded-full border-4 " />
          {/* <img src={user.avatar} alt="avatar" /> */}
          <h2 className="text-xl font-semibold mt-3 flex items-center gap-2">
            <User size={18} /> {user?.user.name || "User"}
          </h2>
          <p className="text-gray-400 flex items-center gap-2 mt-1">
            <Mail size={16} /> {user?.user?.email || "user@mail.com"}
          </p>
        </div>

        <hr className="my-4 border-gray-800" />
        <div>
          <button
            className="flex items-center justify-center bg-white text-black p-2  rounded-lg tracking-tighter text-sm
            hover:border hover:border-white hover:bg-black hover:text-white cursor-pointer active:bg-white active:text-black
            active:scale-90 transition-all duration-75 w-full"
            onClick={() => logout()}
          >
            <LogOut />
            logout
          </button>
        </div>
        <hr className="my-4 border-gray-800" />

        {/* Change Password Toggle */}
        <button
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          className="w-full flex justify-between items-center bg-[#1a1a1a] hover:bg-[#222] px-4 py-3 rounded-lg transition"
        >
          <div className="flex items-center gap-2">
            <KeyRound size={18} />
            <span>Change Password</span>
          </div>

          {showPasswordForm ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>

        {/* Password Form */}
        {showPasswordForm && (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="relative">
              <Lock size={16} className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                value={form.oldPassword}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg transition font-medium"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
