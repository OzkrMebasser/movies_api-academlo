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

// Middlewares
const { validateSession , protectAdmin } = require('../middlewares/auth.middleware')

const {protectAccountOwner } = require('../middlewares/user.middleware')


const router = express.Router();


router.post('/', createNewUser);

router.post('/login', loginUser);

// Token validation 
router.use(validateSession)

// Only adminUser is allow to get all users
router.get('/', protectAdmin, getAllUsers);

router.get('/:id', getUserById);

router.patch('/:id', protectAccountOwner, updateUser);

router.delete('/:id',protectAccountOwner, disableUserAccount);



module.exports = { usersRouter: router };
