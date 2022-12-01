import * as express from 'express';
export function getHealthz(req : express.Request, res : express.Response): void {
    res.send({status: "OK"});
}
