const validationResult = require('express-validator').validationResult;
const ObjectId = require('mongodb').ObjectId;
const Applications = require('../../models/applications');
const Settings = require('../../models/settings');

exports.getItems = async (req, res) => {
	try {
		const currentPage = req.query.currentPage || 1;
		const itemsPerPage = req.query.itemsPerPage || 7;

		const skips = itemsPerPage * (currentPage - 1);

		const count = await Applications.count();

		let totalPages = Math.ceil(count / itemsPerPage);

		Applications.find()
			.skip(skips)
			.limit(itemsPerPage)
			.exec((err, result) => {
				if (err) return res.status(400).json({ error: err.message });

				return res.status(200).json({
					items: result,
					currentPage,
					totalPages,
				});
			});
	} catch (err) {
		throw err;
	}
};

exports.getItem = (req, res) => {
	try {
		if (/^[0-9a-fA-F]{24}$/.test(req.params._id)) {
			Applications.findOne(
				{ _id: new ObjectId(req.params._id) },
				(err, result) => {
					if (err) return res.status(400).json({ err });

					return res.status(200).json({
						item: result,
					});
				},
			);
		} else {
			return res.status(200).json(null);
		}
	} catch (err) {
		throw err;
	}
};

exports.updateItem = (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				error: {
					msg: 'Invalid form data',
					errors: errors.array(),
				},
			});
		}

		Applications.find({
			_id: { $nin: [new ObjectId(req.params._id)] },
			name: req.body.name,
		}).exec((err, result) => {
			if (err) return res.status(400).json({ err });

			if (result.length > 0) {
				return res.status(400).json({
					error: {
						msg: 'Name must be unique',
						errors: [
							{
								param: 'name',
							},
						],
					},
				});
			}

			Applications.findOneAndUpdate(
				{ _id: new ObjectId(req.params._id) },
				{ $set: { ...req.body } },
				{
					new: true,
				},
				(err, result) => {
					if (err) return res.status(400).json({ err });

					Settings.deleteMany(
						{
							application_id: req.params._id,
						},
						(err) => {
							if (err) return res.status(400).json({ err });

							return res.status(200).json({
								item: result,
							});
						},
					);
				},
			);
		});
	} catch (err) {
		throw err;
	}
};

// добавление приложения:
// – добавление описания
// – добавление названия
exports.addItem = (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				error: {
					msg: 'Invalid form data',
					errors: errors.array(),
				},
			});
		}

		Applications.find({ name: req.body.name }).exec((err, result) => {
			if (err) return res.status(400).json({ err });

			if (result.length > 0) {
				return res.status(400).json({
					error: {
						msg: 'Name must be unique',
						errors: [
							{
								param: 'name',
							},
						],
					},
				});
			}

			Applications.create({ ...req.body }, (err, result) => {
				if (err) return res.status(400).json({ err });

				return res.status(200).json({
					_id: result._id,
				});
			});
		});
	} catch (err) {
		throw err;
	}
};

// удаление приложения из системы
exports.deleteItem = (req, res) => {
	try {
		if (/^[0-9a-fA-F]{24}$/.test(req.params._id)) {
			Applications.deleteOne(
				{ _id: new ObjectId(req.params._id) },
				(err) => {
					if (err) return res.status(400).json({ err });

					this.getItems(req, res);
				},
			);
		} else {
			return res.status(400).json({
				error: {
					msg: 'There is no application with requested id',
				},
			});
		}
	} catch (err) {
		throw err;
	}
};
