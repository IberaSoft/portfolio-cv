# Portfolio Website

This is my personal CV website built with Next.js, TypeScript, and Notion as a headless CMS.

🌐 **Live Site:** [juancruzllorens.dev](https://juancruzllorens.dev/)

## Tech Stack

- **Framework:** Next.js 16 with Pages Router
- **Language:** TypeScript
- **CMS:** Notion (via react-notion-x)
- **Styling:** CSS Modules
- **Deployment:** Vercel
- **Analytics:** Fathom, PostHog (optional)

## Features

- 🌍 Bilingual support (English/Spanish)
- ⚡ ISR with 10-second revalidation
- 📱 Responsive design
- 🎨 Notion page rendering with syntax highlighting
- 📊 Built-in analytics support
- 🔍 Bundle analysis tools

## Quick Start

**Requirements:** Node.js ≥18, pnpm

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Configure Notion**
   - Update `site.config.ts` with your Notion page IDs
   - Optionally copy `.env.example` to `.env` for analytics

3. **Development**

   ```bash
   pnpm dev
   ```

4. **Deploy**
   ```bash
   pnpm run deploy
   ```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run linting and formatting
- `pnpm run analyze` - Analyze bundle size
- `pnpm run deploy` - Deploy to Vercel

## License

MIT © [Juan Cruz Llorens](https://juancruzllorens.dev)
