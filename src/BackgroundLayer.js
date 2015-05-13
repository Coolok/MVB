var BackgroundLayer = cc.Layer.extend({
    map00:null,
    map01:null,
	map02:null,
    map03:null,
	map10:null,
    map11:null,
	map12:null,
    map13:null,
    mapWidth:0,
    mapIndex:0,
	mapPartIndex:0,
    space:null,
	coor:0,
    spriteSheet:null,
    objects:[],
	flagCount: -1,
	flagPartIndex:-1,
	front_flag:1,
    ctor:function (space,worldNum,levelNum) {
        this._super();
        // clean old array here
        this.objects = [];
        this.space = space;
		this.levelNum = levelNum?levelNum:0;
		this.worldNum = worldNum?worldNum:0;
       
    },

    initStart:function () {
        

    var worldTexture = [];
		switch (this.worldNum) {
				case '0':
				    worldTexture=[res.map00_tmx,res.map01_tmx,res.map02_tmx,res.map03_tmx];
					break;
				case '1':
				    worldTexture=[res.map10_tmx,res.map11_tmx,res.map12_tmx,res.map13_tmx];
					break;
				case '2':
				    worldTexture=[res.map20_tmx,res.map21_tmx,res.map22_tmx,res.map23_tmx];
					break;
		}		

		var resources = "res";
		var filePath = "res/map"+this.worldNum.toString()+""+this.levelNum.toString()+".tmx";
		//debugger
		var xmlStr = cc.loader.getRes(filePath);
		
        this.map0 = new cc.TMXTiledMap(xmlStr,resources);
		this.map0.setTag('map0');
        this.addChild(this.map0);

        this.mapWidth = this.map0.getContentSize().width;
	
        this.map1 = new cc.TMXTiledMap(worldTexture[1]);
        this.map1.setPosition(cc.p(this.mapWidth, 0));
		this.map1.setTag('map1');
		this.addChild(this.map1);

		this.map2 = new cc.TMXTiledMap(worldTexture[2]);
        this.map2.setPosition(cc.p(this.mapWidth*2, 0));
        this.addChild(this.map2);
		this.map2.setTag('map2');
		
		this.map3 = new cc.TMXTiledMap(worldTexture[3]);
        this.map3.setPosition(cc.p(this.mapWidth*3, 0));
        this.addChild(this.map3);
		this.map3.setTag('map3');
        // create sprite sheet
		
		cc.spriteFrameCache.addSpriteFrames(res.charBig_plist);
        this.spriteSheetcharBig_plist = new cc.SpriteBatchNode(res.charBig_png);
        this.addChild(this.spriteSheetcharBig_plist);	
		this.front_map01_tmx = new cc.TMXTiledMap(cc.loader.getRes(res.front_map00_tmx),resources);
		this.front_map01_tmx.setTag('front_map01_tmx');
		this.addChild(this.front_map01_tmx);
		
		this.front_map01_tmx.setPosition(cc.p(this.front_map01_tmx.width,0));
		
        this.loadObjects(this.map0, 0, 1); 
        this.scheduleUpdate();
    },

    loadObjects:function (map, mapIndex, first) {
       	
		var allObj = map.getObjectGroups();
		var newMapIndex = this.mapIndex;
		if(mapIndex==0){
			newMapIndex = first?0:this.mapIndex+1;
		}
		
		for(var objGroupIndex=0;objGroupIndex<allObj.length;objGroupIndex++){
			
			var cGroup = map.getObjectGroup(allObj[objGroupIndex].groupName);
			var cArray = cGroup.getObjects();
			
			for (var i = 0; i < cArray.length; i++) {
				var obj;
				var  objPos=cc.p(cArray[i]["x"] + this.mapWidth * mapIndex+newMapIndex*(this.mapWidth*MAP_COUNT),cArray[i]["y"]);
				switch (allObj[objGroupIndex].groupName) {
				case 'coin':
					// add coins
				    obj = new Coin(
						this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'charBig':
					//add yellow big CHAR
				    obj = new CharBig(this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'pink':
					// add pink char
				    obj = new Pink(this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'chick':
					// add chick char
				    obj = new Chick(this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'eagle':
					// add eagle char
				    obj = new Eagle(this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'hat':
					// add hat char
				    obj = new Hat(this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'white':
					// add white char
				    obj = new White(this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'car':
					// add car char
				    obj = new Car(this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'bomb':
					// add bomb char
				    obj = new Bomb(this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'ice':
					// add ice char
				    obj = new Ice(this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'child':
					// add child char
				    obj = new Child(this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'zomby':
					// add zomby char
				    obj = new Zomby(this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'rock':
					// add rock char
				    obj = new Rock(this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'bomber':
					// add bomber char
				    obj = new Bomber(this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'ground':
					// add ground char
				    obj = new Ground(cArray[i]["width"],cArray[i]["height"],this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'ball':
					// add ball char
				    obj = new Ball(this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'lazer':
					// add lazer char
				    obj = new Lazer(this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'rock_sharp':
					// add rock_sharp char
				    obj = new Rock_sharp(this.spriteSheetcharBig_plist,
						this.space,
						objPos
					);
					break;
				case 'boss0':
					// add boss0 char
				    obj = new Boss0(this,
						this.space,
						objPos
					);
					break;
				}
				obj.mapIndex = mapIndex;
				this.objects.push(obj);
			}
		
		}
    },

    removeObjects:function (mapIndex) {
	    ////debugger;
		
		this.getParent().getChildByTag(TagOfLayer.Animation).chick_childChildAction?this.getParent().getChildByTag(TagOfLayer.Animation).chick_childChildAction=undefined:'';
        while((function (obj, index) {
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].mapIndex == index) {
                    obj[i].removeFromParent();
                    obj.splice(i, 1);
                    return true;
                }
            }
            return false;
        })(this.objects, mapIndex));
    },

    removeObjectByShape:function (shape) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].getShape() == shape) {
                this.objects[i].removeFromParent();
                this.objects.splice(i, 1);
                break;
            }
        }
    },

    checkAndReload:function (eyeX) {

	
      var newMapIndex = parseInt(eyeX / (4*this.mapWidth));
	  var mapsWidth = this.mapWidth*MAP_COUNT;
		
		var mapN = this.flag;
		if(this.flag<0 || !this.flag){
			mapN = 0
		}
		
	//res.background_map00_tmx,
	//res.before_front_map00_tmx,
	//res.front_map00_tmx,
	
			
			//this.getChildByTag('map'+mapN).getChildren()[0].setPosition(cc.p(eyeX/2,0));
			//this.getChildByTag('map'+mapN).getChildren()[3].setPosition(cc.p(-eyeX/2,0));
			//this.getChildByTag('map'+mapN).getChildren()[2].setPosition(cc.p(-eyeX*2,0));
		
		if(this.flagCount!=this.flag){
			this.flagCount=this.flag;
			switch (this.flag) {
				case 0:
				   // //debugger;
					this.map1.setPositionX(newMapIndex*(mapsWidth)+this.mapWidth);
					this.loadObjects(this.map1, 1);
					this.mapPartIndex++;
					this.flagPartIndex = -1;
					break;
				case 1:
				    //debugger;
					this.map2.setPositionX(newMapIndex*(mapsWidth)+this.mapWidth*2);
					this.loadObjects(this.map2, 2);
					this.mapPartIndex++;
					this.flagPartIndex = -1;
					break;
				case 2:
				    //debugger;
					this.map3.setPositionX(newMapIndex*(mapsWidth)+this.mapWidth*3);
					this.loadObjects(this.map3, 3);
					this.mapPartIndex++;
					this.flagPartIndex = -1;
					break;
				case 3:
				    //debugger;
					this.map0.setPositionX((newMapIndex+1)*(mapsWidth));
					this.loadObjects(this.map0, 0);
					this.mapPartIndex++;
					this.flagPartIndex = -1;
					break;
				default:
					break;
			}	
		}
		
			if (eyeX>newMapIndex*(mapsWidth) && eyeX<newMapIndex*(mapsWidth)+this.mapWidth) {
				this.flag=0;				
			} 
			if (eyeX>newMapIndex*(mapsWidth)+this.mapWidth && eyeX<newMapIndex*(mapsWidth)+this.mapWidth*2) {
				this.flag=1;
			} 
			if (eyeX>newMapIndex*(mapsWidth)+this.mapWidth*2 && eyeX<newMapIndex*(mapsWidth)+this.mapWidth*3) {
				this.flag=2;
			} 
			if (eyeX>newMapIndex*(mapsWidth)+this.mapWidth*3 && eyeX<(newMapIndex+1)*(mapsWidth)) {
				this.flag=3;
			}
		
		if (this.mapPartIndex>1 && this.flagPartIndex == -1) {
            this.removeObjects(this.mapPartIndex-2);
			this.flagPartIndex = 1;
        } 
		if(this.flag==0){
			
			this.mapIndex = newMapIndex;
			
		}
		
    },
	
	checkAndReloadBackground:function (eyeX) {

		/*var mapIndex = parseInt(eyeX / (this.mapWidth/2));
		var speed = eyeX*2;
		var screenWidth = cc.director.getWinSize().width;
		//if(mapIndex>0){
			////debugger
		//}
		var _map_width= this.front_map00_tmx.width;
		cc.log(this.front_map00_tmx.x);
		if(this.front_flag == 1 && -this.front_map00_tmx.x+eyeX>_map_width-cc.director.getWinSize().width){
			this.front_flag = -1;
			this.front_map01_tmx.x = this.front_map00_tmx.x-cc.director.getWinSize().width;
		} else {
		
		}
		//this.front_map00_tmx.setPosition(cc.p(-speed,0));
		//if(-this.front_map00_tmx.x+eyeX>_map_width-cc.director.getWinSize().width){	////debugger
			this.front_map01_tmx.x--;////debugger
		//}	
		this.front_map00_tmx.x--
		/*if(eyeX>_map_width/2+_map_width/2*mapIndex-cc.director.getWinSize().width && this.front_flag == 1){	
			this.front_flag = -1;
		}
		
		if(eyeX>_map_width*mapIndex/2-cc.director.getWinSize().width && this.front_flag == -1){	
			this.front_flag = 1;
		}*/
		
    },

    update:function (dt) {
	this.coor++
        var animationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
        var eyeX = animationLayer.getEyeX();
        this.checkAndReload(eyeX);
		this.checkAndReloadBackground(eyeX);
			//debugger
		
		
    }
});
