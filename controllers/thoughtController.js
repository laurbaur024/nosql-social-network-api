const {  Thought, User } = require('../models');


module.exports = {

  
  async getAllThoughts (req,res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async getThoughtById (req,res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id })
        .select('-__v');
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async createThought (req,res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  async updateThought (req,res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async deleteThought (req,res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });
      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async addReaction (req,res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$push: {reactions: req.body}},
      {new:true, runValidators: true}
    )
    .then(thoughtData => {
      if (!thoughtData) {
        res.status(404).json({ message: 'No thought with that ID.'})
      }
      res.json({ message: 'Reaction added to thought.'})
    })
  },
  
  async deleteReaction (req,res) {
    Thought.findOneAndDelete(
      {_id: req.params.thoughtId},
      {$pull: {reactions: {reactionId: req.params.reactionId}}},
      {new:true, runValidators: true}
    )
    .then(thoughtData => {
      if (!thoughtData) {
        res.status(404).json({ message: 'No thought/reaction found with that ID.'})
      }
      res.json({ message: 'Reaction deleted!'})
    })
  },
}