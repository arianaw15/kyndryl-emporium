require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')
const routes = require('./routes/apiRoutes')

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

app.use('/api', routes)


app.use(express.static('build'));
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

app.listen(port, () => console.log('Server started'));