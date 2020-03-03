const express = require("express");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");

router.get("/", function(req, res) {
  if (req.query.count) {
    db.applications.countDocuments().then(count => {
      res.json(count);
    });
    return;
  }
  db.applications
    .find()
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.get("/:userid", function(req, res) {
  db.applications
    .aggregate([
      {
        $project: { "Organization Name": 1 }
      },
      {
        $lookup: {
          from: "Reviews",
          let: { appId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$applicationId", "$$appId"] },
                    { $eq: ["$userId", req.params.userid] }
                  ]
                }
              }
            },
            { $project: { rating: 1, lastReviewed: 1 } }
          ],
          as: "ratingInfo"
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$$ROOT", { $arrayElemAt: ["$ratingInfo", 0] }]
          }
        }
      },
      {
        $project: { ratingInfo: 0 }
      }
    ])
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// router.get("/:appid/:userId", function(req, res) => {
// }

router.post("/", function(req, res) {
  var user = {
    username: "greg",
    password: "insecure",
    email: "gmaxin@uwaterloo.ca"
  };
  db.applications
    .create(user)

    // status code 201 means created
    .then(function(newSchedule) {
      res.status(201).json(newSchedule);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;
