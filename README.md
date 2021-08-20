# Git-Merge-Into

This is a tool to merge the content of a current git branch to any number of branches.
This could for example be useful if you work on a hotfix, which then should be merged into `main` and `develop`.

## Installation

### Using NPM

```bash
$ npm install -g git-merge-into
```

### Using Yarn

```bash
$ yarn global add git-merge-into
```

## Use

To use the comment, make sure your current git branch doesn't have uncommited changes, then execute:

```bash
$ gmi branch [... more_branches]
```

## Features

-   Merge current branches into a list of given branches
-   Check if current branch has unstaged changes. (The tool will notify you if there are unstaged changes)
-   Detect if there is a conflict and revert the merge
-   Detect if a branch doesn't exist
-   Give a summary of into which branches were actually merged
