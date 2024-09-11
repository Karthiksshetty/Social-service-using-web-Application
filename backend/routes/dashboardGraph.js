const express = require("express");
const graphRouter = express.Router();
const DonationModel = require("../models/donationModel");

graphRouter.get("/", async (req, res) => {
  try {
    let donations = await DonationModel.find();

    // let monthlyTotals1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let monthlyTotals = [
      { name: "Jan", amount: 0 },
      { name: "Feb", amount: 0 },
      { name: "Mar", amount: 0 },
      { name: "Apr", amount: 0 },
      { name: "May", amount: 0 },
      { name: "June", amount: 0 },
      { name: "July", amount: 0 },
      { name: "Aug", amount: 0 },
      { name: "Sep", amount: 0 },
      { name: "Oct", amount: 0 },
      { name: "Nov", amount: 0 },
      { name: "Dec", amount: 0 },
    ];

    donations.forEach((donation) => {
      let donationDate = new Date(donation.date);
      let monthIndex = donationDate.getMonth();
      monthlyTotals[monthIndex].amount += donation.amount;
    });
    return res.status(200).json({
      code: 200,
      message: "Everything worked as expected",
      monthlyTotals,
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = graphRouter;
