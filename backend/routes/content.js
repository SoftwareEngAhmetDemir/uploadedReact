const router = require('express').Router();
const passport = require('passport');
const JWT = require('jsonwebtoken');
let Nedir = require('../models/contents/nedir.model');
let BizKimiz = require('../models/contents/bizkimiz.model');
let Nasil = require('../models/contents/nasil.model');
let Iletisim = require('../models/contents/iletisim.model');
let IletisimBilgi = require('../models/contents/iletisim.bilgiler.model');
let User = require('../models/user.model');

//Nedir
const title = 'Content';
const roleTitle = 'content';

// Nedir

// get all items Nedir public
router.route('/nedir/public').get((req, res, next) => {
  Nedir.find()
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
// get all items Nedir
router
  .route('/nedir')
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'list']) {
        Nedir.find()
          .then((data) => {
            res.json(data);
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        Nedir.find({ 'created_user.id': `${req.user._id}` })

          .then((data) => {
            res.json(data);
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// post new items Nedir
router
  .route('/nedir/add')
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'create']) {
        new Nedir(req.body)
          .save()

          .then(() =>
            res.json({
              messagge: title + ' Added',
              variant: 'success',
            })
          )
          .catch((err) =>
            res.json({
              messagge: ' Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// fetch data by id Nedir
router
  .route('/nedir/:id')
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'list']) {
        Nedir.findById(req.params.id)
          .then((data) => res.json(data))
          .catch((err) =>
            res.status(400).json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        Nedir.findOne({
          _id: req.params.id,
          'created_user.id': `${req.user._id}`,
        })
          .then((data) => {
            if (data) {
              res.json(data);
            } else {
              res.status(403).json({
                message: {
                  messagge: 'You are not authorized, go away!',
                  variant: 'error',
                },
              });
            }
          })
          .catch((err) =>
            res.status(400).json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// delete data by id Nedir
router
  .route('/nedir/:id')
  .delete(passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'delete']) {
        Nedir.findByIdAndDelete(req.params.id)
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
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        Nedir.deleteOne({
          _id: req.params.id,
          'created_user.id': `${req.user._id}`,
        })
          .then((resdata) => {
            if (resdata.deletedCount > 0) {
              res.json({
                messagge: title + ' delete',
                variant: 'success',
              });
            } else {
              res.status(403).json({
                message: {
                  messagge: 'You are not authorized, go away!',
                  variant: 'error',
                },
              });
            }
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// update data by id Nedir
router
  .route('/nedir/:id')
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'edit']) {
        Nedir.findByIdAndUpdate(req.params.id, req.body)
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
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        Nedir.findOneAndUpdate(
          {
            _id: req.params.id,
            'created_user.id': `${req.user._id}`,
          },
          req.body
        )
          .then((resdata) => {
            if (resdata) {
              res.json({
                messagge: title + ' Update',
                variant: 'success',
              });
            } else {
              res.json({
                messagge: ' You are not authorized, go away!',
                variant: 'error',
              });
            }
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

//Nasıl

// get all items Nasıl public
router.route('/nasil/public').get((req, res, next) => {
  Nasil.find()
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

// get all items Nasil
router
  .route('/nasil')
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'list']) {
        Nasil.find()
          .then((data) => {
            res.json(data);
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        Nasil.find({ 'created_user.id': `${req.user._id}` })

          .then((data) => {
            res.json(data);
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// post new items Nasil
router
  .route('/nasil/add')
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'create']) {
        new Nasil(req.body)
          .save()

          .then(() =>
            res.json({
              messagge: title + ' Added',
              variant: 'success',
            })
          )
          .catch((err) =>
            res.json({
              messagge: ' Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// fetch data by id Nasil
router
  .route('/nasil/:id')
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'list']) {
        Nasil.findById(req.params.id)
          .then((data) => res.json(data))
          .catch((err) =>
            res.status(400).json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        Nasil.findOne({
          _id: req.params.id,
          'created_user.id': `${req.user._id}`,
        })
          .then((data) => {
            if (data) {
              res.json(data);
            } else {
              res.status(403).json({
                message: {
                  messagge: 'You are not authorized, go away!',
                  variant: 'error',
                },
              });
            }
          })
          .catch((err) =>
            res.status(400).json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// delete data by id Nasil
router
  .route('/nasil/:id')
  .delete(passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'delete']) {
        Nasil.findByIdAndDelete(req.params.id)
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
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        Nasil.deleteOne({
          _id: req.params.id,
          'created_user.id': `${req.user._id}`,
        })
          .then((resdata) => {
            if (resdata.deletedCount > 0) {
              res.json({
                messagge: title + ' delete',
                variant: 'success',
              });
            } else {
              res.status(403).json({
                message: {
                  messagge: 'You are not authorized, go away!',
                  variant: 'error',
                },
              });
            }
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// update data by id Nasil
router
  .route('/nasil/:id')
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'edit']) {
        Nasil.findByIdAndUpdate(req.params.id, req.body)
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
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        Nasil.findOneAndUpdate(
          {
            _id: req.params.id,
            'created_user.id': `${req.user._id}`,
          },
          req.body
        )
          .then((resdata) => {
            if (resdata) {
              res.json({
                messagge: title + ' Update',
                variant: 'success',
              });
            } else {
              res.json({
                messagge: ' You are not authorized, go away!',
                variant: 'error',
              });
            }
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// Iletisim

// get all items Iletisim public
router.route('/iletisim/public').get((req, res, next) => {
  Iletisim.find()
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

// get all items Iletisim
router
  .route('/iletisim')
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'list']) {
        Iletisim.find()
          .then((data) => {
            res.json(data);
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        Iletisim.find({ 'created_user.id': `${req.user._id}` })

          .then((data) => {
            res.json(data);
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// post new items Iletisim
router
  .route('/iletisim/add')
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'create']) {
        new Iletisim(req.body)
          .save()

          .then(() =>
            res.json({
              messagge: title + ' Added',
              variant: 'success',
            })
          )
          .catch((err) =>
            res.json({
              messagge: ' Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// fetch data by id Iletisim
router
  .route('/iletisim/:id')
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'list']) {
        Iletisim.findById(req.params.id)
          .then((data) => res.json(data))
          .catch((err) =>
            res.status(400).json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        Iletisim.findOne({
          _id: req.params.id,
          'created_user.id': `${req.user._id}`,
        })
          .then((data) => {
            if (data) {
              res.json(data);
            } else {
              res.status(403).json({
                message: {
                  messagge: 'You are not authorized, go away!',
                  variant: 'error',
                },
              });
            }
          })
          .catch((err) =>
            res.status(400).json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// delete data by id Iletisim
router
  .route('/iletisim/:id')
  .delete(passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'delete']) {
        Iletisim.findByIdAndDelete(req.params.id)
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
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        Iletisim.deleteOne({
          _id: req.params.id,
          'created_user.id': `${req.user._id}`,
        })
          .then((resdata) => {
            if (resdata.deletedCount > 0) {
              res.json({
                messagge: title + ' delete',
                variant: 'success',
              });
            } else {
              res.status(403).json({
                message: {
                  messagge: 'You are not authorized, go away!',
                  variant: 'error',
                },
              });
            }
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// update data by id Iletisim
router
  .route('/iletisim/:id')
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'edit']) {
        Iletisim.findByIdAndUpdate(req.params.id, req.body)
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
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        Iletisim.findOneAndUpdate(
          {
            _id: req.params.id,
            'created_user.id': `${req.user._id}`,
          },
          req.body
        )
          .then((resdata) => {
            if (resdata) {
              res.json({
                messagge: title + ' Update',
                variant: 'success',
              });
            } else {
              res.json({
                messagge: ' You are not authorized, go away!',
                variant: 'error',
              });
            }
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// BizKimiz

// get all items BizKimiz public
router.route('/bizkimiz/public').get((req, res, next) => {
  BizKimiz.find()
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
// get all items BizKimiz
router
  .route('/bizkimiz')
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'list']) {
        BizKimiz.find()
          .then((data) => {
            res.json(data);
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        BizKimiz.find({ 'created_user.id': `${req.user._id}` })

          .then((data) => {
            res.json(data);
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// post new items BizKimiz
router
  .route('/bizkimiz/add')
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'create']) {
        new BizKimiz(req.body)
          .save()

          .then(() =>
            res.json({
              messagge: title + ' Added',
              variant: 'success',
            })
          )
          .catch((err) =>
            res.json({
              messagge: ' Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// fetch data by id BizKimiz
router
  .route('/bizkimiz/:id')
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'list']) {
        BizKimiz.findById(req.params.id)
          .then((data) => res.json(data))
          .catch((err) =>
            res.status(400).json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        BizKimiz.findOne({
          _id: req.params.id,
          'created_user.id': `${req.user._id}`,
        })
          .then((data) => {
            if (data) {
              res.json(data);
            } else {
              res.status(403).json({
                message: {
                  messagge: 'You are not authorized, go away!',
                  variant: 'error',
                },
              });
            }
          })
          .catch((err) =>
            res.status(400).json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// delete data by id BizKimiz
router
  .route('/bizkimiz/:id')
  .delete(passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'delete']) {
        BizKimiz.findByIdAndDelete(req.params.id)
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
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        BizKimiz.deleteOne({
          _id: req.params.id,
          'created_user.id': `${req.user._id}`,
        })
          .then((resdata) => {
            if (resdata.deletedCount > 0) {
              res.json({
                messagge: title + ' delete',
                variant: 'success',
              });
            } else {
              res.status(403).json({
                message: {
                  messagge: 'You are not authorized, go away!',
                  variant: 'error',
                },
              });
            }
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// update data by id BizKimiz
router
  .route('/bizkimiz/:id')
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'edit']) {
        BizKimiz.findByIdAndUpdate(req.params.id, req.body)
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
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        BizKimiz.findOneAndUpdate(
          {
            _id: req.params.id,
            'created_user.id': `${req.user._id}`,
          },
          req.body
        )
          .then((resdata) => {
            if (resdata) {
              res.json({
                messagge: title + ' Update',
                variant: 'success',
              });
            } else {
              res.json({
                messagge: ' You are not authorized, go away!',
                variant: 'error',
              });
            }
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// IletisimBilgi

// get all items IletisimBilgi public
router.route('/iletisim-bilgileri/public').get((req, res, next) => {
  IletisimBilgi.find()
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

// get all items IletisimBilgi
router
  .route('/iletisim-bilgileri')
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'list']) {
        IletisimBilgi.find()
          .then((data) => {
            res.json(data);
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        IletisimBilgi.find({ 'created_user.id': `${req.user._id}` })

          .then((data) => {
            res.json(data);
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// post new items IletisimBilgi
router
  .route('/iletisim-bilgileri/add')
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'create']) {
        new IletisimBilgi(req.body)
          .save()

          .then(() =>
            res.json({
              messagge: title + ' Added',
              variant: 'success',
            })
          )
          .catch((err) =>
            res.json({
              messagge: ' Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// fetch data by id IletisimBilgi
router
  .route('/iletisim-bilgileri/:id')
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'list']) {
        IletisimBilgi.findById(req.params.id)
          .then((data) => res.json(data))
          .catch((err) =>
            res.status(400).json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        IletisimBilgi.findOne({
          _id: req.params.id,
          'created_user.id': `${req.user._id}`,
        })
          .then((data) => {
            if (data) {
              res.json(data);
            } else {
              res.status(403).json({
                message: {
                  messagge: 'You are not authorized, go away!',
                  variant: 'error',
                },
              });
            }
          })
          .catch((err) =>
            res.status(400).json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// delete data by id IletisimBilgi
router
  .route('/iletisim-bilgileri/:id')
  .delete(passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'delete']) {
        IletisimBilgi.findByIdAndDelete(req.params.id)
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
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        IletisimBilgi.deleteOne({
          _id: req.params.id,
          'created_user.id': `${req.user._id}`,
        })
          .then((resdata) => {
            if (resdata.deletedCount > 0) {
              res.json({
                messagge: title + ' delete',
                variant: 'success',
              });
            } else {
              res.status(403).json({
                message: {
                  messagge: 'You are not authorized, go away!',
                  variant: 'error',
                },
              });
            }
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

// update data by id IletisimBilgi
router
  .route('/iletisim-bilgileri/:id')
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + 'edit']) {
        IletisimBilgi.findByIdAndUpdate(req.params.id, req.body)
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
      } else if (rolesControl[roleTitle + 'onlyyou']) {
        IletisimBilgi.findOneAndUpdate(
          {
            _id: req.params.id,
            'created_user.id': `${req.user._id}`,
          },
          req.body
        )
          .then((resdata) => {
            if (resdata) {
              res.json({
                messagge: title + ' Update',
                variant: 'success',
              });
            } else {
              res.json({
                messagge: ' You are not authorized, go away!',
                variant: 'error',
              });
            }
          })
          .catch((err) =>
            res.json({
              messagge: 'Error: ' + err,
              variant: 'error',
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: 'You are not authorized, go away!',
            variant: 'error',
          },
        });
      }
    });
  });

module.exports = router;
