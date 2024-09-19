const bcrypt = require('bcrypt');
const { connectToMongo } = require('../../config/db_utils');

async function find(email = null) {
  try {
    const collection = await connectToMongo('TrainJsMongoProject', 'users');
    if (email) {
      const result = await collection.find({ email }).toArray();
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

async function deleteUser(email) {
  try {
    const collection = await connectToMongo('TrainJsMongoProject', 'users');
    const result = await collection.deleteOne({ email });

    if (result.deletedCount === 0) {
      throw new Error('Utilisateur non trouvé');
    }

    return result;
  } catch (error) {
    console.error('Suppression utilisateur KO :', error);
    throw error;
  }
}

async function updateUser(email, newData) {
  try {
    const collection = await connectToMongo('TrainJsMongoProject', 'users');
    
    if (newData.password) {
      newData.password = await bcrypt.hash(newData.password, 10);
    }

    const result = await collection.updateOne(
      { email },
      { $set: newData }
    );

    if (result.matchedCount === 0) {
      throw new Error('Utilisateur non trouvé');
    }

    return result;
  } catch (error) {
    console.error('Modification utilisateur KO :', error);
    throw error;
  }
}



module.exports = {
  registerUser,
  find,
  deleteUser,
  updateUser,
};
