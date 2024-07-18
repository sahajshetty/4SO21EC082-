import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [companyName, setCompanyName] = useState(''); 
  const [ownerName, setOwnerName] = useState(''); 
  const [rollNumber, setRollNumber] = useState('4SO21EC082');
  const [email, setEmail] = useState('sahajshetty1@gmail.com');
  const [accessCode, setAccessCode] = useState(''); // Add your access code here
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://20.244.56.144/test/register', {
        companyName,
        ownerName,
        rollNo: rollNumber,
        ownerEmail: email,
        accessCode
      });
      setResponse(response.data);
      setError(null);
    } catch (error) {
      console.error('There was an error!', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register for Test Server</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name:</label>
          <input 
            type="text" 
            value={companyName} 
            onChange={(e) => setCompanyName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Owner Name:</label>
          <input 
            type="text" 
            value={ownerName} 
            onChange={(e) => setOwnerName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Roll Number:</label>
          <input 
            type="text" 
            value={rollNumber} 
            onChange={(e) => setRollNumber(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Access Code:</label>
          <input 
            type="text" 
            value={accessCode} 
            onChange={(e) => setAccessCode(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {response && (
        <div>
          <h3>Registration Successful!</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
