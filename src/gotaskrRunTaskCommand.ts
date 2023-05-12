import { CodeLens, ExtensionContext, Range } from "vscode";
import TerminalRunner from "./terminalRunner";

export class GotaskrRunTaskCodeLens extends CodeLens {
  public constructor(range: Range, taskName: string, fileName: string, additionalArguments: string) {
    super(range);

    this.command = {
      title: "run task",
      command: "gotaskr-vscode.runTask",
      arguments: [taskName, fileName, additionalArguments],
    };
    if (additionalArguments) {
      this.command.title += " (args)";
    }
  }
}

export async function installGotaskrRunTaskCommand(taskName: string, fileName: string, additionalArguments: string, context: ExtensionContext) {
  //await ensureNotDirty(fileName);
  
  var command = `go run \"${fileName}\" --target \"${taskName}\"`;
  if (additionalArguments) {
    command += ` ${additionalArguments}`;
  }

  TerminalRunner.runInTerminal(command, true);
}
