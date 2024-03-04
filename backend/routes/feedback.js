const express = require("express")
const router = express.Router();
const {createFeedback,  deleteFeedback, getFeedback} = require('../controllers/feedback')


router.get('/feedback/list',getFeedback );
router.post('/feedback',createFeedback );
router.delete('/feedback/:id', deleteFeedback );
// router.patch('/feedback/:id' );

module.exports= router