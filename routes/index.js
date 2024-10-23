const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

router.use(bodyParser.urlencoded({ extended: false }));

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

// GET new message form
router.get('/new', (req, res) => {
  res.render('form', { title: 'New Message' });
});

// POST new message
router.post('/new', (req, res) => {
  const { messageText, messageUser } = req.body;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect('/');
});

// Add this new route for individual message details
router.get('/message/:id', function(req, res, next) {
  const messageId = parseInt(req.params.id);
  const message = messages[messageId];
  if (message) {
    res.render('message', { title: 'Message Details', message: message, id: messageId });
  } else {
    res.status(404).send('Message not found');
  }
});

module.exports = router;
