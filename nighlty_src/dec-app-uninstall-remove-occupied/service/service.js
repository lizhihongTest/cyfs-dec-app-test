"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_cmd_1 = require("./check_cmd");
const DEC_ID = "9tGpLNnH1nXE3Ku2CgrQuc3JggtJuvAM3sP3Ype33qSv";
const cyfs = require('cyfs-sdk');
const fs = require('fs-extra');
const path = require('path');
// 这里是Service的入口
async function main() {
	cyfs.clog.enable_file_log({
        name: DEC_ID,
        dir: cyfs.get_app_log_dir(DEC_ID),
    });
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
	let save_path = path.join(__dirname,"test_read.txt")
	fs.writeFileSync(save_path, "test file");
	fs.chmodSync(save_path, 0o400); 
	while(true){
		await cyfs.sleep(60*1000);
	}
}
main();
