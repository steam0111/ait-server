const express = require('express')
const router = express.Router()
const PID = require('../../models/pid')
const Admin = require('../../models/caregiver')
const pictogram = require('../../functions/pictograms')

router.get('/personalArea/:page', async function (req, res) {
  const perPage = 10 // сколько записей отображать
  const page = req.params.page || 1

  try {
    // Костылина - надо более умно сделать
    if (req.user.developer) {
      res.render('personalArea', {
        user: req.user,
      })
    }

    if (req.user.access_level) {
      if (req.user.access_level == 3) {
        let pictograms = pictogram.getLoginPictograms(req)
        let pids = await PID.find({ parent_ID: req.user._id })
          .skip(perPage * page - perPage)
          .limit(perPage)
          .exec()
        let count = await PID.find({ parent_ID: req.user._id })
          .countDocuments()
          .exec()

        res.render('personalArea', {
          students: pids,
          current: page,
          pages: Math.ceil(count / perPage),
          pictograms: pictograms,
          user: req.user,
        })
      } else if (req.user.access_level == 2) {
        let caregivers = await Admin.find({ parent_ID: req.user._id })
          .skip(perPage * page - perPage)
          .limit(perPage)
          .exec()
        let count = await Admin.find({ parent_ID: req.user._id })
          .countDocuments()
          .exec()

        res.render('personalArea', {
          coaches: caregivers,
          current: page,
          pages: Math.ceil(count / perPage),
          user: req.user,
        })
      } else if (req.user.access_level == 1) {
        // Получим список админов(НЕ ГЛАВНЫХ) и тренеров без parent_ID(родители) + исключим себя(у нас так же ведь нет parent_ID - чтобы не попасть под 2 условие)
        let admins = await Admin.find({
          $and: [
            { $or: [{ access_level: 2 }, { parent_ID: { $exists: false } }] },
            { _id: { $ne: req.user.id } },
          ],
        })
          .skip(perPage * page - perPage)
          .limit(perPage)
          .exec()
        let count = await Admin.find({
          $and: [
            { $or: [{ access_level: 2 }, { parent_ID: { $exists: false } }] },
            { _id: { $ne: req.user.id } },
          ],
        })
          .countDocuments()
          .exec()

        res.render('personalArea', {
          admins: admins,
          current: page,
          pages: Math.ceil(count / perPage),
          user: req.user,
        })
      }
    }
  } catch (err) {
    throw err
  }
})

module.exports = router
