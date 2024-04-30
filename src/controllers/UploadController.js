const Message = require("../common/messages/ConstantMessage");
const JsonReponse = require("../common/reponses/JsonResponse");

const uploads = {
    uploadImage: async (req, res) => {
        try{
            if(!req.file) {
                return res.status(400).send(JsonReponse(400, Message.NOT_FOUND_FILE, null));
            }
            return res.status(200).send(JsonReponse(200, Message.UPLOAD_SUCCESS, { "url": req.file.path }));
        }catch(err){
            throw new Error();
        }
    }
}

module.exports = uploads;