const express = require('express');
const { registerUser, findAllUsers } = require('../Models/UserModel');
const router = express.Router();
const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { find } = require('../Models/UserModel');

exports.getUsers = async (req, res) => {
    try {
        const users = await find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Récupération des users KO' });
    }
}


const JWT_SECRET = 'poulet';

exports.login = async (req, res) => {
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

    const token = jwt.sign({ userId: user[0]._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Connexion OK' });
  } catch (error) {
    res.status(500).json({ message: 'Connexion KO' });
  }
};



exports.signup = async (req, res) => {
    const { email, password, role } = req.body;

  try {
    const result = await registerUser(email, password, role);
    res.status(201).json({ message: 'Inscription OK' });
  } catch (error) {
    res.status(500).json({ message: 'Inscription KO' });
  }
}

