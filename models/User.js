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
			validate: { // check if the email will have number from 0-9 or letters A-Z followed by @ followed by the domain with dot + the 3 to 7 character for the end of the email, like .com
				validator: function (email) {
					let regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
					regex.test(String(email).toLocaleLowerCase().trim());
				},
				message: (email) => `${email.value} Please enter a valid email address`,
			},
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