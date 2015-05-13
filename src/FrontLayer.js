var FrontLayer = cc.Layer.extend({
    
    arrBackground:[],
	arrLayersBackground:[],
	widthLayersBackground:2280,
	arrSpeeds:[],
    speed:0,

    ctor:function (arrBackground,speed,arrSpeeds) {
	//debugger
        this._super();
        //this.scheduleUpdate(0);
		this.speed = speed?speed:5;
		this.arrBackground = arrBackground;
		this.arrSpeeds = arrSpeeds;
        var buildParallaxBackground = function(texture){
            var layer = new cc.Layer();
            var bg1 = new cc.TMXTiledMap(cc.loader.getRes(texture),"res");
			this.widthLayersBackground = bg1.width;
			//bg1.setOpacity(.1);
            bg1.x = 0;
            bg1.y = 0//bg1.height/2;
			bg1.setTag('bg1');
            layer.addChild(bg1);
            var bg2 = new cc.TMXTiledMap(cc.loader.getRes(texture),"res");
			//bg2.setOpacity(.1);
            bg2.x = bg2.width;
            bg2.y = -bg2.height/2;
			bg2.setTag('bg2');
            layer.addChild(bg2);
            return layer;
        };
        /*
		this.before_front_map00_tmx = new cc.TMXTiledMap(cc.loader.getRes(res.before_front_map00_tmx),resources);
		this.before_front_map00_tmx.setTag('before_front_map00_tmx');
		
        this.addChild(this.before_front_map00_tmx);
		
		this.front_map00_tmx = new cc.TMXTiledMap(cc.loader.getRes(res.front_map00_tmx),resources);
		this.front_map00_tmx.setTag('front_map00_tmx');
        this.addChild(this.front_map00_tmx);
		this.front_map00_tmx.setOpacity(100);
		
		this.front_map01_tmx = new cc.TMXTiledMap(cc.loader.getRes(res.front_map00_tmx),resources);
		this.front_map01_tmx.setTag('front_map01_tmx');
		this.addChild(this.front_map01_tmx);
		this.front_map00_tmx.setPosition(cc.p(0,0));
		this.front_map01_tmx.setPosition(cc.p(this.front_map00_tmx.width,0));
		*/
        //sky
		
		for(var i=0;i<this.arrBackground.length;i++){
			var _bg = buildParallaxBackground(this.arrBackground[i]);
			//_bg.setPosition(cc.p(0,0));
			this.addChild(_bg);
			this.arrLayersBackground.push(_bg);
			//debugger
		}
        

        
    },
	bg:function(bg,i) {
		if(i%2>0){
			i=1
		} else {
			i=0
		}
		bg.x -= Math.ceil(this.speed * this.arrSpeeds[i]);
			
				if (bg.x < -this.widthLayersBackground){
					bg.x = cc.director.getWinSize().width;
					
			}
	},
    updateLayer:function(dt) {
        //cc.director.getWinSize();
       /* this._bg1.x -= Math.ceil(this.speed * 0.02);
        if (this._bg1.x < -parseInt(winSize.width))
            this._bg1.x = 0;

        this._bg2.x -= Math.ceil(this.speed * 0.2);
        if (this._bg2.x < -parseInt(winSize.width))
            this._bg2.x = 0;

        this._bg3.x -= Math.ceil(this.speed * 0.5);
        if (this._bg3.x < -parseInt(winSize.width))
            this._bg3.x = 0;

        this._bg4.x -= Math.ceil(this.speed * 1);
        if (this._bg4.x < -parseInt(winSize.width))
            this._bg4.x = 0;*/
			
		
		//debugger
		for(var i=0;i<this.arrLayersBackground.length;i++){
			//this.arrLayersBackground[i].width;
			this.bg(this.arrLayersBackground[i].getChildByTag('bg1'),i);
			this.bg(this.arrLayersBackground[i].getChildByTag('bg2'),i);
				
			}
		
    }
});