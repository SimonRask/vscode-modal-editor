import { Command } from "./actions";
import { isCommand } from "./actions.guard";

/**
 * Each key can be mapped to a command or a sub key map
 *
 * @see {isKeymap} ts-auto-guard:type-guard
 */
export type Keymap = {
	[key: string]: Keymap | Command
}

/**
 * There are multiple modes in the key bindings.
 * Each mode has a key map
 *
 * @see {isKeybindings} ts-auto-guard:type-guard
 */
export type Keybindings = {
	[mode: string]: Keymap
}


export class KeyEventHandler {
	/// The current keymap (because there could be sub key maps)
	currentKeymap: Keymap;
	
	constructor(public keymap: Keymap) {
		this.currentKeymap = keymap;
	}

	handle(key: string) {
		if (key in this.keymap) {
			const value = this.currentKeymap[key];
			if (isCommand(value))
				return value;
			else {
				// value is a key map
				this.currentKeymap = value;
			}
		}
	}
	
	/// Clear state
	clear() {
		this.currentKeymap = this.keymap;
	}
}
