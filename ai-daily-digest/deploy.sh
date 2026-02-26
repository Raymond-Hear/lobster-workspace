#!/bin/bash
cd /root/.openclaw/workspace/ai-daily-digest/my-app

# Install Vercel CLI if not exists
if ! command -v vercel &> /dev/null; then
    npm install -g vercel
fi

# Deploy to Vercel
vercel --yes --prod
