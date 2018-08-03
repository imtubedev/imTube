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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw0QkFBNEI7QUFDNUIsK0JBQStCO0FBQy9CLHNEQUFzRDtBQUN0RCxrREFBa0Q7QUFDbEQsK0JBQStCO0FBQy9CLGlDQUFpQztBQUNqQyw0Q0FBNEM7QUFDNUMsMkJBQTJCO0FBQzNCLG1DQUFtQztBQUVuQyxxQ0FBcUM7QUFDckMsdUJBQXVCO0FBQ3ZCLG1CQUFtQjtBQUNuQixtQ0FBbUM7QUFDbkMsS0FBSztBQUVMLHlCQUF5QjtBQUN6QiwrQkFBK0I7QUFDL0IsS0FBSztBQUVMLCtCQUErQjtBQUMvQixVQUFVO0FBQ1YsMkRBQTJEO0FBQzNELGdEQUFnRDtBQUNoRCw2Q0FBNkM7QUFDN0Msc0JBQXNCO0FBQ3RCLG1DQUFtQztBQUNuQyxNQUFNO0FBQ04sS0FBSztBQUVMLDJDQUEyQztBQUMzQyxVQUFVO0FBQ1YsNENBQTRDO0FBQzVDLHVDQUF1QztBQUN2QywyQ0FBMkM7QUFDM0MseURBQXlEO0FBQ3pELHNCQUFzQjtBQUN0Qiw2QkFBNkI7QUFDN0IsTUFBTTtBQUNOLEtBQUs7QUFFTCxvQkFBb0I7QUFDcEIsNkNBQTZDO0FBQzdDLG1CQUFtQjtBQUNuQixLQUFLO0FBSUwsSUFBSSJ9