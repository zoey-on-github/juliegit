import * as yargs from "yargs";
import * as crypto from 'node:crypto';
import os from 'node:zlib';
import path from 'node:path';
import fs from 'fs';
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
    }

}