// Require declaration
const express = require("express")
const fs = require('fs')
const { join } = require('path')
const PORT = 3001

// Initalize express
const app = express()
// Initialize db file
const notes = require('./Develop/db/db.json')

// Boiler plate for express to handle data parsing
app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Routes
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'notes.html'))
})
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'notes.html'))
})



// Listening for server
app.listen(PORT, () => {
  console.log(`Listening app at http://localhost:${PORT}`)
})