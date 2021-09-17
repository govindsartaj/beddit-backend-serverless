const mongoUser = "root";
const mongoDbName = "beddit-db";
const mongoPass = "EI4ziJPi7zhJPc6J";

const uri = `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.rkrs6.mongodb.net/${mongoDbName}?retryWrites=true&w=majority`;

const mongoose = require("mongoose");
mongoose.connect(uri);
