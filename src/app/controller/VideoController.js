const { response } = require("express");
const { v4: uuid } = require("uuid");

const Video = require("../models/Videos");

module.exports = {
    async index(request, response) {

        let page = Number(request.params.page) === 1
            ? 0
            : (Number(request.params.page) -1) * 10;

        try {
            const videos = await Video.find().sort('-order').skip(Number(page)).limit(10);
            return response.status(200).json({ videos });
        } catch (err) {
            response.status(500).json({ error: err.message });
        }
    },

    async store(request, response) {
        const { title, link } = request.body;

        if (!title || !link) {
            return response.status(400).json({ error: "Missing title or link" });
        }

        const video = new Video({
            _id: uuid(),
            title,
            link,
        });

        try {
            await video.save();

            return response.status(201).json({ message: "Video added succesfully!" })
        } catch (err) {
            response.status(400).json({ error: err.message });
        }
    },

    async autoStore(data) {
        const { title, link } = data;

        Video.findOne({ link: link }, async function (err, ret) {

            if (err) { console.log(err) }
            if (!ret) {
                if (!title || !link) {
                    return response.status(400).json({ error: "Missing title or link" });
                }

                let order = await Video.findOne()
                    .sort('-order')
                    .exec();
                order = order.order + 1;
                console.log(order);

                const video = new Video({
                    _id: uuid(),
                    title,
                    link,
                    order
                });

                try {
                    await video.save();
                } catch (err) {
                    response.status(400).json({ error: err.message });
                }
            } else {
                //
            }
        });

    },
}