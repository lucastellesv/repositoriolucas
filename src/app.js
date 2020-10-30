const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repositorie = {id: uuid(), title, url, techs, like: 0};

  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, like } = request.body;

  const repositorieIndex = repositories.findIndex (repositorie => repositorie.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json({error: 'Respositorie was not found'});
  }

  const repositorie = {
    title,
    id,
    techs,
    url,
    like,
  }

repositories[repositorieIndex] = repositorie;

return response.json(repositorie);

});

app.delete("/repositories/:id", (request, response) => {
const { id } = request.params;

const repositorieIndex = repositories.findIndex (repositorie => repositorie.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json({error: 'Respositorie was not found'});
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).json({sucess:'The repositorie was been deleted'});
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repositorieIndex = repositories.findIndex (repositorie => repositorie.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json({error: 'Respositorie was not found'});
  }

  let like = repositories[repositorieIndex].like
  repositories[repositorieIndex].like = like+1 ;

  return response.status(200).json({sucess: 'The repositorie has been liked 👍'})

});

module.exports = app;
