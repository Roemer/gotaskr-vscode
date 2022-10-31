import * as vscode from "vscode";
import GotaskrCodeLensProvider from "./codelens";
import { installGotaskrRunTaskCommand } from "./gotaskrRunTaskCommand";

export function activate(context: vscode.ExtensionContext) {
  console.log('Loaded extension "vscode-gotaskr"!');

  context.subscriptions.push(
    vscode.commands.registerCommand("vscode-gotaskr.runTask", async (taskName: string, fileName: string) => {
      vscode.window.showInformationMessage("runTask from vscode-gotaskr");

      installGotaskrRunTaskCommand(taskName, fileName, context);
    })
  );

  vscode.languages.registerCodeLensProvider({ language: "go" }, new GotaskrCodeLensProvider());
}

export function deactivate() {}
