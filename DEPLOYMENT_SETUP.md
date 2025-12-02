# Automated Deployment Setup

This document explains how to configure the automated release and deployment process for this portfolio website.

## Prerequisites

- GitHub repository with Actions enabled
- Vercel account with project deployed
- Node.js and pnpm installed locally

## Setup Instructions

### 1. Configure Vercel Secrets

You need to add the following secrets to your GitHub repository:

1. Go to your GitHub repository → Settings → Secrets and Variables → Actions
2. Add these repository secrets:

#### Required Secrets

- **VERCEL_TOKEN**: Your Vercel token
  - Get it from: https://vercel.com/account/tokens
  - Create a new token with appropriate permissions

- **VERCEL_ORG_ID**: Your Vercel organization ID
  - Find it in your Vercel project settings
  - Or run: `vercel org ls` (requires Vercel CLI)

- **VERCEL_PROJECT_ID**: Your Vercel project ID
  - Find it in your Vercel project settings → General
  - Or run: `vercel ls` (requires Vercel CLI)

#### How to get Vercel IDs:

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to your account
vercel login

# Navigate to your project directory and link it
vercel link

# Get organization ID
vercel org ls

# Get project ID
vercel ls
```

### 2. Configure GitHub Environment (Optional)

For additional security, you can create a production environment:

1. Go to Settings → Environments
2. Create a new environment named "production"
3. Add protection rules if desired (e.g., required reviewers)

### 3. Test the Setup

#### Option A: Manual Release via GitHub UI
1. Go to Actions tab in your GitHub repository
2. Click on "Release" workflow
3. Click "Run workflow"
4. Select release type (patch, minor, major)
5. Click "Run workflow"

#### Option B: Local Release Commands
```bash
# For bug fixes (2.0.0 → 2.0.1)
pnpm run release:patch

# For new features (2.0.0 → 2.1.0)
pnpm run release:minor

# For breaking changes (2.0.0 → 3.0.0)
pnpm run release:major
```

## Workflow Overview

### Automated Process:
1. **Trigger**: Manual workflow dispatch from GitHub Actions or local release command
2. **Test**: Run linting and formatting checks
3. **Build**: Verify the project builds successfully
4. **Version**: Bump version in package.json
5. **Tag**: Create and push git tag
6. **Release**: Create GitHub release with changelog
7. **Deploy**: Automatically deploy to Vercel production
8. **Notify**: Add deployment confirmation to the release

### Security Features:
- All builds are tested before deployment
- Secrets are stored securely in GitHub
- Production environment protection (if configured)
- Automatic changelog generation

## Troubleshooting

### Common Issues:

1. **"Resource not accessible by integration"**
   - Check that your GitHub token has proper permissions
   - Ensure the repository has Actions enabled

2. **"Invalid Vercel token"**
   - Verify the VERCEL_TOKEN secret is correct
   - Make sure the token hasn't expired

3. **"Project not found"**
   - Check VERCEL_ORG_ID and VERCEL_PROJECT_ID are correct
   - Ensure the Vercel project exists and is linked

4. **Build failures**
   - Check that all dependencies are properly listed
   - Verify environment variables are set correctly

### Debug Steps:
1. Check the Actions logs for detailed error messages
2. Verify all secrets are properly set
3. Test local build with `pnpm build`
4. Test local deployment with `pnpm run deploy`

## Manual Fallback

If automation fails, you can still release manually:

```bash
# Update version
npm version patch/minor/major

# Push changes and tags
git push origin main --tags

# Deploy manually
pnpm run deploy
```