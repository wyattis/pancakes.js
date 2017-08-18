/*global Engine*/
/**
 * Describes a tool for loading remote assets like images, audio, video and text bases resources.
 * @constructor
 * @param {StockPile} cache the cache to use to store the loaded resources
 * @returns {AssetManager} instance
 */
class AssetManager{

	constructor(cache){

		this.cache = cache;
		this.queue = [];
		this.numCompleted = 0;

	}

	addToQue(cacheKey, url){

		let item = {
			key : cacheKey,
			url : url
		};

		let urlParts = AssetManager.formatLink(url);
		let ext = urlParts.extension;

		if(AssetManager.imageExtensions.indexOf(ext) > -1){

			item.type = 'image';

		}
		else if(AssetManager.videoExtensions.indexOf(ext) > -1){

			item.type = 'video';

		}
		else if(AssetManager.textExtensions.indexOf(ext) > -1){

			item.type = 'text';

		}
		else{

			item.type = 'unknown';

		}

		this.queue.push(item);
	}


	go(progressCB, finishedCB){

		if(this.queue.length === 0)
			return finishedCB();

		this.progressCB = progressCB;
		this.finishedCB = finishedCB;

		for(let i =0; i < this.queue.length; i++){

			let item = this.queue[i];

			if(item.type === 'image'){

				this._loadImage(item.key, item.url);

			}
			else{

				console.error(`No support for loading ${item.type} files yet`);

			}

		}

	}


	_loadImage(cacheKey, url){

		let img = new Image();

		// debugger;

		// When finished call
		img.onload = () => {
			this._updateProgress();
		};

		console.log('Starting image load');
		img.src = url;

		this.cache.add(cacheKey, img);

	}

	_updateProgress(err){

		this.numCompleted ++;
		if(this.numCompleted === this.queue.length){

			this.finishedCB();

		}
		else{

			this.progressCB(this.numComplete, this.queue.length);

		}

	}


	static formatLink(url){

		let a = document.createElement('a');
		a.href = url;

		let parts = a.pathname.split(/(\/|\\)/);
		let extension = parts[parts.length - 1].split('.')[1];
		return {
			pathname: a.pathname,
			extension: extension
		};

	}

}


AssetManager.imageExtensions = ['png', 'jpg', 'jpeg', 'tif', 'tiff', 'bmp', 'gif'];

AssetManager.textExtensions = ['txt', 'json', 'js', 'doc'];

AssetManager.videoExtensions = ['mp4', 'avi', 'mvk', 'mov'];

AssetManager.audioExtensions = ['mp3', 'wma', 'wav'];



export default AssetManager;