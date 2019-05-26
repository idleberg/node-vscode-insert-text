"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var vscode_1 = require("vscode");
var defaultOptions = {
    append: false,
    newLine: false
};
var insertText = function (text, userOptions) {
    if (userOptions === void 0) { userOptions = {}; }
    var activeTextEditor = vscode_1.window.activeTextEditor;
    if (!activeTextEditor)
        return;
    var options = Object.assign(defaultOptions, userOptions);
    activeTextEditor.edit(function (edit) { return activeTextEditor.selections.forEach(function (selection) {
        if (!options.append)
            edit.delete(selection);
        var position = (options.append) ? selection.end : selection.start;
        var textStr = (options.append && options.newLine) ? "\n" + text : text;
        edit.insert(position, textStr);
    }); });
};
exports.insertText = insertText;
