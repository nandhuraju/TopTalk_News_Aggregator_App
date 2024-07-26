const express = require("express");
const mongoose = require("mongoose"); 
const app = express();
const cors = require("cors");
// const newsRoutes = require("./routes/news"); 
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const searchRoute=require("./routes/search");

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// app.use("/news", newsRoutes); 
app.use("/auth", authRoute);
app.use("/user", userRoute)
app.use("/search", searchRoute)



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect("mongodb://mongodb:27017/top_talk");

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
