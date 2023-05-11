import * as vscode from 'vscode'

const renderCopyMenu = () => {
	const editor = vscode.window.activeTextEditor

	if (!editor) {
		return
	}

	const absolutePath = editor.document.fileName
	const relativePath = vscode.workspace.asRelativePath(editor.document.fileName)
	const workspacePath = vscode.workspace.asRelativePath(
		editor.document.fileName,
		true
	)
	const currentLine = editor.selection.active.line + 1
	const relativeWithLine = `${relativePath}:${currentLine}`
	const fileName = relativePath.replace(/^.*[\\\/]/, '')

	vscode.window
		.showQuickPick([
			{ label: 'Absolute Path', description: absolutePath },
			{ label: 'File Name', description: fileName },
			{ label: 'Path With Line Number', description: relativeWithLine },
			{ label: 'Path From Content Root', description: relativePath },
			{ label: 'Path From Workspace Root', description: workspacePath }
		])
		.then((selected) => {
			if (selected) {
				vscode.env.clipboard.writeText(selected?.description)
			}
		})
}

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('copy.path', renderCopyMenu)

	context.subscriptions.push(disposable)
}

export function deactivate() {}
