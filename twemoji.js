(function($){
	$.Redactor.prototype.twemoji = function(){
		return {
			pluginName: 'twemoji',
			opts: {
				emojiset: {
					'people': ['&#x1F601;', '&#x1F602;', '&#x1F603;', '&#x1F604;', '&#x1F605;', '&#x1F606;', '&#x1F607;', '&#x1F608;', '&#x1F609;', '&#x1F60A;', '&#x1F60B;', '&#x1F60C;', '&#x1F60D;', '&#x1F60E;', '&#x1F60F;', '&#x1F610;', '&#x1F611;', '&#x1F612;', '&#x1F613;', '&#x1F614;', '&#x1F615;', '&#x1F616;', '&#x1F617;', '&#x1F618;', '&#x1F619;', '&#x1F61A;', '&#x1F61B;', '&#x1F61C;', '&#x1F61D;', '&#x1F61E;', '&#x1F61F;', '&#x1F620;', '&#x1F621;', '&#x1F622;', '&#x1F623;', '&#x1F624;', '&#x1F625;', '&#x1F626;', '&#x1F627;', '&#x1F628;', '&#x1F629;', '&#x1F62A;', '&#x1F62B;', '&#x1F62C;', '&#x1F62D;', '&#x1F62E;', '&#x1F62F;', '&#x1F630;', '&#x1F631;', '&#x1F632;', '&#x1F633;', '&#x1F634;', '&#x1F635;', '&#x1F636;', '&#x1F637;', '&#x1F638;', '&#x1F639;', '&#x1F63A;', '&#x1F63B;', '&#x1F63C;', '&#x1F63D;', '&#x1F63E;', '&#x1F63F;', '&#x1F640;'],
					'Animal': ['&#x1F400;', '&#x1F401;', '&#x1F402;', '&#x1F403;', '&#x1F404;', '&#x1F405;', '&#x1F406;', '&#x1F407;', '&#x1F408;', '&#x1F409;', '&#x1F40A;', '&#x1F40B;', '&#x1F40C;', '&#x1F40D;', '&#x1F40E;', '&#x1F40F;', '&#x1F410;', '&#x1F411;', '&#x1F412;', '&#x1F413;', '&#x1F414;', '&#x1F415;', '&#x1F416;', '&#x1F417;', '&#x1F418;', '&#x1F419;', '&#x1F41A;', '&#x1F41B;', '&#x1F41C;', '&#x1F41D;', '&#x1F41E;', '&#x1F41F;', '&#x1F420;', '&#x1F421;', '&#x1F422;', '&#x1F423;', '&#x1F424;', '&#x1F425;', '&#x1F426;', '&#x1F427;', '&#x1F428;', '&#x1F429;', '&#x1F42A;', '&#x1F42B;', '&#x1F42C;', '&#x1F42D;', '&#x1F42E;', '&#x1F42F;', '&#x1F430;', '&#x1F431;', '&#x1F432;', '&#x1F433;', '&#x1F434;', '&#x1F435;', '&#x1F436;', '&#x1F437;', '&#x1F438;', '&#x1F439;', '&#x1F43A;', '&#x1F43B;', '&#x1F43C;']
				},
				twemojiurl: 'https://twemoji.maxcdn.com/twemoji.min.js',
				twemojiconfig: {ext: '.png', size: 36}
			},
			langs: {
				'en':{
					'twemoji': 'Twemoji'
				}
			},
			init: function(){
				var _this = this;

				/* merge settings */
				this.opts = $.extend({}, this.twemoji.opts, this.opts);
				this.opts.langs.en = $.extend({}, this.twemoji.langs.en, this.opts.langs.en);

				/* refresh language */
				this.lang.load('en');

				/* load twemoji library */
				_this.twemoji.getScript();
				/* add button */
				_this.twemoji.addButton();
			},
			getScript: function(){
				var _this = this, s = document.createElement('script'), x;
		        s.type = 'text/javascript';
		        s.async = true;
		        s.src = _this.opts.twemojiurl;
		        x = document.getElementsByTagName('script')[0];
		        x.parentNode.insertBefore(s, x);
			},
			getTemplate: function(){
				return [
					'<section id="redactor-twemoji-section">',
						'<div id="redactor-twemoji-container"></div>',
					'</section>',
				].join('');
			},
			parseEmoji: function(emoji){
				if(twemoji){
					emoji = jQuery('<span>'+emoji+'</span>').text();
					return twemoji.parse(emoji, this.opts.twemojiconfig);
				}
				return emoji;
			},
			show: function(){
				var _this = this,$twemojiSection, setIndex = 0;

				_this.modal.addTemplate('twemoji', _this.twemoji.getTemplate());
				_this.modal.load('twemoji', _this.lang.get('twemoji'), 700);
				_this.modal.show();

				$twemojiSection = $('#redactor-twemoji-section');

				_this.modal.createTabber($twemojiSection);

				for(setName in _this.opts.emojiset){
					var twemojiSet = _this.opts.emojiset[setName];
					if(twemojiSet.length){
						setIndex++;
						var $setTab = $('<div id="redactor-image-manager-box" style="overflow: auto; height: 300px;" class="redactor-tab redactor-tab' + setIndex + '">');
						if(setIndex == 1){
							_this.modal.addTab(setIndex, setName, 'active');
						}else{
							_this.modal.addTab(setIndex, setName);
							$setTab.hide();
						}
						$twemojiSection.append($setTab);
						for(var i=0,j=twemojiSet.length;i<j;i++){
							$setTab.append(_this.twemoji.parseEmoji(twemojiSet[i]));
						}
					}
				}
				$twemojiSection.find('.emoji').on('click', $.proxy(_this.twemoji.insert, _this));
			},
			addButton: function(){
				var _this  = this, button = _this.button.add(_this.twemoji.pluginName, _this.lang.get('twemoji'));

				button.text(_this.lang.get('twemoji'));
				button.removeClass('redactor-btn-image');
				button.addClass('re-button');

				_this.button.addCallback(button, _this.twemoji.show);
			},
			insert: function(e){
				var _this = this, emoji = $(e.target).clone() || "";

				e.preventDefault();
				if(emoji !== ''){
					_this.selection.restore();
					_this.modal.close();
					var current = _this.selection.getBlock() || _this.selection.getCurrent();

					if (current){
						$(current).after(emoji);
					}else{
						_this.insert.html(emoji);
					}

					_this.code.sync();
				}
			}
		};
	};
})(jQuery);