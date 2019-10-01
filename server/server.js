const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const { urlencoded, json } = require("body-parser");
const cors = require("cors");
const app = express();

const slideRoutes = require("./routes/slideRoutes");

app.use(cors());

// create application/json parser
app.use(json());

// create application/x-www-form-urlencoded parser
app.use(urlencoded({ extended: false }));

// Define Routes
app.use(slideRoutes);

// Connect Database
connectDB();
// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
