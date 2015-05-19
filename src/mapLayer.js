var MapLayer = cc.LayerGradient.extend({
    // constructor
    ctor : function(space){
        //1. call super class's ctor function
		
		this.space = space;
        this._super();
    },
    init:function (space) {
        this._super();
		
		
		
		
		
		//////////////////////////////////////
		var space = this.space
           //cp.enableSegmentToSegmentCollisions()

            space.setIterations(50);
            space.gravity = (cp.v(0, -200));
            space.sleepTimeThreshold = (0.5);

            var body, staticBody = space.staticBody
            /*cpShape*/ var shape

           
            
			LINK_COUNT=14
			CHAIN_COUNT=4

            /*cpFloat*/ var mass = 1;
            /*cpFloat*/ var width = 10;
            /*cpFloat*/ var height = 30;

            /*cpFloat*/ var spacing = width*0.3;

            // Add lots of boxes.
            for(var i=0; i<CHAIN_COUNT; i++){
                /*cpBody*/ var prev = null;

                for(var j=0; j<LINK_COUNT; j++){
                    /*cpVect*/ var pos = cp.v(20+50*i, cc.director.getWinSize().height - (j + 0.5)*height - (j + 1)*spacing);

                    body = space.addBody(new cp.Body(mass, cp.momentForBox(mass, width, height)));
                    body.setPos(pos);

                    shape = space.addShape(new cp.SegmentShape(body, cp.v(0, (height - width)/2.0), cp.v(0, (width - height)/2.0), width/2.0));
                    shape.setFriction(0.8);

                    /*cpFloat*/ var breakingForce = 80000;

                    /*cpConstraint*/ var constraint = null;
                    if(prev == null){
                        constraint = space.addConstraint(new cp.SlideJoint(body, staticBody, cp.v(0, height/2), cp.v(pos.x, cc.director.getWinSize().height ), 0, spacing));
                    } else {
                        constraint = space.addConstraint(new cp.SlideJoint(body, prev, cp.v(0, height/2), cp.v(0, -height/2), 0, spacing));
                    }

                 

                    prev = body;
                }
            }

            /*cpFloat*/ var radius = 15.0;
            body = space.addBody(new cp.Body(10.0, cp.momentForCircle(10.0, 0.0, radius, cp.vzero)));
            body.setPos(cp.v(0, -240 + radius+5));
            body.setVel(cp.v(0, 300));

            shape = space.addShape(new cp.CircleShape(body, radius, cp.vzero));
            shape.setElasticity(0.0);
            shape.setFriction(0.9);
		//////////////////////////////////////
		
		
		
		
		
		
		
		
		
		
		
		
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
        //this.spriteSheetChar.addChild(this.sprite);
		this.addChild(this.sprite);
		
		
		this.spriteMenu = new cc.PhysicsSprite("#menu_button.png");
		var contentSizeMenu = this.spriteMenu.getContentSize();
        // init body
        this.bodyMenu = new cp.Body(1, cp.momentForBox(1, contentSizeMenu.width, contentSizeMenu.height));
        this.bodyMenu.p = cc.p(winSize.width / 2, winSize.height*.1);
        //this.body.applyImpulse(cp.v(80, 0), cp.v(80, 0));//run speed
        this.space.addBody(this.bodyMenu);
        this.shapeMenu = new cp.BoxShape(this.bodyMenu, contentSizeMenu.width , contentSizeMenu.height);
		      
        this.space.addShape(this.shapeMenu);
        //this.spriteMenu.setTag(SpriteTag.runner)
        this.spriteMenu.setBody(this.bodyMenu);
        //this.spriteSheetChar.addChild(this.spriteMenu);
		this.addChild(this.spriteMenu);
		
		
		var v = cp.v;
		
		
		var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, 0),// start point
            cp.v(4294967295, 10),// MAX INT:4294967295
            10);// thickness of wall
		 this.space.addStaticShape(wallBottom);
		
		
		
		
		var boxOffset = v(0, 0);
		var posA = v(winSize.width/1.2,winSize.height- winSize.height*0.1);
		var posB = v(winSize.width/1.2, winSize.height- winSize.height*0.2);
		var posC = v(winSize.width/1.2, winSize.height- winSize.height*0.3);
		var posD = v(winSize.width/1.2, winSize.height- winSize.height*0.4);
		var posF = v(winSize.width/1.2, winSize.height- winSize.height*0.5);
		var radius = 10;
		var addBall = function(pos)
	{
		var radius = 10;
		var mass = 1;
		var body = body = space.addBody(new cp.Body(mass, cp.momentForBox(mass, 22, 22)));//this.space.addBody(new cp.Body(mass, cp.momentForCircle(mass, 0, radius, v(0,0))));
		body.setPos(v.add(pos, boxOffset));
		
		var shape = space.addShape(new cp.SegmentShape(body, cp.v(0, (height - width)/2.0), cp.v(0, (width - height)/2.0), width/2.0));
		shape.setElasticity(0);
		shape.setFriction(0.7);
		
		return body;
	}.bind(this);
	
	this.pointArr = [];
	this.vertices = [];
	for(var i=0;i<7;i++){
		var item;
		
		if(i===0){
			item=this.space.staticBody;
		} else if(i===1){
			item= addBall( v(winSize.width/2,winSize.height));
			this.space.addConstraint(new cp.DampedSpring(item,this.pointArr[i-1], v(0, 10), v(winSize.width/2, winSize.height), 1, 620, 10));
		} else {
			item= addBall( v(winSize.width/2,winSize.height));
			item.setPos(cc.p(this.pointArr[i-1].getPos().x, (this.pointArr[i-1].getPos().y-20)));
			this.space.addConstraint(new cp.DampedSpring(this.pointArr[i-1],item,  v(0, 10), v(0,-10),1, 620, 25));
		}
		
		this.pointArr.push(item)
	
	}
	
	
/*	this.pointArrRope = [];
	this.verticesRope = [];
	for(var i=0;i<7;i++){
		var item;
		
		if(i===0){
			item=this.space.staticBody;
		} else if(i===1){
			item= addBall( v(winSize.width/5,winSize.height));
			this.space.addConstraint(new cp.SlideJoint(item,this.pointArrRope[i-1], v(0,10), v(winSize.width/5, winSize.height), 5, 10));//DampedSpring(item,this.verticesRope[i-1], v(0, 0), v(winSize.width/2, winSize.height), 5, 320, 10));
		} else {
			item= addBall( v(winSize.width/5,winSize.height));
			item.setPos(cc.p(this.pointArrRope[i-1].getPos().x, (this.pointArrRope[i-1].getPos().y-20)));
			this.space.addConstraint(new  cp.SlideJoint(this.pointArrRope[i-1],item, v(0,10), v(0,-10), 5, 10))//cp.DampedSpring(this.verticesRope[i-1],item,  v(0, 0), v(0,0), 5, 320, 10));
		}
		
		this.pointArrRope.push(item)
	
	}*/
	
	//this.verticesRope = new Array(this.pointArrRope.length)
	
		this.body1 = body1 = addBall(posA);
		this.body2 = body2 = addBall(posB);
		this.body3 = body3 = addBall(posC);
		this.body4 = body4 = addBall(posD);
		this.body5 = body5 = addBall(posF);
		/*body2.setAngle(Math.PI);
		body3.setAngle(Math.PI);
		body4.setAngle(Math.PI);
		body5.setAngle(Math.PI);*/
		this.space.addConstraint(new cp.DampedSpring(body1, this.space.staticBody, v(0, 0), v(winSize.width/1.2, winSize.height), 5, 320, 10));//cp.PivotJoint(body1, this.space.staticBody, v(winSize.width/2, winSize.height)));
		this.space.addConstraint(new cp.DampedSpring(body1, body2, v(0, 0), v(0,0), 5, 320, 10));//cp.PinJoint(body1, body2, v(15,0), v(15,0)));
		this.space.addConstraint(new cp.DampedSpring(body2, body3, v(0, 0), v(0,0), 5, 320, 10));//this.space.addConstraint(new cp.PinJoint(body2, body3, v(15,0), v(15,0)));
		this.space.addConstraint(new cp.DampedSpring(body3, body4, v(0, 0), v(0,0), 5, 320, 10));//this.space.addConstraint(new cp.PinJoint(body3, body4, v(15,0), v(15,0)));
		this.space.addConstraint(new cp.DampedSpring(body4, body5, v(0, 0), v(0,0), 5, 320, 10));//this.space.addConstraint(new cp.PinJoint(body4, body5, v(15,0), v(15,0)));
		//this.space.addConstraint(new cp.PivotJoint(body5, this.space.staticBody, v(winSize.width/2, winSize.height)));
		//GrooveJoint//v(-30, -10), v(-30, -40), v(0,0)));
		//this.space.addConstraint(new cp.DampedSpring(this.body, body5, v(-30, 0), v(0,0), 50, 20, 10));
		this.space.addConstraint(new cp.DampedSpring(this.body, body5, v(0, 0), v(0,0), 15, 320, 20));//this.space.addConstraint(new cp.SlideJoint(this.body, body5, v(15,0), v(15,0), 20, 40));
		this.space.addConstraint(new cp.SlideJoint(this.bodyMenu, this.body, v(contentSizeMenu.width/2,0), v(15,0), 20, 140));
		this.space.addConstraint(new cp.SlideJoint(this.bodyMenu, this.body, v(-contentSizeMenu.width/2,0), v(15,0), 20, 140));
		
		
		
		debugger
		var mouseBody = this.mouseBody = new cp.Body(Infinity, Infinity);
		
		var GRABABLE_MASK_BIT = 1<<31;

		cc.eventManager.addListener(
			{
				event: cc.EventListener.MOUSE, 
				onMouseMove: function (event) { 
				
					var point = event.getLocation();
					var target = event.getCurrentTarget();
					var delta = event.getDelta(); 
					if(this.waitSwitcher) {
							//target.x+=delta.x;
								//target.y+=delta.y;
									//target.setPosition(p)
									//target.getBody().resetForces()
							
							this.mouseBody.p=point;
							//debugger
							
						}
					
				}.bind(this), 
				onMouseUp: function(event){
					if(this.waitSwitcher){
						this.target = event.getCurrentTarget();
						this.space.removeConstraint(this.mouseJoint);

					}
					this.waitSwitcher = false;
					this.target =null;
				}.bind(this), 
				onMouseDown: function(event) {
					this.target = event.getCurrentTarget();  
					var locationInNode = this.target.convertToNodeSpace(event.getLocation());    
					var s = this.target.getContentSize();
					cc.log(locationInNode);
					cc.log("--------");
					var point = event.getLocation();
					var rect = cc.rect(0, 0, s.width, s.height);
					cc.log(rect);
					this.mouseBody.p=point;
					if (cc.rectContainsPoint(rect, locationInNode)) {       
						this.waitSwitcher = true;
						event.stopPropagation();
						//debugger
					}
					var shape = this.space.pointQueryFirst(point, GRABABLE_MASK_BIT, cp.NO_GROUP);
							if(shape){
								var body = shape.body;
								var mouseJoint = this.mouseJoint = new cp.PivotJoint(mouseBody, body, v(0,0), body.world2Local(point));

								mouseJoint.maxForce = 50000;
								mouseJoint.errorBias = Math.pow(1 - 0.15, 60);
								this.space.addConstraint(mouseJoint);
							}
				}.bind(this)
			},  this.spriteMenu);
		
		
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
		
		
		this.line = new cc.DrawNode();
		this.addChild(this.line);
		
		this.lineCubicBezier = new cc.DrawNode();
		this.addChild(this.lineCubicBezier);
		
		this.rope = new cc.DrawNode();
		this.addChild(this.rope);
		
		this.lineCubicBezier.lineCap = "round";
		this.scheduleUpdate(0);
    },
	update:function (dt) {
	
		this.line.clear();
		this.rope.clear();
		this.lineCubicBezier.clear();
		
		var  centerPos = cc.p (cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
		
		var  vertices4 = [
            cc.p (cc.director.getWinSize().width/1.2,cc.director.getWinSize().height),
			cc.p (this.body1.getPos().x , this.body1.getPos().y),
            cc.p (this.body2.getPos().x , this.body2.getPos().y),
            cc.p (this.body3.getPos().x , this.body3.getPos().y),
            cc.p (this.body4.getPos().x , this.body4.getPos().y),
            cc.p (this.body5.getPos().x, this.body5.getPos().y),
			cc.p (this.body.getPos().x, this.body.getPos().y)
        ];
		
		this.lineCubicBezier.drawCardinalSpline(vertices4, 0.5, 100, 5, cc.color (255, 0, 155, 255));
		
		
		for(var i=0;i<this.pointArr.length;i++){
			if(i===0){
				this.vertices[i]=(cc.p (cc.director.getWinSize().width/2,cc.director.getWinSize().height));	
			}	else {
				this.vertices[i]=(cc.p (this.pointArr[i].getPos().x , this.pointArr[i].getPos().y));	
			}
		}
		//debugger
        this.line.drawCardinalSpline(this.vertices, 0.5, 100, 5, cc.color (255, 255, 255, 255));
		
		
		
	/*	for(var i=0;i<this.pointArrRope.length;i++){
			if(i===0){
				this.verticesRope[i]=(cc.p (cc.director.getWinSize().width/5,cc.director.getWinSize().height));	
			}	else {
				this.verticesRope[i]=(cc.p (this.pointArrRope[i].getPos().x , this.pointArrRope[i].getPos().y));	
			}
		}
		//debugger
        this.rope.drawCardinalSpline(this.verticesRope, 0.5, 100, 5, cc.color (255, 255, 255, 255));
		
		/*this.lineCubicBezier.drawCubicBezier(//drawQuadBezier
			cc.p(cc.director.getWinSize().width/2,cc.director.getWinSize().height), 
			cc.p(this.body2.getPos().x, this.body2.getPos().y),
			cc.p(this.body4.getPos().x, this.body4.getPos().y), 
			cc.p(this.body.getPos().x, this.body.getPos().y), 
			30, 5, cc.Color(255, 0, 255, 255))*/
		//this.line.drawSegment(cc.p(cc.director.getWinSize().width/2,cc.director.getWinSize().height), this.body1.getPos(),5,cc.Color(255, 0, 255, 255) );
		
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