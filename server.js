const mongoose = require("mongoose");

const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT || 4455;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    console.log("running...");
});

// require('./src/models/Post');

// mongoose
//   .connect(process.env.DATABASE, {
//     useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('conectado à base de dados');
//     app.emit('pronto');
//   })
//   .catch((e) => console.log(e));

// app.on('pronto', () => {
//   app.listen(port, () => {
//     console.log(`http://localhost:${port}`);
//   });
// });
