import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

function ContactUs() {
  return (
    <div className="min-h-screen bg-neutral-200 py-12 px-4 sm:px-6 lg:px-8 mt-30">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-10">
          Get in Touch
        </h1>

        <div
          className="bg-indigo-100 border-l-4 border-indigo-500 text-indio-100 p-6 rounded-lg shadow-md mb-12"
          role="alert"
        >
          <h2 className="text-xl font-bold text-indigo-800 mb-2">
            We are here to help!
          </h2>
          <p className="text-base">
            Whether you have questions about policy details, need assistance
            with a claim, or require support with your account, our dedicated
            team is ready to assist you quickly and professionally.
          </p>
          {/* Horizontal Rule equivalent */}
          <div className="border-t border-indigo-400 my-4"></div>
          <p className="text-base mb-0">
            For immediate assistance, please use the form below for a
            comprehensive response within one business day.
          </p>
        </div>
        {/*  END: Recreated Bootstrap Alert */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Information Section (Keep this static) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-indigo-700">
              Our Contact Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow">
                <Mail className="h-6 w-6 text-indigo-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Email Address</p>
                  <a
                    href="mailto:support@onlineinsuranceportal.com"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    support@assureX.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow">
                <Phone className="h-6 w-6 text-indigo-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Phone Number</p>
                  <a
                    href="tel:+9180005551212"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    +91 8000 555 1212
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow">
                <MapPin className="h-6 w-6 text-indigo-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Office Address</p>
                  <p className="text-gray-600">
                    123 Insurance Tower, MG Road, Pune, Maharashtra - 411001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section (Static fields) */}
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6">
              Send Us A Message
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="How can we help you?"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                Submit Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
