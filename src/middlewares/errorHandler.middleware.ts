import { ErrorRequestHandler } from 'express';
import { getErrorByKey } from '../common/errors/index.error';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const error = getErrorByKey(err?.message ?? err);
    res.status(error.status).send(error);
}