require("dotenv").config()
const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 6565;

app.use(express.json());
app.use(cors());

// http://localhost:6565/.......
// if(req >> http://localhost:6565/person/ ){require('./person.route')}
// if(req >> http://localhost:6565/product/ ){require('./product.route')}

// const Errors = {
//   401 : "You are not authorized",
//   404 : "Bad request"
// }

// app.all('*', async (req, res, next) => {
//   try {
//     next()
//   }
//   catch (err) {
//     res.status(err.code || 404).send(Errors[err.code || 404])
//   }
// })

app.use('/person', require('./person.route'))
app.use('/product', require('./product.route'))

app.listen(PORT, () => {
  console.log("server listen to " + PORT);
});
