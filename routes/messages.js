const express = require('express');
const router = express.Router();
const {ensureLoggedIn, ensureCorrectUser} = require("../middleware/auth");

const messages = [
  {
    id: 1,
    from_user: { username: 'user1', first_name: 'John', last_name: 'Doe', phone: '123-456-7890' },
    to_user: { username: 'user2', first_name: 'Alice', last_name: 'Johnson', phone: '987-654-3210' },
    body: 'Hello, Alice!',
    sent_at: new Date(),
    read_at: null,
  },
];

// GET /messages/:id - get detail of message
router.get('/:id', (req, res) => {
  const messageId = parseInt(req.params.id);

  const message = messages.find((msg) => msg.id === messageId);

  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }

  const currentUser = { username: 'user1' }; 

  if (message.from_user.username !== currentUser.username && message.to_user.username !== currentUser.username) {
    return res.status(403).json({ error: 'You do not have permission to access this message' });
  }

  res.json({ message });
});

// POST /messages - post message
router.post('/', (req, res) => {
  const { to_username, body } = req.body;

  const recipientExists = true; // Replace with actual user validation logic

  if (!recipientExists) {
    return res.status(400).json({ error: 'Recipient does not exist' });
  }

  // Create a new message
  const newMessage = {
    id: messages.length + 1, 
    from_user: { username: 'user1' }, 
    to_user: { username: to_username },
    body,
    sent_at: new Date(),
  };

  messages.push(newMessage);

  res.json({ message: newMessage });
});

module.exports = router;
