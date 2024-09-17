console.log(process.env);

const express = require('express')
const app = express()
const port = 3000

const userRoutes = require('./Routes/userRoutes');

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', userRoutes);

app.use((req, res, next) => {
  res.status(404).send("Page introuvable");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})