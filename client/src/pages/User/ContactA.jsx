// src/components/ContactA.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';


const ContactA = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const userId = localStorage.getItem('userId');
  // const userName = localStorage.getItem('userName') || 'You';

  const fetchUserMessages = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/message/user/${userId}`);
      setMessages(res.data.message || []);
    } catch (err) {
      console.error('Error fetching user messages:', err);
    }
  };

  useEffect(() => { fetchUserMessages(); }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/message', { question, examineeId: userId });
      setQuestion('');
      fetchUserMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const editMyMessage = async (id, currentText) => {
    const newText = prompt('Edit your message:', currentText);
    if (newText === null || !newText.trim()) return;
    try {
      await axios.put(`http://localhost:5000/api/message/edit/${id}`, {
        question: newText,
        role: 'user',
        userId
      });
      fetchUserMessages();
    } catch (err) {
      console.error('Error editing message:', err);a
    }
  };

  const deleteByUser = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axios.put(`http://localhost:5000/api/message/delete/${id}`, {
        role: 'user',
        userId
      });
      fetchUserMessages();
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Feedback Chat</div>

      <div className="chat-box">
        {messages.length === 0 ? (
          <div className="no-msg">No feedback yet</div>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="chat-message-container">
              {/* User message */}
              <div className="message user-message">
                <p>{msg.question}</p>
                <div className="msg-actions">
                  <button className="btn-sm btn-warning" onClick={() => editMyMessage(msg._id, msg.question)}>✏️</button>
                  <button className="btn-sm btn-danger" onClick={() => deleteByUser(msg._id)}>🗑</button>
                </div>
              </div>

              {/* Admin reply */}
              {msg.answer && (
                <div className="message admin-message">
                  <p>{msg.answer}</p>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input box */}
      <form onSubmit={sendMessage} className="chat-input-container">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your feedback..."
          className="chat-input"
        />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  );
};

export default ContactA;
