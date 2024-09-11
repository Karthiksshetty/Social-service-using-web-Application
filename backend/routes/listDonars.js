const express = require("express");
const auth = require("../middlewares/authMiddleware");
const DonationModel = require("../models/donationModel");
const listDonar = express.Router();

listDonar.get("/list", async (req, res) => {
  try {
    let data = await DonationModel.aggregate([
      {
        $match: {},
      },
      {
        $sort: {
          amount: 1,
        },
      },
    ]);

    return res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

listDonar.get("/recent", async (req, res) => {
  try {
    let data = await DonationModel.aggregate([
      {
        $match: {},
      },
      {
        $sort: {
          date: -1,
        },
      },
    ]).limit(5)

    return res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = listDonar;
