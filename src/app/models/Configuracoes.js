const mongoose = require("mongoose");

const configuracoesSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: String,
        required: true,
        unique: true,
    },

});

module.exports = mongoose.model("Configuracoes", configuracoesSchema, 'configuracoes');