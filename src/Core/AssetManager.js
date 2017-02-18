/*global Engine*/
/**
 * Describes a tool for loading remote assets like images, audio, video and text bases resources.
 * @constructor
 * @param {Engine.StockPile} cache the cache to use to store the loaded resources
 * @returns {Engine.AssetManager} instance
 */
Engine.AssetManager = class AssetManager{

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

		if(AssetManager.imageExtensions.has(ext)){

			item.type = 'image';

		}
		else if(AssetManager.videoExtensions.has(ext)){

			item.type = 'video';

		}
		else if(ext === 'json'){

			item.type = 'json';

		}
		else if(AssetManager.textExtensions.has(ext)){

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
			else if(item.type === 'json'){

				this._loadJSON(item.key, item.url);

			}
			else if(item.type === 'text'){

				this._loadText(item.key, item.url);

			}
			else{

				console.error(`No support for loading ${item.type} files yet`);

			}

		}

	}


	/**
	 * Load an image.
	 */
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



	/**
	 * Load generic text file.
	 */
	_loadText(cacheKey, url){

		Engine.HTTP({url: url}, (r) => {

			console.log('Successfully loaded from', r.responseURL);
			this.cache.add(cacheKey, r.responseText);
			this._updateProgress();

		}, (err) => {

			console.error(err);

		});

	}


	/**
	 * Load a JSON file.
	 */
	_loadJSON(cacheKey, url){

		Engine.HTTP({url: url}, (r) => {


			this.cache.add(cacheKey, JSON.parse(r.responseText));
			this._updateProgress();


		}, (err) => {

			console.error(err);

		});

	}



	/**
	 * Update the progress state of the loader.
	 */
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

};


Engine.AssetManager.imageExtensions = new Set(['png', 'jpg', 'jpeg', 'tif', 'tiff', 'bmp', 'gif']);

Engine.AssetManager.textExtensions = new Set(['txt', 'js', 'doc']);

Engine.AssetManager.videoExtensions = new Set(['mp4', 'avi', 'mvk', 'mov']);

Engine.AssetManager.audioExtensions = new Set(['mp3', 'wma', 'wav']);

