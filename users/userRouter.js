const express = require('express');
const Users = require('./userDb')
const router = express.Router();

router.post('/', (req, res) => {
  const newUser = req.body;
  newUser.name == "" ? res.status(400).json({message: "Please give your user a name"})
  :
  Users.insert(newUser)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    res.status(500).json({error: "Could not post new user"})
  });
});

router.post('/:id/posts', (req, res) => {
    const newUserPost = req.body;
    newUserPost.text == "" ? res.status(400).json({message: "Please add text to this post"})
    :
    Users.insert(newUserPost)
    .then(userPost => {
      res.status(201).json(userPost);
    })
    .catch(err => {
      res.status(500).json({error: "Could not create this post"})
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

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
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
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
