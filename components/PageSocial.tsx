import * as React from 'react'
import cs from 'classnames'
import {
  FaXTwitter,
  FaGithub,
  FaLinkedin,
  FaEnvelopeOpen,
  FaYoutube
} from 'react-icons/fa6'

import * as config from '@/lib/config'

interface SocialLink {
  name: string
  title: string
  icon: React.ReactNode
  href?: string
}

const socialLinks: SocialLink[] = [
  config.linkedin && {
    name: 'linkedin',
    href: `https://www.linkedin.com/in/${config.linkedin}`,
    title: `LinkedIn ${config.author}`,
    icon: <FaLinkedin />
  },

  config.github && {
    name: 'github',
    href: `https://github.com/${config.github}`,
    title: `GitHub @${config.github}`,
    icon: <FaGithub />
  },

  config.twitter && {
    name: 'twitter',
    href: `https://twitter.com/${config.twitter}`,
    title: `Twitter @${config.twitter}`,
    icon: <FaXTwitter />
  },

  config.newsletter && {
    name: 'newsletter',
    href: `${config.newsletter}`,
    title: `Newsletter ${config.author}`,
    icon: <FaEnvelopeOpen />
  },

  config.youtube && {
    name: 'youtube',
    href: `https://www.youtube.com/${config.youtube}`,
    title: `YouTube ${config.youtube}`,
    icon: <FaYoutube />
  }
].filter(Boolean)

interface PageSocialProps {
  variant?: 'sticky' | 'footer'
}

const getSocialBgColor = (name: string) => {
  const colors: Record<string, string> = {
    linkedin: 'bg-social-linkedin',
    github: 'bg-social-github',
    twitter: 'bg-social-twitter',
    newsletter: 'bg-social-newsletter',
    youtube: 'bg-social-youtube'
  }
  return colors[name] || 'bg-gray-600'
}

export function PageSocial({ variant = 'sticky' }: PageSocialProps) {
  const isSticky = variant === 'sticky'
  const isFooter = variant === 'footer'

  return (
    <div
      className={cs(
        'flex items-center text-center text-fg',
        isSticky && 'flex-col max-md:hidden',
        isFooter && 'flex-row justify-center gap-3'
      )}
    >
      {socialLinks.map((action) => (
        <a
          className={cs(
            'group relative transition-all duration-300 ease-out rounded-none',
            'flex flex-col justify-center items-center no-underline',
            'select-none cursor-pointer',
            'hover:scale-110 hover:shadow-xl',
            'transform-gpu',
            isSticky && 'mb-4 last:mb-0',
            isFooter && 'w-10 h-10',
            getSocialBgColor(action.name)
          )}
          href={action.href}
          key={action.name}
          title={action.title}
          target='_blank'
          rel='noopener noreferrer'
          style={
            isSticky
              ? {
                  width: '3em',
                  height: '3em',
                  minWidth: '3em',
                  minHeight: '3em',
                  flexShrink: 0
                }
              : {
                  width: '40px',
                  height: '40px',
                  minWidth: '40px',
                  minHeight: '40px',
                  flexShrink: 0
                }
          }
        >
          {/* Icon container - white icons with different sizes */}
          <div
            className={cs(
              'flex items-center justify-center text-white transition-all duration-300 ease-out group-hover:scale-110',
              isSticky && 'text-3xl',
              isFooter && 'text-lg'
            )}
            style={
              isSticky
                ? { fontSize: '1.875rem', width: '100%', height: '100%' }
                : { fontSize: '1.125rem', width: '100%', height: '100%' }
            }
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                className={isSticky ? 'social-icon-wrapper' : ''}
                style={{
                  width: isSticky ? '60%' : '70%',
                  height: isSticky ? '60%' : '70%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {action.icon}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
