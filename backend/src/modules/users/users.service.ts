import { AppError } from "../../shared/errors/app.error";
import {  CreateUser_interface } from "./users.dto";

import { usersRepository } from "./users.repository";



export const createUser_service= async (data:CreateUser_interface)=>{
    try {
        const existUser= await usersRepository.findOneBy({
            username:data.username
        });
        if(existUser){
            throw new AppError("Username already exists",409);
        }
        const user=  usersRepository.create({
            username:data.username,
            phone:data.phone,
            password_hash:data.password

        });
        return usersRepository.save(user);
    } catch (error) {
        throw new AppError("Error creating user",500);
    }







}