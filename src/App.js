import React from 'react';
import { DBConfig } from './utils/db'
import { initDB } from 'react-indexed-db'
import { useIndexedDB } from 'react-indexed-db'
import './App.css';
import Main from './components/Main';
import Footer from "./components/Footer";



initDB(DBConfig);


function App() {


  return (
    <div className="App">
      <Main />
      <Footer />
    </div>
  );
}

export default App;
