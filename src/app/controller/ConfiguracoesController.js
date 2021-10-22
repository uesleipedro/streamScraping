const { response } = require("express");

const Configuracoes = require("../models/Configuracoes");

module.exports = {

    async index(request, response) {

        try {
            const configuracoes = await Configuracoes.find({ "title": request.params.value }, { value: 1 });
            return response.status(200).json({ configuracoes });
        } catch (err) {
            response.status(500).json({ error: err.message });
        }
    },

}