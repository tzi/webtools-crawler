#!/usr/bin/env node

const cheerio = require('cheerio');
const fetch = require('node-fetch');
const minimist = require('minimist');
const readline = require('readline');

function getNextText(node) {
    let elem = node.get(0);
    while ((elem = elem.next)) {
        if (elem.type === 'text' && !!elem.data.trim()) {
            return elem.data.trim();
        }
    }
    
    return false;
}

function grepTools($, match) {
    const result = [];
    $('br + a > strong').each((i, node) => {
        const name = $(node).text();
        const url = $(node).parent().attr('href');
        const description = getNextText($(node).parent());
        if (description && new RegExp(match, 'i').test(description)) {
            result.push({name, url, description});
        }
    });
    
    return result;
}

function outputTools(issueId, result) {
    if (result.length) {
        console.log();
        console.log(`Issue ${issueId}`);
        console.log('======');
        console.log();
        result.forEach(({name, description, url}) => {
            console.log(name);
            console.log('\t', description);
            console.log('\t', url);
            console.log();
        });
    } else {
        console.log(`Issue ${issueId}: No matching result`);
    }
}

function parseIssue(issueId, match) {
    return fetch(`http://webtoolsweekly.com/archives/issue-${issueId}/`)
        .then((response) => {
            return new Promise((resolve, reject) => {
                if (response.status === 404) {
                    console.log(`Issue ${issueId} not found`);
                    console.log();
                } else {
                    resolve(response.text());
                }
            });
        })
        .then(html => {
            const $ = cheerio.load(html);
            const result = grepTools($, match);
            outputTools(issueId, result);
            
            return result;
        })
        .catch((error) => {
            console.dir(error);
        })
    ;
}

function iterativeParsing(issueId, match) {
    parseIssue(issueId, match)
        .then((result) => {
            if (issueId === 1) {
                process.exit();
            }
            if (result.length) {
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                rl.question('Next issue (ynq)? ', (answer) => {
                    if (answer === 'q' || answer === 'n') {
                        process.exit();
                    }
                    iterativeParsing(issueId - 1, match);
                    rl.close();
                });
            } else {
                iterativeParsing(issueId - 1, match);
            }
        })
    ;
}

function parseLastIssue(match) {
    fetch('http://webtoolsweekly.com/?view=archive')
        .then(response => response.text())
        .then(html => {
            const $ = cheerio.load(html)
            const lastId = $('.archives-links > li > a').first().text().split(' ')[1].substr(1);
            iterativeParsing(lastId, match);
        })
        .catch((error) => {
            console.dir(error);
        })
    ;
}

// Main
const argv = minimist(process.argv.slice(2));
const match = argv['_'].length ? argv['_'][0] : '';
if (argv['i']) {
    parseIssue(argv['i'], match);
} else {
    parseLastIssue(match);
}
