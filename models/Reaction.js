const { Schema, Types } = require('mongoose');

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
			default: Date.now,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;