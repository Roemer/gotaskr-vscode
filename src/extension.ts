import * as vscode from "vscode";
import GotaskrCodeLensProvider from "./codelens";
import { installGotaskrRunTaskCommand } from "./gotaskrRunTaskCommand";

export function activate(context: vscode.ExtensionContext) {
  console.log('Loaded extension "gotaskr-vscode"!');

  context.subscriptions.push(
    vscode.commands.registerCommand("gotaskr-vscode.runTask", async (taskName: string, fileName: string) => {
      vscode.window.showInformationMessage("runTask from gotaskr-vscode");

      installGotaskrRunTaskCommand(taskName, fileName, context);
    })
  );

  vscode.languages.registerCodeLensProvider({ language: "go" }, new GotaskrCodeLensProvider());
}

export function deactivate() {}
