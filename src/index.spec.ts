import { beforeEach, describe, expect, it, vi } from 'vitest';
import { insertText } from './index.ts';

// Mock vscode module using vi.hoisted to ensure proper hoisting
const { mockEdit, mockSelection, mockTextEditor, mockWindow } = vi.hoisted(() => {
	const mockEdit = {
		delete: vi.fn(),
		insert: vi.fn(),
	};

	const mockSelection = {
		start: { line: 0, character: 0 },
		end: { line: 0, character: 5 },
	};

	const mockTextEditor = {
		selections: [mockSelection],
		edit: vi.fn(),
	};

	const mockWindow = {
		activeTextEditor: mockTextEditor,
		showErrorMessage: vi.fn(),
	};

	return { mockEdit, mockSelection, mockTextEditor, mockWindow };
});

vi.mock('vscode', () => ({
	window: mockWindow,
}));

describe('insertText', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockWindow.activeTextEditor = mockTextEditor;
		mockTextEditor.edit.mockImplementation(async (callback) => {
			callback(mockEdit);
			return true;
		});
	});

	describe('input validation', () => {
		it('should throw TypeError if text is not a string', async () => {
			// @ts-expect-error - Testing invalid input
			await expect(insertText(123)).rejects.toThrow(TypeError);
			// @ts-expect-error - Testing invalid input
			await expect(insertText(null)).rejects.toThrow(TypeError);
			// @ts-expect-error - Testing invalid input
			await expect(insertText(undefined)).rejects.toThrow(TypeError);
		});

		it('should throw RangeError if text exceeds maximum length', async () => {
			const longText = 'a'.repeat(1_000_001);
			await expect(insertText(longText)).rejects.toThrow(RangeError);
			await expect(insertText(longText)).rejects.toThrow('Text exceeds maximum length');
		});

		it('should accept text at maximum length', async () => {
			const maxText = 'a'.repeat(1_000_000);
			await expect(insertText(maxText)).resolves.toBe(true);
		});
	});

	describe('editor availability', () => {
		it('should return false if no active text editor', async () => {
			// @ts-expect-error - Testing undefined editor
			mockWindow.activeTextEditor = undefined;
			const result = await insertText('test');
			expect(result).toBe(false);
		});
	});

	describe('text insertion', () => {
		it('should insert text at selection start by default (replace mode)', async () => {
			await insertText('hello');

			expect(mockEdit.delete).toHaveBeenCalledWith(mockSelection);
			expect(mockEdit.insert).toHaveBeenCalledWith(mockSelection.start, 'hello');
		});

		it('should append text at selection end when appendText is true', async () => {
			await insertText('hello', true);

			expect(mockEdit.delete).not.toHaveBeenCalled();
			expect(mockEdit.insert).toHaveBeenCalledWith(mockSelection.end, 'hello');
		});

		it('should handle multiple selections', async () => {
			const selection1 = { start: { line: 0, character: 0 }, end: { line: 0, character: 5 } };
			const selection2 = { start: { line: 1, character: 0 }, end: { line: 1, character: 3 } };
			mockTextEditor.selections = [selection1, selection2];

			await insertText('test');

			expect(mockEdit.delete).toHaveBeenCalledTimes(2);
			expect(mockEdit.insert).toHaveBeenCalledTimes(2);
		});
	});

	describe('newLine option', () => {
		it('should add newline after text when newLine is true and appendText is false', async () => {
			await insertText('hello', false, true);

			expect(mockEdit.insert).toHaveBeenCalledWith(mockSelection.start, 'hello\n');
		});

		it('should add newline before text when newLine is true and appendText is true', async () => {
			await insertText('hello', true, true);

			expect(mockEdit.insert).toHaveBeenCalledWith(mockSelection.end, '\nhello');
		});

		it('should not add newline when newLine is false', async () => {
			await insertText('hello', false, false);

			expect(mockEdit.insert).toHaveBeenCalledWith(mockSelection.start, 'hello');
		});
	});

	describe('error handling', () => {
		it('should show error message and log error when edit fails', async () => {
			const error = new Error('Edit failed');
			mockTextEditor.edit.mockRejectedValueOnce(error);
			console.error = vi.fn();

			const result = await insertText('test');

			expect(result).toBe(false);
			expect(mockWindow.showErrorMessage).toHaveBeenCalledWith('Error inserting text. See console for details.');
			expect(console.error).toHaveBeenCalledWith('Failed to insert text: Edit failed');
		});

		it('should handle non-Error objects in catch block', async () => {
			mockTextEditor.edit.mockRejectedValueOnce('string error');
			console.error = vi.fn();

			await insertText('test');

			expect(console.error).toHaveBeenCalledWith('Failed to insert text: string error');
		});
	});

	describe('return values', () => {
		it('should return true when edit succeeds', async () => {
			mockTextEditor.edit.mockResolvedValueOnce(true);
			const result = await insertText('test');
			expect(result).toBe(true);
		});

		it('should return false when edit fails', async () => {
			mockTextEditor.edit.mockResolvedValueOnce(false);
			const result = await insertText('test');
			expect(result).toBe(false);
		});
	});

	describe('empty string', () => {
		it('should handle empty string insertion', async () => {
			await insertText('');

			expect(mockEdit.delete).toHaveBeenCalledWith(mockSelection);
			expect(mockEdit.insert).toHaveBeenCalledWith(mockSelection.start, '');
		});
	});
});
