const path = require('path');
const cors=require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();
app.use(cors())

const userRoutes = require('./routes/user');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use(userRoutes)
app.use(errorController.get404);

sequelize
  //  .sync({ force: true })
  .sync()
  .then(result => {
    app.listen(3000)
    //console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
