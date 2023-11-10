import { commands } from 'vscode'
import { renderCopyQuickPick } from './quickPick'
import {
	copyRelativePath,
	copyPathWithLineNum,
	copyAbsolutePath,
	copyFileName,
	copyPathFromWorkspaceRoot
} from './commands'

const registerCommand = (command: string, callback: () => void) => {
	return commands.registerCommand(command, callback)
}

export const registerCommands = () => [
	registerCommand('copy.path', renderCopyQuickPick),
	registerCommand('copy.relativePath', copyRelativePath),
	registerCommand('copy.pathWithLineNum', copyPathWithLineNum),
	registerCommand('copy.absolutePath', copyAbsolutePath),
	registerCommand('copy.fileName', copyFileName),
	registerCommand('copy.pathFromWorkspaceRoot', copyPathFromWorkspaceRoot)
]
