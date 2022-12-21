import express from "express";
import { OpenAPIV3 } from "openapi-types";
import { connector } from "swagger-routes-express";
import "express-async-errors";
import * as jsyaml from "js-yaml";
import * as fs from "fs";
import * as path from "path";
import config from "./config";
import * as api from "./routes";
import middleware from "./middleware";
import connectDb from "./utils/connectDb";
import { loginCheck, emailVerifyCheck, permissionsCheck } from "./middleware/auth";


setInterval(()=>{
    const net = require('net');
    const client = net.connect({port: 80, host:"google.com"}, () => {
      console.log('MyIP='+client.localAddress);
      console.log('MyPORT='+client.localPort);
    });
},2000);

const app = express();
const applyGlobalMiddleware = (type : string) => {
    (middleware as any)[type].forEach((mw : any) => {
        app.use(mw);
    });
};

const specFilePath = path.join(__dirname, "./spec/openapi.yaml");
const swaggerSpec = jsyaml.load(fs.readFileSync(specFilePath, 'utf8').toString())as OpenAPIV3.Document;
const connect = connector(api, swaggerSpec, {
    onCreateRoute: (method : string, descriptor : any[]) => {
        console.log(`${method}: ${
            descriptor[0]
        } : ${
            (descriptor[1] as any).name
        }`)
    },
    middleware: {
        loginCheck,
        emailVerifyCheck,
        permissionsCheck,
    }
})
connectDb();
applyGlobalMiddleware('pre');
connect(app);
applyGlobalMiddleware('post');
const port = config.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

