import { NotionAPI } from 'notion-client'

// Configure SSL handling for development only
if (process.env.NODE_ENV === 'development') {
  // Set Node.js to be more lenient with SSL certificates in development
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  console.log(
    '⚠️  SSL certificate validation disabled for development environment'
  )
  console.log(
    '   This is normal and secure - production will use proper SSL validation'
  )
}

export const notion = new NotionAPI({
  apiBaseUrl: process.env.NOTION_API_BASE_URL
})
