const router = require('express').Router();
const passport = require('passport');
const JWT = require('jsonwebtoken');
let EstateCategory = require('../models/estate.category.model');
let User = require('../models/user.model');

// get all items public
router.route('/public').get((req, res, next) => {
  EstateCategory.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) =>
      res.json({
        messagge: 'Error: ' + err,
        variant: 'error',
      })
    );
});
// get all items
router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      EstateCategory.find()
        .then((data) => {
          res.json(data);
        })
        .catch((err) =>
          res.json({
            messagge: 'Error: ' + err,
            variant: 'error',
          })
        );
    });
  });

// post new items
router
  .route('/add')
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      new EstateCategory(req.body)
        .save()
        .then(() =>
          res.json({
            variant: 'success',
          })
        )
        .catch((err) =>
          res.json({
            messagge: ' Error: ' + err,
            variant: 'error',
          })
        );
    });
  });

// fetch data by id
router
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      EstateCategory.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) =>
          res.status(400).json({
            messagge: 'Error: ' + err,
            variant: 'error',
          })
        );
    });
  });

// delete data by id
router
  .route('/:id')
  .delete(passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find({ username: req.user.username }).then((data) => {
      EstateCategory.findByIdAndDelete(req.params.id)
        .then((data) =>
          res.json({
            messagge: title + ' Deleted',
            variant: 'info',
          })
        )
        .catch((err) =>
          res.json({
            messagge: 'Error: ' + err,
            variant: 'error',
          })
        );
    });
  });

// update data by id
router
  .route('/:id')
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      EstateCategory.findByIdAndUpdate(req.params.id, req.body)
        .then(() =>
          res.json({
            messagge: title + ' Update',
            variant: 'success',
          })
        )
        .catch((err) =>
          res.json({
            messagge: 'Error: ' + err,
            variant: 'error',
          })
        );
    });
  });

module.exports = router;
