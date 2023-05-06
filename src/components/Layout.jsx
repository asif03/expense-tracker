import React from 'react';
import Header from '../containers/Header';
import Footer from '../containers/Footer';

const Layout = ({ children }) => {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <div className="container">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
