// src/components/Contact.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

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
    if (!answer) return alert("Please type a reply.");

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
      className="container-fluid p-4"
      style={{ backgroundColor: "#faf8ff", minHeight: "100vh" }}
    >
      <h2
        className="fw-bold mb-4"
        style={{ color: "#6f42c1" }}
      >
        Admin – User Messages
      </h2>

      <div className="table-responsive shadow rounded">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead
            style={{
              backgroundColor: "#f2e6ff",
              color: "#4a0b65",
            }}
          >
            <tr className="text-center">
              <th>S.No.</th>
              <th>Examinee</th>
              <th>Feedback</th>
              <th>Admin Reply</th>
              <th style={{ minWidth: "260px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {messages.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No messages found
                </td>
              </tr>
            ) : (
              messages.map((msg, idx) => (
                <tr key={msg._id}>
                  <td className="text-center fw-semibold">
                    {idx + 1}
                  </td>

                  <td>
                    <div className="fw-semibold text-dark">
                      {msg.examineeId?.name || "N/A"}
                    </div>
                    <small className="text-muted">
                      {msg.examineeId?.email || ""}
                    </small>
                  </td>

                  <td>{msg.question}</td>

                  <td>
                    {msg.answer ? (
                      <span className="text-success fw-semibold">
                        {msg.answer}
                      </span>
                    ) : (
                      <span className="text-muted">
                        No reply yet
                      </span>
                    )}
                  </td>

                  <td>
                    <input
                      type="text"
                      placeholder="Type reply..."
                      value={replyInputs[msg._id] || ""}
                      onChange={(e) =>
                        handleReplyChange(msg._id, e.target.value)
                      }
                      className="form-control form-control-sm mb-2"
                    />

                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                      <button
                        className="btn btn-sm text-white"
                        style={{ backgroundColor: "#6f42c1" }}
                        onClick={() => sendReply(msg._id)}
                      >
                        Send
                      </button>

                      <button
                        className="btn btn-sm text-dark"
                        style={{ backgroundColor: "#ffb703" }}
                        onClick={() => editReply(msg._id, msg.answer)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteByAdmin(msg._id)}
                      >
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
  );
};

export default Contact;
