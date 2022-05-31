const bcrypt = require('bcrypt');

const users = new Map();

const userObject = (name, password, balance) => {
  if (name === undefined) {
    throw new Error('Name is undefined');
  }
  if (password === undefined) {
    throw new Error('Password is undefined');
  }
  if (balance === undefined) {
    throw new Error('Balance is undefined');
  }

  return { name: name, password: password, balance: balance, id: null };
};

const createUser = async (user) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  return saveUser(user);
};

const saveUser = (user) => {
  user.id = Math.random();
  users.set(user.id, user);

  return user;
};

const updateBalance = (id, user) => {
  users.set(id, user);
};

const getUserId = (id) => {
  return users.get(id);
};

const getUserByName = (name) => {
  for (let user of users.values()) {
    if (user.name === name) {
      return user;
    }
  }
  return undefined;
};

// saveUser(userObject('Kyper', '123', 200));
// saveUser(userObject('Sanya', '321', 201));

// checkCredentials('Kyper', '1223');

module.exports.users = users;
module.exports.saveUser = saveUser;
module.exports.getUserId = getUserId;
module.exports.userObject = userObject;
module.exports.createUser = createUser;
module.exports.getUserByName = getUserByName;
module.exports.updateBalance = updateBalance;
