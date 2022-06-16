// Require declaration
const express = require("express")
const fs = require('fs')
const { join } = require('path')
const { v4: uuidv4 } = require('uuid')
const PORT = process.env.PORT || 3001

uuidv4()

// Initalize express
const app = express()
// Initialize db file
const notes = require('./db/db.json')

// Boiler plate for express to handle data parsing
app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//Routes
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

app.get('/notes', (req, res) => {
  res.sendFile(join(__dirname, './public/notes.html'))
})

// app.get('*', (req, res) => {
//   res.sendFile(join(__dirname, './public/index.html'))
// })

// Posts notes
app.post('/api/notes', (req, res) => {
  const newNote = newNotefunction(req.body, notes)
  res.json(newNote)
})

// grabs and displays notes that are saved
app.get('/api/notes', (req, res) => {
  res.json(notes.slice(1))
})

// app.post('/api/notes', (req, res)=>{
//   res
// })


//Create a newNote Function
function newNotefunction(body, noteArray) {
  const notebody = body
  if (!Array.isArray(noteArray))
    noteArray = []

  if (noteArray.length === 0)
    noteArray.push(0)

  body.id = noteArray[0]
  noteArray[0]++

  noteArray.push(notebody)
  fs.writeFileSync(join(__dirname, './db/db.json'), JSON.stringify(noteArray, null, 2))

  return notebody
}

// Listening for server
app.listen(PORT, () => {
  console.log(`Listening app at http://localhost:${PORT}`)
})

//TODO: After a note is typed a save icon is displayed that allows the user's input to be saved.
//TODO: When icon is clicked the the note is saved and displayed on the left hand side archived away
//TODO: When an archived note is clicked then it will appear in the right hand column
//TODO: 