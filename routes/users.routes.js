const express = require('express');

// Controllers
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  disableUserAccount,
  loginUser
  
} = require('../controllers/users.controller');

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.patch('/:id', updateUser);

router.delete('/:id', disableUserAccount)

router.post('/', createNewUser);

router.post('/login', loginUser);

module.exports = { usersRouter: router };


