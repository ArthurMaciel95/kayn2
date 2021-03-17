
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    photo:{type:String},
    cpf: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    membership: { type: String, trim: true },
    create_at:{type:Date, default:Date.now()},
    isBanned:{type:Boolean, default:false},
    role:{type:String, default:'admin'}
});

module.exports = mongoose.model("User", userSchema);
