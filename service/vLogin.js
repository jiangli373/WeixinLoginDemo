/**
 * Created by li.jiang on 2017/3/21.
 * 微信服务号登录
 */
'use strict';
const request = require('request-promise');
const config = require('../config');
const vService = config.service;

exports.vLoginService = async function (query) {
	console.log('=====req.query=====',query);
	let code = query.code;
	let state = query.state;
	if(!!code) {
		let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${vService.appID}&secret=${vService.appSecret}&code=${code}&grant_type=authorization_code`;
		let options = {
			method: 'GET',
			url: url,
			json: true,
			timeout: 5000
		};
		try {
			let tokenBody = await request(options);
			if (!!tokenBody) {
				console.log('====token body====', tokenBody);
				let token = tokenBody.access_token;
				let openid = tokenBody.openid;
				let thisurl = `https://api.weixin.qq.com/sns/userinfo?access_token=${token}&openid=${openid}`;
				let options2 = {
					method: 'GET',
					url: thisurl,
					json: true,
					timeout: 5000
				};
				let result = await request(options2);
				return result;
			}
		}catch(error){
			 console.error(error);
			return null;
		}
	}
};