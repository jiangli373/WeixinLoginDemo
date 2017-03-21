/**
 * Created by li.jiang on 2017/3/21.
 */
'use strict';

const API = require('wechat-api');
const config = require('../config');
const vSubscribe = config.subscribe;

const api = new API(vSubscribe.appID, vSubscribe.appSecret);


exports.getVUserInfo = async function (unionid) {

	api.getUser({openid:openid, lang: 'en'},function(err, result){
		if(err) return callback(err);

		if(result.subscribe!=0){
			user.weixin_nickname = result.nickname;
			user.headimgurl = result.headimgurl;
		}else{
			user.weixin_nickname = '';
			user.headimgurl = '';
		}
		user.subscribe = result.subscribe;
		return callback(null,user);
	});
}
// oVFOmv7i38Emw-PeMuOU6ez3xYWw
// oVFOmv7i38Emw-PeMuOU6ez3xYWw
api.getUser({openid:'opIYRtwzNjs3MM4baV2PeUh3u_EU', lang: 'en'},function(err, result){
	if(err) return console.error(err);

	 console.log(result);
});

// oEGLvjv85Mjw99ltX0tPRiD_j-e0

// https://crayfish.elemecdn.com/h.ele.me/hongbao   1