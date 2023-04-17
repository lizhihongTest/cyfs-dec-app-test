"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_cmd_and_exec = void 0;
const Path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const cyfs = require('cyfs-sdk');
const DEC_ID = "9tGpLNndpfRjUF59SsZidVaPuPd8QNFJusQKH8genY3Q-operation";
cyfs.clog.enable_file_log({
    name: "operation-log",
    dir: cyfs.get_app_log_dir(DEC_ID),
});
function get_cyfs_root_path() {
    if (process.platform === "win32") {
        return "c:\\cyfs";
    }
    else {
        return "/cyfs";
    }
}
function is_pid_exists(pid) {
    // 用kill传0的方式检查node进程是否存在
    try {
        process.kill(pid, 0);
        return true;
    }
    catch (e) {
        return false;
    }
}
class PidLock {
    constructor(lock_file_path) {
        this.lock_file_path = lock_file_path;
    }
    // 检查{name}.pid文件是否存在，如果不存在，返回undefined
    // 如果文件存在，检查文件里写的pid是否存在，如存在，返回pid，不存在返回undefined
    check() {
        if (!fs.existsSync(this.lock_file_path)) {
            return undefined;
        }
        let pid = parseInt(fs.readFileSync(this.lock_file_path, "utf8"), 10);
        if (isNaN(pid)) {
            console.error("pid file format err, delete it");
            fs.unlinkSync(this.lock_file_path);
            return undefined;
        }
        if (!is_pid_exists(pid)) {
            console.log(`pid ${pid} not exists`);
            fs.unlinkSync(this.lock_file_path);
            return undefined;
        }
        return pid;
    }
    // 停止{name}.pid里标注的pid进程
    stop() {
        
        let pid = this.check();
        if (pid !== undefined) {
            try {
                process.kill(pid, 'SIGKILL');
            }
            catch (error) {
                console.log(`kill process ${pid} failed`);
            }
        }
    }
    // 将本进程pid写入pid_file, 如果pid_file已存在，返回false，如果不存在，写入成功后返回true
    ensure() {
        // 先check一次，如果pid文件或进程不存在，清除掉旧的pid文件
        let old_pid = this.check();
        if (old_pid !== undefined) {
            return false;
        }
        console.info(`write ${process.pid.toString()} to ${his.lock_file_path}`)
        fs.writeFileSync(this.lock_file_path, process.pid.toString());
        return true;
    }
}

async function wait2min(){
    let run_time = 12;
    while(run_time-->0){
        console.info(`run command.... ${run_time}....sleep 10 s`)
        await cyfs.sleep(10000)
    }
    return;
}

// 提供基础的标准参数处理
// --start：函数正常返回
// --stop：停止已经启动的同name标注的进程，本进程退出
// --status：检查同name标注的进程是否已启动，已启动返回1，否则返回0
// 此处建议name使用自己的AppId，以防与其他的App冲突导致Service被不正常的关闭与启动
async function check_cmd_and_exec(name) {
    // 尝试使用Pid文件来管理进程锁
    let pid_lock_path = Path.join(get_cyfs_root_path(), "run");
    if (!fs.existsSync(pid_lock_path)) {
        fs.mkdirSync(pid_lock_path, { recursive: true });
    }
    // 检查{pid_lock_path}/{name}.pid文件是否存在
    let pid_lock_file = Path.join(pid_lock_path, `${name}.pid`);
    let pid_lock = new PidLock(pid_lock_file);
    // 默认action为start
    let action_arg = process.argv[2];
    switch (action_arg) {
        case "--install":
            console.info(`begin run install....`)
            //await wait2min();
            return true;
        case "--stop":
            console.info(`begin run stop....`)
            //await wait2min();
            pid_lock.stop();
            //await cyfs.sleep(2000);
            process.exit(0);
        case "--status":
            {
                console.info(`begin get status....`)
                let pid = pid_lock.check();
                console.info(`get status result = ${pid}`)
                //await cyfs.sleep(2000);
                if (pid == undefined) {
                    process.exit(0);
                }
                else {
                    process.exit(1);
                }
            }
        // 默认都按照--start来对应
        default:
            {
                console.info(`begin run start....`)
                while(true){
                    await wait2min();
                }
                
                if (!pid_lock.ensure()) {
                    console.log("process already exists, exit.");
                    //await cyfs.sleep(2000);
                    process.exit(0);
                }
                return false;
            }
    }
}
exports.check_cmd_and_exec = check_cmd_and_exec;
