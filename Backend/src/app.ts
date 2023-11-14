import express from "express";
import cors from "cors";
import dataController from "./6-controllers/vacation-controller";
import routeNotFound from "./4-middleware/route-not-found";
import catchAll from "./4-middleware/catch-all";
import appConfig from "./2-utils/app-config";
import expressFileUpload from "express-fileupload";
import authController from "./6-controllers/auth-controller";

const server = express();

server.use(cors());

// Set body into request.body
server.use(express.json());

// Set body into request.files
server.use(expressFileUpload());

server.use("/api", dataController);
server.use("/api", authController);

server.use(routeNotFound);

server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
