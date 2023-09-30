import { Router, Response, Request } from "express";
import path from 'path';
import { __dirname, filePass,appleJuiceDir } from "./generalRouter.js";

export const scriptRouter = Router();

scriptRouter.get('/:file', (req, res) => {
    var tmpPath = path.resolve(appleJuiceDir + '/src/script/' + req.params.file + '.js');
    filePass(tmpPath, req, res);
});