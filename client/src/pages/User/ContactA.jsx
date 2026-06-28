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

  // return (
  //   <div className="container-fluid p-2">
  //     <div className="row justify-content-center">
  //       <div className="col-12 col-md-8 col-lg-6">

  //         <div className="card shadow-sm">
  //           {/* Header */}
  //           <div
  //             className="card-header text-white fw-bold text-center"
  //             style={{ background: "#6f42c1" }}
  //           >
  //             Feedback Chat
  //           </div>

  //           {/* Chat Box */}
  //           <div
  //             className="card-body overflow-auto"
  //             style={{ height: "420px", background: "#f8f6ff" }}
  //           >
  //             {messages.length === 0 ? (
  //               <div className="text-center text-muted">
  //                 No feedback yet
  //               </div>
  //             ) : (
  //               messages.map((msg) => (
  //                 <div key={msg._id} className="mb-3">

  //                   {/* User Message */}
  //                   <div className="d-flex justify-content-end">
  //                     <div className="bg-primary text-white p-2 rounded-3 w-75">
  //                       <p className="mb-1">{msg.question}</p>

  //                       <div className="d-flex gap-2 justify-content-end">
  //                         <button
  //                           className="btn btn-sm btn-warning"
  //                           onClick={() =>
  //                             editMyMessage(msg._id, msg.question)
  //                           }
  //                         >
  //                           ✏️
  //                         </button>
  //                         <button
  //                           className="btn btn-sm btn-danger"
  //                           onClick={() => deleteByUser(msg._id)}
  //                         >
  //                           🗑
  //                         </button>
  //                       </div>
  //                     </div>
  //                   </div>

  //                   {/* Admin Reply */}
  //                   {msg.answer && (
  //                     <div className="d-flex justify-content-start mt-2">
  //                       <div
  //                         className="p-2 rounded-3 w-75"
  //                         style={{ background: "#e9e3ff" }}
  //                       >
  //                         <p className="mb-0 text-dark">
  //                           {msg.answer}
  //                         </p>
  //                       </div>
  //                     </div>
  //                   )}

  //                 </div>
  //               ))
  //             )}

  //             <div ref={messagesEndRef}></div>
  //           </div>

  //           {/* Input Box */}
  //           <div className="card-footer">
  //             <form
  //               onSubmit={sendMessage}
  //               className="d-flex gap-2"
  //             >
  //               <input
  //                 type="text"
  //                 value={question}
  //                 onChange={(e) => setQuestion(e.target.value)}
  //                 placeholder="Type your feedback..."
  //                 className="form-control"
  //               />
  //               <button type="submit" className="btn btn-primary">
  //                 Send
  //               </button>
  //             </form>
  //           </div>
  //         </div>

  //       </div>
  //     </div>
  //   </div>

  // );
  
  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <div className="row justify-content-center">

        <div className="col-12 col-lg-9 col-xl-8">

          {/* Header */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              borderRadius: "25px",
              background: "linear-gradient(90deg,#4F46E5,#7C3AED)"
            }}
          >

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center flex-wrap">

                <div>

                  <h2 className="text-white fw-bold mb-1">
                    <i className="fa-solid fa-comments me-2"></i>

                    Feedback Center

                  </h2>

                  <p className="text-white-50 mb-0">
                    Chat with the administrator anytime.
                  </p>

                </div>

                <span className="badge bg-white text-primary fs-6 px-4 py-3 rounded-pill">
                  {messages.length} Messages
                </span>

              </div>

            </div>

          </div>

          {/* Chat Card */}

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "25px"
            }}
          >

            {/* Top */}

            <div
              className="card-header text-white border-0"
              style={{
                background: "#4F46E5"
              }}
            >

              <div className="d-flex align-items-center">

                <div
                  className="rounded-circle bg-white d-flex justify-content-center align-items-center me-3"
                  style={{
                    width: "45px",
                    height: "45px"
                  }}
                >

                  <i
                    className="fa-solid fa-headset"
                    style={{
                      color: "#4F46E5"
                    }}
                  ></i>

                </div>

                <div>

                  <h5 className="mb-0">
                    Admin Support
                  </h5>

                  <small className="text-white-50">
                    Usually replies quickly
                  </small>

                </div>

              </div>

            </div>

            {/* Messages */}

            <div
              className="card-body"
              style={{
                height: "500px",
                overflowY: "auto",
                background: "#F8FAFC"
              }}
            >

              {messages.length === 0 ? (

                <div className="text-center mt-5">

                  <i
                    className="fa-solid fa-comments"
                    style={{
                      fontSize: "80px",
                      color: "#7C3AED"
                    }}
                  ></i>

                  <h4 className="mt-3">
                    No Messages Yet
                  </h4>

                  <p className="text-muted">
                    Start your conversation with the admin.
                  </p>

                </div>

              ) : (

                messages.map((msg) => (

                  <div key={msg._id}>

                    {/* User */}

                    <div className="d-flex justify-content-end mb-3">

                      <div
                        className="text-white p-3 shadow"
                        style={{
                          maxWidth: "75%",
                          background:
                            "linear-gradient(90deg,#4F46E5,#7C3AED)",
                          borderRadius:
                            "20px 20px 0px 20px"
                        }}
                      >

                        <div className="fw-semibold">
                          {msg.question}
                        </div>

                        <div className="text-end mt-3">

                          <button
                            className="btn btn-sm btn-light me-2"
                            onClick={() =>
                              editMyMessage(
                                msg._id,
                                msg.question
                              )
                            }
                          >
                            <i className="fa-solid fa-pen"></i>
                          </button>

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              deleteByUser(msg._id)
                            }
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>

                        </div>

                      </div>

                    </div>

                    {/* Admin */}

                    {msg.answer && (

                      <div className="d-flex justify-content-start mb-4">

                        <div
                          className="bg-white shadow p-3"
                          style={{
                            maxWidth: "75%",
                            borderRadius:
                              "20px 20px 20px 0"
                          }}
                        >

                          <div
                            className="fw-bold mb-2"
                            style={{
                              color: "#4F46E5"
                            }}
                          >
                            <i className="fa-solid fa-user-shield me-2"></i>

                            Admin

                          </div>

                          <div>

                            {msg.answer}

                          </div>

                        </div>

                      </div>

                    )}

                  </div>

                ))

              )}

              <div ref={messagesEndRef}></div>

            </div>

            {/* Footer */}

            <div className="card-footer bg-white border-0">

              <form
                onSubmit={sendMessage}
              >

                <div className="input-group">

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Type your message..."
                    value={question}
                    onChange={(e) =>
                      setQuestion(e.target.value)
                    }
                  />

                  <button
                    className="btn text-white px-4"
                    type="submit"
                    style={{
                      background:
                        "linear-gradient(90deg,#4F46E5,#7C3AED)"
                    }}
                  >

                    <i className="fa-solid fa-paper-plane"></i>

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
  );

};

export default ContactA;
