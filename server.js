const mongoose = require("mongoose");

require("dotenv").config();
const PORT = process.env.PORT || 4455;

mongoose
    .connect(process.env.DATABASE, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("conectado à base de dados");
        app.emit("pronto");
    })
    .catch((e) => console.log(e));

require("./src/models/PostModel");
require("./src/models/UserModel");

const app = require("./app");

app.on("pronto", () => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});
