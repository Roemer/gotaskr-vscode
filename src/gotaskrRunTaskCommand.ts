import { ExtensionContext } from "vscode";
import TerminalRunner from "./terminalRunner";

export async function installGotaskrRunTaskCommand(taskName: string, fileName: string, additionalArguments: string, context: ExtensionContext) {
  //await ensureNotDirty(fileName);
  
  var command = `go run \"${fileName}\" --target \"${taskName}\"`;
  if (additionalArguments) {
    command += ` ${additionalArguments}`;
  }

  TerminalRunner.runInTerminal(command, true);
}
