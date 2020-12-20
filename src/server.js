const express = require ('express');
const app = express()
const { uuid } = require('uuidv4')


app.use(express.json())



const projects = []

app.get('/projects', (req, res) => res.json(projects));

app.post('/projects', (req, res) => {

    const { title, owner } = req.body;
    const project = {id: uuid(), title, owner}

    projects.push(project)

    return res.json(project)
});

app.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title, owner} = req.body;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0) {
        return res.status(400).json({"error": "Projet not found"})
    }

    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex] = project;

    return res.json(project)

});

app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0) {
        return res.status(400).json({"error": "Projet not found"})
    }

    projects.splice(projectIndex, 1);

    res.status(204).send();

});

app.listen(3333, () => {
    console.log('Server has started!')
})