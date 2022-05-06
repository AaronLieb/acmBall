# Using Git

## [VSCode](#Git-with-VSCode)

> Very easy to use, built into your text editor.  
> Lacks some more complex git features.

## [Command Line](#Git-on-the-Command-Line)

> Used from the Terminal / Command line
> Comes preinstalled on most Mac and Linux machines.  
> Can be hard to use for beginners

## [Github Desktop](#Github-Desktop)

Documentation for this was not completed. If you need help with Github Desktop, ask one of our experts!

> A powerful UI for Git, excellent coverage of all git features.
> You can download it from https://desktop.github.com/

# Git with VSCode

## Cloning your fork

1. Open a new window of VSCode
2. If you already have a project open, consider doing `File > Close Folder`
3. On the left panel, click "Source Control"
4. Click "Clone Repository"
5. Click "Clone from GitHub"
6. Select your fork of acmBall

## Viewing your changes

1. On the left panel, click "Source Control"
2. All the files you have modified should appear under "changes"
3. You can click each file to see the changes you have made

## Adding Files to a commit

1. On the left panel, click "Source Control"
2. Click the "+" button on a file to add it

## Commiting your changes

1. On the left panel, click "Source Control"
2. Enter a commit message inside the "Message" box
3. Click the ✓ icon

## Pushing your changes

1. After creating a commit, click "Sync Changes"

# Git on the Command Line

## Cloning your fork

Clone the repository

```bash
git clone <your fork url>
```

Open the project in VSCode

- File > Open Folder

## Viewing your changes

```bash
git status
```

## Adding Files to a commit

```bash
git add <file>
```

Try to avoid using `git add .` or `git add -A`  
Individually add the files you want to commit.

## Commiting your changes

```bash
git commit -m "<your commit message>"
```

If you've made many changes, try to make multiple commits, with each commit containing code for a specific change

## Pushing your changes

```bash
git push
```

this will commit all of your changes to your fork

# Github Desktop

Documentation was not finished for Github Desktop, please ask one of our experts for help!
