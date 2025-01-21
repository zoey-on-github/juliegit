import * as yargs from "yargs";
import * as crypto from 'node:crypto';
import os from 'node:zlib';
import path from 'node:path';
import fs from 'fs';
import { readFile } from "node:fs";
class gitRepository {
    worktree: string;
    gitdir: string;
    conf: any;
    constructor(path: string) {
        this.worktree = path;
        this.gitdir = path + ".git"
        if(!fs.existsSync(process.cwd + ".git")) {
            console.error("Not a git directory")
        }
        var configFile = path.join(repoFile + "config")
        if(fs.existsSync(configFile)) {
                 fs.readFile(configFile,"utf8")
        }
    }

}
var repoFile = path.join(process.cwd + ".git")

