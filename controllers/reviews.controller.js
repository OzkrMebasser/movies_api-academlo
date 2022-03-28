// Models
const { Review } = require('../models/review.model');
const { User } = require('../models/user.model');
const { Movie } = require('../models/movie.model');

//

// Utils
// const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
// const { async } = require('@firebase/util');
// const req = require('express/lib/request');

// Get all reviews
// export const getAllReviews
exports.getAllReviews = catchAsync(
  async (req, res, next) => {
    // SELECT * FROM reviews WHERE status = 'active'; -> reviews[]
    const reviews = await Review.findAll({
      where: { status: 'active' }
    });

    res.status(200).json({
      status: 'success',
      data: {
        reviews
      }
    });
  }
);

// Get post by id
exports.getReviewById = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    // SELECT * FROM posts WHERE id = 1;
    const review = await Review.findOne({
      where: { id, status: 'active' }
    });

    if (!review) {
      return next(
        new AppError(
          404,
          'No review found with the given ID'
        )
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        review
      }
    });
  }
);

// Save review to database
exports.createReview = catchAsync(
  async (req, res, next) => {
    // const {id}= req.currentUser;
    const { title, comment, rating, userId, movieId } =
      req.body;

    if (
      !title ||
      !comment ||
      !rating ||
      !userId ||
      !movieId
    ) {
      return next(
        new AppError(
          400,
          'Must provide a valid title, comment and userId'
        )
      );
    }

    // INSERT INTO posts (title, content, userId) VALUES ('A new post', 'Saved in db', 1)
    const newReview = await Review.create({
      title,
      comment,
      rating,
      userId,
      movieId
    });

    res.status(201).json({
      status: 'success',
      data: { newReview }
    });
  }
);

exports.updateReview = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const { title, comment, rating, userId, movieId } =
      req.body;

    if (
      !title ||
      !comment ||
      !rating ||
      !userId ||
      !movieId
    ) {
      return next(
        new AppError(
          400,
          'You must provide title, comment & rating'
        )
      );
    }

    const review = await Review.findOne({ where: { id } });

    if (!review) {
      return next(
        new AppError(404, 'No user review with this id')
      );
    }

    await review.update({
      title,
      comment,
      rating,
      userId,
      movieId
    });

    res.status(204).json({ status: 'success' });
  }
);

// // Delete post
// exports.deletePost = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const post = await Post.findOne({
//       where: { id: id, status: 'active' }
//     });

//     if (!post) {
//       res.status(404).json({
//         status: 'error',
//         message: 'Cant delete post, invalid ID'
//       });
//       return;
//     }

//     // DELETE FROM posts WHERE id = 1;
//     // await post.destroy();

//     // Soft delete
//     await post.update({ status: 'deleted' });

//     res.status(204).json({ status: 'success' });
//   } catch (error) {
//     console.log(error);
//   }
// };
