import * as vscode from "vscode";

export default class TerminalRunner {
  public static runInTerminal(command: string, addNewLine: boolean = true): void {
    const terminal = "gotaskr";

    if (this.terminals[terminal] === undefined) {
      this.terminals[terminal] = vscode.window.createTerminal(terminal);
    }
    this.terminals[terminal].show();
    this.terminals[terminal].sendText(command, addNewLine);
  }

  public static onDidCloseTerminal(closedTerminal: vscode.Terminal): void {
    delete this.terminals[closedTerminal.name];
  }

  private static terminals: { [id: string]: vscode.Terminal } = {};
}
