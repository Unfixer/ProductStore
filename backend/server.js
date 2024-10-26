// Serves as the entry point of the API
// const express = require('express'), the traditional way to make an express app
import express from "express";
import dotenv from "dotenv";  // To be able to use the .env file's MONGO URI
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/products.route.js";

dotenv.config();   // Calling the config function of the dependency

const app = express();
const PORT = process.env.PORT  || 5000;
const __dirname = path.resolve();

app.use(express.json()); // Allows us to parse the data/ accept JSON data in the req.body
// This is called a middleware, i.e., a function that runs before sending the response to a client

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
}); // We listen for a port here, ours being 5000

