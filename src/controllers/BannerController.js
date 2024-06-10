const Message = require("../common/messages/ConstantMessage");
const JsonResponse = require("../common/reponses/JsonResponse");
const bannerService = require("../services/BannerSerivce");

const bannerController = {
    findAll: async (req, res) => {
        const banners = await bannerService.findAll();
        return res.status(200).send(JsonResponse(200, banners.count, banners.rows));
    },
    createBanner: async (req, res) => {
        const { banner_image } = req.body;
        if (!banner_image) {
            return res.status(400).send(JsonResponse(400, Message.FILED_EMPTY, null));
        }

        const banner = await bannerService.createBanner({ banner_image });

        if (!banner) {
            return res.status(400).send(JsonResponse(400, Message.CREATE_BANNER_FAIL, null));
        }
        return res.status(200).send(JsonResponse(200, Message.CREATE_BANNER_SUCCESS, true));
    },
    deleteBanner: async (req, res) => {
        const banner_id = req.params.id;

        const isDeleted = await bannerService.deleteBanner(banner_id);
        if(!isDeleted){
            return res.status(400).send(JsonResponse(400, Message.DELETE_BANNER_FAIL, null));
        }
        return res.status(200).send(JsonResponse(200, Message.DELETE_BANNER_SUCCESS, true));
    }
}

module.exports = bannerController;