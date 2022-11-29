const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema(
	{
		userName: {
			type: String,
			required: true,
			unique: true,
			trimmed: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
                validator: function (email) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
                },
                message: props => `${props.value} is not a valid email!`
            }
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Thought',
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
         // prevents virtuals from creating duplicate of _id as `id`
         id: false
	}
);

userSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;