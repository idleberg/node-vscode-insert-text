import { TextEditor, Position, window } from 'vscode';

const insertText = (text: string, appendText = false, newLine = false): void => {
  const activeTextEditor: TextEditor | undefined = window.activeTextEditor;

  if (!activeTextEditor) return;

  activeTextEditor.edit(
    edit => activeTextEditor.selections.map(
      selection => {
        if (!appendText) edit.delete(selection);

        const location: Position = appendText
          ? selection.end
          : selection.start;

        const value: string = appendText && newLine
          ? `\n${text}`
          : text;

        edit.insert(location, value);
      }
    )
  );
};

export {
  insertText
};
