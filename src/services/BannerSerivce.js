const { Banner } = require("../configs/models");

const bannerService = {
    findAll: async () => {
        try {
            const banners = await Banner.findAll();
            const count = await Banner.count();
            return { count: count, rows: banners };
        } catch (err) {
            throw new Error();
        }
    },
    createBanner: async (banner) => {
        try {
            const newBanner = await Banner.create(banner);
            return newBanner;
        } catch (err) {
            throw new Error();
        }
    },
    deleteBanner: async (banner_id) => {
        try {
            const isDeleted = await Banner.destroy({
                where: {
                    banner_id: banner_id
                }
            });

            return isDeleted > 0;
        } catch (err) {
            throw new Error();
        }
    }
}

module.exports = bannerService;