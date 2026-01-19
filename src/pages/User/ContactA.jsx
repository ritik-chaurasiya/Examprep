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
      const res = await axios.get(`https://examprep-bxeo.onrender.com/api/message/user/${userId}`);
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
      await axios.post('https://examprep-bxeo.onrender.com/api/message', { question, examineeId: userId });
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
      await axios.put(`https://examprep-bxeo.onrender.com/api/message/edit/${id}`, {
        question: newText,
        role: 'user',
        userId
      });
      fetchUserMessages();
    } catch (err) {
      console.error('Error editing message:', err);
    }
  };

  const deleteByUser = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axios.put(`https://examprep-bxeo.onrender.com/api/message/delete/${id}`, {
        role: 'user',
        userId
      });
      fetchUserMessages();
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  return (
    <div className="container-fluid p-2">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">

          <div className="card shadow-sm">
            {/* Header */}
            <div
              className="card-header text-white fw-bold text-center"
              style={{ background: "#6f42c1" }}
            >
              Feedback Chat
            </div>

            {/* Chat Box */}
            <div
              className="card-body overflow-auto"
              style={{ height: "420px", background: "#f8f6ff" }}
            >
              {messages.length === 0 ? (
                <div className="text-center text-muted">
                  No feedback yet
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg._id} className="mb-3">

                    {/* User Message */}
                    <div className="d-flex justify-content-end">
                      <div className="bg-primary text-white p-2 rounded-3 w-75">
                        <p className="mb-1">{msg.question}</p>

                        <div className="d-flex gap-2 justify-content-end">
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() =>
                              editMyMessage(msg._id, msg.question)
                            }
                          >
                            ✏️
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteByUser(msg._id)}
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Admin Reply */}
                    {msg.answer && (
                      <div className="d-flex justify-content-start mt-2">
                        <div
                          className="p-2 rounded-3 w-75"
                          style={{ background: "#e9e3ff" }}
                        >
                          <p className="mb-0 text-dark">
                            {msg.answer}
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                ))
              )}

              <div ref={messagesEndRef}></div>
            </div>

            {/* Input Box */}
            <div className="card-footer">
              <form
                onSubmit={sendMessage}
                className="d-flex gap-2"
              >
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your feedback..."
                  className="form-control"
                />
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
};

export default ContactA;
