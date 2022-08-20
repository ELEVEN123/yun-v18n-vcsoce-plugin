// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');


/**
 * @param {vscode.ExtensionContext} context
 * 
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('yun-v18n-plugin.helloWorld', function () {
		
		// 功能一：文案悬浮显示
		const workSpaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath ?? "";
		const configPath = "src/i18n/lang/zh.js";
		const zhLocalePath = path.resolve(workSpaceFolder, configPath);
		console.log('zhLocalePath',zhLocalePath)		
		const fileContent = fs.readFileSync(zhLocalePath, "utf8")
		console.log('类型',typeof(fileContent))
		// debugger
		// 这边解析不出来，应该怎么搞呢，怎么把js文件中的值解析出来呢
		const zhJSON = JSON.parse(fileContent);

		vscode.languages.registerHoverProvider("*", {
		  provideHover: async (document, position) => {
			const word = document.getText(document.getWordRangeAtPosition(position))

			return new vscode.Hover("hoverTile")
		  }
		})

		//功能二：文案替换		
		// const { activeTextEditor } = vscode.window // 获取当前聚焦的文本编辑器
		// // activeTextEditor!.selection 当前选中的范围		
		// activeTextEditor.edit(editBuilder => {
		// 	editBuilder.replace(activeTextEditor.selection, 'hello')
		// })
		
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
