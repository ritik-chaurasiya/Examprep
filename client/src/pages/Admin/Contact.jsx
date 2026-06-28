// src/components/Contact.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [messages, setMessages] = useState([]);
  const [replyInputs, setReplyInputs] = useState({});

  const fetchAll = async () => {
    try {
      const res = await axios.get(
        "https://examprep-bxeo.onrender.com/api/message/all"
      );
      setMessages(res.data.message || []);
    } catch (err) {
      console.error("Error fetching messages for admin:", err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleReplyChange = (id, value) => {
    setReplyInputs((prev) => ({ ...prev, [id]: value }));
  };

  const sendReply = async (id) => {
    const answer = (replyInputs[id] || "").trim();
    if (!answer) return toast.warning("Please type a reply.");

    await axios.put(
      `https://examprep-bxeo.onrender.com/api/message/reply/${id}`,
      { answer, role: "admin" }
    );
    setReplyInputs((prev) => ({ ...prev, [id]: "" }));
    fetchAll();
  };

  const editReply = async (id, currentReply) => {
    const newReply = prompt("Edit reply:", currentReply || "");
    if (newReply === null) return;

    await axios.put(
      `https://examprep-bxeo.onrender.com/api/message/reply/${id}`,
      { answer: newReply, role: "admin" }
    );
    fetchAll();
  };

  const deleteByAdmin = async (id) => {
    if (!window.confirm("Delete this reply?")) return;

    await axios.put(
      `https://examprep-bxeo.onrender.com/api/message/delete/${id}`,
      { role: "admin" }
    );
    fetchAll();
  };

  return (
    <div
      className="container-fluid p-3"
      style={{
        background: "#faf8ff",
        minHeight: "100vh"
      }}
    >

      {/* HEADER */}
      <div
        className="card border-0 shadow-lg mb-4"
        style={{
          borderRadius: "25px",
          background: "linear-gradient(90deg,#4F46E5,#7C3AED)"
        }}
      >
        <div className="card-body d-flex justify-content-between align-items-center flex-wrap">

          <div>
            <h2 className="fw-bold text-white mb-1">
              <i className="fa-solid fa-comments me-2"></i>
              User Messages
            </h2>

            <p className="text-light mb-0">
              Manage student feedback and replies
            </p>
          </div>

          <div
            className="bg-white rounded-pill px-4 py-2 fw-bold mt-3 mt-md-0"
            style={{ color: "#4F46E5" }}
          >
            Total Messages : {messages.length}
          </div>

        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="d-none d-lg-block">

        <div
          className="card border-0 shadow-lg"
          style={{
            borderRadius: "25px"
          }}
        >
          <div className="card-body">

            <div className="table-responsive">

              <table className="table align-middle table-hover">

                <thead
                  className="text-white"
                  style={{
                    background:
                      "linear-gradient(90deg,#4F46E5,#7C3AED)"
                  }}
                >
                  <tr className="text-center">
                    <th>S.No.</th>
                    <th>Student</th>
                    <th>Message</th>
                    <th>Admin Reply</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {messages.length === 0 ? (

                    <tr>
                      <td colSpan="5">

                        <div className="text-center py-5">

                          <i
                            className="fa-solid fa-message"
                            style={{
                              fontSize: "70px",
                              color: "#7C3AED"
                            }}
                          ></i>

                          <h4 className="mt-3 text-secondary">
                            No Messages Found
                          </h4>

                        </div>

                      </td>
                    </tr>

                  ) : (

                    messages.map((msg, idx) => (

                      <tr key={msg._id}>

                        <td className="text-center fw-bold">
                          {idx + 1}
                        </td>

                        <td>

                          <div className="fw-bold text-primary">
                            {msg.examineeId?.name}
                          </div>

                          <small className="text-muted">
                            {msg.examineeId?.email}
                          </small>

                        </td>

                        <td>

                          <div
                            className="rounded p-2"
                            style={{
                              background: "#f8f9ff"
                            }}
                          >
                            {msg.question}
                          </div>

                        </td>

                        <td>

                          {msg.answer ? (

                            <div
                              className="rounded p-2 border-start border-4 border-success"
                              style={{
                                background: "#f0fff4"
                              }}
                            >
                              {msg.answer}
                            </div>

                          ) : (

                            <span className="text-muted">
                              No Reply Yet
                            </span>

                          )}

                        </td>

                        <td>

                          <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Type reply..."
                            value={replyInputs[msg._id] || ""}
                            onChange={(e) =>
                              handleReplyChange(
                                msg._id,
                                e.target.value
                              )
                            }
                          />

                          <div className="d-flex gap-2 flex-wrap">

                            <button
                              className="btn text-white"
                              style={{
                                background:
                                  "linear-gradient(90deg,#4F46E5,#7C3AED)"
                              }}
                              onClick={() => sendReply(msg._id)}
                            >
                              <i className="fa-solid fa-paper-plane me-2"></i>
                              Send
                            </button>

                            <button
                              className="btn btn-warning"
                              onClick={() =>
                                editReply(msg._id, msg.answer)
                              }
                            >
                              <i className="fa-solid fa-pen me-2"></i>
                              Edit
                            </button>

                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                deleteByAdmin(msg._id)
                              }
                            >
                              <i className="fa-solid fa-trash me-2"></i>
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>
        </div>

      </div>

      {/* MOBILE CARD VIEW */}
      <div className="d-lg-none">

        {messages.length === 0 ? (

          <div className="card border-0 shadow rounded-4">
            <div className="card-body text-center py-5">

              <i
                className="fa-solid fa-message"
                style={{
                  fontSize: "60px",
                  color: "#7C3AED"
                }}
              ></i>

              <h5 className="mt-3 text-secondary">
                No Messages Found
              </h5>

            </div>
          </div>

        ) : (

          messages.map((msg, idx) => (

            <div
              key={msg._id}
              className="card border-0 shadow-lg rounded-4 mb-4"
            >

              <div className="card-body">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">

                  <div>

                    <h6 className="fw-bold text-primary mb-1">
                      <i className="fa-solid fa-user me-2"></i>
                      {msg.examineeId?.name}
                    </h6>

                    <small className="text-muted">
                      {msg.examineeId?.email}
                    </small>

                  </div>

                  <span className="badge bg-primary">
                    #{idx + 1}
                  </span>

                </div>

                {/* Message */}
                <div className="mb-3">

                  <small className="fw-bold text-dark">
                    Message
                  </small>

                  <div
                    className="rounded p-3 mt-2"
                    style={{
                      background: "#f8f9ff"
                    }}
                  >
                    {msg.question}
                  </div>

                </div>

                {/* Reply */}
                <div className="mb-3">

                  <small className="fw-bold text-success">
                    Admin Reply
                  </small>

                  <div
                    className="rounded p-3 mt-2 border-start border-4 border-success"
                    style={{
                      background: "#f0fff4"
                    }}
                  >

                    {msg.answer || (
                      <span className="text-muted">
                        No Reply Yet
                      </span>
                    )}

                  </div>

                </div>

                {/* Input */}
                <input
                  type="text"
                  className="form-control rounded-3 mb-3"
                  placeholder="Type reply..."
                  value={replyInputs[msg._id] || ""}
                  onChange={(e) =>
                    handleReplyChange(
                      msg._id,
                      e.target.value
                    )
                  }
                />

                {/* Buttons */}
                <div className="d-grid gap-2">

                  <button
                    className="btn text-white rounded-3"
                    style={{
                      background:
                        "linear-gradient(90deg,#4F46E5,#7C3AED)"
                    }}
                    onClick={() => sendReply(msg._id)}
                  >
                    <i className="fa-solid fa-paper-plane me-2"></i>
                    Send Reply
                  </button>

                  <button
                    className="btn btn-warning rounded-3"
                    onClick={() =>
                      editReply(msg._id, msg.answer)
                    }
                  >
                    <i className="fa-solid fa-pen me-2"></i>
                    Edit Reply
                  </button>

                  <button
                    className="btn btn-danger rounded-3"
                    onClick={() =>
                      deleteByAdmin(msg._id)
                    }
                  >
                    <i className="fa-solid fa-trash me-2"></i>
                    Delete Message
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default Contact;
