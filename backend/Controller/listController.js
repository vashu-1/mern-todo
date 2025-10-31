import List from '../models/list.model.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

export const listCreate = async (req, res) => {
  try {
    const { title, body } = req.body;
    const { userId } = req.params;

    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: 'Title, description are required',
      });
    }

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const newList = await List.create({
      title,
      body,
      User: userId,
    });

    return res.status(201).json({
      success: true,
      message: 'List created successfully',
      list: newList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLists = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('User ID:', userId);

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const lists = await List.find({ User: userId })
      .sort({ createdAt: -1 })
      .populate('User', 'name email');

    console.log('Found lists:', lists.length);

    if (lists.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No lists found for this user',
        count: 0,
        lists: [],
      });
    }

    return res.status(200).json({
      success: true,
      count: lists.length,
      lists,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteList = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'List ID is required',
      });
    }

    const deletedList = await List.findByIdAndDelete(id);

    if (!deletedList) {
      return res.status(404).json({
        success: false,
        message: 'List not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'List deleted successfully',
      deletedList: {
        id: deletedList._id,
        title: deletedList.title,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const updatedList = await List.findByIdAndUpdate(
      id,
      {
        $set: { title, body },
      },
      {
        new: true,
      }
    );
    if (!updatedList) {
      return res.status(404).json({
        success: false,
        message: 'List not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'List updated successfully',
      list: updatedList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
