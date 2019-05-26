// @ts-ignore
import { window } from 'vscode';

interface PackageOptions {
  append?: boolean;
  prepend?: boolean;
  newLine?: boolean;
}

const defaultOptions: PackageOptions = {
  append: false,
  prepend: false,
  newLine: false
};

const insertText = (text: string, userOptions: PackageOptions): void => {
  const activeTextEditor = window.activeTextEditor;
  if (!activeTextEditor) return;

  const options = Object.assign(defaultOptions, userOptions);

  activeTextEditor.edit(
    edit => activeTextEditor.selections.forEach(
      selection => {
        if (!options.append && !options.prepend) {
          edit.delete(selection);
          return edit.insert(selection.start, text);
        }

        if (options.append) {
          const appendText = (options.newLine) ? `\n${text}` : text;
          edit.insert(selection.end, appendText);
        }

        if (options.prepend) {
          const prependText = (options.newLine) ? `${text}\n` : text;
          edit.insert(selection.start, prependText);
        }
      }
    )
  );
};

export {
  insertText
};
