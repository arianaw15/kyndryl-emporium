require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 8080;
const mongoose = require('mongoose')
const routes = require('./routes/apiRoutes')
var cors = require('cors')
app.use(cors())

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

app.use('/api', routes)


if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost/kyndryl-emporium");

app.listen(port, () => console.log('Server started'));