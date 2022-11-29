const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
		.select('-__v')
		.then((thoughts) => res.json(thoughts))
		.catch((err) => res.status(500).json(err));
    },

    // Get one thought by id
    getSingleThought({ params }, res) {
        Thought.findOne({ _id: req.params.thoughtId })
		.select('-__v')
		.then((thought) =>
		  !thought
			? res.status(404).json({ message: 'No thought found' })
			: res.json(thought)
		)
		.catch((err) => res.status(500).json(err));
    },


    //Create a new thought
    createThought({ body }, res) {
        Thought.create(req.body)
		.then((thought) => {
			 User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $addToSet: { thoughts: thought._id } },
				{ new: true }
			 )
			 }).then((user) => {
				!user
				? res.status(404).json({ message: 'No thought found' })
				: res.json(user);
		})
		.catch((err) => res.status(500).json(err));
    },

    //Update a new though by id
    updateThought({ body, params }, res) {
        Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		  )
			.then((thought) =>
			  !thought
				? res.status(404).json({ message: 'No thought found' })
				: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
    },

    //Delete a a thought by id
    deleteThought({ params }, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
		.then((thought) =>
		  !thought
			? res.status(404).json({ message: 'No Thought found' })
			: User.findOneAndUpdate(
				{ reactions: req.params.thoughtId },
				{ $pull: { reactions: req.params.thoughtId } },
				{ new: true }
			  )
		).catch((err) => {
		  console.log(err);
		  res.status(500).json(err);
		});
    },

    //Create a reaction and add to a thought
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: { reactions: req.body } },
			{ runValidators: true, new: true }
		  )
			.then((thought) =>
			  !thought
				? res
					.status(404)
					.json({ message: 'No thought found' })
				: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
    },

    //Remove a reaction by id
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reaction: { reactionId: req.params.reactionId } } },
			{ runValidators: true, new: true }
		  )
		  .then((thought) =>
		  !thought
			? res
				.status(404)
				.json({ message: 'No thought found' })
			: res.json(thought)
		)
		.catch((err) => res.status(500).json(err));
	},

};