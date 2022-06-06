const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3001;

const db = require('./db.js');

app.use(express.json());
app.listen(PORT, (err) => {
  if (err) {
    return err;
  }
  console.log('server running');
});

app.post('/add-money', async (req, res) => {
  if (req.body === undefined) {
    res.status(400).send('Error');
  }
  try {
    const { amount, userId } = req.body;
    const receivingUser = db.users.get(userId);
    receivingUser.balance = parseInt(receivingUser.balance) + parseInt(amount);
    res.status(200).send(receivingUser);
  } catch (err) {
    return err;
  }
});

app.post('/send-money', async (req, res) => {
  const { fromUserId, amount, toUser } = req.body;
  let userReceiving;
  const userSending = db.users.get(fromUserId);

  db.users.forEach((user) =>
    user.name === toUser ? (userReceiving = user) : undefined
  );

  if (fromUserId === undefined || userReceiving === undefined) {
    return res.status(400).send('User error');
  }

  userSending.balance = parseInt(userSending.balance) - parseInt(amount);
  userReceiving.balance = parseInt(userReceiving.balance) + parseInt(amount);
  const sendingHistory = { to: userReceiving.name, amount: amount };
  const receivingHistory = { from: userSending.name, amount: amount };
  db.updateBalance(userSending.id, userSending);
  db.updateBalance(userReceiving.id, userReceiving);
  db.updateHistory(userSending.id, userSending, sendingHistory);
  db.updateHistory(userReceiving.id, userReceiving, receivingHistory);

  res.status(200).send(userSending);
});

app.post('/create-user', async (req, res) => {
  const user = db.userObject(
    req.body.name,
    req.body.password,
    req.body.balance
  );

  if (db.getUserByName(user.name) === undefined) {
    return res.status(201).send(db.createUser(user));
  }

  return res.status(400).send('User already exists');
});

app.post('/login', async (req, res) => {
  const user = db.getUserByName(req.body.name);
  if (user === undefined) {
    return res.status(400).send('No such user');
  }
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send('Password incorrect');
  }
  try {
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
});
