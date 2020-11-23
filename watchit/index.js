#!/usr/bin/env node
// File was executed

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');
const { spawn } = require('child_process');

program
    .version('0.0.1')
    .argument('[filename]', 'NAME OF A FILE TO EXECUTE')
    .action(async ({ filename }) => {
       const name = filename || 'index.js';

       try{
        await fs.promises.access(name);
        } catch(err){
            throw new Error(`Could not find the file' + ${name}`);
        }

        let proc;
        const start = debounce(() => {
            if(proc) {
                proc.kill();
            }
            proc = spawn('node', [name], {stdio: 'inherit'});
        }, 100);

        chokidar
            .on('add', start)
            .on('change', start)
            .on('unlink', start);
    });

program.parse(process.argv);

