const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require('../db/pool');

router.use(bodyParser.urlencoded({ extended: false }));

// GET home page
router.get('/', async function(req, res, next) {
  try {
    const result = await pool.query('SELECT * FROM messages');
    console.log(result.rows);
    const messages = result.rows.map(row => ({
      text: row.message,
      user: row.username,
      added: new Date() // Assuming you want to keep the current date format
    }));
    res.render('index', { title: 'Mini Messageboard', messages: messages });
  } catch (err) {
    next(err);
  }
});

// GET new message form
router.get('/new', (req, res) => {
  res.render('form', { title: 'New Message' });
});

// POST new message
router.post('/new', async (req, res) => {
  const { messageText, messageUser } = req.body;
  try {
    await pool.query('INSERT INTO messages (username, message) VALUES ($1, $2)', [messageUser, messageText]);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error saving message');
  }
});

// Add this new route for individual message details
router.get('/message/:id', async function(req, res, next) {
  const messageId = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM messages WHERE id = $1', [messageId]);
    const message = result.rows[0];
    if (message) {
      res.render('message', { title: 'Message Details', message: { text: message.message, user: message.username, added: new Date() }, id: messageId });
    } else {
      res.status(404).send('Message not found');
    }
  } catch (err) {
    next(err);
  }
});

console.log("Pool in routes/index.js:", pool);

module.exports = router;
