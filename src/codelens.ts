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
import { GotaskrRunTaskCodeLens } from "./gotaskrRunTaskCommand";
import { GotaskrDebugTaskCodeLens } from "./gotaskrDebugTaskCommand";

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
        list.push(new GotaskrDebugTaskCodeLens(document.lineAt(i).range, matches[1], document.fileName, ''));
        // In addition, check if lines above contain argument lists and add runs for them as well.
        let argLineIndex = i-1;
        while(true) {
          let argLine = document.lineAt(argLineIndex);
          let argMatches = argRegexp.exec(argLine.text);
          if (!argMatches){
            break;
          }
          list.push(new GotaskrRunTaskCodeLens(document.lineAt(argLineIndex).range, matches[1], document.fileName, argMatches[1]));
          list.push(new GotaskrDebugTaskCodeLens(document.lineAt(argLineIndex).range, matches[1], document.fileName, argMatches[1]));
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
