import { RequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../../shared/errors/app.error";
import { mapDatabaseError } from "../../shared/middlewares/mapDatabaseError";
import { addCoursePathSchema, changeCoursePathSchema, getCoursePathSchema } from "./courses_path.validation";
import { addCourseToPath_service, changeCoursePath_service, deleteCoursesPath_service, getAllCoursPath_service } from "./courses_path.service";


export const coursePath_controller:RequestHandler=async (req,res,next)=>{
    try {
        const data = addCoursePathSchema.parse(req.body);
        const result= await addCourseToPath_service(data);
        res.status(201).json(result);
    } catch (err) {
       
        if (err instanceof ZodError) {
              const zodERR = err.issues.map((issue: any) => ({
                field: issue.path.join("."),
                message: issue.message,
              }));
        
              return next(new AppError("Validation failed", 400, { errors: zodERR }));
            }
        
            return next(mapDatabaseError(err));
    }
}


export const getCoursePath_controller:RequestHandler=async (req,res,next)=>{
    try {
        // const data = addCoursePathSchema.parse(req.body);
    
const {pathId}= getCoursePathSchema.parse(req.body)
        if (typeof pathId !== "number") {
            return  new AppError("Invalid pathListId", 400);
        }

        const result= await getAllCoursPath_service(pathId);
        res.status(200).json(result);
    } catch (err) {
        console.log('err', err)
        if (err instanceof ZodError) {
              const zodERR = err.issues.map((issue: any) => ({
                field: issue.path.join("."),
                message: issue.message,
              }));
        
              return next(new AppError("Validation failed", 400, { errors: zodERR }));
            }
        
            return next(mapDatabaseError(err));
    }
}


export const deleteCoursePath_controller:RequestHandler=async (req,res,next)=>{
    try {
        // const data = addCoursePathSchema.parse(req.body);
     const {coursePathListId}=req.body;
        const result= await deleteCoursesPath_service(coursePathListId);
        res.status(200).json(result);
    } catch (err) {
        console.log('err', err)
        if (err instanceof ZodError) {
              const zodERR = err.issues.map((issue: any) => ({
                field: issue.path.join("."),
                message: issue.message,
              }));
        
              return next(new AppError("Validation failed", 400, { errors: zodERR }));
            }
        
            return next(mapDatabaseError(err));
    }
}


export const changeCoursePath_controller:RequestHandler=async (req,res,next)=>{
    try {
        // const data = addCoursePathSchema.parse(req.body);
     const data=changeCoursePathSchema.parse(req.body);
         await changeCoursePath_service(data);
        res.status(200).json({message:"successfully"});
    } catch (err:any) {
        if (err instanceof ZodError) {
              const zodERR = err.issues.map((issue: any) => ({
                field: issue.path.join("."),
                message: issue.message,
              }));
        
              return next(new AppError("Validation failed", 400, { errors: zodERR }));
            }
        
            return next(mapDatabaseError(err));
    }
}

