import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeedbackDashboard.css'; // Import the CSS file

function FeedbackDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks', error);
      setError('Failed to load feedbacks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  if (loading) {
    return (
      <div className="feedback-loading">
        <div className="spinner"></div>
        <p>Loading feedbacks...</p>
      </div>
    );
  }

  if (error) {
    return <div className="feedback-error">{error}</div>;
  }

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h2>Customer Feedbacks</h2>
        <button onClick={fetchFeedbacks} className="refresh-btn">
          Refresh
        </button>
      </div>
      
      {feedbacks.length === 0 ? (
        <p className="no-feedbacks">No feedbacks available.</p>
      ) : (
        <div className="feedback-list">
          {feedbacks.map((fb) => (
            <div key={fb._id} className="feedback-card">
              <div className="feedback-meta">
                <span className="feedback-name">{fb.name}</span>
                <span className="feedback-email">{fb.email}</span>
                <span className="feedback-category">{fb.category || 'General'}</span>
              </div>
              <div className="feedback-content">
                <p>{fb.feedback}</p>
              </div>
              {fb.createdAt && (
                <div className="feedback-date">
                  {new Date(fb.createdAt).toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FeedbackDashboard;