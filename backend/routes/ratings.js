const express = require("express");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");

//ratings stats routes (ADMIN ONLY)
router.get("/admin/:appId", function(req, res) {
  try {
    db.reviews
    .find({ applicationId: req.params.appId })
    .then(function(found) {
      let mergedComments = [], commentUsers=[], mergedRatings={}, sectionAverageSums=new Array(5).fill(0), numRatedPerSection=new Array(5).fill(0);
      //retrive all comments and ratings from each review
      found.forEach((review, index)=>{
        const processedComments = review.comments.map(comment => ({userId: review.userId, value: comment.value, lastReviewed: comment.lastReviewed}))
        mergedComments=mergedComments.concat(processedComments);
        commentUsers.push(review.userId);
        mergedRatings[review.userId]=review.rating;
        for (let i=0; i<5; i++){
          if (review.questionList[i] && review.questionList[i].rating!=-1){
            sectionAverageSums[i] += review.questionList[i].rating;
            numRatedPerSection[i]++;
          }
        }
      });
      //get user_ids from comments and query user attributes to populate comments
      db.users.find({userId: { $in: commentUsers}}).then(function(found){
        const transpiledComments = mergedComments.map(comment => {
          let newComment = comment;
          const commentUser = found.filter(user => user.userId===comment.userId)[0]
          //add user attributes to each comment
          newComment['email'] = commentUser ? commentUser.email : null;
          newComment['author'] = commentUser ? commentUser.name : null;
          return newComment;
        })
         res.json(
          {
           "allComments": transpiledComments, 
           "allRatings": mergedRatings,
           "sectionAverages": sectionAverageSums.map((sum, index)=>(numRatedPerSection[index]===0 ? 0 : (sum/numRatedPerSection[index]).toFixed(1))),
           "averageRating": (Object.values(mergedRatings).reduce((ratingA, ratingB) => 
           ratingA+ratingB, 0)/Object.keys(mergedRatings).length).toFixed(1)});
         })
      })  
  } catch (err) {
    res.send(err);
  }
});

router.get("/:userid", function(req, res) {
  try {
    if (req.query.count) {
      db.reviews
        .countDocuments({ userId: req.params.userid, rating: { $ne: -1 } })
        .then(count => {
          res.json(count);
        });
      return;
    }
    db.reviews.find({ userId: req.params.userid }).then(function(found) {
      res.json(found);
    });
  } catch (err) {
    res.send(err);
  }
});

router.get("/:userid/:appId", function(req, res) {
  db.reviews
    .find({ applicationId: req.params.appId, userId: req.params.userid })
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

//upsert create a new document if the query did not retrieve any documents
//satisfying the criteria. It instead does an insert.
router.post("/", function(req, res) {
  db.reviews
    .updateOne(
      { userId: req.body.userId, applicationId: req.body.applicationId },
      req.body,
      { upsert: true }
    )
    // status code 201 means created
    .then(function(newSchedule) {
      res.status(201).json(newSchedule);
    })
    .catch(function(err) {
      res.send(err);
    });
});


module.exports = router;


