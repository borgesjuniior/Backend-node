const { request } = require('express');
const express = require ('express');
const app = express()
const { uuid, isUuid } = require('uuidv4')


app.use(express.json())
app.use(logRequest); //Aplica o midleware em todas as rotas da aplicação 

/**
 * Métodos HTTP.
 * GET: Busca informações do backend
 * POST: Cria uma informação no backend
 * PUT/PATH: Altera uma informação no backend
 * DELETE: Deleta uma informação no backend
 */

/**
 * Tipos de parâmetros
 * Query params: Filtros e páginação
 * Route params: Indentificar os recursos (Alterar/deletar)
 * Request body: Conteúdo na hora de criar ou editar um recurso (JSON)
 */

/**
 * Midlewares. 
 * Interceptador de requisições que pode interceptar/interromper dados da requisição
 */

function logRequest(req, res, next) {
    const { method, url } = req;

    const logLabel = `[${method}]: ${url}`;
    console.log(logLabel)
    next()

}

function validateProjectId(req, res, next) {
    const { id } = req.params;

    if(!isUuid(id)) {
        return res.status(400).json({"Error": "Project id is not valid."})
    }

    return next()
}

const projects = []

app.get('/projects', (req, res) => res.json(projects)); 

app.post('/projects', (req, res) => {

    const { title, owner } = req.body;
    const project = {id: uuid(), title, owner}

    projects.push(project)

    return res.json(project)
});

app.put('/projects/:id', validateProjectId, (req, res) => { //O midleware pode ser passado de forma especifica para uma rota antes do req, res
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

    projects[projectIndex] = project; //Recria a informação dentro de projects 

    return res.json(project)

});

app.delete('/projects/:id', validateProjectId, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(project => project.id == id); //Busca a posição do Id no array

    if (projectIndex < 0) {
        return res.status(400).json({"error": "Projet not found"})
    }

    projects.splice(projectIndex, 1); //Deleta a informação no array

    res.status(204).send();

});

app.listen(3333, () => {
    console.log('Server has started!')
})