# vscode-modal-editor

Customizable extension to turn VS Code into a modal editor 

## Installation

Currently it is published on [Open VSX](https://open-vsx.org/),
which is believed to be a vendor-neutral
open-source alternative to the Visual Studio Marketplace.

You can also download the extension directly from GitHub releases.


## Features

* Easy to customize your key type to emulate other modal editors.
* Recursive keymaps (easy to add multi-stage keybindings)


## Importing Keybindings

To add keybindings, you can create a config file in `json`, `jsonc`, or `js` format.
(for `js` format, export the configuration object using `module.exports`).

To import existing keybindings, run the command "Modal Editor: Import Keybindings" from the command palette.
You can select a file or use a URI.

There is a preset for helix in this repository.
It is just a demo and you can easily create your own based on it.


## Presets

I am currently a user of [helix](https://github.com/helix-editor/helix),
so I only create a preliminary preset for it.
It doesn't implement all helix features and some actions may have slight differences.

You are encouraged to define your own keybindings
since this extension aims at a general modal editor.


## Commands

This extension define some extra VS commands.
They are listed as follows:

| Command | Arguments | Description |
| - | - | - |
| `modalEditor.setMode` | `string` | Set the current mode |
| `modalEditor.setInsertMode` | - | Set to insert mode |
| `modalEditor.setNormalMode` | - | Set to normal mode |
| `modalEditor.setSelectMode` | - |	 Set to select mode |
| `modalEditor.importKeybindings` | - | Import keybindings |

## Tutorial to Customize Keybindings

There are 3 predefined modes (`normal`, `insert`, `select`) in this extension,
but you are free to add more modes.

Keybindings can be defined for all modes except for insert mode,
because this extension will handle over to VS Code in insert mode.

The keybindings object is defined in the following format (in TypeScript):

```ts
type Keymap = {
	[key: string]: Keymap | Command
}
type Keybindings = {
	[mode: string]: Keymap
}
```

The above definition means that each mode has a separate keymap,
each keymap maps a key to a sub-keymap or a command.
Recursive keymaps are useful to define multi-stage commands.

The command can be a string (which means a VS Code command),
a list of commmands,
or a complex command object:

```ts
type ComplexCommand = {
	command: string,
	args?: any,
	// Condition to execute the above command
	when?: string
};
````


Here is a code snippet from `helix.js` preset:

```js
module.exports = {
	normal: {
		i: "modalEditor.setInsertMode",
    // cursor movement
		h: "cursorLeft",
		j: "cursorDown",
		k: "cursorUp",
		l: "cursorRight",
		w: [
			"cancelSelection",
			"cursorWordStartRightSelect",
		],
	  b: [
			"cancelSelection",
			"cursorWordStartLeftSelect"
		]
	}
}
```

So it maps some movement keys to some existing commands in VS Code,
which leverages the built-in text manipulation.
You can refer to the `presets/helix.js` for more examples.


## Acknowledgement

This extension is greatly inspired by
[ModalKeys](https://github.com/haberdashPI/vscode-modal-keys)
and
[ModalEdit](https://github.com/johtela/vscode-modaledit).
This extension borrows a lot of ideas from them
thanks to their detailed documentation.

The main difference between this extension and the above two is the philosophy:
this extension tries to reuse most VS Code native commands
and avoids adding more state control.
This makes it easier to understand the code and further extend it.


## License

Copyright (C) 2022 DCsunset

Licensed under the [AGPLv3](LICENSE) license.

