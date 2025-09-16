const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const path = require("path");

const createDB = require("./db/createDB");
const createTables = require("./db/pgDbInit");

async function initializeDatabase() {
  try {
    await createDB();
    await createTables();
    console.log("Database and tables initialized successfully.");
  } catch (err) {
    console.error("Error during database initialization:", err);
  }
}
initializeDatabase();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
