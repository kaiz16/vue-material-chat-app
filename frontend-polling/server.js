// 
const express = require('express');
// server static library
// this will serve index.html
const serveStatic = require("serve-static")
// 
const path = require('path');

// init express
const app = express();

// get the folder path
const folderPath = path.join(__dirname, 'dist')

// index.html
const rootFile = serveStatic(folderPath)

app.use(rootFile);

const port = process.env.PORT || 8080;
app.listen(port);