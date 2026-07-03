import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const docs = join(root, 'docs');
const builtHtml = join(dist, 'index.dev.html');

const syncDir = (target) => {
  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });
  cpSync(dist, target, { recursive: true });
  cpSync(builtHtml, join(target, 'index.html'));
  rmSync(join(target, 'index.dev.html'), { force: true });
  writeFileSync(join(target, '.nojekyll'), '');
};

syncDir(docs);

cpSync(builtHtml, join(root, 'index.html'));
cpSync(join(dist, 'assets'), join(root, 'assets'), { recursive: true });
cpSync(join(dist, 'marina'), join(root, 'marina'), { recursive: true });
