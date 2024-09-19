const bcrypt = require('bcrypt');
const { connectToMongo } = require('../../config/db_utils');

async function find(email = null) {
  try {
    const collection = await connectToMongo('TrainJsMongoProject', 'users');
    if (email) {
      const result = await collection.find({ email: normalizedEmail }).toArray();
      return result;
    }

    return await collection.find({}).toArray();
  } catch (error) {
    console.error('Récupération users KO :', error);
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
    console.error('Inscription KO :', error);
    throw error;
  }
}

module.exports = {
  registerUser,
  find
};
