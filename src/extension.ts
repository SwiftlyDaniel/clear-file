import * as vscode from 'vscode';

const SUCCESS_MESSAGE = 'File cleared successfully!';
const FAILURE_MESSAGE = 'Failed to clear file.';
const NO_EDITOR_MESSAGE = 'No active editor found.';

async function clearFileCommand(): Promise<void> {
	try {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showWarningMessage(NO_EDITOR_MESSAGE);
			return;
		}

		const document = editor.document;
		const fullRange = document.validateRange(new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE));

		const edit = new vscode.WorkspaceEdit();
		edit.replace(document.uri, fullRange, '');

		const success = await vscode.workspace.applyEdit(edit);
		if (success) {
			if (process.env.NODE_ENV !== 'test') {
				await document.save();
			}
			vscode.window.showInformationMessage(SUCCESS_MESSAGE);
		} else {
			vscode.window.showErrorMessage(FAILURE_MESSAGE);
		}
	} catch (error: any) {
		vscode.window.showErrorMessage(`An unexpected error occurred: ${error.message}`);
	}
}

export function activate(context: vscode.ExtensionContext): void {
	const disposable = vscode.commands.registerCommand('clear-file.clearFile', clearFileCommand);
	context.subscriptions.push(disposable);
}

export function deactivate(): void { }
