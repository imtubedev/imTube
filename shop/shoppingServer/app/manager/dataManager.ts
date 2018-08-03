//import axios from 'axios';
//import * as low from 'lowdb';
//import * as FileSync from 'lowdb/adapters/FileSync';
//import * as Memory from 'lowdb/adapters/Memory';
//mport * as path1 from 'path';
//import * as Raven from 'raven';
//import * as schedule from 'node-schedule';
//const fs = require('fs');
//const path = './data/config.json'

// export default class DataManager {
// 	//readonly db: low;
// 	constructor() {
// 		//this.db = low(new Memory());
// 	}

// 	async initLoadData(){
// 		this.loadLocalHotConfig();
// 	}

// 	async loadLocalHotConfig(){
// 		try {
// 			const jsonObject = JSON.parse(fs.readFileSync(path));
// 			// console.log("jsonObject=>",jsonObject);
// 			//this.db.setState(jsonObject).write();
// 		} catch (error) {
// 			console.log('error=>',error);
// 		}
// 	}

// 	async loadRemoteHotConfig(url:string) {
// 		try {
// 			const response = await axios.get(url);
// 			const jsonObject = response.data;
// 			this.db.setState(jsonObject).write();
// 			fs.writeFileSync(path, JSON.stringify(jsonObject));
// 		} catch (error) {
// 			// logger.error(error);
// 		}
// 	}

// 	get(key:string){
// 		const config = this.db.get(key).value();
// 		return config;
// 	}
	


// }
