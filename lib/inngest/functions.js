// inngest/functions.js
import { inngest } from "@/lib/inngest/inngest";
import { sendEmail } from "@/app/resend/actions";

export const hourlyEmailFunction = inngest.createFunction(
  { 
    id: "hourly-email",
    name: "Send Hourly Email"
  },
  { cron: "0 * * * *" }, // Every hour at minute 0
  async ({ event, step }) => {  
    const result = await step.run("send-email", async () => {
      return await sendEmail();
    });
const result1 = await step.run("dfd", async () => {
      return await sendEmail();
    });
  }
);
