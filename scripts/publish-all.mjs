/**
 * Publish all @opubase/opicon packages to npm.
 *
 * Mit Passkey-only 2FA: Granular Access Token nutzen (kein OTP).
 *   npm config set //registry.npmjs.org/:_authToken DEIN_TOKEN
 *   node scripts/publish-all.mjs
 */
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');

const packages = [
  'packages/shared',
  'packages/opicon',
  'packages/opicon-react',
  'packages/opicon-preact',
  'packages/opicon-vue',
  'packages/opicon-svelte',
  'packages/opicon-solid',
  'packages/opicon-react-native',
  'packages/opicon-angular',
  'packages/opicon-astro',
  'packages/opicon-static',
];

let whoami = '';
try {
  whoami = execSync('npm whoami', { encoding: 'utf8' }).trim();
} catch {
  console.error('Nicht bei npm eingeloggt. Token setzen mit:');
  console.error('  npm config set //registry.npmjs.org/:_authToken DEIN_TOKEN');
  process.exit(1);
}

console.log(`npm user: ${whoami}`);
console.log('Publish ohne OTP (Granular Access Token / Passkey-Setup)\n');

for (const pkg of packages) {
  console.log(`Publishing ${pkg}...`);
  execSync('npx pnpm publish --access public --no-git-checks', {
    cwd: join(ROOT, pkg),
    stdio: 'inherit',
  });
}

console.log('\nAlle @opubase/opicon Packages veröffentlicht.');
