var LevelModel = cc.Layer.extend({
	currentMap: -1,
	currentLevel: -1,
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
		this.levelNum = levelNum;
		this.worldNum = worldNum;
        this.init();
    },

    init:function () {
        this._super();
		
		
		
    },
	
	 loadObjects:function (map, mapIndex, first) {
       	this.space=cc.director.getRunningScene().space;
		this.spriteSheetcharBig_plist = new cc.SpriteBatchNode(res.charBig_png);
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
					//add yellow bog CHAR
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
		
		return this.objects;
    },
	

});



LevelModel.getInstance = function(){
    if(!this._instance) {
        this._instance = new LevelModel();
        return this._instance;
    }else {
        return this._instance;
    }
    return null;
};
LevelModel._instance = null;