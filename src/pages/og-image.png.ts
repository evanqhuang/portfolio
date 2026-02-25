import type { APIRoute } from 'astro';
import { generateOgImage } from '../lib/og-image';

export const GET: APIRoute = async () => {
  const png = await generateOgImage();
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
