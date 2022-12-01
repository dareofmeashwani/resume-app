import * as express from 'express'
import {HTTP_STATUS, MESSAGES, ROLES} from "../utils/constants";
import {User} from '../models/userModel';
import {SESSION_ID} from '../utils/constants';
import {ResumeError, throwResumeError} from '../utils/resumeError';
import {checkAuth, filterProps} from '../utils/helpers';

export async function getListUser(req : express.Request, res : express.Response, next : Function) {
    try { /*const options = {
            page: req.body.page,
            limit,
            sort:{_id:'asc'}
        }*/
        checkAuth(req, res, [ROLES.ADMIN]);
        const users = await User.aggregatePaginate(User.aggregate([{
                $match: {
                    role: ROLES.USER
                }
            }]),);
        users.docs = users.docs.map((user : any) => getUserProps(user));
        res.status(HTTP_STATUS.OK).send(users);
    } catch (error) {
        if (error instanceof ResumeError) {
            throw error;
        }
        throwResumeError(HTTP_STATUS.SERVICE_UNAVAILABLE, MESSAGES.DB_CONNECTIVITY_ERROR, req);
    }
}

export async function postRegisterUser(req : express.Request, res : express.Response, next : Function) {
    if (await((User as any).emailTaken(req.body.email))) {
        throwResumeError(HTTP_STATUS.CONFLICT, MESSAGES.EMAIL_ALREADY_IN_USE, req);
    }
    const user = new User({
        ... req.body
    });
    try {
        const doc = await user.save();
        res.status(HTTP_STATUS.CREATED).send(getUserProps(doc));
    } catch (error) {
        throwResumeError(HTTP_STATUS.SERVICE_UNAVAILABLE, MESSAGES.DB_CONNECTIVITY_ERROR, req);
    }
}
export async function postLoginUser(req : express.Request, res : express.Response) {
    let user = await User.findOne({email: req.body.email});
    const compare = user && await user.comparePassword(req.body.password);
    if (! user || ! compare) {
        throwResumeError(HTTP_STATUS.FORBIDDEN, MESSAGES.INVALID_CREDENTIALS, req);
    }
    const session: any = req.session;
    session.user = {
        id: user.id,
        email: user.email
    };
    req.session.save(function (err : any) {
        if (err) {
            throwResumeError(HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.LOGIN_ERROR, req);
        }
        return res.status(HTTP_STATUS.ACCEPTED).send(getUserProps(user._doc));
    });

}
export function postLogoutUser(req : express.Request, res : express.Response): void {
    checkAuth(req, res, [ROLES.USER, ROLES.ADMIN]);
    req.session.destroy((err : any) => {
        if (err) {
            throwResumeError(HTTP_STATUS.INTERNAL_SERVER_ERROR, MESSAGES.LOGOUT_ERROR, req, err)
        }
        res.clearCookie(SESSION_ID)
        res.status(HTTP_STATUS.ACCEPTED).send();
    });
}

const getUserProps = (user : any) => {
    return filterProps(user, [
        "__v", 'password'
    ], {_id: "id"});
}
