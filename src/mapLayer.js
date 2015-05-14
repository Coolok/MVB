var MapLayer = cc.LayerGradient.extend({
    // constructor
    ctor : function(space){
        //1. call super class's ctor function
		
		this.space = space;
        this._super();
    },
    init:function (space) {
        this._super();
		
		
		
		var winSize = cc.director.getWinSize();
		
		this._debugNode = new cc.PhysicsDebugNode(this.space);
       this._debugNode.setVisible(true);
      this.addChild(this._debugNode, 10);
	  
	cc.spriteFrameCache.addSpriteFrames(res.charBig_plist);
        this.spriteSheetChar = new cc.SpriteBatchNode(res.charBig_png);
		this.sprite = new cc.PhysicsSprite("#robo00.png");//dragon00
        var contentSize = this.sprite.getContentSize();
        // init body
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        this.body.p = cc.p(winSize.width / 2, winSize.height / 2);
        //this.body.applyImpulse(cp.v(80, 0), cp.v(80, 0));//run speed
        this.space.addBody(this.body);
        this.shape = new cp.BoxShape(this.body, contentSize.width , contentSize.width);
		      
        this.space.addShape(this.shape);
        this.sprite.setTag(SpriteTag.runner)
        this.sprite.setBody(this.body);
        this.spriteSheetChar.addChild(this.sprite);
		
		var v = cp.v;
		
		
		var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, this.height),// start point
            cp.v(4294967295, this.height),// MAX INT:4294967295
            0);// thickness of wall
		 this.space.addStaticShape(wallBottom);
		
		
		
		
		var boxOffset = v(320, 320);
		var posA = v( 50, 60);
		var posB = v(110, 60);
		var posC = v(160, 90);
		var posD = v(210, 90);
		var posF = v(260, 90);
		var addBall = function(pos)
	{
		var radius = 15;
		var mass = 1;
		var body = this.space.addBody(new cp.Body(mass, cp.momentForCircle(mass, 0, radius, v(0,0))));
		body.setPos(v.add(pos, boxOffset));
		
		var shape = this.space.addShape(new cp.CircleShape(body, radius, v(0,0)));
		shape.setElasticity(0);
		shape.setFriction(0.7);
		
		return body;
	}.bind(this);
		body1 = addBall(posA);
		body2 = addBall(posB);
		body3 = addBall(posC);
		body4 = addBall(posD);
		body5 = addBall(posF);
		body2.setAngle(Math.PI);
		body3.setAngle(Math.PI);
		body4.setAngle(Math.PI);
		body5.setAngle(Math.PI);
		this.space.addConstraint(new cp.PivotJoint(body1, this.space.staticBody, v(winSize.width/2, winSize.height)));
		this.space.addConstraint(new cp.PinJoint(body1, body2, v(15,0), v(15,0)));
		this.space.addConstraint(new cp.PinJoint(body2, body3, v(15,0), v(15,0)));
		this.space.addConstraint(new cp.PinJoint(body3, body4, v(15,0), v(15,0)));
		this.space.addConstraint(new cp.PinJoint(body4, body5, v(15,0), v(15,0)));
		//this.space.addConstraint(new cp.PivotJoint(body5, this.space.staticBody, v(winSize.width/2, winSize.height)));
		//GrooveJoint//v(-30, -10), v(-30, -40), v(0,0)));
		//this.space.addConstraint(new cp.DampedSpring(this.body, body5, v(-30, 0), v(0,0), 50, 20, 10));
		this.space.addConstraint(new cp.SlideJoint(this.body, body5, v(15,0), v(15,0), 20, 40));
		
		
		cc.spriteFrameCache.addSpriteFrames(res.charBig_plist);
		
		var color1 = cc.color(111,111,111)
		var color2 = cc.color(0,0,0)
		this.setColor(color1,color2);
		//debugger
		
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
			
		var fixMiddle = {x:-30,y:30};
		
		for(var j=0;j<3;j++){
			////////////////////////////////////
			var levelsArr = [];
			for(var i=1;i<5;i++){
				
				var posLevel={x:0,y:0};
				var labelPos={x:20,y:20};
				switch (i) {
					case 1:
						labelPos.x=40;
						break;
					case 2:
						posLevel.x=60;
						break;
					case 3:
						posLevel.x=60;
						posLevel.y=-60;
						labelPos.y=40;
						break;
					case 4:
						posLevel.y=-60;
						labelPos.x=40;
						labelPos.y=40;
						break;
					default:
						break;
				}
				
				var levelButton = new cc.MenuItemSprite(
				new cc.Sprite('#levelButton'+i+'.png'),
				new cc.Sprite('#levelButton'+i+'_activ.png'),
				this.startLevel,
				this);
				levelButton.setPosition(cc.p(fixMiddle.x+posLevel.x,fixMiddle.y+posLevel.y));
				levelButton.setTag(j+'_'+i)
				var labelButton = new cc.LabelBMFont(i, res.showcard_Gothic_fnt, 640, cc.TEXT_ALIGNMENT_CENTER);
				labelButton.setColor(cc.color(255,255,255,0.5));
				labelButton.setPosition(cc.p(labelPos.x,labelPos.y));
				levelButton.addChild(labelButton,21);
				
				levelsArr.push(levelButton);
			}
				
			var menuWorld = new cc.Menu(levelsArr[0],levelsArr[1],levelsArr[2],levelsArr[3]);
			menuWorld.blinkColor = {r:255,g:255,b:255};
			switch (j) {
					case 0:
						menuWorld.blinkColor.r=155;
						menuWorld.blinkColor.g=155;
						break;
					case 1:
						menuWorld.blinkColor.r=155;
						menuWorld.blinkColor.b=255;
						break;
					case 2:
						menuWorld.blinkColor.b=155;
						menuWorld.blinkColor.g=155;
						break;
					default:
						break;
			}
			
			menuWorld.setScale(0);
			menuWorld.setAnchorPoint(0,0);
			menuWorld.setTag('menuWorld'+j)
			this.addChild(menuWorld,20);
			var spriteActMenuWorld = new cc.EaseBounceOut(new cc.ScaleTo(1, 1));
			menuWorld.runAction(
				cc.sequence(
					new cc.DelayTime(j/2),
					spriteActMenuWorld,
					cc.tintTo(1,menuWorld.blinkColor.r,menuWorld.blinkColor.g,menuWorld.blinkColor.b),
					cc.tintTo(1,255,255,255),
					cc.callFunc(function(){
						cc.log(this.blinkColor);
						cc.log(this.getTag());
						//this.runAction(cc.tintTo(1,this.blinkColor.r,this.blinkColor.g,this.blinkColor.b));	
					}, menuWorld)
				)
			);
			menuWorld.setPosition(cc.p(centerPos.x-120+j*120, centerPos.y));
			
			var labelWorld = new cc.LabelBMFont("World "+(j+1), res.showcard_Gothic_fnt, 640, cc.TEXT_ALIGNMENT_CENTER);
			labelWorld.setColor(cc.color(255,255,255,0.5));
			labelWorld.setPosition(cc.p(centerPos.x-120+j*120, centerPos.y+300));
			labelWorld.setScale(.7);
			var spriteAct = new cc.EaseBounceOut(new cc.MoveTo(1,cc.p(centerPos.x-120+j*120, centerPos.y+90)));
			labelWorld.runAction(
				cc.sequence(
					new cc.DelayTime(j/2),
					spriteAct
				)
			);
			
			this.addChild(labelWorld,21);
			//menuWorld.setColor(menuWorld.blinkColor.r,menuWorld.blinkColor.g,menuWorld.blinkColor.b,255)
		}
		////////////////////////////////////////
		
		/*var gameOver = new cc.Sprite("#naked.png");
		gameOver.setPosition(cc.p(winSize.width / 2, winSize.height * 2));
		//this.addChild(gameOver,20);
		var spriteAction_ = new cc.EaseBounceOut(new cc.MoveTo(2, cc.p(winSize.width / 2, winSize.height / 2+26)));
		gameOver.runAction(spriteAction_);
		*/
		this.label = new cc.LabelBMFont("Choose level", res.showcard_Gothic_fnt, 640, cc.TEXT_ALIGNMENT_CENTER);
		this.label.setColor(cc.color(255,255,255,0.5));
		this.label.setScale(0);
		var spriteAction_2 = new cc.EaseBounceOut(new cc.ScaleTo(2, 1.6));
		this.label.runAction(
			cc.sequence(
				new cc.DelayTime(1.5),
				spriteAction_2
			)
		);
		this.label.setPosition(cc.p(winSize.width / 2,winSize.height / 2-100));

		this.addChild(this.label,20);
		this.label.runAction(new cc.Repeat(
			cc.sequence(
			    cc.FadeOut.create(.2),
				cc.FadeIn.create(.2)
			),5
		));
		/*
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

		//this.addChild(l_pParticle,0);
		
		*/
		var startNextLevel = new cc.Sprite("#menu_button.png");
		var startNextLevelPosX = startNextLevel.getBoundingBox().width;
		var startNextLevelPosY = startNextLevel.getBoundingBox().height;
		startNextLevel.setAnchorPoint(.5,.5)
	    startNextLevel.setRotation(180);
		startNextLevel.setPosition(cc.p(startNextLevelPosX,startNextLevelPosY));
		var menuItemNextLevel = new cc.MenuItemSprite(
        	new cc.Sprite('#menu_button.png'),
			startNextLevel,
        	GameController.getInstance().createShopScene,
			this);
		menuItemNextLevel.setPosition(cc.p(0, -200));
		menuItemNextLevel.setScale(1.2);
		var menuShop = new cc.Menu(menuItemNextLevel);
		this.addChild(menuShop);
		
		
		var labelShop = new cc.LabelBMFont("to shop", res.showcard_Gothic_fnt, 640, cc.TEXT_ALIGNMENT_CENTER);
		labelShop.setColor(cc.color(255,255,255,0.5));
		labelShop.setPosition(cc.p(menuItemNextLevel.getBoundingBox().width/2-13,menuItemNextLevel.getBoundingBox().height/2-2));
		menuItemNextLevel.addChild(labelShop,21);
	
    },
	startLevel:function (sender) {
	    //debugger
		var world = sender.getTag().split('_')[0];
		var level = sender.getTag().split('_')[1]-1;
		cc.log(world+"___"+level)
		//return;
        //cc.director.resume();
        //cc.director.runScene(new PlayScene(world,level));
		GameController.getInstance().createLevel(world,level);
    }
});