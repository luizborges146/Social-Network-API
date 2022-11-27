const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      userName: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      toJSON: {
        virtuals: true,
      },
    }
  );
  
  thoughtSchema.virtual('reactionsCount').get(function(){
      return this.reactions.length;
  })
  
  const Thought = model('thought', thoughtSchema);
  
  module.exports = Thought;