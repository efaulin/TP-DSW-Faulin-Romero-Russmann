import { Router, Response, Request } from "express";
import path from 'path';
import { __dirname, filePass } from "./generalRouter.js";

export const entityRouter = Router();

entityRouter.get('/:file', (req, res) => {
    var tmpPath = path.resolve(__dirname + '/entity/' + req.params.file + '.js');
    filePass(tmpPath, req, res);
});