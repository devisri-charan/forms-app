import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-transparent text-white text-center py-4 shadow-inner">
      <p className="text-sm">&copy; {new Date().getFullYear()} Forms. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
