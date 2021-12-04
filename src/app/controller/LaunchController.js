const { response } = require("express");
const axios = require("axios");

const Launch = require("../models/Launch");
const getNextSequenceValue = require("../services/getNextSequenceValue");

module.exports = {
    async index(request, response) {

        let page = Number(request.params.page) === 1
            ? 0
            : (Number(request.params.page) - 1) * 10;

        try {
            const launch = await Launch.find().sort({ date: 1, counter: -1 }).skip(Number(page)).limit(10);
            return response.status(200).json({ launch });
        } catch (err) {
            response.status(500).json({ error: err.message });
        }
    },

    async store(request, response) {
        let array = [];
        let counter = 0;

        await axios.get(`https://ll.thespacedevs.com/2.0.0/launch/upcoming/?mode=detailed&format=json&limit=100`)
            // await axios.get(`https://spacelaunchnow.me/api/ll/2.2.0/launch/upcoming/?format=json`)
            .then((response) => {
                console.log("entrou no then");
                let results = response.data.results;

                results.map(result => {
                    console.log(`Map counter ${counter}`);
                    array.push({
                        _id: result.id,
                        counter: counter,
                        name: result.name,
                        date: result.net,
                        image: result.image,
                        company: result.launch_service_provider.name,
                        pad: result.pad.name,
                        rocketName: result.rocket.configuration.name,
                        missionName: ((result || {}).mission || {}).name,
                        description: ((result || {}).mission || {}).description,
                        missionType: ((result || {}).mission || {}).type,
                        locationName: result.pad.location.name

                    });
                    counter += 1;

                });

            });
        console.log("fim do map");
        array.reverse();
        await Launch.collection.drop();
        array.map(async (item) => {
            console.log("dentro map insercao");
            Launch.findOne({ _id: item._id }, async function (err, ret) {

                if (err) { console.log(err) }
                if (!ret) {

                    let seq = await getNextSequenceValue('launch');

                    launch = new Launch({
                        _id: item._id,
                        counter: Number(seq.sequence),
                        name: item.name,
                        date: item.date,
                        image: item.image,
                        company: item.company,
                        pad: item.pad,
                        rocketName: item.rocketName,
                        missionName: item.missionName,
                        description: item.description,
                        missionType: item.missionType,
                        locationName: item.locationName
                    });

                    try {
                        await launch.save();
                    } catch (err) {
                        response.status(400).json({ error: err.message });
                    }

                }
            });
        });


        return response.status(200).send(array);
    },
}