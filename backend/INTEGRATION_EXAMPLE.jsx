/**
 * Example: How to integrate the Contact Form with your React frontend
 * 
 * This file demonstrates how to:
 * 1. Create a contact form component
 * 2. Submit data to the backend API
 * 3. Handle success/error responses
 */

import { useState } from 'react';

export const ContactFormExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setError(data.error || 'Failed to submit form');
      }
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
      </div>

      {status === 'error' && (
        <div style={{ color: 'red', marginBottom: '15px' }}>
          Error: {error}
        </div>
      )}

      {status === 'success' && (
        <div style={{ color: 'green', marginBottom: '15px' }}>
          ✓ Message sent! Check your email for confirmation.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          padding: '10px 20px',
          backgroundColor: status === 'loading' ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer'
        }}
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactFormExample;

/*
 * Usage in your page:
 * 
 * import ContactFormExample from './ContactFormExample';
 * 
 * export const ContactUsPage = () => {
 *   return (
 *     <div>
 *       <h1>Contact Us</h1>
 *       <ContactFormExample />
 *     </div>
 *   );
 * };
 */
