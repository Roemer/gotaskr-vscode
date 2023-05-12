import * as vscode from "vscode";
import { CodeLens, ExtensionContext, Range, debug } from "vscode";
import TerminalRunner from "./terminalRunner";

export class GotaskrDebugTaskCodeLens extends CodeLens {
  public constructor(range: Range, taskName: string, fileName: string, additionalArguments: string) {
    super(range);

    this.command = {
      title: "debug task",
      command: "gotaskr-vscode.debugTask",
      arguments: [taskName, fileName, additionalArguments],
    };
    if (additionalArguments) {
      this.command.title += " (args)";
    }
  }
}

export async function installGotaskrDebugTaskCommand(taskName: string, fileName: string, additionalArguments: string, context: ExtensionContext) {
  //await ensureNotDirty(fileName);

  // Create the basic debug configuration
  const debugConfig: vscode.DebugConfiguration = {
    name: 'Go Debug',
    type: 'go',
    request: 'launch',
    mode: 'debug',
    program: fileName,
    args: ['--target', taskName]
  };

  // Handle additional arguments
  if (additionalArguments) {
    // Unfortunately, 'args' double quotes the arguments if needed so we now have double-double-quotes
    // To fix this, the arguments are preprocessed with the following regex which does the following:
    // Split arguments with "=" into separate ones
    // Removes "" around arguments
    const regx = /(?:([^\s="]+)|"([^"]*)")/g;
    const matches = additionalArguments.matchAll(regx);
    if (matches) {
      for (const match of matches) {
        let newValue : string = '';
        if (match[1]) {
          newValue = match[1];
        } else if (match[2]){
          newValue = match[2];
        }
        if (newValue) {
          debugConfig.args.push(newValue);
        }
      }
    }
  }

  debug.startDebugging(undefined, debugConfig);
  vscode.commands.executeCommand('workbench.debug.action.focusRepl');
}
