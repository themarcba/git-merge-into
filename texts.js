const { red, yellow, green, blue, bold } = require('chalk')

const log = (message, type = 'info') => {
    if (type === 'error') console.log(red(message))
    else if (type === 'warning') console.log(yellow(message))
    else if (type === 'success') console.log(green(message))
    else console.log(blue(message))
}

// -------------------------------------------------

const mergingMessage = (current, branch, count, total) => {
    console.log(
        `➜ Merging ${blue(current)} into ${blue(branch)} (${count}/${total})`,
    )
}
// -------------------------------------------------
const checkedOutMessage = branch => {
    console.log(`  • Checked out ${blue(branch)}`)
}

const checkoutErrorMessage = branch => {
    log(`  • Branch '${branch}' could not be checked out`, 'error')
}
// -------------------------------------------------
const uncommittedMessage = modified => {
    log(
        'Please commit your changes in the following files before merging:',
        'warning',
    )
    modified.forEach(file => log(`  - ${file}`, 'warning'))
}

const notAddedMessage = notAdded => {
    log(
        'Please commit the following uncommitted files before merging:',
        'warning',
    )
    notAdded.forEach(file => log(`  - ${file}`, 'warning'))
}
const noBranchesMessage = () => {
    log(`✘ No branches specified`, 'error')
}

// -------------------------------------------------
const changesText = changes => {
    if (changes === 1) return '1 change'
    else return `${changes} changes`
}

const insertionsText = insertions => green(`${insertions}+`)
const deletionsText = deletions => red(`${deletions}-`)
const mergeMessage = (current, branch, { summary }) => {
    const mergeLine = `${green('  • Merge successful!')}`
    const changeLine = `${changesText(summary.changes)} (${insertionsText(
        summary.insertions,
    )}/${deletionsText(summary.deletions)})`
    console.log(`${mergeLine} ${changeLine}`)
}

// -------------------------------------------------
const conflictMessage = (conflicts, branch) => {
    const conflictText =
        conflicts === 1 ? '1 conflict' : `${conflicts} conflicts`
    console.log(red(`  • ${conflictText} found! `) + `(Merge aborted)`)
}

// -------------------------------------------------
const completedMessage = (branches, mergeErrors) => {
    log(
        `✔ ${branches.length - mergeErrors}/${
            branches.length
        } merges successful!`,
        'success',
    )
    if (mergeErrors > 0) {
        log(
            `✘ ${mergeErrors}/${branches.length} branches could not be merged`,
            'error',
        )
    }
}

module.exports = {
    mergingMessage,
    checkedOutMessage,
    checkoutErrorMessage,
    uncommittedMessage,
    notAddedMessage,
    noBranchesMessage,
    mergeMessage,
    conflictMessage,
    completedMessage,
}
