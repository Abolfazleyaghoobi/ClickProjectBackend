import { mapDatabaseError } from "../../shared/middlewares/mapDatabaseError";
import { LoginAdminDTO } from "./admin.dto";
import { adminRepository } from "./admin.repository";

export const loginAdmin_service = async (data: LoginAdminDTO) => {
  try {
    const admin = await adminRepository.findOne({
      where: {
        phone: data.phone,
        password: data.password,
      },
      withDeleted: true,
    });

    return admin;
  } catch (error) {
    console.log("error", error);
    mapDatabaseError(error);
  }
};
