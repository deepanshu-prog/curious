# Curious - AI SaaS Platform

A modern AI-powered SaaS application built with Next.js 13, offering multiple AI content generation tools with a freemium subscription model.

## Features

- **AI Conversation** - Chat with an AI assistant powered by Google Gemini
- **Image Generation** - Create images from text prompts using Flux Schnell
- **Code Generation** - Generate code snippets powered by Google Gemini
- **Music Generation** - Create music and audio from text descriptions
- **Video Generation** - Generate videos from text prompts
- **Free Trial** - 5 free generations before requiring a subscription
- **Pro Subscription** - Unlimited access via Stripe-powered payments ($20/mo)
- **Authentication** - Secure user authentication with Clerk
- **Live Chat Support** - Integrated Crisp chat widget

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 13 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | Radix UI, Lucide Icons |
| Authentication | Clerk |
| Database | MySQL + Prisma ORM |
| AI Services | Google Gemini API, Replicate API |
| Payments | Stripe |
| State Management | Zustand |
| Form Handling | React Hook Form + Zod |

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [MySQL](https://www.mysql.com/) database (or use [PlanetScale](https://planetscale.com/))
- [Google Gemini API Key](https://aistudio.google.com/apikey) (free)
- [Replicate API Token](https://replicate.com/account/api-tokens)
- [Clerk Account](https://clerk.com/)
- [Stripe Account](https://stripe.com/)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/deepanshu-prog/Curious.git
cd Curious
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

See [`.env.example`](.env.example) for all required variables.

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── (auth)/          # Sign-in & sign-up pages
│   ├── (dashboard)/     # Protected dashboard routes
│   │   └── (route)/
│   │       ├── conversation/
│   │       ├── image/
│   │       ├── code/
│   │       ├── music/
│   │       ├── video/
│   │       └── settings/
│   ├── (landing)/       # Public landing page
│   └── api/             # API routes for AI services, Stripe, webhooks
├── components/          # Reusable UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions, Prisma client, Stripe config
├── prisma/              # Database schema
└── public/              # Static assets
```

## API Routes

| Endpoint | Description |
|---|---|
| `POST /api/conversation` | AI chat completions |
| `POST /api/image` | Image generation |
| `POST /api/code` | Code generation |
| `POST /api/music` | Music generation via Replicate |
| `POST /api/video` | Video generation via Replicate |
| `GET /api/stripe` | Stripe checkout session |
| `POST /api/webhook` | Stripe webhook handler |

## Deployment

Deploy to [Vercel](https://vercel.com/) with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/deepanshu-prog/Curious)

Make sure to add all environment variables in your Vercel project settings.

## License

This project is open source and available under the [MIT License](LICENSE).
