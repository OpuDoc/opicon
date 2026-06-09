<p align="center">
  <strong>Opicon icon library for web applications.</strong>
  <br /><br />
  <a href="https://www.npmjs.com/package/@opudoc/opicon"><img src="https://img.shields.io/npm/v/%40opudoc%2Fopicon?color=blue" alt="npm" /></a>
  <img src="https://img.shields.io/npm/dt/%40opudoc%2Fopicon" alt="NPM Downloads" />
  <a href="https://github.com/OpuDoc/opicon/blob/main/LICENSE.md"><img src="https://img.shields.io/badge/license-ISC-green" alt="License" /></a>
  <br /><br />
  <a href="https://github.com/OpuDoc/opicon">About</a>
  ·
  <a href="https://github.com/OpuDoc/opicon/tree/main/icons">Icons</a>
  ·
  <a href="https://github.com/OpuDoc/opicon/tree/main/packages/opicon">Source</a>
  ·
  <a href="https://github.com/OpuDoc/opicon/blob/main/LICENSE.md">License</a>
</p>

# Opicon

Implementation of the Opicon icon library for web applications.

## Installation

```sh
pnpm add @opudoc/opicon
```

```sh
npm install @opudoc/opicon
```

```sh
yarn add @opudoc/opicon
```

```sh
bun add @opudoc/opicon
```

## Usage

```js
import { createElement, ArrowBoldArrowUp03 } from '@opudoc/opicon';

const svg = createElement(ArrowBoldArrowUp03, { size: 24, color: 'currentColor' });
document.body.appendChild(svg);
```

Replace attributes on elements with `data-opicon`:

```html
<i data-opicon="arrow-bold-arrow-up-03"></i>
```

```js
import { createIcons, icons } from '@opudoc/opicon';

createIcons({ icons });
```

## License

Opicon is licensed under the ISC license. See [LICENSE](https://github.com/OpuDoc/opicon/blob/main/LICENSE.md).
