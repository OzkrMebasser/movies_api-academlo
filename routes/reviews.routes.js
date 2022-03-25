const express = require('express');

// Controllers
const {
    getAllReviews,
    getReviewById,
    createReview

  
} = require('../controllers/reviews.controller');

const router = express.Router();

router.get('/', getAllReviews);

router.get('/:id', getReviewById);

// router.patch('/:id', updateUser);

// router.delete('/:id', disableUserAccount)

router.post('/', createReview);

// router.post('/login', loginUser);

module.exports = { reviewsRouter: router };
