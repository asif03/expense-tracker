import React from 'react';

const Footer = () => {
  const dt = new Date();
  let yr = dt.getFullYear();
  return <div className="footer">&copy; {yr} DynamicPHP.com</div>;
};

export default Footer;
