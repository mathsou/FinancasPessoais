const jwt = require('./jwt');
const { promisify } = require("util");

module.exports = 
    async (request, response, next) => {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response.status(401).send({ error: "No token provided" });
        }

        const [scheme, token] = authHeader.split(" ");
        console.log('teste')
        const decoded = await jwt.verify(token);

        console.log(decoded);
        try {
            const decoded = await jwt.verify(token);

            //request.idUser = decoded.idUser;
            return next();
        } catch (err) {
            return response.status(401).send({ error: "Token invalid" });
    }
};