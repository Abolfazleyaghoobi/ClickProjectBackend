import { Router } from "express";
import { createCertificateType_controller, deleteCertificateType_controller, getAllCertificateType_controller, updateCertificateType_controller } from "./certificateType.controller";
import { authenticate } from "../../shared/middlewares/auth.middleware";

export const certificateTypeRouter = Router();

// create certificate type
certificateTypeRouter.post("/create",authenticate, createCertificateType_controller)



// update certificate type
certificateTypeRouter.patch("/update/:id", authenticate, updateCertificateType_controller)




// delete certificate type
certificateTypeRouter.delete("/delete/:id", authenticate, deleteCertificateType_controller)


// get All certificate type
certificateTypeRouter.get("/getAll", authenticate, getAllCertificateType_controller)