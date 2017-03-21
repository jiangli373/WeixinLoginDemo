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
	if(ctx.seesion&&ctx.seesion.user){
		ctx.redirect('/userInfo');
		return;
	}
	let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${vService.appID}&redirect_uri=${CALLBACKURL}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
	ctx.redirect(url);

};

exports.loginCallback = async function (ctx, next) {
	let query = ctx.query;
	let userInfo = await vLogin.vLoginService(query);
	if(!!userInfo){
		ctx.session.user = userInfo;
		ctx.redirect('/userInfo');
	}else{
		await ctx.redirect('/');
	}
};

exports.userInfo = async function (ctx, next) {
	if(ctx.seesion&&ctx.seesion.user){
		await ctx.render('user',{user:ctx.seesion.user});
		return;
	}else{
		 ctx.redirect('/login');
	}
};