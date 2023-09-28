import prisma from "database";
import { UserInput } from "repository";

export async function createUserFactory(userData: UserInput){
    return await prisma.user.create({
        data: userData
    });
}

export async function createManyUsersFactory(userData: UserInput){
    return await prisma.user.createMany({
        data: [{
          ...userData
        }, {
          ...userData, email: "teste2@teste.com.br"
        }]
      });
}