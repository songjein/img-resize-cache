// sharp docs: https://github.com/lovell/sharp
// sharp tutorial: https://malcoded.com/posts/nodejs-image-resize-express-sharp
// sharp width request: https://github.com/lovell/sharp/issues/247

const path = require('path');
const sharp = require('sharp');
const express = require('express');
const request = require('request');
const urlencode = require('urlencode');

const { logger } = require('./logger');

const app = express();

//app.use(express.json({limit: '50mb'}));
//app.use(express.urlencoded({limit: '50mb', extended: true}));

app.get('/resize', (req, res) => {
	const widthStr = req.query.width;
	const heightStr = req.query.height;
	let imgUrl = req.query.url;

  logger.info(`url: ${ imgUrl }`);
  logger.info(`width: ${ widthStr }, height: ${ heightStr }`);

	let width, height;
	if (widthStr) {
		width = parseInt(widthStr);	
	}
	if (heightStr) {
		height = parseInt(heightStr);	
	}

	const split = imgUrl.split('/');
	const path = split.slice(0, split.length-1).join('/');
	const filename = split.slice(-1)[0];

	imgUrl = path + '/' + urlencode(filename);
  
  try {
    request({url: imgUrl, encoding: null}, function(err, response, buffer) {
      sharp(buffer)
        .resize(width, height)
        .pipe(res);
    });
  } catch (error) {
    logger.error(error); 
    res.json({ error });
  }
});


app.get('/test', (req, res) => {
	res.json({status: 200});
});

//ex: http://stdio.kr:3000/?url=https://~~~~~~~~~~~~~~/uploads/photo/image/21790/1.png&width=300
const PORT = 7777;
app.listen(PORT, () => {
	logger.info(`Server started at ${ PORT }`);
});
