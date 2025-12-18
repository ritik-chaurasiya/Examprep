const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Debug: check env loaded or not
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "LOADED" : "NOT LOADED");

// const url = 'mongodb://localhost:27017/examprep'
// const url = 'MONGODB_CONNECT'
const url = process.env.MONGODB_CONNECT;
mongoose.connect(url)
    .then(() => {
        console.log("successfully Connected")
    })
    .catch((er) => {
        console.log(`Error is ${er}`)
    })
    
//apis started
app.use("/uploads", express.static("uploads"));
app.use("/api/examinee", require("./routes/examineeRoute"));
//  admin apis started
app.use('/api/admin', require('./routes/adminRoute'));
//  session api
app.use('/api/session/', require('./routes/sessionRoute'));
// subject api
app.use('/api/subject/', require('./routes/subjectRoute'));
// question api
app.use('/api/question/', require('./routes/questionRoute'));
//examination api
app.use('/api/exams/', require('./routes/examinationRoute'));
//message api
app.use('/api/message', require('./routes/messageRoute'));
// api for dashboard
app.use('/api/dashboard/', require('./routes/dashboardRoute'));
//apis ended

// app.listen(5000, () => {
//     console.log("Server Connected on http://localhost:5000");
// })
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Working at ${PORT}`);
}).on("error", (error) => {
  console.error("Server error:", error.message);
});