const { registerUser, find, deleteUser, updateUser } = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'poulet';

exports.getUsers = async (req, res, next) => {
    try {
        const users = await find();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await find(email);
    if (!user.length) {
      return res.status(401).json({ message: 'Email KO' });
    }

    const verifPassword = await bcrypt.compare(password, user[0].password);
    if (!verifPassword) {
      return res.status(401).json({ message: 'MDP KO' });
    }

    const token = jwt.sign(
      { userId: user[0]._id, email: user[0].email, role: user[0].role }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, message: 'Connexion OK' });
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    const result = await registerUser(email, password, role);
    res.status(201).json({ message: 'Inscription OK' });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { email } = req.params;

  try {
    await deleteUser(email);
    res.status(200).json({ message: 'Utilisateur supprimé OK' });
  } catch (error) {
    next(error);
  }
}

exports.updateUser = async (req, res, next) => {
  const { email } = req.params;
  const newData = req.body;

  try {
    await updateUser(email, newData);
    res.status(200).json({ message: 'Utilisateur mis à jour OK' });
  } catch (error) {
    next(error);
  }
}
