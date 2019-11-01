// @ts-ignore
import { TextEditor, Selection, window } from 'vscode';

const insertText = (text: string, appendText: boolean = false, newLine: boolean = false): void => {
  const activeTextEditor: TextEditor|undefined = window.activeTextEditor;
  if (!activeTextEditor) return;

  activeTextEditor.edit(
    edit => activeTextEditor.selections.forEach(
      selection => {
        if (!appendText) edit.delete(selection);

        const position: Selection = (appendText) ? selection.end : selection.start;
        const textStr: string = (appendText && newLine) ? `\n${text}` : text;

        edit.insert(position, textStr);
      }
    )
  );
};

export {
  insertText
};
