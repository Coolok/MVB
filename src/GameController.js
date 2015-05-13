var GameController = cc.Class.extend({
    _worldNum: null,
    _levelNum: null,
    _containerLayer: null,
	profile:{
		"lives":5,
		"power":1,
		"diamonds":20,
		"money":330,
		"rockets":5,
		"fire_type":1,
		"current_level":0,
		"current_world":0,
		"mute":0,
		"monster_type":1
		
	},
    init:function(scene,_worldNum,levelNum){
		//debugger
		Sound.playButton();
		cc.director.runScene(new MenuScene());
		
    },
	createNextLevel:function(){
		debugger
		LevelModel.getInstance().levelNum++;
		if(LevelModel.getInstance().levelNum>LEVELS_ON_MAP_COUNT){
			LevelModel.getInstance().worldNum++;
			LevelModel.getInstance().levelNum=0;
		}
		Sound.playButton();
		cc.LoaderScene.preload([
				'src/tools/Login.json',
				'src/tools/Default/defaultBMFont.fnt',
				'src/tools/Default/defaultBMFont.png',
				'src/tools/Default/CheckBox_Press.png',
				'src/tools/Default/CheckBox_Disable.png',
				'src/tools/Default/CheckBoxNode_Normal.png',
				'src/tools/Default/CheckBoxNode_Disable.png',
				'src/tools/Default/Button_Disable.png',
				'src/tools/Login/Frd11.png',
				'src/tools/Login/LI02.png',
				'src/tools/Login/LI01.png',
				'src/tools/Login/BaS32.png',	
				'src/tools/Login/BaS31.png',
			], function(err){
				//debugger
				if(err) return console.log("load failed");
				
				var playScene =  new PlayScene(LevelModel.getInstance().worldNum,LevelModel.getInstance().levelNum);
				cc.director.pushScene(playScene);//cc.TransitionTurnOffTiles(1, playScene));//cc.TransitionSlideInB(1, playScene));//cc.TransitionShrinkGrow(1, playScene));//cc.TransitionZoomFlipAngular(1, playScene));//cc.TransitionSplitRows(1, playScene));//cc.TransitionProgressRadialCCW(1, playScene));//TransitionJumpZoom(1, playScene));
			
			}); 

    },
    createLevel:function(world, level,callback){
	//debugger
		LevelModel.getInstance().levelNum = level;
		LevelModel.getInstance().worldNum = world;
		Sound.playButton();
		cc.LoaderScene.preload([
				'src/tools/Login.json',
				'src/tools/Default/defaultBMFont.fnt',
				'src/tools/Default/defaultBMFont.png',
				'src/tools/Default/CheckBox_Press.png',
				'src/tools/Default/CheckBox_Disable.png',
				'src/tools/Default/CheckBoxNode_Normal.png',
				'src/tools/Default/CheckBoxNode_Disable.png',
				'src/tools/Default/Button_Disable.png',
				'src/tools/Login/Frd11.png',
				'src/tools/Login/LI02.png',
				'src/tools/Login/LI01.png',
				'src/tools/Login/BaS32.png',	
				'src/tools/Login/BaS31.png',
			], function(err){
				//debugger
				if(err) return console.log("load failed");
				
				var playScene =  new PlayScene(world,level);
			
			
				cc.director.pushScene(playScene);//cc.TransitionTurnOffTiles(1, playScene));//cc.TransitionSlideInB(1, playScene));//cc.TransitionShrinkGrow(1, playScene));//cc.TransitionZoomFlipAngular(1, playScene));//cc.TransitionSplitRows(1, playScene));//cc.TransitionProgressRadialCCW(1, playScene));//TransitionJumpZoom(1, playScene));
			
			}); 
			
		
			// var backLayer = new BackLayer([res.background_map00_tmx],1,[1]);
			//playScene.addChild(backLayer, 0, TagOfLayer.BackLayer);
			//var frontLayer = new FrontLayer([res.before_front_map00_tmx,res.front_map00_tmx],5,[1,2]);
			//playScene.addChild(frontLayer, 10, TagOfLayer.FrontLayer);
			
			
			
		
    },
	
	createMapScene:function(){
	
	
	
		Sound.playButton();
		cc.LoaderScene.preload([
			'src/tools/Login.json',
			'src/tools/Default/defaultBMFont.fnt',
			'src/tools/Default/defaultBMFont.png',
			'src/tools/Default/CheckBox_Press.png',
			'src/tools/Default/CheckBox_Disable.png',
			'src/tools/Default/CheckBoxNode_Normal.png',
			'src/tools/Default/CheckBoxNode_Disable.png',
			'src/tools/Default/Button_Disable.png',
			'src/tools/Login/Frd11.png',
			'src/tools/Login/LI02.png',
			'src/tools/Login/LI01.png',
			'src/tools/Login/BaS32.png',	
			'src/tools/Login/BaS31.png',
		], function(err){
			//debugger
			if(err) return console.log("load failed");
			var mapScene =  new MapScene('0',0);
		
		
			 cc.director.pushScene(mapScene);//cc.TransitionTurnOffTiles(1, playScene));//cc.TransitionSlideInB(1, playScene));//cc.TransitionShrinkGrow(1, playScene));//cc.TransitionZoomFlipAngular(1, playScene));//cc.TransitionSplitRows(1, playScene));//cc.TransitionProgressRadialCCW(1, playScene));//TransitionJumpZoom(1, playScene));
			// var backLayer = new BackLayer([res.background_map00_tmx],1,[1]);
			//playScene.addChild(backLayer, 0, TagOfLayer.BackLayer);
			//var frontLayer = new FrontLayer([res.before_front_map00_tmx,res.front_map00_tmx],5,[1,2]);
			//playScene.addChild(frontLayer, 10, TagOfLayer.FrontLayer);
			
		
		}); 
	
		
		
		
    },
	createWinnerScene:function(){	
		cc.director.pushScene(new WinnerScene());
    },
	createShopScene:function(){
		var shopScene = new ShopScene();
		//cc.director.pushScene(new ShopScene());
		cc.director.runScene(shopScene);
    },
	
	
});


GameController.getInstance = function(){
    if(!this._instance) {
        this._instance = new GameController();
        return this._instance;
    }else {
        return this._instance;
    }
    return null;
};
GameController._instance = null;