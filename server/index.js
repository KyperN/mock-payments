const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3001;
const cors = require('cors');

const db = require('./db.js');

app.use(express.json());
app.listen(PORT, (err) => {
  if (err) {
    return err;
  }
  console.log('server running');
});

app.get('/user-data', (req, res) => {
  const user_name = req.query.user_name;
  // const userData = users.filter((elem) => elem.name === user_name);

  res.status(200).send(db.users);
});

app.post('/send-money', async (req, res) => {
  const { fromUserId, amount, toUser } = req.body;
  let userReceiving;
  const userSending = db.users.get(fromUserId);
  console.log('Sending: ', userSending);
  db.users.forEach((user) =>
    user.name === toUser ? (userReceiving = user) : null
  );
  console.log('Receiving: ', userReceiving);

  if (fromUserId === undefined || userReceiving === undefined) {
    return res.status(400).send('User error');
  }

  userSending.balance = parseInt(userSending.balance) - parseInt(amount);
  userReceiving.balance = parseInt(userReceiving.balance) + parseInt(amount);
  console.log(
    'AFTER CHANGES  !!!',
    'Balance sending: ',
    userSending.balance,
    'Balance receiving: ',
    userReceiving.balance
  );
  db.updateBalance(userSending.id, userSending);
  db.updateBalance(userReceiving.id, userReceiving);
  console.log('updated');
  res.status(200).send(userSending);
});

app.post('/create-user', async (req, res) => {
  let user;
  user = db.userObject(req.body.name, req.body.password, req.body.balance);

  if (db.getUserByName(user.name) === undefined) {
    return res.status(201).send(db.createUser(user));
  }
  return res.status(400).send('User already exists');
});

app.post('/login', async (req, res) => {
  const user = db.getUserByName(req.body.name);
  if (user === undefined) {
    console.log('no user');
    return res.status(400).send('No such user');
  }
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    console.log('Wrong pass');
    return res.status(400).send('Password incorrect');
  }
  try {
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
});
