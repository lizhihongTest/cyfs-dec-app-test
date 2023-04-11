"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_cmd_1 = require("./check_cmd");
const DEC_ID = "9tGpLNn9cXGT58bn8c4YngfuBSSvzJnsnoz25uTvfqqk";
const cyfs = require('cyfs-sdk');
// 这里是Service的入口
async function main() {
    // 利用check_cmd_and_exec来确保进程提供正确的运行互斥和App Manager需要的功能
    // 这个name最好用DECId的字符串，避免和其他App进程冲突
    let install = check_cmd_1.check_cmd_and_exec(DEC_ID);
    if (install) {
        // 如果执行'node service.js --install'，check_cmd_and_exec返回的install为true，这里一般做一些首次安装，或升级后初始化的工作
        // 在这个阶段，check_cmd_and_exec不会保持和检查进程锁，这个初始化完毕后要主动退出进程
        process.exit(0);
    }
    // 如果执行node service.js --start，或不带参数，install为false，走正常的启动流程

    // 这里的open_default没有实际功能，只是让service进程能一直运行下去，否则service进程一直退出，会被app-manager判定为运行失败
    let stack = cyfs.SharedCyfsStack.open_default()
    await stack.online();
	
	
error code