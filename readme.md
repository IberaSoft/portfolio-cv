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
   pnpm run deploy        # Deploy to preview
   pnpm run deploy:prod   # Deploy to production
   ```

## Releasing a New Version

The project supports **automated releases** with built-in testing, versioning, and deployment to Vercel.

### 🚀 Automated Release (Recommended)

**Via GitHub Actions** (UI):

1. Go to your repository's Actions tab
2. Click "Release" workflow → "Run workflow"
3. Select release type (patch/minor/major)
4. Click "Run workflow"

**Via Local Commands**:

```bash
pnpm run release:patch  # Bug fixes (2.0.0 → 2.0.1)
pnpm run release:minor  # New features (2.0.0 → 2.1.0)
pnpm run release:major  # Breaking changes (2.0.0 → 3.0.0)
```

### ✨ What Happens Automatically

- ✅ **Tests** are run (linting + formatting)
- ✅ **Build** verification
- ✅ **Version** bump in package.json
- ✅ **Git tag** creation and push
- ✅ **GitHub Release** with auto-generated changelog
- ✅ **Vercel deployment** to production
- ✅ **Deployment confirmation** on release

### ⚙️ Initial Setup Required

For the automated process to work, you need to configure Vercel secrets. See [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md) for detailed instructions.

**Required GitHub Secrets:**

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### 🔄 Manual Fallback

If automation fails, you can still release manually:

```bash
npm version patch/minor/major
git push origin main --tags
pnpm run deploy
```

## Available Scripts

### Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run linting and formatting
- `pnpm run analyze` - Analyze bundle size

### Deployment

- `pnpm run deploy` - Deploy to preview environment
- `pnpm run deploy:prod` - Deploy to production
- `pnpm run release:patch` - Automated patch release (bug fixes)
- `pnpm run release:minor` - Automated minor release (new features)
- `pnpm run release:major` - Automated major release (breaking changes)

## License

MIT © [Juan Cruz Llorens](https://juancruzllorens.dev)
