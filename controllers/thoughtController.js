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
    getSingleThought(req, res) {
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
    createThought({body}, res) {
        Thought.create(body)
		.then(({userName,_id}) => {
			return User.findOneAndUpdate(
				{ userName: userName  },
				{ $push: { thoughts: _id } },
				{ new: true }
			 )
			 })
			 .then((user) => {
				if (!user) {
                    res.status(404).json({ message: 'No user found at this id!' });
                    return;
                }
				res.json(user);
		})
		.catch((err) => res.status(500).json(err));
    },

    //Update a though by id
    updateThought(req, res) {
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
    deleteThought(req, res) {
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
    createReaction(req, res) {
        Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: { reactions: req.body } },
			{ runValidators: true, new: true }
		  )
			.then((thought) =>
			  !thought
				? res.status(404).json({ message: 'No thought found' })
				: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
    },

    //Remove a reaction by id
    deleteReaction({ params }, res) {
		Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'No thoughts found at this id!' });
                    return;
                }

                res.json(thought);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};
