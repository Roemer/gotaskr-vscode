import * as vscode from "vscode";
import GotaskrCodeLensProvider from "./codelens";
import { installGotaskrRunTaskCommand } from "./gotaskrRunTaskCommand";
import TerminalRunner from "./terminalRunner";

export function activate(context: vscode.ExtensionContext) {
  console.log('Loaded extension "gotaskr-vscode"!');

  if (("onDidCloseTerminal" in vscode.window) as any) {
    (vscode.window as any).onDidCloseTerminal((terminal: vscode.Terminal) => {
      TerminalRunner.onDidCloseTerminal(terminal);
    });
  }

  context.subscriptions.push(
    vscode.commands.registerCommand("gotaskr-vscode.runTask", async (taskName: string, fileName: string) => {
      vscode.window.showInformationMessage(`Running gotaskr task "${taskName}"`);

      installGotaskrRunTaskCommand(taskName, fileName, context);
    })
  );

  vscode.languages.registerCodeLensProvider({ language: "go" }, new GotaskrCodeLensProvider());
}

export function deactivate() {}
