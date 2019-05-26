// @ts-ignore
import { window } from 'vscode';

const insertText = (text: string): void => {
  const activeTextEditor = window.activeTextEditor;

  activeTextEditor.edit(
    edit => activeTextEditor.selections.forEach(
      (selection, index) => {
        edit.delete(selection);
        edit.insert(selection.start, text);
      }
    )
  );
};

export {
  insertText
};
