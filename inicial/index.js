const express = require("express");
const app = express();
const cors = require("cors");

// Definimos un middleware
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

// Preparamos express para que admita datos de entrada en JSON
app.use(express.json());
// Agregamos nuestro middleware
app.use(requestLogger);
// Admitimos todos los orígenes
// app.use(cors());

// Configurar CORS para admitir ciertos orígenes
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8081"], // Permitir el frontend en desarrollo de React y React Native
    credentials: true, // Permitir envío de cookies
  })
);

// Configuración para servidor web de ficheros estáticos en la carpeta public
app.use(express.static('public'));

let notes = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only JavaScript", important: false },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// Si se ha configurado Express como servidor web de ficheros estáticos, esta ruta no se alcanza
app.get("/", requestLogger, (request, response) => {
  response.send("<h1>Hola mundo cruel!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response
      .status(404)
      .json({ mensaje: "No existe la nota con id: " + id })
      .end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  // Si no llega el atributo content ==> BAD REQUEST
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false, // Si no llega important ==> valor false
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

// Caso de que la ruta recibida no se procese en ninguna de las rutas anteriores
// se da un error 404 por medio de este middleware 
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
