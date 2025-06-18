import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY||"");

// npm install react-email -D -E 
// npm install resend @react-email/components
// and set the package.json
//  "scripts": {
//     "dev": "next dev --turbopack",
//     "build": "next build",
//     "start": "next start",
//     "lint": "next lint",
//     "email": "email dev"
//}