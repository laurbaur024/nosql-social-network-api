const {Schema, model, Types} = require('mongoose');

const userSchema = new Schema (
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'A username is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'An email is required'],
      unique: true,
      match: /.+\@.+\..+/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length
});

const User = model('User', userSchema)
module.exports = User