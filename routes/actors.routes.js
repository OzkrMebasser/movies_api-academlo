const express = require('express');

// Controllers
const {
  getAllActors,
  getActorById,
  updateActor,
  deleteActor,
  createActor
} = require('../controllers/actors.controller');

const { upload } = require('../utils/multer');

const router = express.Router();

router.get('/', getAllActors);

router.get('/:id', getActorById);

router.patch('/:id', updateActor);

router.delete('/:id', deleteActor);

router.post('/', createActor);

module.exports = { actorsRouter: router };
