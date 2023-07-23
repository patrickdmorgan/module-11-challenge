const fs = require('fs')
const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('public'));

// GET http://localhost:5001/notes
app.get('/notes', (req, res) => {
    fs.readFile('./public/notes.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
})

// GET http://localhost:5001/api/notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', function(err, data) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(data);
        return res.end();
    });
})

// POST http://localhost:5001/api/notes
app.post('/api/notes', (req, res) => {
    var dbData = JSON.parse(fs.readFileSync('./db/db.json'));
    var newNote = req.body
    newNote.id = uuidv4()
    dbData.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(dbData));

    return res.json(newNote);
})

// DELETE http://localhost:5001/api/notes/:id
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    var dbData = JSON.parse(fs.readFileSync('./db/db.json'));
    dbData = dbData.filter(note => note.id !== id)
    fs.writeFileSync('./db/db.json', JSON.stringify(dbData))

    res.writeHead(200);
    return res.end();
})

// GET http://localhost:5001/*
app.get('*', (req, res) => {
    fs.readFile('./public/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`)
})