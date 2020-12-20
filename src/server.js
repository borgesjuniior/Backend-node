const express = require ('express');
const app = express()




app.get('/projects', (req, res) => {
    res.json([
        'Projeto 1',
        'projeto 2'
    ]);
});

app.post('/projects', (req, res) => {
    res.json([
        'Projeto 1',
        'projeto 2',
        'projeto 3',
    ]);
});

app.put('/projects', (req, res) => {
    res.json([
        'Projeto 4',
        'projeto 2',
        'projeto 3',
    ]);
});

app.delete('/projects', (req, res) => {
    res.json([
        'Projeto 1',
        'projeto 2',
    ]);
});

app.listen(3333, () => {
    console.log('Server has started!')
})