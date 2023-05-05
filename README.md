# gotaskr-vscode

This is the companion extension for vscode for [gotaskr](https://github.com/Roemer/gotaskr)

## Features

This extension allow to easily run gotaskr tasks via codelens entries in vscode.
It also allows to run tasks with arguments:
```go
// args: --myArgument1=foo --myArgument2=bar
gotaskr.Task("My-Task", func() error {
    // Use arguments here
}

```

## Development & publish

### Package
```
vsce package
```
