import React from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackDashboard from './components/FeedbackDashboard';

function App() {
  return (
    <div>
      <h1>User Feedback System</h1>
      <FeedbackForm />
      <FeedbackDashboard />
    </div>
  );
}

export default App;
