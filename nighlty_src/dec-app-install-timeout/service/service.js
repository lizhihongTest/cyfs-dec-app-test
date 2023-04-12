"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_cmd_1 = require("./check_cmd");
const DEC_ID = "9tGpLNnSN39JEAfMzKs1GFCe5GsPhbRXt49fCnL84A6g";
const cyfs = require('cyfs-sdk');
const path = require('path');
const ChildProcess = require('child_process');
//  This is the entry point of the service
async function main() {
	cyfs.clog.enable_file_log({
        name: DEC_ID,
        dir: cyfs.get_app_log_dir(DEC_ID),
    });
    // Use check_cmd_and_exec to ensure the process provides the correct running mutex and App Manager required functionality. 
	// It is recommended to use the string of DECId for this name to avoid conflict with other App processes
    let install = check_cmd_1.check_cmd_and_exec(DEC_ID);
    if (install) {
        // If running 'node service.js --install', the install returned by check_cmd_and_exec will be true. 
		// Here, some initialization work is usually done for the first installation or after upgrading.
		let run = new Promise(async(resolve)=>{
			let  child_process = ChildProcess.exec(`node ${path.join(__dirname,"wait_min_process.js")}`)
			child_process.unref();
			child_process.on('data', (data) => {
				console.info(` wait_min_process.js console : ${data}`)
			});
			child_process.on('exit', (code, singal) => {
				console.info(` wait_min_process.js exit`);
				resolve("run finshed") 
			});
		})
		await run;
        process.exit(0);
    }
    
	// If running 'node service.js --start', or without any parameter, install will be false, and the normal startup process will be followed.
	// The 'open_default' here has no actual function, it just allows the service process to continue running. Otherwise, the service process will keep exiting, which will be judged as a running failure by the app-manager.

    let stack = cyfs.SharedCyfsStack.open_default()
    await stack.online();
}
main();
