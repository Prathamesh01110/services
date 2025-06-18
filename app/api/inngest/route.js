import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/inngest";
import { hourlyEmailFunction } from "@/lib/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    hourlyEmailFunction,
  ],
});