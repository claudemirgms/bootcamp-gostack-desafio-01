const express = require('express');
const server = express();

server.use(express.json());

const projects = [
  {
    "id": 1,
    "title": "Novo projeto",
    "tasks": [
      "Novo projeto"
    ]
  },
  {
    "id": 2,
    "title": "Novo projeto 2",
    "tasks": [
      "Novo projeto 2"
    ]
  },
  {
    "id": 3,
    "title": "Novo projeto 3",
    "tasks": [
      "Novo projeto 3"
    ]
  },
  {
    "id": 4,
    "title": "Novo projeto 4",
    "tasks": [
      "Novo projeto 4"
    ]
  }
];

let count = 0

function existsIdProjects(req, res, next){
  const index = projects.findIndex(project => project.id == req.params.id);
  if(index < 0){
    return res.json({"error": "id no data found"});
  }
  return next();
}

server.use('/', (req, res, next) =>{
  count += 1;
  console.log('Total count: ' + count);
  return next()
});

server.post('/projects', (req, res) =>{
  const {id, title, tasks} = req.body;
  
  projects.push({"id": id, "title": title, "tasks": tasks})
  
  res.send(projects);
});

server.put('/projects/:id', existsIdProjects, (req, res) =>{
  const {id} = req.params;
  const {title} = req.body;

  const index = projects.findIndex(project => project.id == id);
  
  projects[index].title = title;

  return res.json(projects);
});

server.get('/projects', (req, res) =>{
  return res.json(projects);
});

server.get('/projects/:id', existsIdProjects, (req, res) =>{
  const {id} = req.params;

  return res.json(projects.find(project => project.id == id));
});

server.delete('/projects/:id', existsIdProjects, (req, res) =>{
  const {id} = req.params;

  const index = projects.findIndex(project => project.id == id);

  projects.splice(index, 1);
  
  return res.json(projects)
});

server.post('/projects/:id/tasks', existsIdProjects, (req, res) =>{
  const {id} = req.params;
  const {title} = req.body;

  const index = projects.findIndex(project => project.id == id);

  projects[index].tasks.push(title);

  return res.json(projects);

});

server.listen(3000)