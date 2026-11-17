import { mapDatabaseError } from "../../shared/middlewares/mapDatabaseError";
import { LoginAdminDTO } from "./admin.dto";
import { adminRepository } from "./admin.repository";

export const loginAdmin_service = async (data: LoginAdminDTO) => {
  try {
    const admin = await adminRepository.findOne({
      where: {
        username: data.username,
        email: data.email,
      },
      withDeleted: true,
    });

    return admin;
  } catch (error) {
    console.log("error", error);
    mapDatabaseError(error);
  }
};
