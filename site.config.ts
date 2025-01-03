import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '67401994f32149379de8b25b8abb7746',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'Portfolio',
  domain: 'juancruzllorens.dev',
  author: 'Juan Cruz Llorens',

  // open graph metadata (optional)
  description: 'Juan Cruz Llorens`s Resume',

  // social usernames (optional)
  twitter: 'juancllorens',
  github: 'iberasoft',
  linkedin: 'juancruzllorens',
  // mastodon: '#', // optional mastodon profile URL, provides link verification
  // newsletter: '#', // optional newsletter URL
  // youtube: '#', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // Language-specific page IDs
  languagePageIds: {
    default: '67401994f32149379de8b25b8abb7746',
    es: '2fda80b664cc4f8ab7ea5e0754b87f44',
    en: '67401994f32149379de8b25b8abb7746'
  },

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  pageUrlOverrides: {
    '/': '67401994f32149379de8b25b8abb7746',
    '/es': '2fda80b664cc4f8ab7ea5e0754b87f44',
    '/en': '67401994f32149379de8b25b8abb7746'
  },

  // whether to use the default notion navigation style or a custom one with links to
  // important pages
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'Español',
      url: '/es'
    },
    {
      title: 'English',
      url: '/en'
    }
  ]
})
