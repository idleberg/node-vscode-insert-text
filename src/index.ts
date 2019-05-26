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

  if (options.append && options.prepend) {
    throw 'Conflicting options';
  }

  activeTextEditor.edit(
    edit => activeTextEditor.selections.forEach(
      (selection, index) => {
        if (!options.append && !options.prepend) {
          edit.delete(selection);
          return edit.insert(selection.start, text);
        }

        if (options.append) {
          text = (options.newLine) ? `\n${text}` : text;
          edit.insert(selection.end, text);
        }

        if (options.prepend) {
          text = (options.newLine) ? `${text}\n` : text;
          edit.insert(selection.start, text);
        }

      }
    )
  );
};

export {
  insertText
};
