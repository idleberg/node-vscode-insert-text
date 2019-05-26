"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var vscode_1 = require("vscode");
var defaultOptions = {
    append: false,
    prepend: false,
    newLine: false
};
var insertText = function (text, userOptions) {
    var activeTextEditor = vscode_1.window.activeTextEditor;
    if (!activeTextEditor)
        return;
    var options = Object.assign(defaultOptions, userOptions);
    activeTextEditor.edit(function (edit) { return activeTextEditor.selections.forEach(function (selection) {
        if (!options.append && !options.prepend) {
            edit.delete(selection);
            return edit.insert(selection.start, text);
        }
        if (options.append) {
            var appendText = (options.newLine) ? "\n" + text : text;
            edit.insert(selection.end, appendText);
        }
        if (options.prepend) {
            var prependText = (options.newLine) ? text + "\n" : text;
            edit.insert(selection.start, prependText);
        }
    }); });
};
exports.insertText = insertText;
