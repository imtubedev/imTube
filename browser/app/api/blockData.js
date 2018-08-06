'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Eos = require('eosjs');
const fs = require('fs');
const binaryen = require('binaryen');
const config = require('../../config/config.params');
class BlockData {
    /*config = {
       keyProvider: ['PrivateKeys...'], // WIF string or array of keys..
       httpEndpoint: 'http://127.0.0.1:8888',
       mockTransactions: () => 'pass', // or 'fail'
       transactionHeaders: (expireInSeconds, callback) => {
           callback(null, 'headers')
       },
       expireInSeconds: 60,
       broadcast: true,
       debug: false,
       sign: true
   };*/
    /**
     * 输入块号获取块信息
     */
    static async getBlockInfoByNum(block_num) {
        return new Promise((resolve) => {
            // eos = Eos.Localnet() // 127.0.0.1:8888
            const eos = Eos.Testnet(); // testnet at eos.io
            // All API methods print help when called with no-arguments.
            //eos.getBlock()
            // Next, your going to need eosd running on localhost:8888
            // If a callback is not provided, a Promise is returned
            eos.getBlock(block_num).then((result) => {
                console.log('block1' + JSON.stringify(result));
                resolve(result);
            });
        });
    }
    /**
     * 输入块号或ID获取块信息
     */
    static async getBlockInfoById(block_id) {
        return new Promise((resolve) => {
            // eos = Eos.Localnet() // 127.0.0.1:8888
            const eos = Eos.Testnet(); // testnet at eos.io
            // All API methods print help when called with no-arguments.
            //eos.getBlock()
            // Next, your going to need eosd running on localhost:8888
            eos.getBlock({ block_num_or_id: block_id }).then((result) => {
                console.log(result);
                resolve(result);
            });
        });
    }
    /**
     * 交易
     */
    static async transfer(options) {
        const eos = Eos.Localnet({ keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3' });
        // Run with no arguments to print usage.
        eos.transfer();
        // Usage with options (options are always optional)
        options = { broadcast: false };
        eos.transfer({ from: 'inita', to: 'initb', amount: 1, memo: '' }, options);
        // Object or ordered args may be used.
        eos.transfer('inita', 'initb', 1, 'memo', options);
        // A broadcast boolean may be provided as a shortcut for {broadcast: false}
        eos.transfer('inita', 'initb', 1, '', false);
    }
    /**
     * account
     */
    static async account() {
        const initaPrivate = config.userKeys.currencyPrivate;
        const initaPublic = config.userKeys.currencyPublic;
        const keyProvider = initaPrivate;
        const eos = Eos.Localnet({ keyProvider });
        eos.newaccount({
            creator: 'inita',
            name: 'mynewacct',
            owner: initaPublic,
            active: initaPublic,
            recovery: 'inita',
            deposit: '1 EOS'
        });
    }
    /**
     * Deploy a smart contract
     */
    static async contract() {
        let { ecc } = Eos.modules;
        //const initaPrivate = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3';
        const initaPrivate = config.userKeys.currencyPrivate;
        // New deterministic key for the currency account.  Only use a simple
        // seedPrivate in production if you want to give away money.
        const currencyPrivate = ecc.seedPrivate('currency');
        const currencyPublic = ecc.privateToPublic(currencyPrivate);
        const keyProvider = [initaPrivate, currencyPrivate];
        //  Requires a large library, separate from the eosjs bundle
        // $ npm install binaryen
        const eos = Eos.Localnet({ keyProvider, binaryen });
        eos.newaccount({
            creator: 'inita',
            name: 'currency',
            owner: currencyPublic,
            active: currencyPublic,
            recovery: 'inita',
            deposit: '1 EOS'
        });
        const contractDir = `${process.env.HOME}/eosio/eos/build/contracts/currency`;
        const wast = fs.readFileSync(`${contractDir}/currency.wast`);
        const abi = fs.readFileSync(`${contractDir}/currency.abi`);
        // Publish contract to the blockchain
        eos.setcode('currency', 0, 0, wast, abi);
        // eos.contract(code<string>, [options], [callback])
        eos.contract('currency').then((currency) => {
            // Transfer is one of the actions in currency.abi 
            currency.transfer('currency', 'inita', 100);
        });
    }
}
exports.default = BlockData;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tEYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmxvY2tEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFDYixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNyQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUVyRDtJQUNLOzs7Ozs7Ozs7OztPQVdHO0lBQ0o7O09BRUc7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFNBQWlCO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNCLHlDQUF5QztZQUN6QyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxvQkFBb0I7WUFFL0MsNERBQTREO1lBQzVELGdCQUFnQjtZQUVoQiwwREFBMEQ7WUFFMUQsdURBQXVEO1lBQ3ZELEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDL0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0Q7O09BRUc7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQWdCO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNCLHlD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