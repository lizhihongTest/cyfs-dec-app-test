# cyfs-dec-app-test
CYFS DEC APP test project

## DEC APP List for Testing

### Nightly Environment

+ dec-app-normal_01 cyfs://5r4MYfFJ7ktzBzSi1sWmU7BJLgpEEdp8ukbWemsFuQc1/9tGpLNnPAtaYRNwPFKFsidrbtCXZWEahqyXjgzbQMHs5 : A standard DEC APP demo is used to test various scenarios
+ dec-app-normal_02 cyfs://5r4MYfFJ7ktzBzSi1sWmU7BJLgpEEdp8ukbWemsFuQc1/9tGpLNnLsGvu3f6996V9LTV8e93faZ4JVXkqdZwxVG7Y : A standard DEC APP demo is used to test various scenarios
+ dec-app-normal_03 cyfs://5r4MYfFJ7ktzBzSi1sWmU7BJLgpEEdp8ukbWemsFuQc1/9tGpLNnG4T8MvM22UyuyYd35RqR3drNNMzLLLrcDJLKe : A standard DEC APP demo is used to test various scenarios
+ dec-app-install-timeout cyfs://5r4MYfFJ7ktzBzSi1sWmU7BJLgpEEdp8ukbWemsFuQc1/9tGpLNnSN39JEAfMzKs1GFCe5GsPhbRXt49fCnL84A6g : Test for abnormal situation where DEC APP installation time exceeds 15 minutes.
+ dec-app-service-run-exception cyfs://5r4MYfFJ7ktzBzSi1sWmU7BJLgpEEdp8ukbWemsFuQc1/9tGpLNnXXT3CBoCZk2UPwrC2ppaXnCveQtFS47wFYBvE : Test for exceptions thrown during the running process of the DEC APP service.
+ dec-app-install-syntax-error cyfs://5r4MYfFJ7ktzBzSi1sWmU7BJLgpEEdp8ukbWemsFuQc1/9tGpLNn9cXGT58bn8c4YngfuBSSvzJnsnoz25uTvfqqk : Test for scenarios where there are syntax errors in the DEC APP service code.
+ dec-app-uninstall-remove-occupied cyfs://5r4MYfFJ7ktzBzSi1sWmU7BJLgpEEdp8ukbWemsFuQc1/9tGpLNnH1nXE3Ku2CgrQuc3JggtJuvAM3sP3Ype33qSv :DEC APP will create a file with read-only permission to prevent it from being deleted. This simulates the problem of a file being occupied during the uninstallation process.
+ dec-app-command-wait2min cyfs://5r4MYfFJ7ktzBzSi1sWmU7BJLgpEEdp8ukbWemsFuQc1/9tGpLNndpfRjUF59SsZidVaPuPd8QNFJusQKH8genY3Q : Increase the time required for DEC APP Install/Start/Stop/Uninstall to facilitate testing

### Beta Environment



# DEC APP 的需求设计

## App-manager 目前支持的操作类型
+ start
+ stop
+ install
+ uninstall


## AppLocalStatusCode
``` rust
pub enum AppLocalStatusCode {
    Init = 0,
    Installing = 1, 
    InstallFailed = 3,
    NoService = 4,
    Stopping = 5,
    Stop = 6,
    StopFailed = 7,
    Starting = 8,
    Running = 9,
    StartFailed = 10,
    Uninstalling = 11,
    UninstallFailed = 12,
    Uninstalled = 13,
    RunException = 15, 
    ErrStatus = 255,
}
```

### 中间状态

### 


## App-manager 状态切换限制
``` rust
    pub fn is_valid_pre_status(cmd: &CmdCode, status: AppLocalStatusCode) -> bool {
        match cmd {
            CmdCode::Add(_) => true,
            CmdCode::Remove => {
                status == AppLocalStatusCode::Init
                    || status == AppLocalStatusCode::InstallFailed
                    || status == AppLocalStatusCode::UninstallFailed
                    || status == AppLocalStatusCode::Uninstalled
            }
            CmdCode::Install(_) => {
                status == AppLocalStatusCode::Init
                    || status == AppLocalStatusCode::InstallFailed
                    || status == AppLocalStatusCode::UninstallFailed
                    || status == AppLocalStatusCode::Uninstalled
            }
            CmdCode::Uninstall => {
                status == AppLocalStatusCode::Stop
                    || status == AppLocalStatusCode::StartFailed
                    || status == AppLocalStatusCode::NoService
                    || status == AppLocalStatusCode::RunException
                    || status == AppLocalStatusCode::UninstallFailed
                    || status == AppLocalStatusCode::StopFailed
                    || status == AppLocalStatusCode::Running
                    || status == AppLocalStatusCode::InstallFailed
            }
            CmdCode::Start => {
                status == AppLocalStatusCode::Stop
                    || status == AppLocalStatusCode::StartFailed
                    || status == AppLocalStatusCode::RunException
            }
            CmdCode::Stop => {
                status == AppLocalStatusCode::Running || status == AppLocalStatusCode::StopFailed
            }
            CmdCode::SetPermission(_) => {
                //安装的app才能设置权限，不然是浪费？
                status != AppLocalStatusCode::Init
            }
            CmdCode::SetQuota(_) => {
                //任何状态都可以设置配额？
                true
            }
            v @ _ => {
                warn!("[is_valid_pre_status], unknown cmd: {:?}", v);
                false
            }
        }
    }

```


### 中间状态

### 最终状态



# 测试用例设计

## DEC APP 正常操作状态切换
+ DEC APP正常安装流程
+ DEC APP正常更新流程
+ DEC APP停止service
+ DEC APP启动service
+ DEC APP卸载流程

## DEC APP 操作异常中断及恢复
+ DEC APP Installing 过程中 下载文件被中断,恢复流程
  
+ DEC APP Installing 过程中 npm i被中断,恢复流程
 
+ DEC APP Installing 过程中node service.js --install被中断,恢复流程

+ DEC APP Starting 过程中被中断,恢复流程

+ DEC APP Stopping 过程中被中断,恢复流程

+ DEC APP Uninstalling 过程中被中断,恢复流程

+ DEC APP Running 过程中被中断,重新启动流程

## DEC APP 操作重复提交

### Install 过程中重复提交操作
初始状态能进行Install，无法进行Start/Stop, 因此只考虑Install/Uninstall 

+ Install 操作Init状态重复提交Install
+ Install 操作Installing状态-下载文件中的重复提交Install
+ Install 操作Installing状态-npm i中的重复提交Install
+ Install 操作Installing状态-node service.js --install中的重复提交Install

+ Install 操作Init状态提交Uninstall
+ Install 操作Installing状态-下载文件中的提交Uninstall
+ Install 操作Installing状态-npm i中的提交Uninstall
+ Install 操作Installing状态-node service.js --install中的提交Uninstall

### Start 过程中重复提交操作
初始状态能进行Start，无法进行Install/Stop, 因此只考虑Start/Uninstall

+ Start 操作Starting状态中的重复提交
+ Stop 操作Stopping状态中的重复提交
+ Uninstall 操作Uninstalling状态中的重复提交