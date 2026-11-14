import { RequestHandler } from "express";
import { decodeToken } from "../../shared/utils/decode";
import { createCertificateTypeSchema, updateCertificateTypeSchema } from "./certificateType.validation";
import { createCertificateType_service, deleteCertificateType_service, updateCertificateType_service } from "./certificateType.service";
import { AppError } from "../../shared/errors/app.error";
import { mapDatabaseError } from "../../shared/middlewares/mapDatabaseError";


export const createCertificateType_controller: RequestHandler = async (req, res,next) => {
    try {
        const decode=decodeToken(req.cookies.access_token)
        const data=createCertificateTypeSchema.parse(req.body)
        const result= await createCertificateType_service(data,decode.id)
        res.status(201).json({message:"Certificate Type Created Successfully",result})
    } catch (error:any) {
        return next(mapDatabaseError(error))
    }
}


export const updateCertificateType_controller: RequestHandler = async (req, res,next) => {
    try {
        const decode=decodeToken(req.cookies.access_token)
        const id_crtt= req.params.id
        if (typeof id_crtt !=="string") {
            throw new AppError("Invalid Certificate Type Id",400)
        }
        const data=updateCertificateTypeSchema.parse(req.body)
        const result= await updateCertificateType_service(data,decode.id,id_crtt)
        res.status(200).json({message:"Certificate Type update Successfully",result})
    } catch (error:any) {
        return next(mapDatabaseError(error))
    }
}

export const deleteCertificateType_controller: RequestHandler = async (req, res,next) => {
    try {
        const decode=decodeToken(req.cookies.access_token)
        const id_crtt= req.params.id
        if (typeof id_crtt !=="string") {
            throw new AppError("Invalid Certificate Type Id",400)
        }
        const data=updateCertificateTypeSchema.parse(req.body)
        const result= await deleteCertificateType_service(data,decode.id,id_crtt)
        res.status(200).json({message:"Certificate Type delete Successfully",result})
    } catch (error:any) {
        return next(mapDatabaseError(error))
    }
}