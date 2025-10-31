import express from 'express';
import {
  deleteList,
  getLists,
  listCreate,
  updateList,
} from '../Controller/listController.js';

const router = express.Router();

router.route('/create/:userId').post(listCreate);
router.route('/getlists/:userId').get(getLists);
router.route('/delete/:id').delete(deleteList);
router.route('/update/:id').put(updateList);

export default router;
