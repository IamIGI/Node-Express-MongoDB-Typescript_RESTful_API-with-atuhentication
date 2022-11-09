import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

    console.log('accessToken:', accessToken);

    // const refreshToken = get(req, 'headers.x-refresh');

    if (!accessToken) {
        return next();
    }

    const { decoded, expired } = verifyJwt(accessToken);

    console.log('decoded', decoded);

    if (decoded) {
        res.locals.user = decoded;
        return next();
    }

    return next();
};

export default deserializeUser;