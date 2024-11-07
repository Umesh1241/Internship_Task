
require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const path = require('path');
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET, POST, PUT, DELETE, PATCH", 
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", router);
app.use(errorMiddleware);

const PORT = 5000;
connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });
