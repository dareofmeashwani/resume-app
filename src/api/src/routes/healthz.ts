import * as express from 'express';
import mongoose from "mongoose";
import { HTTP_STATUS } from '../utils/constants';
async function connectionIsUp(connection: any): Promise<boolean> {
    try {
        const adminUtil = connection.db.admin()
        const result = await adminUtil.ping()
        return !!result?.ok
    } catch (err) {
        return false
    }
}
export async function getHealthz(req: express.Request, res: express.Response): Promise<any> {
    const isDbOk = await connectionIsUp(mongoose.connection);
    if (!isDbOk) {
        res.status(HTTP_STATUS.SERVICE_UNAVAILABLE).send({ status: "NOT OK" })
    }
    res.send({ status: "OK" });
}
