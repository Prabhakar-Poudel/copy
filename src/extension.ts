import * as vscode from 'vscode'
import { gitLensOptions, gitHubOptions } from './constants'

interface QuickPickOption extends vscode.QuickPickItem {
	command?: string
}

const gitHubCommands = () => {
	const extension = vscode.extensions.getExtension(
		'GitHub.vscode-pull-request-github'
	)

	return extension?.isActive ? gitHubOptions : []
}

const gitLensCommands = () => {
	const extension = vscode.extensions.getExtension('eamodio.gitlens')
	return extension?.isActive ? gitLensOptions : []
}

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

	const quickPickOptions: QuickPickOption[] = [
		{ label: 'Absolute Path', description: absolutePath },
		{ label: 'File Name', description: fileName },
		{ label: 'Path With Line Number', description: relativeWithLine },
		{ label: 'Path From Content Root', description: relativePath },
		{ label: 'Path From Workspace Root', description: workspacePath }
	]

	quickPickOptions.push(...gitHubCommands())
	quickPickOptions.push(...gitLensCommands())

	vscode.window.showQuickPick(quickPickOptions).then((selected) => {
		if (selected) {
			if (selected.description) {
				vscode.env.clipboard.writeText(selected.description)
			} else if (selected.command) {
				vscode.commands.executeCommand(selected.command)
			}
		}
	})
}

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('copy.path', renderCopyMenu)

	context.subscriptions.push(disposable)
}

export function deactivate() {}
