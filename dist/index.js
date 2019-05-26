"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var vscode_1 = require("vscode");
var insertText = function (text) {
    var activeTextEditor = vscode_1.window.activeTextEditor;
    activeTextEditor.edit(function (edit) { return activeTextEditor.selections.forEach(function (selection, index) {
        edit.delete(selection);
        edit.insert(selection.start, text);
    }); });
};
exports.insertText = insertText;
