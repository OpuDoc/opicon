<p align="center">
  <strong>Opicon icon library for Angular applications.</strong>
  <br /><br />
  <a href="https://www.npmjs.com/package/@opudoc/opicon-angular"><img src="https://img.shields.io/npm/v/%40opudoc%2Fopicon-angular?color=blue" alt="npm" /></a>
  <img src="https://img.shields.io/npm/dt/%40opudoc%2Fopicon-angular" alt="NPM Downloads" />
  <a href="https://opicon.net"><img src="https://img.shields.io/badge/website-opicon.net-9E9CFC" alt="website" /></a>
  <a href="https://github.com/OpuDoc/opicon/blob/main/LICENSE.md"><img src="https://img.shields.io/badge/license-ISC-green" alt="License" /></a>
  <br /><br />
  <a href="https://opicon.net">Website</a>
  ·
  <a href="https://github.com/OpuDoc/opicon">About</a>
  ·
  <a href="https://github.com/OpuDoc/opicon/tree/main/icons">Icons</a>
  ·
  <a href="https://github.com/OpuDoc/opicon/tree/main/packages/opicon-angular">Source</a>
  ·
  <a href="https://github.com/OpuDoc/opicon/blob/main/LICENSE.md">License</a>
</p>

# Opicon Angular

Implementation of the Opicon icon library for Angular applications.

## Installation

```sh
pnpm add @opudoc/opicon-angular
```

```sh
npm install @opudoc/opicon-angular
```

```sh
yarn add @opudoc/opicon-angular
```

```sh
bun add @opudoc/opicon-angular
```

## Usage

```ts
import { Component } from '@angular/core';
import { ArrowBoldArrowUp03 } from '@opudoc/opicon-angular';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ArrowBoldArrowUp03],
  template: `<opicon-arrow-bold-arrow-up-03 />`,
})
export class ExampleComponent {}
```

## License

Opicon is licensed under the ISC license. See [LICENSE](https://github.com/OpuDoc/opicon/blob/main/LICENSE.md).
