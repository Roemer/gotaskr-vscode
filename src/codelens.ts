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
  public constructor(range: Range, taskName: string, fileName: string) {
    super(range);

    this.command = {
      title: "run task",
      command: "gotaskr-vscode.runTask",
      arguments: [taskName, fileName],
    };
  }
}

export default class GotaskrCodeLensProvider implements CodeLensProvider {
  onDidChangeCodeLenses?: Event<void> | undefined;

  provideCodeLenses(document: TextDocument, token: CancellationToken): ProviderResult<CodeLens[]> {
    const regexp = new RegExp('.*gotaskr.Task\\("(.*?)",.*');
    const list = [];

    for (let i = 0; i < document.lineCount; i++) {
      let line = document.lineAt(i);
      let matches = regexp.exec(line.text);

      if (matches) {
        list.push(new GotaskrRunTaskCodeLens(document.lineAt(i).range, matches[1], document.fileName));
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
