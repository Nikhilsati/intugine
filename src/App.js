import React, { createContext, useState } from 'react';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

export const MyContext = createContext('');

function App() {
  const [token, setToken] = useState('');
  return (
    <MyContext.Provider value={{ token, setToken }}>
      <div className='App'>{token ? <Dashboard /> : <Login />}</div>
    </MyContext.Provider>
  );
}

export default App;
