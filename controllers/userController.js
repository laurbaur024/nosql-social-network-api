const { User, Thought } = require('../models');


module.exports = {
  
  async getAllUsers(req,res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getUserById (req,res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .select('-__v');
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async createUser (req,res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  async updateUser (req,res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async deleteUser (req,res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });
      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }
      res.json({ message: 'User deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async addFriend (req,res) {
    
  },

  async deleteFriend (req,res) {
    
  },
}