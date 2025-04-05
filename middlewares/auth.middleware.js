import {JWT_SECRET} from "../config/env.js";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import {logger} from "../utils/logger.util.js";


export const authorize = async (req, res, next) => {
    try {

        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) return res.status(401).send({message: "Unauthorized : No token provided"});

        const decoded = jwt.verify(token, JWT_SECRET);
        logger.info(`Decoded token: ${decoded}`);

        const user = await userModel.findById(decoded.userId);

        if (!user) return res.status(401).send({message: "Unauthorized"});

        req.user = user;

        next();

    } catch (error) {
        res.status(401).send({message: "Unauthorized", error: error.message});
    }
}