const Applications = require('../../models/applications');
const Settings = require('../../models/settings');
const ObjectId = require('mongodb').ObjectId;
const objectAssignDeep = require('object-assign-deep');
const PID = require('../../models/pid');

// получение настроек
exports.getItem = (req, res) => {
	try {
		if (
			/^[0-9a-fA-F]{24}$/.test(req.params.application_id) &&
			/^[0-9a-fA-F]{24}$/.test(req.params.user_id)
		) {
			Applications.findOne(
				{ _id: new ObjectId(req.params.application_id) },
				(err, application) => {
					if (err) return res.status(400).json({ err });

					if (application === null) return res.status(200).json(null);

					PID.findOne(
						{ _id: ObjectId(req.params.user_id) },
						(err, pid) => {
							if (err) return res.status(400).json({ err });

							if (pid === null)
								return res.status(400).json({
									err:
										'There is no PID with requested parameters',
								});

							Settings.findOne(
								{
									user_id: req.params.user_id,
									application_id: req.params.application_id,
								},
								(err, settings) => {
									if (err)
										return res.status(400).json({ err });

									if (settings === null) {
										settings = {
											application_id:
												req.params.application_id,
											user_id: req.params.user_id,
											settings:
												application.defaultSettings,
										};

										Settings.create(settings);
									}

									return res.status(200).json({
										item: {
											application_id:
												settings.application_id,
											user_id: settings.user_id,
											settings: settings.settings,
											descriptionCode:
												application.descriptionCode,
											name: application.name,
										},
									});
								},
							);
						},
					);
				},
			);
		} else {
			return res.status(200).json(null);
		}
	} catch (err) {
		throw err;
	}
};

// редактирование настроек
exports.updateItem = (req, res) => {
	try {
		Settings.findOne(
			{
				user_id: req.params.user_id,
				application_id: req.params.application_id,
			},
			(err, result) => {
				if (err) return res.status(400).json({ err });

				if (result === null)
					return res
						.status(400)
						.json({
							err:
								'There is no element with requested parameters',
						});

				const newSettings = objectAssignDeep(
					result.settings,
					req.body.settings,
				);

				Settings.updateOne(
					{
						user_id: req.params.user_id,
						application_id: req.params.application_id,
					},
					{ $set: { settings: newSettings } },
					(err) => {
						if (err) return res.status(400).json({ err });

						return res.status(200).send();
					},
				);
			},
		);
	} catch (err) {
		throw err;
	}
};
