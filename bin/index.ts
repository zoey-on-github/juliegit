import * as crypto from 'node:crypto';
import * as argparse from 'argparse';
import os from 'node:zlib';
import path from 'node:path';
import fs from 'node:fs';
import { readFile } from "node:fs";
import process from 'node:process';
import assert from 'node:assert'
import * as ini from 'ini';
class gitRepository {
    worktree: string;
    static gitdir: string;
    conf: string;
    constructor(path: string, force: boolean) {
        this.worktree = path;
        gitRepository.gitdir = path + ".git";
        if(!fs.existsSync(gitRepository.gitdir)) {
            console.error("Not a git directory");
        }
        this.conf = repoFile + "config"
        if(fs.existsSync(this.conf)) {
                 fs.readFileSync(this.conf,"utf8");
                 ini.parse(this.conf);
        }
    }

}
function repoPath(path: string, repo:string) {
        return gitRepository.gitdir + path;
}

function repoFile(repo:string, path:string, mkdir:boolean) {
    if(repoDir(repo,path,mkdir=mkdir)) {
        return repoPath(repo,path);
    }
}

function repoDir(repo:string, path:string,mkdir:boolean) {
    path = repoPath(repo, path)
    if(fs.existsSync(path)) {
        return path;
    } else {
        console.error("not a directory");
        if(mkdir) {
            fs.mkdirSync(path);
            return path;
        } else {
            return null;
        }
    }
}

function repoCreate(path: string) {
    var repo = new gitRepository(path,true)

    assert(repoDir(gitRepository.gitdir,"refs/tags",false));
    if(fs.existsSync(repo.worktree)) {
        if(fs.lstatSync(repo.worktree).isDirectory) {                  // no need to error handle here, because node throws an error if this is false
           fs.mkdirSync(repo.worktree);
    }
    assert(repoDir(gitRepository.gitdir,"branches",false));
    assert(repoDir(gitRepository.gitdir,"objects",false));
    assert(repoDir(gitRepository.gitdir,"refs/tags",false));
    assert(repoDir(gitRepository.gitdir,"refs/heads",false));
    
}
}
