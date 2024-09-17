const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";

async function connectToMongo(dbName, collectionName) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connecté à MongoDB");
    return client.db(dbName).collection(collectionName);
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    throw error;
  }
}

async function findAllUsers(collection) {
  return collection.find({}).toArray();
}

async function main(req, res) {
  try {
    const collection = await connectToMongo('TrainJsMongoProject', 'users');
    const users = await findAllUsers(collection);
    res.json(users);
  } catch (error) {
    console.error("Une erreur est survenue :", error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
}

module.exports = {
  main
};
