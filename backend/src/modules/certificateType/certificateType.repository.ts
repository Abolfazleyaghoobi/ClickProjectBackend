import { AppDataSource } from "../../databases/data-source";
import { CertificateType } from "./entity/certificateType.entity";


export const certificateTypeRepository = AppDataSource.getRepository(CertificateType);