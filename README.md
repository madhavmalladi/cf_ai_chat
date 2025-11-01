# 🚀 AI Chat with Durable Memory on Cloudflare - For Internship Application

A ChatGPT-style assistant that runs entirely on Cloudflare Workers, uses Workers AI (Llama 3.3), and stores user context in Durable Objects for persistent chat memory.

## ✅ What's Included

- **LLM (Llama 3.3)**: Workers AI integration
- **Workers / Durable Objects**: Persistent chat memory
- **Realtime chat I/O**: Modern chat UI in Next.js
- **Memory / state**: Durable Object chat memory storage

## 🏗️ Architecture

```
Next.js UI → /api/chat → Cloudflare Worker → Durable Object Memory
                                        ↘ Workers AI (Llama 3.3)
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Cloudflare

1. Get your Cloudflare Account ID from the dashboard
2. Create a Cloudflare API token with Workers permissions
3. Update `.dev.vars` with your credentials:

```bash
# .dev.vars
AI_GATEWAY_URL=https://api.cloudflare.com/client/v4/accounts/<YOUR_ACCOUNT_ID>/ai/run/@cf/meta/llama-3.3-8b-instruct
API_TOKEN=<YOUR_CLOUDFLARE_API_TOKEN>
```

### 3. Set Environment Variables

Create `.env.local` for the Next.js app:

```bash
# .env.local
NEXT_PUBLIC_WORKER_URL=http://localhost:8787
```

### 4. Development

Start the Cloudflare Worker (in one terminal):

```bash
npm run worker:dev
```

Start the Next.js app (in another terminal):

```bash
npm run dev
```

Visit `http://localhost:3000` to use EdgeChat!

## 📦 Deployment

### Deploy Worker to Cloudflare

```bash
npm run worker:deploy
```

### Deploy Next.js App

Update `.env.local` with your deployed worker URL:

```bash
NEXT_PUBLIC_WORKER_URL=https://edge-chat.<your-subdomain>.workers.dev
```

Then deploy to Vercel, Netlify, or your preferred platform.

## 🛠️ Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run worker:dev` - Start Cloudflare Worker locally
- `npm run worker:deploy` - Deploy worker to Cloudflare
- `npm run worker:tail` - View worker logs
- `npm run build` - Build Next.js app for production

## 📁 Project Structure

```
cloudflare-ai-chat/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts    # Next.js API route
│   │   ├── layout.tsx           # App layout
│   │   └── page.tsx             # Main page
│   └── components/
│       └── Chat.tsx             # Chat UI component
├── worker/
│   ├── index.ts                 # Worker entry point
│   ├── durable.ts               # Durable Object for chat memory
│   └── types.ts                 # TypeScript types
├── wrangler.toml                # Cloudflare Worker config
├── .dev.vars                    # Local environment variables
└── package.json
```

## 🔧 Configuration

### Wrangler Configuration

The `wrangler.toml` file configures:

- Durable Objects for chat memory
- Workers AI binding
- Migration settings

### Environment Variables

- `AI_GATEWAY_URL`: Cloudflare AI API endpoint
- `API_TOKEN`: Your Cloudflare API token
- `NEXT_PUBLIC_WORKER_URL`: Worker URL for the frontend

## 🎯 Features

- **Persistent Memory**: Chat history stored in Durable Objects
- **AI-Powered**: Uses Llama 3.3 via Cloudflare Workers AI
- **Real-time Chat**: Modern, responsive chat interface
- **Edge Computing**: Runs entirely on Cloudflare's edge network
- **TypeScript**: Fully typed for better development experience

## 🐛 Troubleshooting

1. **Worker not responding**: Check that your API token has Workers permissions
2. **AI responses failing**: Verify your account has Workers AI enabled
3. **Memory not persisting**: Ensure Durable Objects are properly configured in wrangler.toml

## 📝 License

MIT License - feel free to use this project as a starting point for your own AI applications!
