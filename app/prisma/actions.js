'use server';

import { prisma } from "@/lib/prisma"

export default async function createUser(){
     await prisma.user.create({
        data:{
            name:'raj',email:'rajnew@gmail.com'
        }
    })
}