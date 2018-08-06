'use strict';
import * as _ from 'lodash'
//import Redis from 'ioredis'
import * as Keyv from 'keyv';

export default class UserCache {
  keyv: Keyv;

  constructor(redisConfig:any) {
    this.keyv = new Keyv('',redisConfig)
    this.keyv.on('error', err => console.error('Connection Error', err))
  }

  async online(user: any, userInfo) {
    const userData = await this.keyv.get(user.shortId)
    const data = {
      uid: user.id,
      nickname: user.nickname,
      sex: user.sex,
      headimgurl: user.headimgurl,
      sid: userInfo['sid'],
      ip: userInfo['ip'],
      province: userInfo['province'],
      city: userInfo['city']
    }
    if (!userData) {
      this.keyv.set(user.shortId, _.assign(data, { game: "", online: true, roomId: "" }))
    } else {
      this.keyv.set(user.shortId, _.assign(userData, data))
    }
  }

  async offline(shortId: number) {
    const userInfo = await this.keyv.get(shortId)
    if (userInfo != undefined) {
      this.keyv.set(shortId, _.assign(userInfo, { online: false }))
    }
  }

  async startGame(shortId: number, game: string, roomId: string) {
    const userInfo = await this.keyv.get(shortId)
    if (userInfo != undefined) {
      this.keyv.set(shortId, _.assign(userInfo, { game, roomId }))
    }
  }

  async endGame(shortId: number) {
    const userInfo = await this.keyv.get(shortId)
    if (userInfo != undefined) {
      this.keyv.set(shortId, _.assign(userInfo, { game: "", roomId: "" }))
    }
  }

  async updateUserSession(shortId: number, value: object) {
    const userInfo = await this.keyv.get(shortId)
    if (userInfo != undefined) {
      this.keyv.set(shortId, _.assign(userInfo, value))
    }
  }

  async findUserSession(shortId: number) {
    const user = await this.keyv.get(shortId);
    console.log('user=>',user);
    return await this.keyv.get(shortId)
  }

  

  
}
