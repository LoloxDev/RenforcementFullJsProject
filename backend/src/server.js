console.log(process.env);

const cors = require('cors')
const express = require('express')
const app = express()
const port = 3000

const userRoutes = require('./Routes/userRoutes');

app.use(express.json());
app.use(cors())

app.use('/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erreur serveur!');
});

app.use((req, res, next) => {
  res.status(404).send("Page introuvable");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})