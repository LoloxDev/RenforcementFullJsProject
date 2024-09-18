const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectToMongo(dbName, collectionName) {
  try {
    await client.connect();
    console.log('Connecté à MongoDB');
    return client.db(dbName).collection(collectionName);
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error);
    throw error;
  }
}

module.exports = {
  connectToMongo
};
