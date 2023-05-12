import * as vscode from "vscode";
import GotaskrCodeLensProvider from "./codelens";
import { installGotaskrRunTaskCommand } from "./gotaskrRunTaskCommand";
import { installGotaskrDebugTaskCommand } from "./gotaskrDebugTaskCommand";
import TerminalRunner from "./terminalRunner";

export function activate(context: vscode.ExtensionContext) {
  console.log('Loaded extension "gotaskr-vscode"!');

  if (("onDidCloseTerminal" in vscode.window) as any) {
    (vscode.window as any).onDidCloseTerminal((terminal: vscode.Terminal) => {
      TerminalRunner.onDidCloseTerminal(terminal);
    });
  }

  context.subscriptions.push(
    vscode.commands.registerCommand("gotaskr-vscode.runTask", async (taskName: string, fileName: string, additionalArguments :string) => {
      if (additionalArguments) {
        vscode.window.showInformationMessage(`Running gotaskr task "${taskName}" with arguments`);
      } else {        
        vscode.window.showInformationMessage(`Running gotaskr task "${taskName}"`);
      }
      installGotaskrRunTaskCommand(taskName, fileName, additionalArguments, context);
    }),
    vscode.commands.registerCommand("gotaskr-vscode.debugTask", async (taskName: string, fileName: string, additionalArguments :string) => {
      if (additionalArguments) {
        vscode.window.showInformationMessage(`Debugging gotaskr task "${taskName}" with arguments`);
      } else {        
        vscode.window.showInformationMessage(`Debugging gotaskr task "${taskName}"`);
      }
      installGotaskrDebugTaskCommand(taskName, fileName, additionalArguments, context);
    })
  );

  vscode.languages.registerCodeLensProvider({ language: "go" }, new GotaskrCodeLensProvider());
}

export function deactivate() {}
