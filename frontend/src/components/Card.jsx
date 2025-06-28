import React from 'react';
import { motion } from 'framer-motion';

function Card({ icon, title, description, buttonText, onClick, bgColor }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(124,58,237,0.12)' }}
      className={`rounded-2xl p-6 flex flex-col items-center shadow-md transition-all cursor-pointer ${bgColor}`}
      onClick={onClick}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-bold text-lg mb-2 text-gray-900 font-poppins">{title}</h3>
      <p className="text-gray-600 text-center mb-4 font-inter">{description}</p>
      <button className="mt-auto px-5 py-2 rounded-full bg-white text-gray-900 font-semibold shadow hover:bg-gray-100 transition">
        {buttonText}
      </button>
    </motion.div>
  );
}

export default Card; 