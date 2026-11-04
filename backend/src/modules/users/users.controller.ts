import type { RequestHandler } from "express";

export const createUser: RequestHandler = (_req, res, _next) => {
   res.send({
    message:"ali"
   })
    
};