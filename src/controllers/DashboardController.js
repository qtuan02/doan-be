const JsonResponse = require("../common/reponses/JsonResponse");
const dashboardService = require("../services/DashboardService");

const dashboardController = {
    count: async (req, res) => {
        const dashboard = await dashboardService.count();
        return res.status(200).send(JsonResponse(200, "", dashboard)); 
    }
}

module.exports = dashboardController;