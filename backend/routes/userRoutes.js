import express from 'express';
import {
  Login,
  Logout,
  register,
  updateProfile,
} from '../Controller/authController.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(Login);
router.route('/logout').post(Logout);
router.route('/update/:id').post(updateProfile);

export default router;
