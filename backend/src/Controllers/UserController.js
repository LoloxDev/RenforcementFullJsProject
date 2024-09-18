const express = require('express');
const { registerUser, findAllUsers } = require('../Models/UserModel');
const router = express.Router();


exports.getUsers = async (req, res) => {
    try {
        const users = await findAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
}


exports.signup = async (req, res) => {
    const { email, password, role } = req.body;

  try {
    const result = await registerUser(email, password, role);
    res.status(201).json({ message: 'Utilisateur créé avec succès', userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Erreur lors de l’inscription' });
  }
}

