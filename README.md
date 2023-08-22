# gotaskr-vscode

This is the companion extension for vscode for [gotaskr](https://github.com/Roemer/gotaskr)

## Features

This extension allow to easily run or debug gotaskr tasks via codelens entries in vscode.
Just click the codelends above the task to run or debug it.

### Task Arguments
It also allows to run tasks with arguments. Just define separate line(s) with the desired arguments and then click the codelens above.
```go
// args: --myArgument1=foo --myArgument2=bar
gotaskr.Task("My-Task", func() error {
    // Use arguments here
}
```

### Base executor
It also allows to set a base executor in case you have tasks defined in other packages.
For this, just define the base executor for a file once somewhere in the file:
```go
// gotaskr-base: ../
func InitPackageTasks() {
    gotaskr.Task("package:task", func() error {
		// Task Logic
	})
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
