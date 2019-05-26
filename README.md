# vscode-insert-text

[![npm](https://flat.badgen.net/npm/license/vscode-insert-text)](https://www.npmjs.org/package/vscode-insert-text)
[![npm](https://flat.badgen.net/npm/v/vscode-insert-text)](https://www.npmjs.org/package/vscode-insert-text)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/node-vscode-insert-text)](https://circleci.com/gh/idleberg/node-vscode-insert-text)
[![David](https://flat.badgen.net/david/dep/idleberg/node-vscode-insert-text)](https://david-dm.org/idleberg/node-vscode-insert-text)

Easily insert text into the active editor

## Installation

`npm install vscode-insert-text -S`

## Usage

`insertText(text: string, options: Object)`

**Example:**

```js
const { insertText } = require('vscode-insert-text');

insertText('Lorem ipsum');
```
### Options

#### `options.append: bool`

Default: `false`

Appends text to current selection

#### `options.prepend: bool`

Default: `false`

Prepends text to current selection

#### `options.newLine: bool`

Default: `false`

Inserts a new line before or after the inserted text. Only worky with `options.append` or `options.prepend`.

## License

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)

## Donate

You are welcome to support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/node-vscode-insert-text) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
