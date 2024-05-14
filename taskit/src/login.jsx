import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { store } from 'state-pool';
import { AuthContext } from './AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState("");
  const navigateTo = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    //const { isLoggedIn } = useContext(AuthContext);

    if (!username || !password) {
      setResponseMessage("Please fill in all the fields.");
      return; // Exit early if any field is empty
    }

    try {
        const response = await axios.post(
            `http://localhost:3000/login`,
            { username, password }
          );
      setResponseMessage(response.data.message); // Assuming the response contains a "message" field
      //window.location.reload(); // Reload the page
      console.log(response.data.userId);
      login(response.data.userId);
      localStorage.setItem('userId', response.data.userId); // Store the userId in localStorage
      navigateTo('/tasks');
    } catch (error) {
      console.log(error);
      setResponseMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className='d-flex align-items-center flex-column mt-3'>
      <h2>Login</h2>
      <h3 >{responseMessage}</h3>
      <form className="w-50" onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

