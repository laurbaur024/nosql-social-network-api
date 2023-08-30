const {Schema, model, Types, ObjectId} = require('mongoose');

const reactionSchema = new Schema (
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
)

reactionSchema.virtual('createdTime').get(function () {
  return this.createdAt.toDateString()
});

const Reaction = model('Reaction', reactionSchema)

module.exports = {Reaction, reactionSchema}