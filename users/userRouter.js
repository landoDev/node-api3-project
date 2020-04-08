const express = require('express');
const Users = require('./userDb')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  res.status(201).json(req.body);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    res.status(500).json({error: "Could not post new user"})
  });
});

router.get('/', (req, res) => {
  Users.get()
  .then(users =>{
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).status.json({message: "Couldn't grab users"});
  })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;
    Users.getById(id)
    .then(user => {
      if(user){
        req.user = user;
        next();
      } else {
        res.status(400).json({message: "invalid user id"})
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Could not get user'})
    });
}

function validateUser(req, res, next) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
     return res.status(400).json({ message: "missing user data" })
   } else {
    if (!req.body.name) {
     return res.status(400).json({ message: "missing required name field" })
   }
   next();
   }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
