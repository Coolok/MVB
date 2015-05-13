var SettingsLayer = cc.LayerColor.extend({
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {//debugger
        this._super(cc.color(0, 0, 0, 180));
        var winSize = cc.director.getWinSize();
		
		var posArr=[];
		

        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        //cc.MenuItemFont.setFontSize(28);
		var settingsResume = new cc.Sprite("#menu_button.png");
		var settingsResumePosX = settingsResume.getBoundingBox().width;
		var settingsResumePosY = settingsResume.getBoundingBox().height;
		settingsResume.setAnchorPoint(.5,.5)
	    settingsResume.setRotation(180);
		settingsResume.setPosition(cc.p(settingsResumePosX,settingsResumePosY));
        var menuItemResume = new cc.MenuItemSprite(
        	new cc.Sprite('#menu_button.png'),
        	settingsResume,
            this.onResume, this);
		var labelSettingsResume = new cc.LabelBMFont("Resume", res.showcard_Gothic_fnt, 140, cc.TEXT_ALIGNMENT_CENTER);
		labelSettingsResume.setColor(cc.color(0,0,0,0));
		labelSettingsResume.setScale(1);
		labelSettingsResume.setPosition(cc.p(settingsResumePosX/2,settingsResumePosY/2));
		menuItemResume.addChild(labelSettingsResume);
		
		var settingsRestart = new cc.Sprite("#menu_button.png");
		settingsRestart.setAnchorPoint(.5,.5)
	    settingsRestart.setRotation(180);
		settingsRestart.setPosition(cc.p(settingsResumePosX,settingsResumePosY));
        var menuItemRestart = new cc.MenuItemSprite(
        	new cc.Sprite('#menu_button.png'),
        	settingsRestart,
            this.onRestart, this);
		labelsettingsRestart = new cc.LabelBMFont("Restart", res.showcard_Gothic_fnt, 140, cc.TEXT_ALIGNMENT_CENTER);
		labelsettingsRestart.setColor(cc.color(0,0,0,0));
		labelsettingsRestart.setPosition(cc.p(settingsResumePosX/2,settingsResumePosY/2));
		menuItemRestart.setPosition(cc.p(0,settingsResumePosY));
		menuItemRestart.addChild(labelsettingsRestart);
		
		var settingsMainMenu = new cc.Sprite("#menu_button.png");
		settingsMainMenu.setAnchorPoint(.5,.5)
	    settingsMainMenu.setRotation(180);
		settingsMainMenu.setPosition(cc.p(settingsResumePosX,settingsResumePosY));
        var menuItemMainMenu = new cc.MenuItemSprite(
        	new cc.Sprite('#menu_button.png'),
        	settingsMainMenu,
            this.onMainMenu, this);
		labelsettingsMainMenu = new cc.LabelBMFont("Menu", res.showcard_Gothic_fnt, 140, cc.TEXT_ALIGNMENT_CENTER);
		labelsettingsMainMenu.setColor(cc.color(0,0,0,0));
		labelsettingsMainMenu.setPosition(cc.p(settingsResumePosX/2,settingsResumePosY/2));
		menuItemMainMenu.setPosition(cc.p(0,-settingsResumePosY));
		menuItemMainMenu.addChild(labelsettingsMainMenu);
		
		var settingsMute = new cc.Sprite("#menu_button.png");
		settingsMute.setAnchorPoint(.5,.5)
	    settingsMute.setRotation(180);
		settingsMute.setPosition(cc.p(settingsResumePosX,settingsResumePosY));
        var menuItemMute = new cc.MenuItemSprite(
        	new cc.Sprite('#menu_button.png'),
        	settingsMute,
            this.onSound, this);
		labelsettingsMute = new cc.LabelBMFont("sounds", res.showcard_Gothic_fnt, 140, cc.TEXT_ALIGNMENT_CENTER);
		labelsettingsMute.setColor(cc.color(0,0,0,0));
		labelsettingsMute.setPosition(cc.p(settingsResumePosX/2,settingsResumePosY/2));
		menuItemMute.setPosition(cc.p(0,-2*settingsResumePosY));
		menuItemMute.addChild(labelsettingsMute);
		
		
		
		var settingsShop = new cc.Sprite("#menu_button.png");
		settingsShop.setAnchorPoint(.5,.5)
	    settingsShop.setRotation(180);
		settingsShop.setPosition(cc.p(settingsResumePosX,settingsResumePosY));
        var menuItemShop = new cc.MenuItemSprite(
        	new cc.Sprite('#menu_button.png'),
        	settingsShop,
            this.onShop, this);
		labelsettingsShop = new cc.LabelBMFont("to shop", res.showcard_Gothic_fnt, 140, cc.TEXT_ALIGNMENT_CENTER);
		labelsettingsShop.setColor(cc.color(0,0,0,0));
		labelsettingsShop.setPosition(cc.p(settingsResumePosX/2,settingsResumePosY/2));
		menuItemShop.setPosition(cc.p(0,-3*settingsResumePosY));
		menuItemShop.addChild(labelsettingsShop);
		
			
        var menu = new cc.Menu(menuItemResume,menuItemRestart,menuItemMainMenu,menuItemMute,menuItemShop);
        menu.setPosition(centerPos);
        this.addChild(menu);
		
		this.label2 = new cc.LabelBMFont("settings", res.showcard_Gothic_fnt, 140, cc.TEXT_ALIGNMENT_CENTER);
		this.label2.setScale(2)
		this.label2.setPosition(cc.p(winSize.width / 2,winSize.width / 2+this.label2.getBoundingBox().height));
		this.addChild(this.label2);
		
		//var gameOver = new cc.Sprite("#gameOver.png");
		//gameOver.setPosition(cc.p(winSize.width / 2, winSize.height / 2+100));
		//this.addChild(gameOver);
    },
    onRestart:function (sender) {
        cc.director.resume();
		//cc.director.popScene();
		//GameController.getInstance().init();
		debugger
		GameController.getInstance().createLevel(LevelModel.getInstance().worldNum,LevelModel.getInstance().levelNum);
		
    },
	onResume:function (sender) {
        cc.director.resume();
        //cc.director.runScene(new PlayScene());
		this.removeFromParent();
    },	
	onMainMenu:function (sender) {
        
       //cc.director.getRunningScene().removeAllChildren();
	   cc.director.resume();
	   cc.director.popScene();
	   
	   cc.director.runScene(new MenuScene());
	   
		//var layer = new MenuLayer();
		//layer.init();
		 //cc.director.getRunningScene().addChild(layer);
    },
	onSound:function (sender) {debugger
		
		
		/*
		cc.LoaderScene.preload([
			'src/tools/SoundScene.json',
			'src/tools/Default/charMonsters.png',
			'src/tools/Default/menu_button_active.png',
			'src/tools/Default/menu_button.png',
			'src/tools/Default/Button_Disable.png',
		], function(err){
			debugger
			if(err) return console.log("load failed");
			
			
		}); 
		var soundScene = new SoundScene();
			cc.director.runScene(soundScene);
		*/
		
		
    },
	onShop:function (sender) {
		 cc.director.resume();
		GameController.getInstance().createShopScene();

    }
});


