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
import path = require("path");

export default class GotaskrCodeLensProvider implements CodeLensProvider {
  onDidChangeCodeLenses?: Event<void> | undefined;

  provideCodeLenses(document: TextDocument, token: CancellationToken): ProviderResult<CodeLens[]> {
    const baseRegexp = /^[\s\t]*\/\/\s*gotaskr-base:\s*(.*)$/;
    const taskRegexp = /.*gotaskr.Task\("(.*?)",.*/;
    const argRegexp = /^[\s\t]*\/\/\s*args:\s*(.*)$/;
    const list = [];

    // Invocate in the directory of the current file
    let invocationDir = path.dirname(document.fileName);
    // Search for a base override
    for (let i = 0; i < document.lineCount; i++) {
      let line = document.lineAt(i);
      let matches = baseRegexp.exec(line.text);
      if (matches) {
        const newPath = matches[1];
        if (path.isAbsolute(newPath)) {
          invocationDir = newPath;
        } else {
          invocationDir = path.normalize(path.join(invocationDir, newPath));
        }       
        break;
      }
    }

    // Search for tasks
    for (let i = 0; i < document.lineCount; i++) {
      let line = document.lineAt(i);
      let matches = taskRegexp.exec(line.text);

      if (matches) {
        // The current line matches, add it as run target
        list.push(new GotaskrRunTaskCodeLens(document.lineAt(i).range, matches[1], invocationDir, ''));
        list.push(new GotaskrDebugTaskCodeLens(document.lineAt(i).range, matches[1], invocationDir, ''));
        // In addition, check if lines above contain argument lists and add runs for them as well.
        let argLineIndex = i-1;
        while(true) {
          let argLine = document.lineAt(argLineIndex);
          let argMatches = argRegexp.exec(argLine.text);
          if (!argMatches){
            break;
          }
          list.push(new GotaskrRunTaskCodeLens(document.lineAt(argLineIndex).range, matches[1], invocationDir, argMatches[1]));
          list.push(new GotaskrDebugTaskCodeLens(document.lineAt(argLineIndex).range, matches[1], invocationDir, argMatches[1]));
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
