// sharp docs: https://github.com/lovell/sharp
// sharp tutorial: https://malcoded.com/posts/nodejs-image-resize-express-sharp
// sharp width request: https://github.com/lovell/sharp/issues/247

const express = require('express');
const request = require('request');

const sharp = require('sharp');

const server = express();

server.get('/', (req, res) => {
	const widthStr = req.query.width;
	const heightStr = req.query.height;
	const imgUrl = req.query.url;

	console.log(widthStr, heightStr, imgUrl);

	let width, height;
	if (widthStr) {
		width = parseInt(widthStr);	
	}
	if (heightStr) {
		height = parseInt(heightStr);	
	}

	request({url: imgUrl, encoding: null}, function(err, response, buffer) {
		sharp(buffer)
			.resize(width, height)
			.pipe(res);
	});
});

//ex: http://stdio.kr:3000/?url=https://~~~~~~~~~~~~~~/uploads/photo/image/21790/1.png&width=300
server.listen(3000, () => {
	console.log('Server started');
});
