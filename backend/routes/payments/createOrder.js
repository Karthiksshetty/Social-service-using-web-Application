const express = require("express");
const createOrder = express.Router();
const Razorpay = require("razorpay");

createOrder.post("/", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.YOUR_KEY_ID,
      key_secret: process.env.YOUR_SECRET,
    });

    const { amount } = req.body;

    if (!amount || amount == undefined) {
        return res.status(200).send("Amount is required");
    }

    await instance.orders
      .create({
        amount: Math.floor(parseInt(amount) * 100),
        currency: "INR",
        receipt: "receipt#1",
        notes: {
          key1: "value3",
          key2: "value2",
        },
      })
      .then((order) => {
        return res.status(200).send(order);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Something went wrong");
  }
});

module.exports = createOrder;