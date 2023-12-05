import { TextEditor, extensions, workspace } from 'vscode'
import { gitHubOptions, gitLensOptions } from './constants'

export const getDescriptions = (editor: TextEditor) => {
	const absolutePath = editor.document.fileName
	const relativePath = workspace.asRelativePath(absolutePath)
	const workspacePath = workspace.asRelativePath(absolutePath, true)
	const currentLine = editor.selection.active.line + 1
	const relativeWithLine = `${relativePath}:${currentLine}`
	const fileName = relativePath.replace(/^.*[\\\/]/, '')
	const absolutePathWithLine = `${editor.document.uri.toString()}#${currentLine}`

	return {
		absolutePath,
		relativePath,
		workspacePath,
		relativeWithLine,
    absolutePathWithLine,
		fileName
	}
}

export const gitHubCommands = () => {
	const extension = extensions.getExtension('GitHub.vscode-pull-request-github')

	return extension?.isActive ? gitHubOptions : []
}

export const gitLensCommands = () => {
	const extension = extensions.getExtension('eamodio.gitlens')
	return extension?.isActive ? gitLensOptions : []
}
