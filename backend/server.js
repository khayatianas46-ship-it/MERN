require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8"]);
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`connected to db and 
        
        listening on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
