import React from 'react';
import './App.css';
import Transactions from './containers/Transactions';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <Transactions />
    </Layout>
  );
}

export default App;
