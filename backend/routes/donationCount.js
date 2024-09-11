const express = require("express");
const auth = require("../middlewares/authMiddleware");
const DonationModel = require("../models/donationModel");
const router = express.Router();

router.get("/count", async (req, res) => {
  try {
    let count = await DonationModel.aggregate([
      {
        $facet: {
          healtCount: [
            {
              $match: { category: "health" },
            },
            {
              $group: {
                _id:null,
                count: {$sum: "$amount"}
              }
            },
            {
              $project: {_id: 0}
            }
          ],
          educationCount: [
            {
              $match: { category: "education" },
            },
            {
              $group: {
                _id: null,
                count: { $sum: "$amount" } 
              }
            },
            {
              $project: {_id: 0}
            }
          ],
          foodCount: [
            {
              $match: { category: "food" },
            },
            {
              $group: {
                _id:null,
                count: {$sum: "$amount"}
              }
            },
            {
              $project: {_id: 0}
            }
          ],
          indiaDonation: [
            {
              $match: { category: "indiadonation" },
            },
            {
              $group: {
                _id:null,
                count: {$sum: "$amount"}
              }
            },
            {
              $project: {_id: 0}
            }
          ],
        },
      },
    ]);

    return res.status(200).send(count);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = router;
