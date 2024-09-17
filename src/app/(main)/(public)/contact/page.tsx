import React from "react";
import { FaEnvelope, FaPhone, FaClock } from "react-icons/fa";
import ContactForm from "@/components/pages/root/contact/ContactForm";

export default function ContactPage() {
  return (
    <div>
      <div className="bg-[#8B0000] text-white py-20 mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-xl text-center">
          Get in touch with the KNUST Nomination System support team
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaEnvelope className="text-[#8B0000] mr-2" />
              <span>support@knustnominations.edu.gh</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-[#8B0000] mr-2" />
              <span>+233 XX XXX XXXX</span>
            </div>
            <div className="flex items-center">
              <FaClock className="text-[#8B0000] mr-2" />
              <span>Monday - Friday: 9:00 AM - 5:00 PM</span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Response Time</h3>
            <p>
              We aim to respond to all inquiries within 24-48 hours during
              business days.
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
