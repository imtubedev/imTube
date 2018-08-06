##  1. 相关信息重要说明
本文是基于3.0版本，最新4.0版本，可能会有些许不同。
### 1.1 文件配置与存储目录
nodes目录下有两个文件夹，一个是config，一个是data。

config里面有一个config.ini配置文件，只有在运行一次nodes后才会出现，主要配置一些插件和节点，需要第一次运行修改。

data文件是运行nodes后生成的区块信息，比如创建的钱包和账户等信息，都会保存在此处，删除data文件夹，相当于把已有的数据全部删除，为稳定测试提供很大帮助


```python
~/.local/share/eosio/nodeos/
```
### 1.2 get table 命令

这是一条非常重要的命令，只能通过get table，获取到数据库中数据表的内容，不可以通过mondodb等查看。

参数如下：
```python
Usage: cleos get table [OPTIONS] contract scope table

Positionals:
contract TEXT The contract who owns the table
scope TEXT The scope within the contract in which the table is found
table TEXT The name of the table as specified by the contract abi
```

参数说明：

contract：要获取的表的合约名；

table：要获取的表名；

scope：这个理解有点难，表示查找的范围。

举个栗子：

看一下eosio.system.abi文件中的tables，voters 是笔者添加的，后续会有说明。

```python
"tables": [{
"name": "producerinfo",
"type": "producer_info",
"index_type": "i64",
"key_names" : ["owner"],
"key_types" : ["uint64"]
},{
"name": "totalband",
"type": "total_resources",
"index_type": "i64",
"key_names" : ["owner"],
"key_types" : ["uint64"]
},{
"name": "delband",
"type": "delegated_bandwidth",
"index_type": "i64",
"key_names" : ["to"],
"key_types" : ["uint64"]
},{
"name": "refunds",
"type": "refund_request",
"index_type": "i64",
"key_names" : ["owner"],
"key_types" : ["uint64"]
},{
"name": "voters",
"type": "voter_info",
"index_type": "i64",
"key_names" : ["owner"],
"key_types" : ["uint64"]
}
]
```

这里拿delband 中的key_names 来说明一下，它表示表的索引。 首先来看一下 delegated_bandwidth 的结构

```python
{
"name": "delegated_bandwidth",
"base": "",
"fields": [
{"name":"from", "type":"account_name"},
{"name":"to", "type":"account_name"},
{"name":"net_weight", "type":"uint64"},
{"name":"cpu_weight", "type":"uint64"},
{"name":"storage_stake", "type":"uint64"},
{"name":"storage_bytes", "type":"uint64"}
]
}
```

如果索引是owner，scope一般都是部署合约的账户名。

如果是表里的某一参数，scope一般都是执行合约的账户名。

这里具体的联系还没找出，有错误或者知道的，可以指出。

## 2. eosio.system 投票智能合约 
### 2.1 测试前准备

为了测试投票后，查看投票信息，首先需要手动在eos/contracts/eosio.system/eosio.system.abi中的tables加上voters，如前文提到的。

首先启动nodes

```python
nodeos -e -p eosio --plugin eosio::wallet_api_plugin --plugin eosio::chain_api_plugin --plugin eosio::account_history_api_plugin 
```

后续命令都是在 eos 根目录执行的，为了减少文章篇幅，命令执行后的输出，尽量不在写在文章内。

下面创建钱包，导入私钥，创建账号，部署合约，发币，转账要一气呵成，为后面测试用，多创建几个账号

钱包私钥：PW5JtvZQES9UqCJ83z29Kxs2anz7v41tdoNgH7Sgy2Lus44MxaJhV

```python
 cleos wallet create

cleos wallet import 5Jmsawgsp1tQ3GD6JyGCwy1dcvqKZgX6ugMVMdjirx85iv5VyPR

cleos set contract eosio build/contracts/eosio.bios -p eosio

cleos create account eosio eosio.token EOS7ijWCBmoXBi3CgtK7DJxentZZeTkeUnaSDvyro9dq7Sd1C3dC4 EOS7ijWCBmoXBi3CgtK7DJxentZZeTkeUnaSDvyro9dq7Sd1C3dC4

cleos create account eosio ost EOS7ijWCBmoXBi3CgtK7DJxentZZeTkeUnaSDvyro9dq7Sd1C3dC4 EOS7ijWCBmoXBi3CgtK7DJxentZZeTkeUnaSDvyro9dq7Sd1C3dC4

cleos create account eosio imtube EOS7ijWCBmoXBi3CgtK7DJxentZZeTkeUnaSDvyro9dq7Sd1C3dC4 EOS7ijWCBmoXBi3CgtK7DJxentZZeTkeUnaSDvyro9dq7Sd1C3dC4

cleos create account eosio alice EOS7ijWCBmoXBi3CgtK7DJxentZZeTkeUnaSDvyro9dq7Sd1C3dC4 EOS7ijWCBmoXBi3CgtK7DJxentZZeTkeUnaSDvyro9dq7Sd1C3dC4

cleos create account eosio bob EOS7ijWCBmoXBi3CgtK7DJxentZZeTkeUnaSDvyro9dq7Sd1C3dC4 EOS7ijWCBmoXBi3CgtK7DJxentZZeTkeUnaSDvyro9dq7Sd1C3dC4

cleos set contract eosio build/contracts/eosio.system/ -p eosio

cleos set contract eosio.token build/contracts/eosio.token -p eosio.token

 cleos push action eosio.token create '[ "eosio", "1000000000.0000 EOS", 0, 0, 0]' -p eosio.token

cleos push action eosio.token issue '["ost","1000.0000 EOS",""]' -p eosio

cleos push action eosio.token issue '["imtube","1000.0000 EOS",""]' -p eosio

cleos push action eosio.token issue '["alice","2000.0000 EOS",""]' -p eosio

cleos push action eosio.token issue '["bob","1000.0000 EOS",""]' -p eosio
```

### 2.2 投票流程

为了保证可以一次流程尽可能多的测试各种情况，可能会涉及多次重复同一操作。

#### 2.2.1 节点的注册、取消与更改

注册节点：

```python
cleos push action eosio regproducer '{"producer":"alice","producer_key":"000374efa00b0f3bdf5cbbd4cff249af0faf1fcec74e085f21b455e4a5e85cd26a90","prefs":{"base_per_transaction_net_usage":100,"base_per_transaction_cpu_usage":500,"base_per_action_cpu_usage":1000,"base_setcode_cpu_usage":2097152,"per_signature_cpu_usage":100000,"per_lock_net_usage":32,"context_free_discount_cpu_usage_num":20,"context_free_discount_cpu_usage_den":100,"max_transaction_cpu_usage":10485760,"max_transaction_net_usage":104857,"max_block_cpu_usage":104857600,"target_block_cpu_usage_pct":1000,"max_block_net_usage":1048576,"target_block_net_usage_pct":1000,"max_transaction_lifetime":3600,"max_transaction_exec_time":10000,"max_authority_depth":6,"max_inline_depth":4,"max_inline_action_size":4096,"max_generated_transaction_count":16,"max_storage_size":10485760,"percent_of_max_inflation_rate":0,"storage_reserve_ratio":1000,"max_transaction_delay":864000}}' -p alice
```
这里的producer_key是由 EOS7ijWCBmoXBi3CgtK7DJxentZZeTkeUnaSDvyro9dq7Sd1C3dC4 公钥转成的，公钥可以用于接收节点奖励，私钥可以用于签名。

具体这个“000374efa00b0f3bdf5cbbd4cff249af0faf1fcec74e085f21b455e4a5e85cd26a90”  是怎么来的：代码中是 fc::raw::pack( public_key),而在cloes没有找到对应的接口。

这里取了个巧：运行 cleos system （后续会提到）下面的代码，虽然报错，缺少了max_transaction_delay字段，你会发现他不紧把public_key转成了需要的格式，还把其他字段显示出来了，只要复制一下，然后把max_transaction_delay加上就可以了。


```python
cleos system regproducer alice EOS7ijWCBmoXBi3CgtK7DJxentZZeTkeUnaSDvyro9dq7Sd1C3dC4

Error 3040002: Invalid Action Arguments
Ensure that your arguments follow the contract abi!
You can check the contract's abi by using 'cleos get code' command.
Error Details:
'{"producer":"alice","producer_key":"000374efa00b0f3bdf5cbbd4cff249af0faf1fcec74e085f21b455e4a5e85cd26a90","prefs":{"base_per_transaction_net_usage":100,"base_per_transaction_cpu_usage":500,"base_per_action_cpu_usage":1000,"base_setcode_cpu_usage":2097152,"per_signature_cpu_usage":100000,"per_lock_net_usage":32,"context_free_discount_cpu_usage_num":20,"context_free_discount_cpu_usage_den":100,"max_transaction_cpu_usage":10485760,"max_transaction_net_usage":104857,"max_block_cpu_usage":104857600,"target_block_cpu_usage_pct":1000,"max_block_net_usage":1048576,"target_block_net_usage_pct":1000,"max_transaction_lifetime":3600,"max_transaction_exec_time":10000,"max_authority_depth":6,"max_inline_depth":4,"max_inline_action_size":4096,"max_generated_transaction_count":16,"max_storage_size":10485760,"percent_of_max_inflation_rate":0,"storage_reserve_ratio":1000}}' is invalid args for action 'regproducer' code 'eosio'
Missing 'max_transaction_delay' in variant object
```

更改节点：

更改可以改两项，producer_key 和 prefs,而 producer 是不可以更改的。

下面的只是另一种加密方式的秘钥对。

要换成的秘钥对：

私钥：PVT_R1_iyQmnyPEGvFd8uffnk152WC2WryBjgTrg22fXQryuGL9mU6qW

公钥：PUB_R1_6EPHFSKVYHBjQgxVGQPrwCxTg7BbZ69H9i4gztN9deKTEXYne4

下面只是更改了producer_key，获取方式也是用 cleos system。


```python
cleos push action eosio regproducer '{"producer":"alice","producer_key":"0102b0deed150ac513f4e0b62d2f7669cb3b36e79e3e7f0a9e021dd013a33eee9c66","prefs":{"base_per_transaction_net_usage":100,"base_per_transaction_cpu_usage":500,"base_per_action_cpu_usage":1000,"base_setcode_cpu_usage":2097152,"per_signature_cpu_usage":100000,"per_lock_net_usage":32,"context_free_discount_cpu_usage_num":20,"context_free_discount_cpu_usage_den":100,"max_transaction_cpu_usage":10485760,"max_transaction_net_usage":104857,"max_block_cpu_usage":104857600,"target_block_cpu_usage_pct":1000,"max_block_net_usage":1048576,"target_block_net_usage_pct":1000,"max_transaction_lifetime":3600,"max_transaction_exec_time":10000,"max_authority_depth":6,"max_inline_depth":4,"max_inline_action_size":4096,"max_generated_transaction_count":16,"max_storage_size":10485760,"percent_of_max_inflation_rate":0,"storage_reserve_ratio":1000,"max_transaction_delay":864000}}' -p alice
```

取消节点：

这个就比较简单，值得注意的是，取消节点后，其他账号不能在为其投票，但是之前投的票会被保留，下次创建节点还有出现。

```python
cleos push action eosio unregprod '{"producer":"alice"}' -p alice
```

#### 2.2.2 抵押与取消抵押

抵押：

抵押给自己:

```python
cleos push action eosio delegatebw '{"from":"ost","receiver":"ost","stake_net_quantity":"10.0000 EOS","stake_cpu_quantity":"10.0000 EOS","stake_storage_quantity":"10.0000 EOS"}' -p ost
```
抵押前转给了ost 1000.0000 EOS token，查看抵押后的账户

```python

cleos get table eosio.token ost accounts
{
"rows": [{
"balance": "970.0000 EOS",
"frozen": 0,
"whitelist": 1
}
],
"more": false
}
```
查看抵押信息：

```python
cleos get table eosio ost delband
{
"rows": [{
"from": "ost",
"to": "ost",
"net_weight": 100000,
"cpu_weight": 1397703940,
"storage_stake": 100000,
"storage_bytes": 1397703940
}
],
"more": false
}
```
抵押给别人：

```python
cleos push action eosio delegatebw '{"from":"ost","receiver":"imtube","stake_net_quantity":"5.0000 EOS","stake_cpu_quantity":"5.0000 EOS","stake_storage_quantity":"5.0000 EOS"}' -p ost
```

查看抵押信息：


```python
cleos get table eosio ost delband{
"rows": [{
"from": "ost",
"to": "imtube",
"net_weight": 50000,
"cpu_weight": 1397703940,
"storage_stake": 50000,
"storage_bytes": 1397703940
},{
"from": "ost",
"to": "ost",
"net_weight": 100000,
"cpu_weight": 1397703940,
"storage_stake": 100000,
"storage_bytes": 1397703940
}
],
"more": false
}
```

查询ost的balance为：955.0000 EOS

取消抵押：

```python
cleos push action eosio undelegatebw '{"from":"ost","receiver":"ost","unstake_net_quantity":"5.0000 EOS","unstake_cpu_quantity":"5.0000 EOS","unstake_storage_bytes":0}' -p ost
```

查看抵押信息，取消抵押的部分，已经撤回了

```python
cleos get table eosio ost delband{
"rows": [{
"from": "ost",
"to": "imtube",
"net_weight": 50000,
"cpu_weight": 1397703940,
"storage_stake": 50000,
"storage_bytes": 1397703940
},{
"from": "ost",
"to": "ost",
"net_weight": 50000,
"cpu_weight": 1397703940,
"storage_stake": 50000,
"storage_bytes": 1397703940
}
],
"more": false
}
```
然后再次查看 ost 的 balance，发现还是955.0000 EOS，没有将取消抵押的返回回来，原因是取消抵押有3天延迟，认真的同学可以去试试三天后会不会返还。

```python
cleos get table eosio.token ost accounts
{
"rows": [{
"balance": "955.0000 EOS",
"frozen": 0,
"whitelist": 1
}
],
"more": false
}
```
#### 2.2.3 投票与取消投票
##### 2.2.3.1 投票前准备

投票的先有节点，创建节点：


```python
cleos push action eosio regproducer '{"producer":"ost","producer_key":"000374efa00b0f3bdf5cbbd4cff249af0faf1fcec74e085f21b455e4a5e85cd26a90","prefs":{"base_per_transaction_net_usage":100,"base_per_transaction_cpu_usage":500,"base_per_action_cpu_usage":1000,"base_setcode_cpu_usage":2097152,"per_signature_cpu_usage":100000,"per_lock_net_usage":32,"context_free_discount_cpu_usage_num":20,"context_free_discount_cpu_usage_den":100,"max_transaction_cpu_usage":10485760,"max_transaction_net_usage":104857,"max_block_cpu_usage":104857600,"target_block_cpu_usage_pct":1000,"max_block_net_usage":1048576,"target_block_net_usage_pct":1000,"max_transaction_lifetime":3600,"max_transaction_exec_time":10000,"max_authority_depth":6,"max_inline_depth":4,"max_inline_action_size":4096,"max_generated_transaction_count":16,"max_storage_size":10485760,"percent_of_max_inflation_rate":0,"storage_reserve_ratio":1000,"max_transaction_delay":864000}}' -p ost
```

```python
cleos push action eosio regproducer '{"producer":"imtube","producer_key":"000374efa00b0f3bdf5cbbd4cff249af0faf1fcec74e085f21b455e4a5e85cd26a90","prefs":{"base_per_transaction_net_usage":100,"base_per_transaction_cpu_usage":500,"base_per_action_cpu_usage":1000,"base_setcode_cpu_usage":2097152,"per_signature_cpu_usage":100000,"per_lock_net_usage":32,"context_free_discount_cpu_usage_num":20,"context_free_discount_cpu_usage_den":100,"max_transaction_cpu_usage":10485760,"max_transaction_net_usage":104857,"max_block_cpu_usage":104857600,"target_block_cpu_usage_pct":1000,"max_block_net_usage":1048576,"target_block_net_usage_pct":1000,"max_transaction_lifetime":3600,"max_transaction_exec_time":10000,"max_authority_depth":6,"max_inline_depth":4,"max_inline_action_size":4096,"max_generated_transaction_count":16,"max_storage_size":10485760,"percent_of_max_inflation_rate":0,"storage_reserve_ratio":1000,"max_transaction_delay":864000}}' -p imtube
```

抵押：

前文已经抵押过了：ost → ost 5.0000 EOS， ost → imtube 5.0000 EOS

```python
cleos get table eosio ost delband
{
"rows": [{
"from": "ost",
"to": "imtube",
"net_weight": 50000,
"cpu_weight": 1397703940,
"storage_stake": 50000,
"storage_bytes": 1397703940
},{
"from": "ost",
"to": "ost",
"net_weight": 50000,
"cpu_weight": 1397703940,
"storage_stake": 50000,
"storage_bytes": 1397703940
}
],
"more": false
}
```

imtube → imtube 

```python
cleos push action eosio delegatebw '{"from":"imtube","receiver":"imtube","stake_net_quantity":"2.0000 EOS","stake_cpu_quantity":"2.0000 EOS","stake_storage_quantity":"2.0000 EOS"}' -p imtube
```

查看 imtube 抵押信息：

```python
cleos get table eosio imtube delband{
"rows": [{
"from": "imtube",
"to": "imtube",
"net_weight": 20000,
"cpu_weight": 1397703940,
"storage_stake": 20000,
"storage_bytes": 1397703940
}
],
"more": false
}
```
imtube → bob 

```python
cleos push action eosio delegatebw '{"from":"imtube","receiver":"bob","stake_net_quantity":"3.0000 EOS","stake_cpu_quantity":"3.0000 EOS","stake_storage_quantity":"3.0000 EOS"}' -p imtube
```
##### 2.3.3.2 节点给其他节点投票

```python
cleos push action eosio voteproducer '{"voter":"imtube","proxy":"","producers":["ost"]}' -p imtube
```

获取投票者信息：

```python
cleos get table eosio eosio voters
{
"rows": [{
"owner": "imtube",
"proxy": "",
"last_update": 1526029573,
"is_proxy": 0,
"staked": "10.0000 EOS",
"unstaking": "0.0000 EOS",
"unstake_per_week": "0.0000 EOS",
"proxied_votes": "0",
"producers": [
"ost"
],
"deferred_trx_id": 0,
"last_unstake": 0
},{
"owner": "ost",
"proxy": "",
"last_update": 1526027699,
"is_proxy": 0,
"staked": "20.0000 EOS",
"unstaking": "0.0000 EOS",
"unstake_per_week": "0.0000 EOS",
"proxied_votes": "0",
"producers": [],
"deferred_trx_id": 0,
"last_unstake": 0
}
],
"more": false
}
```

默认是没有voters表的，前文已经提到在eosio.system.abi修改tables了，这里就不在提及了。

可以看到上面 imtube 的 staked（抵押）剩余为10.0000 EOS，其值为delband 中 net_weight 与 storage_stake 的和（可存在多组）。

举个栗子：

staked = 3 + 3 + 2 + 2；

```python

cleos get table eosio imtube delband
{
"rows": [{
"from": "imtube",
"to": "bob",
"net_weight": 30000,
"cpu_weight": 1397703940,
"storage_stake": 30000,
"storage_bytes": 1397703940
},{
"from": "imtube",
"to": "imtube",
"net_weight": 20000,
"cpu_weight": 1397703940,
"storage_stake": 20000,
"storage_bytes": 1397703940
}
],
"more": false
}
```

##### 2.3.3.3 节点给自己投票

```python
cleos push action eosio voteproducer '{"voter":"imtube","proxy":"","producers":["imtube"]}' -p imtube
```

##### 2.3.3.4 账号给节点投票

bob抵押：

```python
cleos push action eosio delegatebw '{"from":"bob","receiver":"bob","stake_net_quantity":"11.0000 EOS","stake_cpu_quantity":"11.0000 EOS","stake_storage_quantity":"11.0000 EOS"}' -p bob
```

bob给ost投票：

```python
cleos push action eosio voteproducer '{"voter":"bob","proxy":"","producers":["ost"]}' -p bob
```

查看节点信息：

首先可以看到ost的投票数量是220000 ， votingNum = (stake_net_quantity + stake_cpu_quantity) * 10000;

也可以看到imtube投票数量为10000，是之前imtube投给自己的。

```python
cleos get table eosio eosio producerinfo{
"rows": [{
"owner": "alice",
"total_votes": "0",
"prefs": {
"base_per_transaction_net_usage": 100,
"base_per_transaction_cpu_usage": 500,
"base_per_action_cpu_usage": 1000,
"base_setcode_cpu_usage": 2097152,
"per_signature_cpu_usage": 100000,
"per_lock_net_usage": 32,
"context_free_discount_cpu_usage_num": 20,
"context_free_discount_cpu_usage_den": 100,
"max_transaction_cpu_usage": 10485760,
"max_transaction_net_usage": 104857,
"max_block_cpu_usage": 104857600,
"target_block_cpu_usage_pct": 1000,
"max_block_net_usage": 1048576,
"target_block_net_usage_pct": 1000,
"max_transaction_lifetime": 3600,
"max_transaction_exec_time": 10000,
"max_authority_depth": 6,
"max_inline_depth": 4,
"max_inline_action_size": 4096,
"max_generated_transaction_count": 16,
"max_transaction_delay": 864000,
"max_storage_size": 10485760,
"percent_of_max_inflation_rate": 0,
"storage_reserve_ratio": 1000
},
"packed_key": [],
"per_block_payments": 0,
"last_claim_time": 1397703940
},{
"owner": "imtube",
"total_votes": "100000",
"prefs": {
"base_per_transaction_net_usage": 100,
"base_per_transaction_cpu_usage": 500,
"base_per_action_cpu_usage": 1000,
"base_setcode_cpu_usage": 2097152,
"per_signature_cpu_usage": 100000,
"per_lock_net_usage": 32,
"context_free_discount_cpu_usage_num": 20,
"context_free_discount_cpu_usage_den": 100,
"max_transaction_cpu_usage": 10485760,
"max_transaction_net_usage": 104857,
"max_block_cpu_usage": 104857600,
"target_block_cpu_usage_pct": 1000,
"max_block_net_usage": 1048576,
"target_block_net_usage_pct": 1000,
"max_transaction_lifetime": 3600,
"max_transaction_exec_time": 10000,
"max_authority_depth": 6,
"max_inline_depth": 4,
"max_inline_action_size": 4096,
"max_generated_transaction_count": 16,
"max_transaction_delay": 864000,
"max_storage_size": 10485760,
"percent_of_max_inflation_rate": 0,
"storage_reserve_ratio": 1000
},
"packed_key": [
0,
3,
116,
239,
160,
11,
15,
59,
223,
92,
187,
212,
207,
242,
73,
175,
15,
175,
31,
206,
199,
78,
8,
95,
33,
180,
85,
228,
165,
232,
92,
210,
106,
144
],
"per_block_payments": 0,
"last_claim_time": 1397703940
},{
"owner": "ost",
"total_votes": "220000",
"prefs": {
"base_per_transaction_net_usage": 100,
"base_per_transaction_cpu_usage": 500,
"base_per_action_cpu_usage": 1000,
"base_setcode_cpu_usage": 2097152,
"per_signature_cpu_usage": 100000,
"per_lock_net_usage": 32,
"context_free_discount_cpu_usage_num": 20,
"context_free_discount_cpu_usage_den": 100,
"max_transaction_cpu_usage": 10485760,
"max_transaction_net_usage": 104857,
"max_block_cpu_usage": 104857600,
"target_block_cpu_usage_pct": 1000,
"max_block_net_usage": 1048576,
"target_block_net_usage_pct": 1000,
"max_transaction_lifetime": 3600,
"max_transaction_exec_time": 10000,
"max_authority_depth": 6,
"max_inline_depth": 4,
"max_inline_action_size": 4096,
"max_generated_transaction_count": 16,
"max_transaction_delay": 864000,
"max_storage_size": 10485760,
"percent_of_max_inflation_rate": 0,
"storage_reserve_ratio": 1000
},
"packed_key": [
0,
3,
116,
239,
160,
11,
15,
59,
223,
92,
187,
212,
207,
242,
73,
175,
15,
175,
31,
206,
199,
78,
8,
95,
33,
180,
85,
228,
165,
232,
92,
210,
106,
144
],
"per_block_payments": 0,
"last_claim_time": 1397703940
}
],
"more": false
}
```

##### 2.3.3.5 投票给多个节点

将alice设置为节点
```python
cleos push action eosio regproducer '{"producer":"alice","producer_key":"000374efa00b0f3bdf5cbbd4cff249af0faf1fcec74e085f21b455e4a5e85cd26a90","prefs":{"base_per_transaction_net_usage":100,"base_per_transaction_cpu_usage":500,"base_per_action_cpu_usage":1000,"base_setcode_cpu_usage":2097152,"per_signature_cpu_usage":100000,"per_lock_net_usage":32,"context_free_discount_cpu_usage_num":20,"context_free_discount_cpu_usage_den":100,"max_transaction_cpu_usage":10485760,"max_transaction_net_usage":104857,"max_block_cpu_usage":104857600,"target_block_cpu_usage_pct":1000,"max_block_net_usage":1048576,"target_block_net_usage_pct":1000,"max_transaction_lifetime":3600,"max_transaction_exec_time":10000,"max_authority_depth":6,"max_inline_depth":4,"max_inline_action_size":4096,"max_generated_transaction_count":16,"max_storage_size":10485760,"percent_of_max_inflation_rate":0,"storage_reserve_ratio":1000,"max_transaction_delay":864000}}' -p alice
```

通过 cleos get table eosio eosio producerinfo ，可以看到 alice，imtube，ost是有一个先后顺序的。


在为多节点投票的时候，要保证顺序是和前面一样的。

举个栗子：上面的顺序为 alice → imtube → ost，所以下面的顺序应该是imtube在ost前面，而不能到过来。

```python
cleos push action eosio voteproducer '{"voter":"bob","proxy":"","producers":["imtube","ost"]}' -p bob
```
#### 2.2.4 投票失败

未创建的节点；

创建后又取消的节点；

一次投30个以上的节点，只有前30可以成功；

多个节点投票，没有按顺序；

#### 2.2.5 节点奖励

```python
cleos push action eosio claimrewards '{"owner":"imtube"}' -p imtube
```

要想发放节点奖励，必须保证per_block_payments 大于0；

在eos/contracts/eosio.system/producer_pay.cpp 中， 发现奖励相关的代码是注释掉的。


```python
const system_token_type block_payment = parameters.payment_per_block;
system_token_type rewards = prod->per_block_payments;
```

#### 2.2.5 投票小总结

在账号准备好的情况下，就是已经创建，并且拥有token。

流程： 创建节点 - 抵押 - 投票

抵押取消时，会有三天的延迟到账。

保留投票：节点取消前，已经拥有投票，下次在创建的时候，数量将被保留。

投票比较自由，账号和节点都可以投票，节点也可以投给自己。

一次可以给30个以下投票（包含30），每个节点的投票数量均为抵押数量，

多个节点投票，要有顺序。

在投票结束后,在nodes端出报异常，但是不影响，不知道为什么，有人知道可以指教一下吗?

```python
2134510ms thread-0 producer_plugin.cpp:239 block_production_loo ] eosio generated block 18d334e2... #56764 @ 2018-05-11T11:35:34.500 with 0 trxs, lib: 56763
2135008ms thread-0 wasm_interface.cpp:812 eosio_assert ] message: must issue positive quantity 
2135009ms thread-0 chain_controller.cpp:2142 operator() ] 10 assert_exception: Assert Exception
condition: assertion failed: must issue positive quantity
{"s":"must issue positive quantity"}
thread-0 wasm_interface.cpp:813 eosio_assert

{"_pending_console_output.str()":"issue"}
thread-0 apply_context.cpp:30 exec_one

{}
thread-0 chain_controller.cpp:2129 __apply_transaction
2135009ms thread-0 chain_controller.cpp:2142 operator() ] meta.id: dff86816ef58f2270d7d0f6b4d1af3053dd33fef6fee6402b9c610281aa25d0e
```

### 2.3 代理投票流程

删除nodes下面的data文件夹，重新来过，走一遍准备流程,这里不在重复写出。

#### 2.3.1 节点注册与取消

和之前是一样的：

```python
leos push action eosio regproducer '{"producer":"ost","producer_key":"000374efa00b0f3bdf5cbbd4cff249af0faf1fcec74e085f21b455e4a5e85cd26a90","prefs":{"base_per_transaction_net_usage":100,"base_per_transaction_cpu_usage":500,"base_per_action_cpu_usage":1000,"base_setcode_cpu_usage":2097152,"per_signature_cpu_usage":100000,"per_lock_net_usage":32,"context_free_discount_cpu_usage_num":20,"context_free_discount_cpu_usage_den":100,"max_transaction_cpu_usage":10485760,"max_transaction_net_usage":104857,"max_block_cpu_usage":104857600,"target_block_cpu_usage_pct":1000,"max_block_net_usage":1048576,"target_block_net_usage_pct":1000,"max_transaction_lifetime":3600,"max_transaction_exec_time":10000,"max_authority_depth":6,"max_inline_depth":4,"max_inline_action_size":4096,"max_generated_transaction_count":16,"max_storage_size":10485760,"percent_of_max_inflation_rate":0,"storage_reserve_ratio":1000,"max_transaction_delay":864000}}' -p ost
```

#### 2.3.2 建立代理与取消代理

建立代理：

```python
cleos push action eosio regproxy '{"proxy":"imtube"}' -p imtube
```
取消代理：

```python
cleos push action eosio unregproxy '{"proxy":"imtube"}' -p imtube
```
#### 2.3.3 代理投票

建立代理：

```python
cleos push action eosio regproxy '{"proxy":"alice"}' -p alice
```
抵押：

```python
cleos push action eosio delegatebw '{"from":"imtube","receiver":"imtube","stake_net_quantity":"11.0000 EOS","stake_cpu_quantity":"11.0000 EOS","stake_storage_quantity":"11.0000 EOS"}' -p imtube
```
委托代理：

```python
cleos push action eosio voteproducer '{"voter":"imtube","proxy":"alice","producers":[]}' -p imtube
```

代理投票：

```python
cleos push action eosio voteproducer '{"voter":"alice","proxy":"","producers":["ost"]}' -p alice
```

#### 2.3.4 代理小结
代理的作用就是替别人做出选择投票，本身不需要抵押。

在投票的时候，要先抵押，而投票的选择有两种，只能选择一种，两种不能同时存在。

如果选择投票，就直接投票了。

如果选择代理，就是自己抵押相当于是替代理抵押了，然后代理去选择要投票的节点。

已经作为代理的账号，不能在设置代理投票。

## 3  cleos system

```python

Send eosio.system contract action to the blockchain.
Usage: cleos system SUBCOMMAND

Subcommands:
regproducer Register a new producer
unregprod Unregister an existing producer
voteproducer Vote for a producer
delegatebw Delegate bandwidth
undelegatebw Undelegate bandwidth
claimrewards Claim producer rewards
regproxy Register an account as a proxy (for voting)
unregproxy Unregister an account as a proxy (for voting)
postrecovery Post recovery request
vetorecovery Veto a posted recovery
canceldelay Cancel a delayed transaction
```

这里就是官方把eosio.system合约放到了cleos中，并且为写合约简化了书写格式。

这里笔者还没有测试的有：postrecovery，vetorecovery，canceldelay，这三个后续会更新。

regproducer ：注册节点的时候，有点小问题，提示没有 max_transaction_delay 字段的，可以使用push action的方法。

## 4 投票总结
笔者认为比较重要的几个点：

投票的流程：要执行投票，得有两个前置条件，存在节点，已经抵押过token；

取消抵押的时候，有三天的延迟；

get table 中 scope 的含义；

投票失败的几个原因；

选择代理的时候不能同时选择投票。


