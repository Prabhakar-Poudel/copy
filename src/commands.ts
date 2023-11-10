import { window, env } from 'vscode'
import { getDescriptions } from './utils'

const copySpecificPath = (
	command: keyof ReturnType<typeof getDescriptions>
) => {
	const editor = window.activeTextEditor
	if (!editor) {
		return
	}

	const descriptions = getDescriptions(editor)
	env.clipboard.writeText(descriptions[command])
}

export const copyRelativePath = () => copySpecificPath('relativePath')

export const copyPathWithLineNum = () => copySpecificPath('relativeWithLine')

export const copyAbsolutePath = () => copySpecificPath('absolutePath')

export const copyFileName = () => copySpecificPath('fileName')

export const copyPathFromWorkspaceRoot = () => copySpecificPath('workspacePath')
