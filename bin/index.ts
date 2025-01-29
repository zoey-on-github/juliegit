#!/usr/bin/env node
import * as crypto from 'node:crypto';
import * as argparse from 'argparse';
import os from 'node:zlib';
import path from 'node:path';
import fs from 'node:fs';
import { readFile } from "node:fs";
import process, { argv } from 'node:process';
import assert from 'node:assert'
import * as ini from 'ini';
class gitRepository {
    worktree: string;
    static gitdir: string;
    conf: string;
    constructor(path: string, force: boolean) {
        this.worktree = path;
        gitRepository.gitdir = path + ".git";
        if(!force) {
        if(!fs.existsSync(gitRepository.gitdir)) {
            console.error("Not a git directory");
        }
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

    //assert(repoDir(gitRepository.gitdir,"refs/tags",false)); why on earth was i checking this twice?
    if(fs.existsSync(repo.worktree)) {
        if(!fs.lstatSync(repo.worktree).isDirectory) {                  // no need to error handle here, because node throws an error if this is false
           console.log("not a directory");
    }
    } else {
            fs.mkdirSync(repo.worktree);
    }
    assert(repoDir(gitRepository.gitdir,"branches",false));
    assert(repoDir(gitRepository.gitdir,"objects",false));
    assert(repoDir(gitRepository.gitdir,"refs/tags",false));
    assert(repoDir(gitRepository.gitdir,"refs/heads",false));
   
    fs.writeFileSync(repo + "/description", "Unnamed repository; edit this file 'description' to name the repository.")
    fs.writeFileSync(repo + "/HEAD", "ref: refs/heads/master")

    const config = ini.parse(repo.conf);
    config.repositoryFormatVersion = "0"
    config.filemode = "False"
    config.bare = "false"
    var text:string = ini.stringify(config, {section: 'core'})
    fs.writeFileSync(repo.conf, text)
}

const parser = new argparse.ArgumentParser({
    description: 'Argparse example'
  });
  //parser.add_argument('init', "make new git repo")

//parser.add_subparsers("init")
const argSubParsers = parser.add_subparsers({title:"commands", dest:"command"})
const argsp = argSubParsers.add_parser("init",{help:"Initialize a new repo"})
argsp.add_argument("path",({metavar:"directory","nargs":"?",default:".",help:"where to create the repo"}))
function commandInit(args) {
        repoCreate(args.path)
}
const args = JSON.parse(JSON.stringify(parser.parse_args()));
if(args.command == "init") {
        repoCreate(args.path)
        //console.log("help me god")
}
console.log(typeof args);
console.log(args);
console.log(args.command)
console.log(args.path)
