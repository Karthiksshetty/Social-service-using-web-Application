const express = require("express");
const dashboardRouter = express.Router();
const DonationModel = require("../models/donationModel");

dashboardRouter.get("/card", async (req, res) => {
  try {
    // total donation
    let totalCount = await DonationModel.aggregate([{ $match: {} }]);
    totalCount = totalCount.map((amt) => amt.amount);
    let finalTotal = 0;
    for (let i = 0; i < totalCount.length; i++) {
      finalTotal += totalCount[i];
    }

    // today donation
    let date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    console.log(date.toISOString());

    let todayDonate = await DonationModel.aggregate([
      { $match: { date: date } },
    ]);
    todayDonate = todayDonate.map((amt) => amt.amount);
    let todayTotal = 0;
    for (let i = 0; i < todayDonate.length; i++) {
      todayTotal += todayDonate[i];
    }

    //count
    let count = await DonationModel.aggregate([
      {
        $count: "count",
      },
    ]);

    count = count.map((cnt) => cnt.count);
    return res.status(200).json({
      totalDonation: finalTotal,
      todayDonation: todayTotal,
      count: count[0],
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = dashboardRouter;
