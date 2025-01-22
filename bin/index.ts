import * as yargs from "yargs";
import * as crypto from 'node:crypto';
import os from 'node:zlib';
import path from 'node:path';
import fs from 'fs';
import { readFile } from "node:fs";
import process from 'node:process';
import path from 'node:path'
class gitRepository {
    worktree: string;
    gitdir: string;
    conf: any;
    constructor(path: string, force: boolean) {
        this.worktree = path;
        this.gitdir = path + ".git"
        if(!fs.existsSync(this.gitdir)) {
            console.error("Not a git directory")
        }
        var configFile = path.join(repoFile,"config")
        if(fs.existsSync(configFile)) {
                 fs.readFileSync(configFile,"utf8")
        }
    }

}

