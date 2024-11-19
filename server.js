// import { createServer } from "node:http";

// const server = createServer((request, response) => {
//   console.log("testando");

//   response.write("oiiii");
//   response.end();
// });

// server.listen(3033, () => {
//   console.log("servidor rodando na porta 3033");
// });

import { fastify } from "fastify";
import { DataBaseMemory } from "./database-memory.js";
import { DataBasePostgres } from "./database-postgres.js";

// const dataBase = new DataBaseMemory();
const dataBase = new DataBasePostgres();

const server = fastify();

server.get("/videos", (request, response) => {
  const search = request.query.search;
  const videos = dataBase.list(search);

  return videos;
});

server.post("/videos", async (request, response) => {
  const { title, description, duration } = request.body;

  await dataBase.create({
    title,
    description,
    duration,
  });

  return response.status(201).send();
});

server.put("/videos/:id", async (request, response) => {
  const { title, description, duration } = request.body;
  const videoId = request.params.id;
  await dataBase.update(videoId, { title, description, duration });

  response.status(204).send();
});

server.delete("/videos/:id", (request, response) => {
  const id = request.params.id;
  console.log(id);

  dataBase.delete(id);

  response.status(204).send();
});

server.listen({
  port: 3033,
});
