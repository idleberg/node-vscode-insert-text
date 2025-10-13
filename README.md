# vscode-insert-text

[![License](https://img.shields.io/github/license/idleberg/node-vscode-insert-text?color=blue&style=for-the-badge)](https://github.com/idleberg/node-vscode-insert-text/blob/main/LICENSE)
[![Version: npm](https://img.shields.io/npm/v/vscode-insert-text?style=for-the-badge)](https://www.npmjs.org/package/vscode-insert-text)
![GitHub branch check runs](https://img.shields.io/github/check-runs/idleberg/node-vscode-insert-text/main?style=for-the-badge)

Easily insert text into the active editor

## Installation

`npm install vscode-insert-text -S`

## Usage

```ts
insertText(text: string, appendText: boolean = false, newLine: boolean = false)
```

**Example:**

```js
const { insertText } = require('vscode-insert-text');

insertText('Lorem ipsum');
```

## License

This work is licensed under [The MIT License](LICENSE).
