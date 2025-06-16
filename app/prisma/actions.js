'use server';

import { prisma } from "@/lib/prisma"

export default async function createUser(){
     await prisma.user.create({
        data:{
            name:'prathamesh',email:'prathamesh.jakkula.01042005@gmail.com'
        }
    })
}