import { TextEditor, env, commands, window, QuickPick } from 'vscode'
import { QuickPickOption } from './types'
import { getDescriptions, gitHubCommands, gitLensCommands } from './utils'

const getBaseCopyOptions = (editor: TextEditor): QuickPickOption[] => {
	const {
		relativePath,
		relativeWithLine,
		absolutePath,
		fileName,
		workspacePath
	} = getDescriptions(editor)

	return [
		{ label: '$(code) Path with line number', description: relativeWithLine },
		{ label: '$(code) Path from content root', description: relativePath },
		{ label: '$(code) Absolute path', description: absolutePath },
		{ label: '$(code) File name', description: fileName },
		{ label: '$(code) Path from workspace root', description: workspacePath }
	]
}

const getQuickPickOptions = (editor: TextEditor) => {
	const quickPickOptions = getBaseCopyOptions(editor)
	quickPickOptions.push(...gitHubCommands())
	quickPickOptions.push(...gitLensCommands())

	return quickPickOptions
}

const showSuccess = () => {
	const statusBarItem = window.setStatusBarMessage(
		'$(pass) Copied to clipboard'
	)
	setTimeout(() => {
		statusBarItem.dispose()
	}, 3000)
}

const execute = (selected: QuickPickOption) => {
	if (selected.description) {
		env.clipboard.writeText(selected.description)
	} else if (selected.command) {
		commands.executeCommand(selected.command)
	}
}

const onDidAccept = (qp: QuickPick<QuickPickOption>) => {
	const selected = qp.selectedItems[0]
	if (selected) {
		execute(selected)
	}
	qp.hide()
}

let timeout: NodeJS.Timeout | undefined

const onDidChangeValue = (qp: QuickPick<QuickPickOption>) => {
	clearTimeout(timeout)
	const index = parseInt(qp.value, 10)
	const quickPickOptions = qp.items
	if (quickPickOptions[index]) {
		timeout = setTimeout(() => {
			execute(quickPickOptions[index])
			showSuccess()
			qp.hide()
		}, 500)
		execute(quickPickOptions[index])
	}
}

const onDidHide = (qp: QuickPick<QuickPickOption>) => {
	clearTimeout(timeout)
	qp.dispose()
}

const setupQuickPick = (editor: TextEditor) => {
	const qp = window.createQuickPick<QuickPickOption>()
	qp.items = getQuickPickOptions(editor)
	qp.placeholder = 'Select or enter index to copy'
	qp.onDidAccept(() => onDidAccept(qp))
	qp.onDidChangeValue(() => onDidChangeValue(qp))
	qp.onDidHide(() => onDidHide(qp))
	qp.show()
}

export const renderCopyQuickPick = () => {
	const editor = window.activeTextEditor
	if (!editor) {
		return
	}

	setupQuickPick(editor)
}
