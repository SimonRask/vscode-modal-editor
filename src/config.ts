import * as vscode from "vscode";
import { Keybindings } from "./keybindings";
import { isKeybindings } from "./keybindings.guard";


/**
 * Styles: Styles for cursor and statusBar
 *
 * @see {isStyles} ts-auto-guard:type-guard
 */
export type Styles = {
	[mode: string]: {
		cursorStyle: vscode.TextEditorCursorStyle;
		statusText: string;
	}
};

/**
 * Config: including styles and keybindings
 *
 * @see {isConfig} ts-auto-guard:type-guard
 */
export type Config = {
	styles: Styles,
	keybindings: Keybindings
};

/// Default config
const defaultStyles: Styles = {
		insert: {
			cursorStyle: vscode.TextEditorCursorStyle.Line,
			statusText: "-- INS --"
		},
		normal: {
			cursorStyle: vscode.TextEditorCursorStyle.Block,
			statusText: "-- NOR --"
		},
		select: {
			cursorStyle: vscode.TextEditorCursorStyle.Block,
			statusText: "-- SEL --"
		},
		search: {
			cursorStyle: vscode.TextEditorCursorStyle.Underline,
			statusText: "SEARCH"
	}
};

const defaultKeybindings: Keybindings = {
	normal: {},
	insert: {}
};

/// Read config from settings.json
export function readConfig() {
	const config = vscode.workspace.getConfiguration("modalEditor");
	let keybindings = config.get("keybindings");
	if (!isKeybindings(keybindings)) {
		vscode.window.showErrorMessage("Invalid keybindings in config");
		keybindings = defaultKeybindings;
	}

	// TODO: convert cursor styles from string to style and merge them)
	let styles = defaultStyles;
	return {
		styles,
		keybindings
	} as Config;
}

