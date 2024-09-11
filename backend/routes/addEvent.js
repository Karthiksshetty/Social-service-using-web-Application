const express = require("express");
const auth = require("../middlewares/authMiddleware");
const eventModel = require("../models/eventModel");
const eventRoute = express.Router();
const moment = require("moment")

eventRoute.post("/add", async (req, res) => {
  try {
    const { eventname, description, amount, location } = req.body;
    await eventModel.create({
      eventname,
      description,
      amount,
      location,
    });

    return res
      .status(200)
      .json({ code: 200, message: "Event Added Successfully" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

eventRoute.get("/list", async (req, res) => {
  try {
    let data = await eventModel.aggregate([
      { $match: {} },
      { $sort: { date: -1 } },
    ]);

    data = data.map((itm) => ({
        "_id": itm._id,
            "eventname": itm.eventname,
            "description": itm.description,
            "amount": itm.amount,
            "location": itm.location,
            "date": moment(itm.date).format('LLL'),
    }))

    return res
      .status(200)
      .json({ code: 200, message: "Event Added Successfully", data });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = eventRoute;
