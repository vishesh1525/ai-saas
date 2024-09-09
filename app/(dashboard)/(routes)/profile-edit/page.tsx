"use client";

import { User, Mail, Phone, Save } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const ProfileEditPage = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    // Save profile changes
    console.log("Profile updated:", profile);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-4xl w-full px-6 lg:px-12 py-6 bg-white rounded-lg shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center mb-6">
          <User className="w-12 h-12 text-blue-500" />
          <h1 className="ml-4 text-2xl font-bold text-gray-700">Edit Profile</h1>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600" htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            onClick={handleSave}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-600"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileEditPage;
