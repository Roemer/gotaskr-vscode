# gotaskr-vscode

This is the companion extension for vscode for [gotaskr](https://github.com/Roemer/gotaskr)

## Features

This extension allow to easily run or debug gotaskr tasks via codelens entries in vscode.
Just click the codelends above the task or above the argument comment (see below).
It also allows to run tasks with arguments:
```go
// args: --myArgument1=foo --myArgument2=bar
gotaskr.Task("My-Task", func() error {
    // Use arguments here
}

```

## Development & publish

### New Version Number
```
npm version minor --no-git-tag-version
```

### Package
```
vsce package
```
