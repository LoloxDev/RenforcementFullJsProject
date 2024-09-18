const bcrypt = require('bcrypt');
const { connectToMongo } = require('../../config/db_utils');

async function findAllUsers() {
  try {
    const collection = await connectToMongo('TrainJsMongoProject', 'users');
    return await collection.find({}).toArray();
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    throw error;
  }
}

async function registerUser(email, password, role) {
  try {
    const collection = await connectToMongo('TrainJsMongoProject', 'users');

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      throw new Error('Utilisateur déjà existant');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await collection.insertOne({
      email,
      password: hashedPassword,
      role,
    });

    return result;
  } catch (error) {
    console.error('Erreur lors de l’inscription :', error);
    throw error;
  }
}

module.exports = {
  findAllUsers,
  registerUser
};
