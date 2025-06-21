# Services Integration Guide

> ✅ **Clerk Integration:** Use [Clerk’s official Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs) for authentication setup.
> 🔒 **Route Protection:** To protect routes, refer to [Clerk Middleware Documentation](https://clerk.com/docs/references/nextjs/clerk-middleware#create-route-matcher).

This guide covers the integration of essential services: Prisma (database ORM), Arcjet (rate limiting), Gemini AI, and Resend (email service).

## Table of Contents

* [Prisma Database Setup](#prisma-database-setup)
* [Resend Email Service](#resend-email-service)
* [Gemini AI Integration](#gemini-ai-integration)
* [Arcjet Rate Limiting](#arcjet-rate-limiting)
* [Environment Variables](#environment-variables)

---

## Prisma Database Setup

### Installation & Initialization
```bash
npx prisma init
npx prisma db push --force-reset
```

### Configuration (`lib/prisma.js`)
```javascript
import { PrismaClient } from '@prisma/client'

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prisma;
}
```

**What this does:** Creates a singleton Prisma client instance that reuses the same connection in development to avoid connection pool exhaustion.

### Basic Usage
```javascript
// Create a record
await prisma.user.create({
    data: { name: "John", email: "john@example.com" }
});

// Find many records
await prisma.user.findMany({
    where: { active: true }
});

// Find unique record
await prisma.user.findUnique({
    where: { id: 1 }
});

// Update record
await prisma.user.update({
    where: { id: 1 },
    data: { name: "Jane" }
});

// Delete record
await prisma.user.delete({
    where: { id: 1 }
});
```

## Resend Email Service

### Installation
```bash
npm install resend @react-email/components
```

### Package.json Scripts
Add this to your `package.json`:
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build", 
    "start": "next start",
    "lint": "next lint",
    "email": "email dev"
  }
}
```

### Configuration (`lib/resend.js`)
```javascript
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY || "");
```

**What this does:** Initializes the Resend SDK with your API key for sending transactional emails.

### Usage Example
```javascript
const data = await resend.emails.send({
    from: 'gemini <onboarding@resend.dev>',
    to: "user@example.com",
    subject: "Users Data",
    react: EmailTemplate(),
});
```

## Gemini AI Integration

### Installation
```bash
npm install @google/generative-ai
```

### Configuration (`lib/gemini.js`)
```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
```

**What this does:** Creates a GoogleGenerativeAI client instance using your API key to access Gemini models.

### Usage Example
```javascript
import { genAI } from '@/lib/gemini'

export async function generateAnswer(question) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(question);
  console.log(result);
  
  const response = await result.response;
  return response.text();
}
```

## Arcjet Rate Limiting

### Installation
```bash
npm i @arcjet/next @arcjet/inspect
```

### Configuration (`lib/arcjet.js`)
```javascript
import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    tokenBucket({
      mode: "LIVE", // Change to "DRY_RUN" for testing
      refillRate: 10,    // 10 tokens per minute
      interval: 60,      // 60 seconds
      capacity: 10,      // Max 10 requests
    }),
  ],
});

export default aj;
```

**What this does:** Sets up rate limiting with a token bucket algorithm - allows 10 requests initially, then refills at 10 tokens per minute.

### Protected Action Example
```javascript
"use server";
import aj from "@/lib/arcjet";

export async function protectedAction() {
  try {
    const decision = await aj.protect({}, { requested: 1 });
    if (decision.isDenied()) return { error: "Rate limit exceeded" };
    return { message: "Request allowed" };
  } catch {
    return { error: "Error occurred" };
  }
}
```

## Environment Variables

Create a `.env` file in your project root:

```env
# Database
DATABASE_URL="your_database_connection_string"

# Resend
RESEND_API_KEY="your_resend_api_key"

# Gemini AI
GEMINI_API_KEY="your_gemini_api_key"

# Arcjet
ARCJET_KEY="your_arcjet_key"

# Environment
NODE_ENV="development"
```

## Key Concepts

### Library Pattern
Each service follows the same pattern:
1. **Import SDK** - Import the service's official SDK
2. **Initialize Client** - Create a client instance with API key
3. **Export Instance** - Export for use across your application
4. **Environment Handling** - Use environment variables for API keys

### Usage Pattern
- **Prisma**: `prisma.tableName.operation()`
- **Resend**: `resend.emails.send()`
- **Gemini**: `genAI.getGenerativeModel().generateContent()`
- **Arcjet**: `aj.protect()`

Each lib file essentially assigns the SDK to a variable with your API key, making it ready to use throughout your application.
