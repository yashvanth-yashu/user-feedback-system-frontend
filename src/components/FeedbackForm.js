import React, { useState } from 'react';
import axios from 'axios';
import './FeedbackForm.css';

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      await axios.post('http://localhost:5000/feedback', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', feedback: '', category: '' });
    } catch (error) {
      console.error('Error submitting feedback', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="feedback-form-container">
      <h2>Share Your Feedback</h2>
      <p className="form-description">We value your input to help us improve our services.</p>
      
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Bug Report">Bug Report</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Compliment">Compliment</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="feedback">Your Feedback</label>
          <textarea
            id="feedback"
            name="feedback"
            placeholder="Share your thoughts..."
            value={formData.feedback}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
        
        {submitStatus === 'success' && (
          <div className="alert success">
            Thank you! Your feedback has been submitted successfully.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="alert error">
            Oops! Something went wrong. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}

export default FeedbackForm;