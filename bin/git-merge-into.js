#! /usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const git = require('simple-git')()
const { red } = require('chalk')

const {
    mergingMessage,
    checkedOutMessage,
    checkoutErrorMessage,
    conflictMessage,
    mergeMessage,
    noBranchesMessage,
    uncommittedMessage,
    notAddedMessage,
    completedMessage,
} = require('../texts')

const checkout = async branch => {
    try {
        await git.checkout(branch)
        checkedOutMessage(branch)
        return true
    } catch (error) {
        console.log(error.message)
        checkoutErrorMessage(branch)
        return false
    }
}

const merge = async (current, branch) => {
    try {
        const mergeSummary = await git.mergeFromTo(current, branch, {
            '--no-ff': true,
        })
        mergeMessage(current, branch, mergeSummary)
        return true
    } catch (error) {
        if (error.git?.conflicts?.length) {
            await git.merge({ '--abort': true })
            conflictMessage(error.git.conflicts.length, branch)
        } else {
            console.log(red(error.message))
        }
        return false
    }
}

const run = async () => {
    try {
        const branches = yargs(hideBin(process.argv)).argv._
        const { current, modified, not_added } = await git.status()

        if (modified.length) return uncommittedMessage(modified)
        if (not_added.length) return notAddedMessage(not_added)
        if (!branches.length) return noBranchesMessage()
        let mergeErrors = 0
        let count = 0
        for (branch of branches) {
            count += 1
            mergingMessage(current, branch, count, branches.length)
            const checkoutResult = await checkout(branch)
            if (checkoutResult) {
                const mergeResult = await merge(current, branch)
                if (!mergeResult) mergeErrors += 1
            } else {
                mergeErrors += 1
            }
            console.log('')
        }
        completedMessage(branches, mergeErrors)
    } catch (error) {
        console.log(red(error.message))
    }
}

run()
