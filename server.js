const mongoose = require("mongoose");

const PORT = process.env.PORT || 4455;

require("dotenv").config();

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

const app = require("./app");

app.on("pronto", () => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});
