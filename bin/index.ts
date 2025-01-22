import * as yargs from "yargs";
import * as crypto from 'node:crypto';
import os from 'node:zlib';
import path from 'node:path';
import fs from 'fs';
import { readFile } from "node:fs";
import process from 'node:process';
class gitRepository {
    worktree: string;
    gitdir: string;
    conf: any;
    constructor(path: string) {
        this.worktree = path;
        this.gitdir = path + ".git"
        if(!fs.existsSync(process.cwd() + ".git")) {
            console.error("Not a git directory")
        }
        if(fs.existsSync(configFile)) {
                 fs.readFileSync(configFile,"utf8")
        }
    }

}
var repoFile = path.join(process.cwd() ,".git")
var configFile = path.join(repoFile,"config")
