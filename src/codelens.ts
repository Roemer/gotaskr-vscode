import {
  CancellationToken,
  CodeLens,
  CodeLensProvider,
  Command,
  Event,
  ProviderResult,
  Range,
  TextDocument,
} from "vscode";

export class GotaskrRunTaskCodeLens extends CodeLens {
  public constructor(range: Range, taskName: string, fileName: string, additionalArguments: string) {
    super(range);

    this.command = {
      title: "run task",
      command: "gotaskr-vscode.runTask",
      arguments: [taskName, fileName, additionalArguments],
    };
    if (additionalArguments) {
      this.command.title += " with arguments";
    }
  }
}

export default class GotaskrCodeLensProvider implements CodeLensProvider {
  onDidChangeCodeLenses?: Event<void> | undefined;

  provideCodeLenses(document: TextDocument, token: CancellationToken): ProviderResult<CodeLens[]> {
    const regexp = /.*gotaskr.Task\("(.*?)",.*/;
    const argRegexp = /^[\s\t]*\/\/\s*args:\s*(.*)$/;
    const list = [];

    for (let i = 0; i < document.lineCount; i++) {
      let line = document.lineAt(i);
      let matches = regexp.exec(line.text);

      if (matches) {
        // The current line matches, add it as run target
        list.push(new GotaskrRunTaskCodeLens(document.lineAt(i).range, matches[1], document.fileName, ''));
        // In addition, check if lines above contain argument lists and add runs for them as well.
        let argLineIndex = i-1;
        while(true) {
          let argLine = document.lineAt(argLineIndex);
          let argMatches = argRegexp.exec(argLine.text);
          if (!argMatches){
            break;
          }
          list.push(new GotaskrRunTaskCodeLens(document.lineAt(argLineIndex).range, matches[1], document.fileName, argMatches[1]));
          argLineIndex--;
        }
      }
    }

    return list;
  }

  resolveCodeLens?(codeLens: CodeLens, token: CancellationToken): ProviderResult<CodeLens> {
    if (token.isCancellationRequested) {
      return codeLens;
    }
    return codeLens;
  }
}
