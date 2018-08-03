'use strict';
const Eos = require('eosjs');
const fs = require('fs');
const binaryen = require('binaryen');
const config = require('../../config/config.params');

export default class BlockData {
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
    public static async getBlockInfoByNum(block_num: number) {
        return new Promise((resolve) => {
            // eos = Eos.Localnet() // 127.0.0.1:8888
            const eos = Eos.Testnet(); // testnet at eos.io

            // All API methods print help when called with no-arguments.
            //eos.getBlock()

            // Next, your going to need eosd running on localhost:8888

            // If a callback is not provided, a Promise is returned
            eos.getBlock(block_num).then( (result) => {
                console.log('block1' + JSON.stringify(result));
                resolve(result);
            });
        });
    }
    /**
     * 输入块号或ID获取块信息
     */
    public static async getBlockInfoById(block_id: number) {
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
    public static async transfer(options: any){
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
    public static async account(){
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
    public static async contract() {
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
};
