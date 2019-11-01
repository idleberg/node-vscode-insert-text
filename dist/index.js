"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var vscode_1 = require("vscode");
var insertText = function (text, appendText, newLine) {
    if (appendText === void 0) { appendText = false; }
    if (newLine === void 0) { newLine = false; }
    var activeTextEditor = vscode_1.window.activeTextEditor;
    if (!activeTextEditor)
        return;
    activeTextEditor.edit(function (edit) { return activeTextEditor.selections.forEach(function (selection) {
        if (appendText)
            edit.delete(selection);
        var position = (appendText) ? selection.end : selection.start;
        var textStr = (appendText && newLine) ? "\n" + text : text;
        edit.insert(position, textStr);
    }); });
};
exports.insertText = insertText;
