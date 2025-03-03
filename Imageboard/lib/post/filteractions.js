'use strict';

const { Bans } = require(__dirname+'/../../db/')
	, dynamicResponse = require(__dirname+'/../misc/dynamic.js');

//ehhh, kinda too many args
module.exports = async (req, res, hitGlobalFilter, hitLocalFilter, boardFilterMode, globalFilterMode,
	boardFilterBanDuration, globalFilterBanDuration, filterBanAppealable, redirect) => {

	const { __ } = res.locals;
	//global filter mode takes prio
	const useFilterMode = hitGlobalFilter ? globalFilterMode : boardFilterMode;

	if (useFilterMode === 1) {
		return dynamicResponse(req, res, 400, 'message', {
			'title': __('Bad request'),
			'message': __('Your post was blocked by a word filter'),
			'redirect': redirect
		});
	} else {
		const useFilterBanDuration = hitGlobalFilter ? globalFilterBanDuration : boardFilterBanDuration;
		const banBoard = hitGlobalFilter ? null : res.locals.board._id;
		const banDate = new Date();
		const banExpiry = new Date(useFilterBanDuration + banDate.getTime());
		const ban = {
			'ip': {
				'cloak': res.locals.ip.cloak,
				'raw': res.locals.ip.raw,
				'type': res.locals.ip.type,
			},
			'range': 0,
			'reason': __(`${hitGlobalFilter ? 'global ' :''}word filter auto ban`),
			'board': banBoard,
			'posts': null,
			'issuer': 'system', //todo: make a "system" property instead?
			'date': banDate,
			'expireAt': banExpiry,
			'allowAppeal': hitGlobalFilter ? filterBanAppealable : true,
			'showUser': true,
			'note': __(`${hitGlobalFilter ? 'global ' :''}filter hit: "%s"`, (hitGlobalFilter || hitLocalFilter)),
			'seen': true,
		};
		const insertedResult = await Bans.insertOne(ban);
		//add and delete some props for the dynamic response
		ban._id = insertedResult.insertedId;
		ban.ip.raw = null;
		ban.note = null;
		return dynamicResponse(req, res, 403, 'ban', {
			bans: [ban]
		});
	}

};
