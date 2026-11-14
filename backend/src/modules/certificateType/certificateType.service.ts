import { AppError } from "../../shared/errors/app.error";
import { UserRole } from "../users/entities/users.entity";
import { usersRepository } from "../users/users.repository";
import {
  CreateCertificateTypeDto,
  UpdateCertificateTypeDto,
} from "./certificateType.dto";
import { certificateTypeRepository } from "./certificateType.repository";
// create certificate type service
export const createCertificateType_service = async (
  data: CreateCertificateTypeDto,
  id: string,
) => {
  const isAdmin = await usersRepository.findOne({
    where: {
      id,
    },
  });
  if (isAdmin!.role !== UserRole.ADMIN) {
    throw new AppError("You are not admin", 403);
  }
  //   CRTType => certificate type
  const CRTType = certificateTypeRepository.create(data);
  await certificateTypeRepository.save(CRTType);
  return CRTType;
};

// update certificate type service
export const updateCertificateType_service = async (
  data: UpdateCertificateTypeDto,
  id: string,
  id_crtt: string,
) => {
  const isAdmin = await usersRepository.findOne({
    where: {
      id,
    },
  });
  if (isAdmin!.role !== UserRole.ADMIN) {
    throw new AppError("You are not admin", 403);
  }
  const certificateType = await certificateTypeRepository.findOneBy({
    id: id_crtt,
  });
  if (!certificateType) {
    throw new AppError("Certificate type not found", 404);
  }
  Object.assign(certificateType, data);
   await certificateTypeRepository.save(certificateType);
  return certificateType;
};


// delete certificate type service
export const deleteCertificateType_service = async (
  data: UpdateCertificateTypeDto,
  id: string,
  id_crtt: string,
) => {
  const isAdmin = await usersRepository.findOne({
    where: {
      id,
    },
  });
  if (isAdmin!.role !== UserRole.ADMIN) {
    throw new AppError("You are not admin", 403);
  }
  const certificateType = await certificateTypeRepository.findOneBy({
    id: id_crtt,
  });
  if (!certificateType) {
    throw new AppError("Certificate type not found", 404);
  }

   await certificateTypeRepository.remove(certificateType);
  return certificateType;
};