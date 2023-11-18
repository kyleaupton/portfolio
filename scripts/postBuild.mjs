import path from 'path';
import url from 'url';
import { copy } from '@kyleupton/glob-copy';

const __repo = path.dirname(path.dirname(url.fileURLToPath(import.meta.url)));

// Copy contents of /publish to /dist
await copy({
  source: path.join(__repo, 'publish'),
  destination: path.join(__repo, 'dist'),
});
