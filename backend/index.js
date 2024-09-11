const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Port = process.env.port;
const connection = require("./db");
const userRouter = require("./routes/userRouter");
const donationRouter = require("./routes/donationRoute");
const adminRouter = require("./routes/admin/adminRoute");
const userDetailsRoute = require("./routes/admin/userDetailsRoute");
const donationCount = require("./routes/donationCount");
const listDonar = require("./routes/listDonars");
const events = require("./routes/addEvent");
const dashboard = require("./routes/dashboard");
const graph = require("./routes/dashboardGraph");
const contactUs = require("./routes/contactus");
const createOrder = require("./routes/payments/createOrder");
const verifyPayment = require("./routes/payments/verifyPayment");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/users", userRouter);
app.use("/donation", donationRouter);
app.use("/admin", adminRouter);
app.use("/admin/userDetails", userDetailsRoute);
app.use("/donation", donationCount);
app.use("/donar", listDonar);
app.use("/event", events);
app.use("/dashboard", dashboard);
app.use("/dashboard/graph", graph);
app.use("/contact/admin", contactUs);
app.use("/payment/pay", createOrder);
app.use("/payment/verify", verifyPayment);

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.listen(Port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is listening on port ${Port}`);
});
