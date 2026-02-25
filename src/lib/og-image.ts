import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function loadFonts() {
  const fontsDir = join(process.cwd(), 'src/assets/fonts');

  const [spaceGroteskBold, dmSansRegular] = await Promise.all([
    readFile(join(fontsDir, 'SpaceGrotesk-Bold.ttf')),
    readFile(join(fontsDir, 'DMSans-Regular.ttf')),
  ]);

  return [
    {
      name: 'Space Grotesk',
      data: spaceGroteskBold.buffer.slice(
        spaceGroteskBold.byteOffset,
        spaceGroteskBold.byteOffset + spaceGroteskBold.byteLength,
      ),
      weight: 700 as const,
      style: 'normal' as const,
    },
    {
      name: 'DM Sans',
      data: dmSansRegular.buffer.slice(
        dmSansRegular.byteOffset,
        dmSansRegular.byteOffset + dmSansRegular.byteLength,
      ),
      weight: 400 as const,
      style: 'normal' as const,
    },
  ];
}

function buildTree() {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
        padding: '80px',
        backgroundColor: '#060608', // void-950
        backgroundImage:
          'radial-gradient(circle, rgba(217,119,6,0.07) 1px, transparent 1px)', // ember-500 @ 7%
        backgroundSize: '24px 24px',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              width: '64px',
              height: '4px',
              backgroundColor: '#d97706', // ember-500
              marginBottom: '40px',
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'row' as const,
              fontFamily: 'Space Grotesk',
              fontSize: '72px',
              fontWeight: 700,
              lineHeight: 1.1,
            },
            children: [
              {
                type: 'span',
                props: {
                  style: { color: '#fafafa', marginRight: '20px' }, // ash-50
                  children: 'Evan',
                },
              },
              {
                type: 'span',
                props: {
                  style: { color: '#d97706' }, // ember-500
                  children: 'Huang',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontFamily: 'DM Sans',
              fontSize: '28px',
              fontWeight: 400,
              color: '#8888a0', // ash-400
              marginTop: '20px',
              letterSpacing: '0.05em',
            },
            children: 'Full Stack · Embedded · AI · CAD',
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontFamily: 'DM Sans',
              fontSize: '16px',
              fontWeight: 400,
              color: '#5c5c72', // ash-500
              marginTop: '48px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
            },
            children: 'evanqhuang.com',
          },
        },
      ],
    },
  };
}

export async function generateOgImage(): Promise<Uint8Array> {
  const fonts = await loadFonts();

  const svg = await satori(buildTree(), {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts,
  });

  return sharp(Buffer.from(svg)).png().toBuffer();
}
