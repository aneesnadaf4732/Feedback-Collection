import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/feedback', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setFeedbackData(res.data);
      } catch (error) {
        console.error('Failed to fetch feedback data:', error.response.data.error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Feedback Dashboard</h2>
      {/* Display feedback statistics, charts, etc. */}
      {feedbackData.map((feedback, index) => (
        <div key={index}>
          <h3>{feedback.form.title}</h3>
          {feedback.responses.map((response, i) => (
            <p key={i}>{response.question}: {response.answer}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;