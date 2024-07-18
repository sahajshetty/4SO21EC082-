import React, { useState } from 'react';
import axios from 'axios';

const Authorization = () => {
  const [companyName, setCompanyName] = useState('goMart');
  const [clientID, setClientID] = useState('37bb493c-73d3-47ea-8675-21f66ef9b735');
  const [clientSecret, setClientSecret] = useState('XOyolORPasKW0dAN');
  const [ownerName, setOwnerName] = useState('Rahul');
  const [ownerEmail, setOwnerEmail] = useState('rahul@abc.edu');
  const [rollNo, setRollNo] = useState('1');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://20.244.56.144/test/auth', {
        companyName,
        clientID,
        clientSecret,
        ownerName,
        ownerEmail,
        rollNo
      });
      setResponse(response.data);
      setError(null);
    } catch (error) {
      console.error('There was an error!', error);
      setError('Authorization failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Obtain Authorization Token</h2>
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
          <label>Client ID:</label>
          <input 
            type="text" 
            value={clientID} 
            onChange={(e) => setClientID(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Client Secret:</label>
          <input 
            type="text" 
            value={clientSecret} 
            onChange={(e) => setClientSecret(e.target.value)} 
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
          <label>Owner Email:</label>
          <input 
            type="email" 
            value={ownerEmail} 
            onChange={(e) => setOwnerEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Roll Number:</label>
          <input 
            type="text" 
            value={rollNo} 
            onChange={(e) => setRollNo(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Get Token</button>
      </form>
      {response && (
        <div>
          <h3>Authorization Successful!</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Authorization;
