const { Schema, Types, model  } = require('mongoose');


//This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
const reactionSchema = new Schema(
	{
		reactionBody: {
			type: String,
			required: true,
			max: 280
		},
		userName: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: {
			getters: true,
		},
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
	}
);

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
      },
      userName: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
    {
      toJSON: {
        virtuals: true,
      },
       // prevents virtuals from creating duplicate of _id as `id`
       id: false
    }
  );
  
  thoughtSchema.virtual('reactionsCount').get(function(){
      return this.reactions.length;
  })
  
  const Thought = model('thought', thoughtSchema);
  
  module.exports = Thought;