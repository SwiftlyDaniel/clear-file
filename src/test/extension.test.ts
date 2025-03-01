import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', function () {
	vscode.window.showInformationMessage('Start all tests.');

	test('Clear file contents', async () => {
		process.env.NODE_ENV = 'test';
		const document = await vscode.workspace.openTextDocument({ content: 'Hello, world!' });
		await vscode.window.showTextDocument(document);

		await vscode.commands.executeCommand('clear-file.clearFile');

		assert.strictEqual(document.getText(), '');
	});
});
