
const cyfs = require('cyfs-sdk');
async function main() {
    let install_time = 20;
    while(install_time>=0){
    	console.info(`dec app is installing ${install_time - 20} min ,wait 60s.`)
    	await cyfs.sleep(60*1000);
    	install_time = install_time - 1;
    }
    console.info(`dec app install finished!`)
    process.exit(0);
}
main();