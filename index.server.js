//initializing the app
const env = require("dotenv");
env.config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const app = express();

//database connection
// const db = require("./db/db");

//routes section
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const profileRoutes = require("./routes/profile");
const indexRoutes = require("./routes/index");
//database connection with mongoose ODM

// `mongodb://localhost:27017/beweddy`,
// `mongodb + srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.ttdpq.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

mongoose
  .connect(
    `mongodb+srv://beweddyport:${process.env.MONGO_DB_PASS}@cluster0.ttdpq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("DataBase Connected");
  });

//middleware section
app.use(morgan("dev"));
// Enable cors
app.use(
  cors({
    origin: [process.env.ORIGIN || 'http://localhost:3000', 'http://localhost:3000'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(express.json());

//declaring API for production

app.use("/", indexRoutes);
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api/profile", profileRoutes);


//listen section
app.listen(process.env.PORT, () =>
  console.log(`Server is running on this ${process.env.PORT}`)
);
