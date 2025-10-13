import { type Position, type TextEditor, window } from 'vscode';

const MAX_TEXT_LENGTH = 1_000_000; // 1MB character limit

export async function insertText(text: string, appendText = false, newLine = false): Promise<boolean> {
	// Input validation
	if (typeof text !== 'string') {
		throw new TypeError('Text parameter must be a string');
	}

	if (text.length > MAX_TEXT_LENGTH) {
		throw new RangeError(`Text exceeds maximum length of ${MAX_TEXT_LENGTH} characters`);
	}

	const activeTextEditor: TextEditor | undefined = window.activeTextEditor;

	if (!activeTextEditor) {
		return false;
	}

	try {
		const success = await activeTextEditor.edit((edit) => {
			for (const selection of activeTextEditor.selections) {
				if (!appendText) edit.delete(selection);

				const location: Position = appendText ? selection.end : selection.start;

				// Apply newLine logic independently based on context
				let value: string = text;
				if (newLine) {
					value = appendText ? `\n${text}` : `${text}\n`;
				}

				edit.insert(location, value);
			}
		});

		return success;
	} catch (error) {
		window.showErrorMessage('Error inserting text. See console for details.');
		console.error(`Failed to insert text: ${error instanceof Error ? error.message : String(error)}`);

		return false;
	}
}
