var WinnerLayer = cc.LayerGradient.extend({
    // constructor
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
    init:function () {
        this._super();
		
		cc.spriteFrameCache.addSpriteFrames(res.charBig_plist);
		
		var color1 = cc.color(111,111,111)
		var color2 = cc.color(0,0,0)
		this.setColor(color1,color2);
		//debugger
		var winSize = cc.director.getWinSize();
		var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
		var spritebg = new cc.Sprite(res.helloBG_png);
        spritebg.setPosition(centerPos);
		spritebg.setOpacity(100)
        this.addChild(spritebg,5);
		
       
		this.particleSrc = new cc.Sprite(res.particle_png);
        cc.MenuItemFont.setFontSize(30);
        var menuItemRestart = new cc.MenuItemSprite(
        	new cc.Sprite(res.start_n_png),
        	new cc.Sprite(res.start_s_png),
            this.onRestart, this);
			
		var startNextLevel = new cc.Sprite("#menu_button.png");
		var startNextLevelPosX = startNextLevel.getBoundingBox().width;
		var startNextLevelPosY = startNextLevel.getBoundingBox().height;
		startNextLevel.setAnchorPoint(.5,.5)
	    startNextLevel.setRotation(180);
		startNextLevel.setPosition(cc.p(startNextLevelPosX,startNextLevelPosY));
		var menuItemNextLevel = new cc.MenuItemSprite(
        	new cc.Sprite('#menu_button.png'),
			startNextLevel,
        	this.startNextLevel,
			this);
		menuItemNextLevel.setPosition(cc.p(0,-50));
		menuItemNextLevel.setScale(1.2);
		
		var startMap = new cc.Sprite("#menu_button.png");
		var startNextLevelPosX = startMap.getBoundingBox().width;
		var startNextLevelPosY = startMap.getBoundingBox().height;
		startMap.setAnchorPoint(.5,.5)
	    startMap.setRotation(180);
		startMap.setPosition(cc.p(startNextLevelPosX,startNextLevelPosY));
		var menuItemMap = new cc.MenuItemSprite(
        	new cc.Sprite('#menu_button.png'),
			startMap,
        	this.startMap,
			this);
		menuItemMap.setPosition(cc.p(0,-90));
		menuItemMap.setScale(1.2);
		
		
		var startShop = new cc.Sprite("#menu_button.png");
		var startShopPosX = startShop.getBoundingBox().width;
		var startShopPosY = startShop.getBoundingBox().height;
		startShop.setAnchorPoint(.5,.5)
	    startShop.setRotation(180);
		startShop.setPosition(cc.p(startShopPosX,startShopPosY));
		var menuItemShop = new cc.MenuItemSprite(
        	new cc.Sprite('#menu_button.png'),
			startShop,
        	this.startShop,
			this);
		menuItemShop.setPosition(cc.p(0,-130));
		menuItemShop.setScale(1.2);
		
			
        var menu = new cc.Menu(menuItemShop,menuItemMap,menuItemNextLevel);
        menu.setPosition(centerPos);
        this.addChild(menu,20);
		this.gameOver = new cc.Sprite("#naked.png");
		this.gameOver.setPosition(cc.p(winSize.width / 2, winSize.height * 2));
		this.addChild(this.gameOver,20);
		var spriteAction_ = new cc.EaseBounceOut(new cc.MoveTo(2, cc.p(winSize.width / 2, winSize.height / 2+26)));//EaseExponentialOut
		
		
		
		
		this.gameOver.runAction(
			cc.sequence(
				spriteAction_,
				cc.CallFunc.create(this.blink, this)
			)
		);
		
		
		this.label = new cc.LabelBMFont("You win!", res.showcard_Gothic_fnt, 640, cc.TEXT_ALIGNMENT_CENTER);
		this.label.setColor(cc.color(255,255,255,0.5));
		this.label.setScale(0);
		var spriteAction_2 = new cc.EaseBounceOut(new cc.ScaleTo(2, 2));
		this.label.runAction(
			cc.sequence(
				new cc.DelayTime(1),
				spriteAction_2
			)
		);
		this.label.setPosition(cc.p(winSize.width / 2,winSize.height / 2+120));

		this.addChild(this.label,20);
		this.label.runAction(new cc.Repeat(
			cc.sequence(
			    cc.FadeOut.create(.2),
				cc.FadeIn.create(.2)
			),5
		));
		
		var l_pParticle = cc.ParticleFireworks.create();
		l_pParticle.initWithTotalParticles(330);//count of particles
			                                          
		l_pParticle.setPosition(cc.p(winSize.width / 2,winSize.height / 2-30));
		l_pParticle.setStartSize(20.0);// size of particles
		l_pParticle.setEndSize(40.0);// size of particles
		l_pParticle.setTexture(
		    this.particleSrc.getTexture()
		);
		
		l_pParticle.setStartColor(cc.color(254,195,15, 255));
		l_pParticle.setStartColorVar(cc.color(5, 5, 5, 0));
		l_pParticle.setEndColor(cc.color(255, 255, 255, 0));
		l_pParticle.setEndColorVar(cc.color(0, 0, 0, 0));

		
		l_pParticle.setAutoRemoveOnFinish(true);//set whether or not the node will be auto-removed when it has no particles left.By default it is false.

		this.addChild(l_pParticle,0);
		
		var labelNext = new cc.LabelBMFont("next level", res.showcard_Gothic_fnt, 640, cc.TEXT_ALIGNMENT_CENTER);
		labelNext.setColor(cc.color(255,255,255,0.5));
		labelNext.setPosition(cc.p(winSize.width / 2,winSize.height / 2-50));
		this.addChild(labelNext,21);
		
		var labelMap = new cc.LabelBMFont("to map", res.showcard_Gothic_fnt, 640, cc.TEXT_ALIGNMENT_CENTER);
		labelMap.setColor(cc.color(255,255,255,0.5));
		labelMap.setPosition(cc.p(winSize.width / 2,winSize.height / 2-90));
		this.addChild(labelMap,21);
		
		var labelShop = new cc.LabelBMFont("to shop", res.showcard_Gothic_fnt, 640, cc.TEXT_ALIGNMENT_CENTER);
		labelShop.setColor(cc.color(255,255,255,0.5));
		labelShop.setPosition(cc.p(winSize.width / 2,winSize.height / 2-130));
		this.addChild(labelShop,21);
    },
	blink:function () {//debugger
		this.gameOver.runAction(
			new cc.RepeatForever(
				cc.sequence(
					//new cc.DelayTime(2),
					cc.FadeOut.create(.2),
					cc.tintTo(.1,255,5,5),
					cc.FadeIn.create(.2),
					cc.tintTo(.1,255,255,255)
				)
			)
		);
	},
    onRestart:function (sender) {//debugger
	cc.director.resume();
		var blink  = new cc.Repeat(
			cc.sequence(
			    cc.FadeOut.create(.2),
				cc.FadeIn.create(.2)
			),5
		);
		this.label.runAction(
		    cc.sequence(
				blink
			)
		);
		this.label.setScale(1);
        //cc.director.resume();
        //cc.director.runScene(new PlayScene());
    },
	startNextLevel:function (sender) {
        cc.director.resume();
        GameController.getInstance().createNextLevel();
    },
	startMap:function (sender) {
        cc.director.resume();
        GameController.getInstance().createMapScene();
    },
	startShop:function (sender) {
        cc.director.resume();
        GameController.getInstance().createShopScene();
    },
});