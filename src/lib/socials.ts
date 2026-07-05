import {
  siInstagram,
  siTiktok,
  siPinterest,
  siMedium,
  siGoodreads,
  siEtsy,
  siX,
  siBuymeacoffee,
} from 'simple-icons';

export interface Social {
  name: string;
  url: string;
  /** SVG path data (24x24 viewBox), or null when only an external image exists. */
  path: string | null;
  /** Fallback image URL when no bundled icon exists (Amazon — dropped by simple-icons). */
  img?: string;
}

export const SOCIALS: Social[] = [
  { name: 'Instagram', path: siInstagram.path, url: 'https://www.instagram.com/poetrybymjs/' },
  { name: 'TikTok', path: siTiktok.path, url: 'https://www.tiktok.com/@poetrybymjs' },
  { name: 'Pinterest', path: siPinterest.path, url: 'https://www.pinterest.com/POETRYBYMJS/' },
  { name: 'Medium', path: siMedium.path, url: 'https://medium.com/@amanicmillennial' },
  { name: 'Goodreads', path: siGoodreads.path, url: 'https://www.goodreads.com/author/show/44940562.Michael_J_Schiuma' },
  { name: 'Etsy — custom poetry', path: siEtsy.path, url: 'https://www.etsy.com/listing/1810349891/personalized-custom-poetry-typed-on' },
  {
    name: 'Amazon',
    path: null,
    img: 'https://www.google.com/s2/favicons?domain=amazon.com&sz=64',
    url: 'https://www.amazon.com/stores/author/B0CJ3ZB9GK/allbooks',
  },
  { name: 'Buy me a coffee', path: siBuymeacoffee.path, url: 'http://coff.ee/MichaelJSchiumo' },
  { name: 'X / Twitter', path: siX.path, url: 'https://twitter.com/man1cmillennial' },
];

export const BOOKS = [
  { name: '(In)Sane', url: 'https://a.co/d/aE0W78i' },
  { name: 'words to love by', url: 'https://a.co/d/a3ZDwUv' },
  { name: 'to be loved by a poet', url: 'https://www.amazon.com/be-loved-poet-Michael-Schiuma/dp/B0DJ7CT6CG' },
];

export const ETSY_LISTING = 'https://www.etsy.com/listing/1810349891/personalized-custom-poetry-typed-on';
export const MEMOIR_ANNOUNCEMENT = 'https://a.co/d/gGNZ2QT';
