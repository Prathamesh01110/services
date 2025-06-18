'use server';
import { resend } from "@/lib/resend";
import EmailTemplate from "@/emails/template";

export async function sendEmail(){
    try{
    const data = await resend.emails.send({
    from: 'gemini <onboarding@resend.dev>',
    to:"prathamesh.jakkula.01042005@gmail.com",
    subject:"Users Data",
    react: EmailTemplate(),
        })
        return{success:true,data};
    }
    catch(error){
        console.log("Failed to send email",error);
        return {success:false,error};
        
    }
}