import { ExtensionContext } from "vscode";
import TerminalRunner from "./terminalRunner";

export async function installGotaskrRunTaskCommand(taskName: string, fileName: string, context: ExtensionContext) {
  //await ensureNotDirty(fileName);
  
  var command = `go run \"${fileName}\" --target \"${taskName}\"`;

  TerminalRunner.runInTerminal(command, true);
}
