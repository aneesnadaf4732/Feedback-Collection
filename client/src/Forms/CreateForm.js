import React, { useState } from 'react';
import axios from 'axios';

const CreateForm = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { type: 'text', question: '', options: [] }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/forms', { title, questions }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      // Redirect or show success message
    } catch (error) {
      console.error('Form creation failed:', error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      {questions.map((q, index) => (
        <div key={index}>
          <select value={q.type} onChange={(e) => {
            const newQuestions = [...questions];
            newQuestions[index].type = e.target.value;
            setQuestions(newQuestions);
          }}>
            <option value="text">Text</option>
            <option value="multipleChoice">Multiple Choice</option>
            <option value="rating">Rating</option>
          </select>
          <input type="text" value={q.question} onChange={(e) => {
            const newQuestions = [...questions];
            newQuestions[index].question = e.target.value;
            setQuestions(newQuestions);
          }} required />
          {/* Add more inputs for options if type is multipleChoice */}
        </div>
      ))}
      <button type="button" onClick={addQuestion}>Add Question</button>
      <button type="submit">Create Form</button>
    </form>
  );
};

export default CreateForm;