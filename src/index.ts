// @ts-ignore
import { TextEditor, Selection, window } from 'vscode';

interface PackageOptions {
  append?: boolean;
  newLine?: boolean;
}

const defaultOptions: PackageOptions = {
  append: false,
  newLine: false
};

const insertText = (text: string, userOptions: PackageOptions): void => {
  const activeTextEditor: TextEditor|undefined = window.activeTextEditor;
  if (!activeTextEditor) return;

  const options: PackageOptions = Object.assign(defaultOptions, userOptions);

  activeTextEditor.edit(
    edit => activeTextEditor.selections.forEach(
      selection => {
        if (!options.append) edit.delete(selection);

        const position: Selection = (options.append) ? selection.end : selection.start;
        const textStr: string = (options.append && options.newLine) ? `\n${text}` : text;

        edit.insert(position, textStr);
      }
    )
  );
};

export {
  insertText
};
