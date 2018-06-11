const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Defines path to public dir using "path" package.
const publicPath = path.join(__dirname, './../public');
app.use(express.static(publicPath));



// app.get(`/`, (req, res) => {
//   res.sendFile(path.join(__dirname + './../public/index.html'));
// });



app.listen(port, ()=>{
  console.log(`Server running on ${port}`);
});

module.exports = {app};
