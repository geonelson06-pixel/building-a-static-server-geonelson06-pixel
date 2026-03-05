const express = require('express');
const path = require('path');

const app = express();

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// the file path to the dist directory
const pathToFrontend = path.join(__dirname, '../frontend/dist');

// generate middleware using the file path
const serveStatic = express.static(pathToFrontend);

// Register the serveStatic middleware before the remaining controllers
app.use(serveStatic);

// Middleware function for logging route requests
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Passes the request to the next middleware/controller
};

// Register the logRoutes middleware globally to log all requests
app.use(logRoutes);

//////////////////////////////////////////
// Controllers
//////////////////////////////////////////

const serveData = (req, res, next) => res.send(gifs);

const serveHello = (req, res, next) => {
  const name = req.query.name || "stranger";
  res.send({ message: `hello ${name}` });
}

app.get('/api/hello', serveHello);
app.get('/api/data', serveData);