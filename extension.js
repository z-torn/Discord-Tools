// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// Others
const pyTools = require('./src/pyTools.js');
const jsTools = require('./src/jsTools.js');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "discord-tools" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    
    // Generate a python template bot (Discord.py)
	let pyBotTemplate = vscode.commands.registerCommand('discord-tools.pyBotTemplate', function () {
        pyTools.pyCreateTemplateBot();
	});
    context.subscriptions.push(pyBotTemplate);
    
    // Generate a javascript template bot (Discord.js)
	let jsBotTemplate = vscode.commands.registerCommand('discord-tools.jsBotTemplate', async () =>  {

        const legend = {

			"Do not install packages": {
                "packages": false
			},

			"Install packages": {
                "packages": true,
				"package_manager": { "npm": "npm install ", "yarn": "yarn install" }
			}
		};


		let library = await vscode.window.showQuickPick(Object.keys(legend), { "placeHolder": "Select" });
		if (library) {

            library = legend[library]
            
            if (library["packages"] == true) {
                
                let packageManager = await vscode.window.showQuickPick(Object.keys(library.package_manager), { "placeHolder": 'Select a package manager' });
                
                if (packageManager) {
                    // Create the bot template
                    jsTools.jsCreateTemplateBot();
                    
                    // Download packages
                    let terminal = vscode.window.createTerminal({ "hideFromUser": false, "name": "Install packages"});
                    terminal.show();
                    terminal.sendText(library.package_manager[packageManager]);
                    
                    vscode.window.showInformationMessage("Packages downloaded!");
                }
            } else {
                // Create the bot template
                jsTools.jsCreateTemplateBot();
            }  
        };
	});
	context.subscriptions.push(jsBotTemplate);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
