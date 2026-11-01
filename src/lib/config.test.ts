import { describe, expect, it } from 'vitest';
import { resolveSiteUrl } from './config';

describe('resolveSiteUrl', () => {
  it('keeps an explicit public URL override', () => {
    expect(resolveSiteUrl('https://instance.example', {
      NEXT_PUBLIC_SITE_URL: 'https://override.example/',
      VERCEL_PROJECT_PRODUCTION_URL: 'project.vercel.app',
      VERCEL_URL: 'preview.vercel.app',
    })).toBe('https://override.example');
  });

  it('prefers the instance canonical URL to Vercel production and preview URLs', () => {
    expect(resolveSiteUrl('https://licitalcazar.vercel.app/', {
      VERCEL_PROJECT_PRODUCTION_URL: 'licitalcazar-sandy.vercel.app',
      VERCEL_URL: 'preview-branch.vercel.app',
    })).toBe('https://licitalcazar.vercel.app');
  });

  it('uses the Vercel production URL only when the instance has no canonical URL', () => {
    expect(resolveSiteUrl('', {
      VERCEL_PROJECT_PRODUCTION_URL: 'project.vercel.app',
      VERCEL_URL: 'preview.vercel.app',
    })).toBe('https://project.vercel.app');
  });

  it('uses the Vercel deployment URL as a final fallback', () => {
    expect(resolveSiteUrl('', { VERCEL_URL: 'preview.vercel.app' }))
      .toBe('https://preview.vercel.app');
  });
});
