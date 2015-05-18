RmtPlayer = (function() {
	function RmtPlayer() {
		var self = this,
				playFn = {}, progressFn = {};
		
		self.song = null;	
		self.$progress = $('#rmt-player-progress-handler');
		self.$control = $('#rmt-player');
		self.$play = $('#rmt-player-play', self.$control);
		self.$next = $('#rmt-player-next', self.$control);
		self.$mute = $('#rmt-player-mute', self.$control);
		self.$info = $('#rmt-player-title', self.$control);
		self.lastFrameTime = new Date();
		self.isDragging = false;
		self.strings = {"timing" : ""};				
		
		
		playFn[detectTouchable('start')] = function(e) {
			clickFlag = true;
		};
		playFn[detectTouchable('move')] = function(e) {
			clickFlag = false;
		};
		playFn[detectTouchable('end')] = function(e) {
				e.preventDefault();
				if(self.song) self.song.togglePause();
		};
		self.$play.on(playFn);

		self.$mute.on(detectTouchable('end'), function() {
			soundManager.toggleMute('mainsong');
		});
		
		progressFn[detectTouchable('start')] = function(e) {
				e.preventDefault();
				self.isDragging = true;
		};
		progressFn[detectTouchable('move')] = function(e) {
				var x = (typeof(e.originalEvent.changedTouches) !== 'undefined') ? e.originalEvent.changedTouches[0].pageX : e.clientX;
				var $pBar = self.$progress.parent();
				
				e.preventDefault();
				x = (x - $pBar.offset().left);
				if(self.isDragging) {
					self.setPosition(x / $pBar.width());
				}
		};
		progressFn['mouseleave'] = function(e) {
				if(self.isDragging === true) {
						self.isDragging = false;
				}
		};
		progressFn[detectTouchable('end')] = function(e) {
				var x = (typeof(e.originalEvent.changedTouches) !== 'undefined') ? e.originalEvent.changedTouches[0].pageX : e.clientX;
				var $pBar = self.$progress.parent();

				e.preventDefault();
				x = (x - $pBar.offset().left);
				self.isDragging = false;
				self.setPosition(x / $pBar.width());

		};
		this.$progress.on(progressFn);
		
		this.$progress.parent().on(detectTouchable('end'),function(e) {
				var x = (typeof(e.originalEvent.changedTouches) !== 'undefined') ? e.originalEvent.changedTouches[0].pageX : e.offsetX;

				e.preventDefault();
				self.setPosition(x / $(this).width());
		});

	};


	/** param {float} pos (percentage, max: 1) */
	RmtPlayer.prototype.setPosition = function(pos) {
		if(!this.song) return;
		
		this.song.setPosition(~~(this.song.durationEstimate * pos));
		this.updateTime();
	}

	RmtPlayer.prototype.getTime = function(nMSec, bAsString) {
		// convert milliseconds to mm:ss, return as object literal or string
		var nSec = Math.floor(nMSec/1000),
			min = Math.floor(nSec/60),
			sec = nSec-(min*60);
		// if (min === 0 && sec === 0) return null; // return 0:00 as null
		return (bAsString?(min+':'+(sec<10?'0'+sec:sec)):{'min':min,'sec':sec});
	};


	RmtPlayer.prototype.updateTime = function() {
		//$('.player-currenttime', this.$control).text(this.getTime(this.song.position,true));
		$('#rmt-player-time', this.$control).text(this.getTime(this.song.durationEstimate,true));
	};




	/** Set Song to MediaElementPlayer
			param {String} src
			param {Object} args
	*/
	RmtPlayer.prototype.setSong = function(src, args) {
		var self = this, $content = $('section#content');
			
		self.$info.html(args.title);
		
		// Reset
		if(self.song) this.song.destruct();

		self.song = soundManager.createSound({
			id: 'mainsong',
			url: src,
			autoLoad: true,
			autoPlay: typeof(args.autoPlay) !== 'undefined' ? args.autoPlay : false,
			onload: function() {
				self.updateTime();
			},
			onplay: function() {
				//$('#rmt-player-play', $control).attr('src','img/common/player_btn_play.png');
			},
			onresume: function() {
			},
			onpause: function() {
			},
			onfinish: function() {
				self.reload();
			},
			whileloading: function() {
				var d = new Date();
				if (d && (d - self.lastFrameTime > 50) || (this.bytesLoaded === this.bytesTotal)) {
					self.updateTime();
					self.$progress.css('left',((this.bytesLoaded / this.bytesTotal) * 95) + '%'); 
				  self.lastFrameTime = d;
				}
			},
			whileplaying: function() {
				var d = new Date();
				if (d && (d - self.lastFrameTime > 50) || (this.bytesLoaded === this.bytesTotal)) {
					self.updateTime();
					self.$progress.css('left',((this.position / this.durationEstimate) * 95) + '%');
				  self.lastFrameTime = d;
				}
			},
			volume: 100
		});

		self.updateTime();
	}


	RmtPlayer.prototype.reload = function() {
		this.song.play();
		this.setPosition(0);
		this.song.pause();
		this.updateTime();
	}

	return RmtPlayer;

})();
	
	
var detectTouchable = function(type) {
	var eName = [];
	switch(type) {
		case 'start':
			eName = ['touchstart','mousedown'];
			break;
		case 'move':
			eName = ['touchmove','mousemove'];
			break;
		case 'end':
			eName = ['touchend','mouseup'];
			break;
		default:
			console.log('please specify event type');
			break;
	}
	return ("ontouchstart" in document.documentElement) ? eName[0] : eName[1];
};

