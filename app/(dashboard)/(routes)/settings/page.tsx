"use client";

import { Settings, Bell, User, CreditCard, Shield } from "lucide-react";
import Heading from "@/components/heading";
import { SubscriptionButton } from "@/components/ui/subscription-button";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoRenew, setAutoRenew] = useState(true);

  const toggleNotifications = () => setNotifications(!notifications);
  const toggleAutoRenew = () => setAutoRenew(!autoRenew);

  const isProPlan = true;

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Heading Section */}
      <motion.div
        className="mb-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Heading
          title="Settings"
          description="Manage account settings."
          icon={Settings}
          iconColor="text-blue-600"
          bgColor="bg-blue-100/30"
        />
      </motion.div>

      <motion.div
        className="max-w-4xl w-full px-6 lg:px-12 py-6 bg-white rounded-lg shadow-lg space-y-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Profile Information */}
        <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <User className="w-10 h-10 text-blue-500" />
            <div>
              <h2 className="text-xl font-bold text-gray-700">Your Profile</h2>
              <Link href="/profile-edit" className="text-sm text-gray-500" >
        Edit your profile details.
      </Link>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Edit Profile
          </button>
        </div>

        {/* Plan Information */}
        <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <CreditCard className="w-10 h-10 text-green-500" />
            <div>
              <h2 className="text-xl font-bold text-gray-700">Subscription</h2>
              <p className="text-sm text-gray-500">
                {isProPlan ? "Pro Plan" : "Free Plan"} - Manage your plan.
              </p>
            </div>
          </div>
          <SubscriptionButton />
        </div>

        {/* Notification Settings */}
        <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <Bell className="w-10 h-10 text-yellow-500" />
            <div>
              <h2 className="text-xl font-bold text-gray-700">Notifications</h2>
              <p className="text-sm text-gray-500">
                Control notification preferences.
              </p>
            </div>
          </div>
          <button
            onClick={toggleNotifications}
            className={`${
              notifications ? "bg-blue-500" : "bg-gray-300"
            } relative inline-flex h-6 w-12 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                notifications ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform bg-white rounded-full transition`}
            />
          </button>
        </div>

        {/* Auto-Renew Settings */}
        <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <Shield className="w-10 h-10 text-red-500" />
            <div>
              <h2 className="text-xl font-bold text-gray-700">Auto-Renew</h2>
              <p className="text-sm text-gray-500">
                {autoRenew ? "Enabled" : "Disabled"} - Automatically renew your subscription.
              </p>
            </div>
          </div>
          <button
            onClick={toggleAutoRenew}
            className={`${
              autoRenew ? "bg-blue-500" : "bg-gray-300"
            } relative inline-flex h-6 w-12 items-center rounded-full`}
          >
            <span className="sr-only">Enable auto-renew</span>
            <span
              className={`${
                autoRenew ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform bg-white rounded-full transition`}
            />
          </button>
        </div>

        {/* Progress Bar for Data Usage */}
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-700">Data Usage</h2>
          <div className="w-full bg-gray-300 rounded-full h-3 mt-2">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: "65%" }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">You have used 65% of your data limit.</p>
        </div>
      </motion.div>

      {/* Floating Icon Animation */}
      <motion.div
        className="mt-10"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10 }}
      >
        <Settings className="w-12 h-12 text-gray-600" />
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;
