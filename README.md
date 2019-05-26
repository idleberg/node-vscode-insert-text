# vscode-insert-text

[![npm](https://flat.badgen.net/npm/license/vscode-insert-text)](https://www.npmjs.org/package/vscode-insert-text)
[![npm](https://flat.badgen.net/npm/v/vscode-insert-text)](https://www.npmjs.org/package/vscode-insert-text)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/node-vscode-insert-text)](https://circleci.com/gh/idleberg/node-vscode-insert-text)
[![David](https://flat.badgen.net/david/dep/idleberg/node-vscode-insert-text)](https://david-dm.org/idleberg/node-vscode-insert-text)

Easily insert text into the active editor

## Installation

`npm install vscode-insert-text -S`

## Usage

### `insertText(text: string)`

Inserts text at the current cursor position(s)

**Example:**

```js
const { insertText } = require('vscode-insert-text');

insertText('Lorem ipsum');
```

## License

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)

## Donate

You are welcome to support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/node-vscode-insert-text) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
