import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubmitFeedback = ({ formId }) => {
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(`/api/forms/${formId}`);
        setForm(res.data);
        setResponses(res.data.questions.map(() => ''));
      } catch (error) {
        console.error('Failed to fetch form:', error.response.data.error);
      }
    };
    fetchForm();
  }, [formId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/feedback', {
        form: formId,
        responses: form.questions.map((q, i) => ({ question: q.question, answer: responses[i] }))
      }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      // Show success message
    } catch (error) {
      console.error('Feedback submission failed:', error.response.data.error);
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      {form.questions.map((q, index) => (
        <div key={index}>
          <label>{q.question}</label>
          {q.type === 'text' && (
            <input type="text" value={responses[index]} onChange={(e) => {
              const newResponses = [...responses];
              newResponses[index] = e.target.value;
              setResponses(newResponses);
            }} required />
          )}
          {/* Add more input types for multipleChoice and rating */}
        </div>
      ))}
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default SubmitFeedback;