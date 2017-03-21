/**
 * Created by li.jiang on 2017/3/21.
 */
'use strict';

const config = require('../config');
const vService = config.service;
const vLogin = require('../service/vLogin');
const CALLBACKURL = encodeURIComponent("http://weipay.hangdali.com/loginCallback?time=jiangli");

exports.login = async function (ctx,next) {
	console.log('heer--------');
	let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${vService.appID}&redirect_uri=${CALLBACKURL}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
	ctx.redirect(url);

};

exports.loginCallback = async function (ctx, next) {
	let query = ctx.query;
	let userInfo = await vLogin.vLoginService(query);
	if(!!userInfo){
		await ctx.render('user',{user:userInfo});
	}else{
		await ctx.render('error');
	}

};