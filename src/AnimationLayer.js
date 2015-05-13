// define enum for runner status
if(typeof RunnerStat == "undefined") {
    var RunnerStat = {};
    RunnerStat.running = 0;
    RunnerStat.jumpUp = 1;
    RunnerStat.jumpDown = 2;
};

var AnimationLayer = cc.Layer.extend({
    spriteSheet: null,
    runningAction: null,
	flyingAction: null,
    sprite: null,
	spriteBullet: null,
    projectile: null,
    space:null,
    body:null,
    shape:null,
	particleSrc : null,
	mainChar:0,
    rockets:[],
	fire:[],
	timeoutFlag : -1,
	timeoutLargeFlag : -1,
	tTimeout:0,
	spritePervPos:0,
    recognizer:null,
	sceneSize : null,
    stat:RunnerStat.running,// init with running status
    jumpUpAction:null,
    jumpDownAction:null,

    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();
       this.rockets = [];
	   this.dragonFire = [];
	   this.fire = [];
	   this.sceneSize = cc.director.getWinSize().width;
		this._debugNode = new cc.PhysicsDebugNode(this.space);
       this._debugNode.setVisible(true);
        // Parallax ratio and offset
      this.addChild(this._debugNode, 10);
    },
    init:function () {
        this._super();

        // create sprite sheet
		cc.spriteFrameCache.addSpriteFrames(res.charBig_plist);
        this.spriteSheetChar = new cc.SpriteBatchNode(res.charBig_png);
        this.addChild(this.spriteSheetChar);
        //init  actions
        this.initAction();
		
		
		var v = cp.v;
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
		this.space.addConstraint(new cp.PinJoint(body1, body2, v(15,0), v(15,0)));
		this.space.addConstraint(new cp.PinJoint(body2, body3, v(15,0), v(15,0)));
		this.space.addConstraint(new cp.PinJoint(body3, body4, v(15,0), v(15,0)));
		this.space.addConstraint(new cp.PinJoint(body4, body5, v(15,0), v(15,0)));
		
			/*this.chainSprite1 = new cc.PhysicsSprite("#robo00.png");
			this.chainSprite2 = new cc.PhysicsSprite("#robo00.png");
			this.chainSprite3 = new cc.PhysicsSprite("#robo00.png");
			var contentChain = this.chainSprite1.getContentSize();
			this.chainBody1 = new cp.Body(1, cp.momentForBox(1, contentChain.width, contentChain.height));
			this.chainBody2 = new cp.Body(1, cp.momentForBox(1, contentChain.width, contentChain.height));
			this.chainBody3 = new cp.Body(1, cp.momentForBox(1, contentChain.width, contentChain.height));
			this.chainSprite1.setBody(this.chainBody1);
			this.chainSprite2.setBody(this.chainBody2);
			this.chainSprite3.setBody(this.chainBody3);
			this.chainBody1.p = cc.p(555, g_groundHeight * 2);
			this.chainBody2.p = cc.p(555, g_groundHeight * 2);
			this.chainBody3.p = cc.p(555, g_groundHeight * 2);
			this.space.addConstraint(new cp.PinJoint(this.chainBody1, this.chainBody2,this.chainBody3, cp.v(15,0), cp.v(15,0), cp.v(15,0)));
		*/
		
		
		
		
        //create runner through physic engine
        this.sprite = new cc.PhysicsSprite("#robo00.png");//dragon00
		this.sprite.lives = 1;
		this.sprite.stamina = 1;
		this.sprite.rockets = 5;
		this.sprite.fite_status = 0;
		this.sprite.gun_heat = 0;
        var contentSize = this.sprite.getContentSize();
        // init body
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        this.body.p = cc.p(g_runnerStartX, g_groundHeight + contentSize.height / 2);
        this.body.applyImpulse(cp.v(80, 0), cp.v(80, 0));//run speed
        this.space.addBody(this.body);
        //init shape
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
		this.shape.setCollisionType(SpriteTag.runner);
		//this.shape.setElasticity(1);
		//this.shape.setFriction(0);
      
        this.space.addShape(this.shape);
        this.sprite.setTag(SpriteTag.runner)
        this.sprite.setBody(this.body);
        this.sprite.runAction(this.flyingAction6);//flyingAction10
		this.sprite.undied = 666;
		this.sprite.flag = 777;
        this.spriteSheetChar.addChild(this.sprite);

        this.spriteBullet2 = new cc.PhysicsSprite("#cristall00.png");
		
        var contentSize = this.spriteBullet2.getContentSize();
        // init body
        this.bodyBullet2 = new cp.Body(5, cp.momentForBox(1, contentSize.width, contentSize.height));
        this.bodyBullet2.p = cc.p(g_runnerStartX, g_groundHeight + contentSize.height / 2);
        this.space.addBody(this.bodyBullet2);
        //init shape
        this.shape = new cp.BoxShape(this.bodyBullet2, contentSize.width - 14, contentSize.height);
        this.spriteBullet2.setBody(this.bodyBullet2);
        this.spriteBullet2.runAction(this.flyingAction2);

        this.recognizer = new SimpleRecognizer();
		var thas=this;
			if(cc.sys.capabilities.hasOwnProperty('keyboard')){
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed:this.onKeyPressed,
		    onKeyReleased: this.onKeyUp
		},this);
	}

       	if(cc.sys.capabilities.hasOwnProperty('mouse')){
		cc.eventManager.addListener(
			{
				event: cc.EventListener.MOUSE,
				onMouseUp: this.locationTapped,
				onMouseMove: function(event){
					////debugger
					//cc.log('mouse move getLocation '+ event.getLocation().x)
					var location = event.getLocation();
					var spriteY = event.getCurrentTarget().spriteSheetChar.getChildByTag(SpriteTag.runner).getBoundingBox().y;
					var spriteWidth = event.getCurrentTarget().spriteSheetChar.getChildByTag(SpriteTag.runner).getBoundingBox().width;
					var spriteHeight = event.getCurrentTarget().spriteSheetChar.getChildByTag(SpriteTag.runner).getBoundingBox().height;
					if (cc.rectContainsPoint({x:g_runnerStartX,y:spriteY,width:spriteWidth,height:spriteHeight}, {x: event._x, y: event._y})
					) {
					//if (cc.rectContainsPoint(cc.director.getRunningScene().getChildByTag(TagOfLayer.Status).getChildByTag('fire_status').getBoundingBox(), location)) {
					//cc.canvas.style.cursor = "pointer";
						cc.log('mouse move getLocation '+ event.getLocation().x);//event.getDelta().x);
						cc.log('event._x '+ event._x);//event.getDelta().x);
						cc.log('runner ' + event.getCurrentTarget().spriteSheetChar.getChildByTag(SpriteTag.runner).getPosition().x);
					} else {
					//cc.canvas.style.cursor = "default";
					////debugger
					}
				},
				onMouseScroll: function(event){}
			},this
		)
	}

	  cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this)

        this.scheduleUpdate(0);
    },
	
	onKeyUp:function(key, event) {
		cc.log(key)
		var thisLayer = event.getCurrentTarget();

		if(key==67 &&  thisLayer.mainChar!=2){//debugger;

	              thisLayer.mainChar=2;
		            thisLayer.sprite.runAction(
					    cc.sequence(
							cc.tintTo(1,55,55,55), //color- time,RGB 
							cc.FadeOut.create(1),
							cc.moveTo(cc.p(g_runnerStartX, 2*g_groundHeight)),
							cc.CallFunc.create(thisLayer.sprite.stopAllActions(), thisLayer)
						)
					);	
			var oldPos = thisLayer.sprite.getPosition();
			thisLayer.sprite = new cc.PhysicsSprite("#dragon00.png");//dragon00
			var contentSize = thisLayer.sprite.getContentSize();
			// init body
			thisLayer.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
			thisLayer.body.p = oldPos;
			thisLayer.body.applyImpulse(cp.v(10, 0), cp.v(0, 0));//run speed
			thisLayer.space.addBody(thisLayer.body);
			//init shape
			thisLayer.shape = new cp.BoxShape(thisLayer.body, contentSize.width - 14, contentSize.height);
			thisLayer.space.addShape(thisLayer.shape);
			thisLayer.sprite.setTag(SpriteTag.runner)
			thisLayer.sprite.setBody(thisLayer.body);
			thisLayer.sprite.runAction(thisLayer.flyingAction10);//flyingAction10
			thisLayer.spriteSheetChar.addChild(thisLayer.sprite);
		}
		
		if(key==82 &&  thisLayer.mainChar!=0){//debugger;

	                thisLayer.mainChar=0;
		            thisLayer.sprite.runAction(
					    cc.sequence(
							cc.tintTo(1,55,55,55), //color- time,RGB 
							cc.FadeOut.create(1),
							cc.moveTo(cc.p(g_runnerStartX, 2*g_groundHeight)),
							cc.CallFunc.create(thisLayer.sprite.stopAllActions(), thisLayer)
						)
					);	
		var oldPos = thisLayer.sprite.getPosition();
	    thisLayer.sprite = new cc.PhysicsSprite("#robo00.png");//dragon00
        var contentSize = thisLayer.sprite.getContentSize();
        // init body
        thisLayer.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        thisLayer.body.p = oldPos;
        thisLayer.body.applyImpulse(cp.v(10, 0), cp.v(0, 0));//run speed
        thisLayer.space.addBody(thisLayer.body);
        //init shape
        thisLayer.shape = new cp.BoxShape(thisLayer.body, contentSize.width - 14, contentSize.height);
		thisLayer.shape.setCollisionType(SpriteTag.runner);
        thisLayer.space.addShape(thisLayer.shape);
        thisLayer.sprite.setTag(SpriteTag.runner)
        thisLayer.sprite.setBody(thisLayer.body);
        thisLayer.sprite.runAction(thisLayer.flyingAction6);//flyingAction10
        thisLayer.spriteSheetChar.addChild(thisLayer.sprite);
	}
	
	if(key==71 &&  thisLayer.mainChar!=1){debugger;
					thisLayer.mainChar=1;
						
		            thisLayer.sprite.runAction(
					    cc.sequence(
							cc.tintTo(1,55,55,55), //color- time,RGB 
							cc.FadeOut.create(1),
							cc.moveTo(cc.p(g_runnerStartX, 2*g_groundHeight)),
							cc.CallFunc.create(thisLayer.sprite.stopAllActions(), thisLayer)
						)
					);	
		var oldPos = thisLayer.sprite.getPosition();
	    thisLayer.sprite = new cc.PhysicsSprite("#green00.png");//dragon00
        var contentSize = thisLayer.sprite.getContentSize();
        // init body
        thisLayer.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        thisLayer.body.p = oldPos;
        thisLayer.body.applyImpulse(cp.v(10, 0), cp.v(0, 0));//run speed
        thisLayer.space.addBody(thisLayer.body);
        //init shape
        thisLayer.shape = new cp.BoxShape(thisLayer.body, contentSize.width - 14, contentSize.height);
        thisLayer.space.addShape(thisLayer.shape);
        thisLayer.sprite.setTag(SpriteTag.runner)
        thisLayer.sprite.setBody(thisLayer.body);
        thisLayer.sprite.runAction(thisLayer.flyingAction3);//flyingAction10
        thisLayer.spriteSheetChar.addChild(thisLayer.sprite);
	}

	if(key==49){//one fire 1
	cc.log(thisLayer.sprite.gun_heat)

		if(thisLayer.sprite.gun_heat<10 && thisLayer.timeoutFlag == -1){
			Sound.playFire1();
		    thisLayer.sprite.gun_heat += 1;
			thisLayer.spriteFire = new cc.PhysicsSprite("#fire00.png");	
			var contentSize = thisLayer.spriteFire.getContentSize();
			thisLayer.bodyFire = new cp.Body(0.001, cp.momentForBox(1, 30*contentSize.width, 30*contentSize.height));
			thisLayer.bodyFire.p = cc.p(thisLayer.body.p.x + thisLayer.sprite.getBoundingBox().width - thisLayer.sprite.getBoundingBox().width/4, thisLayer.body.p.y-5);
			thisLayer.space.addBody(thisLayer.bodyFire);
			thisLayer.bodyFire.applyForce(cp.v(1, 0.35), cp.v(1, 0.35));
			thisLayer.shapeFire = new cp.BoxShape(thisLayer.bodyFire, contentSize.width /2, contentSize.height);
			thisLayer.shapeFire.setCollisionType(SpriteTag.fire);
			thisLayer.space.addShape(thisLayer.shapeFire);
			thisLayer.spriteFire.setBody(thisLayer.bodyFire);
			thisLayer.spriteFire.setTag(thisLayer.shapeFire.hashid);
			thisLayer.spriteSheetChar.addChild(thisLayer.spriteFire);	
			thisLayer.fire.push({sprite:thisLayer.spriteFire,shape:thisLayer.shapeFire});
			thisLayer.getParent().getParent().getChildByTag(TagOfLayer.Status).addCoin(thisLayer.sprite.gun_heat)
			if(thisLayer.tTimeout === 0)thisLayer.tTimeout = setInterval(function(){////debugger
				if(this.timeoutLargeFlag == -1 && this.sprite.gun_heat>0 )this.sprite.gun_heat--;
				
			}.bind(thisLayer),500);
		} else if(thisLayer.timeoutLargeFlag == -1){
		        if(thisLayer.tTimeout !== 0)clearInterval(thisLayer.tTimeout);
					Sound.playPlayerGunHeat();
					thisLayer.getParent().getParent().getChildByTag(TagOfLayer.Status).hot_bar.runAction(
															 new cc.Repeat(
																cc.sequence(
																	 cc.FadeOut.create(.2),
																	 cc.tintTo(.1,255,5,5),
																	cc.FadeIn.create(.2),
																	cc.tintTo(.1,255,255,255)
																),5
															)
														);
														////debugger
					thisLayer.getParent().getParent().getChildByTag(TagOfLayer.Status).fires.runAction(
															 new cc.Repeat(
																cc.sequence(
																	 cc.FadeOut.create(.2),
																	 cc.tintTo(.1,255,5,5),
																	cc.FadeIn.create(.2),
																	cc.tintTo(.1,255,255,255)
																),5
															)
														);
		        thisLayer.timeoutLargeFlag = 1
		        thisLayer.timeoutFlag = 1;
				setTimeout(function(){////debugger
			    this.sprite.gun_heat = 0;
				this.timeoutFlag = -1;
				this.timeoutLargeFlag = -1;
				thisLayer.tTimeout = 0;
				this.getParent().getParent().getChildByTag(TagOfLayer.Status).addCoin(this.sprite.gun_heat)
			}.bind(thisLayer),3000);
		}
	}
		
	if(key==50){//double fire 1
	
		Sound.playFire1();
		thisLayer.spriteFire = new cc.PhysicsSprite("#fire00.png");
        var contentSize = thisLayer.spriteFire.getContentSize();
        thisLayer.bodyFire = new cp.Body(0.001, cp.momentForBox(1, 30*contentSize.width, 30*contentSize.height));
        thisLayer.bodyFire.p = cc.p(thisLayer.body.p.x + thisLayer.sprite.getBoundingBox().width - thisLayer.sprite.getBoundingBox().width/4, thisLayer.body.p.y-5);
        thisLayer.space.addBody(thisLayer.bodyFire);
		thisLayer.bodyFire.applyForce(cp.v(1, 0.35), cp.v(1, 0.35));
        thisLayer.shapeFire = new cp.BoxShape(thisLayer.bodyFire, contentSize.width /2, contentSize.height);
		thisLayer.shapeFire.setCollisionType(SpriteTag.fire);
        thisLayer.space.addShape(thisLayer.shapeFire);
        thisLayer.spriteFire.setBody(thisLayer.bodyFire);
		thisLayer.spriteFire.setTag(thisLayer.shapeFire.hashid);
        thisLayer.spriteSheetChar.addChild(thisLayer.spriteFire);	
	    thisLayer.fire.push({sprite:thisLayer.spriteFire,shape:thisLayer.shapeFire});
		
		thisLayer.spriteFireV = new cc.PhysicsSprite("#fire00.png");
        thisLayer.bodyFireV = new cp.Body(0.001, cp.momentForBox(1, 30*contentSize.width, 30*contentSize.height));
        thisLayer.bodyFireV.p = cc.p(thisLayer.body.p.x + thisLayer.sprite.getBoundingBox().width - thisLayer.sprite.getBoundingBox().width/4, thisLayer.body.p.y-5);
        thisLayer.space.addBody(thisLayer.bodyFireV);
		thisLayer.bodyFireV.applyForce(cp.v(1, 1), cp.v(1, 1));
        thisLayer.shapeFireV = new cp.BoxShape(thisLayer.bodyFireV, contentSize.width /2, contentSize.height);
		thisLayer.shapeFireV.setCollisionType(SpriteTag.fire);
        thisLayer.space.addShape(thisLayer.shapeFireV);
        thisLayer.spriteFireV.setBody(thisLayer.bodyFireV);
		thisLayer.spriteFireV.setTag(thisLayer.shapeFireV.hashid);
        thisLayer.spriteSheetChar.addChild(thisLayer.spriteFireV);	
	    thisLayer.fire.push({sprite:thisLayer.spriteFireV,shape:thisLayer.shapeFireV});
	}
	
	if(key==51){ //one fire 2
		
		Sound.playFire2();
	    thisLayer.spriteFire = new cc.PhysicsSprite("#fire01.png");
        var contentSize = thisLayer.spriteFire.getContentSize();
        thisLayer.bodyFire = new cp.Body(0.001, cp.momentForBox(1, 30*contentSize.width, 30*contentSize.height));
        thisLayer.bodyFire.p = cc.p(thisLayer.body.p.x + thisLayer.sprite.getBoundingBox().width - thisLayer.sprite.getBoundingBox().width/4, thisLayer.body.p.y+5);
        thisLayer.space.addBody(thisLayer.bodyFire);
		thisLayer.bodyFire.applyForce(cp.v(1, 0.35), cp.v(1, 0.35));
        thisLayer.shapeFire = new cp.BoxShape(thisLayer.bodyFire, contentSize.width /2, contentSize.height);
		thisLayer.shapeFire.setCollisionType(SpriteTag.fire); 
        thisLayer.space.addShape(thisLayer.shapeFire);
        thisLayer.spriteFire.setBody(thisLayer.bodyFire);
		thisLayer.spriteFire.setTag(thisLayer.shapeFire.hashid);
        thisLayer.spriteSheetChar.addChild(thisLayer.spriteFire);	
	    thisLayer.fire.push({sprite:thisLayer.spriteFire,shape:thisLayer.shapeFire})
	}
	
	if(key==52){ //double fire 2
		Sound.playFire2();
	    thisLayer.spriteFire = new cc.PhysicsSprite("#fire01.png");
        var contentSize = thisLayer.spriteFire.getContentSize();
        thisLayer.bodyFire = new cp.Body(0.001, cp.momentForBox(1, 30*contentSize.width, 30*contentSize.height));
        thisLayer.bodyFire.p = cc.p(thisLayer.body.p.x + thisLayer.sprite.getBoundingBox().width - thisLayer.sprite.getBoundingBox().width/4, thisLayer.body.p.y+5);
        thisLayer.space.addBody(thisLayer.bodyFire);
		thisLayer.bodyFire.applyForce(cp.v(1, 0.35), cp.v(1, 0.35));
        thisLayer.shapeFire = new cp.BoxShape(thisLayer.bodyFire, contentSize.width /2, contentSize.height);
		thisLayer.shapeFire.setCollisionType(SpriteTag.fire); 
        thisLayer.space.addShape(thisLayer.shapeFire);
        thisLayer.spriteFire.setBody(thisLayer.bodyFire);
		thisLayer.spriteFire.setTag(thisLayer.shapeFire.hashid);
        thisLayer.spriteSheetChar.addChild(thisLayer.spriteFire);	
	    thisLayer.fire.push({sprite:thisLayer.spriteFire,shape:thisLayer.shapeFire})
		
		thisLayer.spriteFireV = new cc.PhysicsSprite("#fire01.png");
        thisLayer.bodyFireV = new cp.Body(0.001, cp.momentForBox(1, 30*contentSize.width, 30*contentSize.height));
        thisLayer.bodyFireV.p = cc.p(thisLayer.body.p.x + thisLayer.sprite.getBoundingBox().width - thisLayer.sprite.getBoundingBox().width/4, thisLayer.body.p.y+5);
        thisLayer.space.addBody(thisLayer.bodyFireV);
		thisLayer.bodyFireV.applyForce(cp.v(1, 1), cp.v(1, 1));
        thisLayer.shapeFireV = new cp.BoxShape(thisLayer.bodyFireV, contentSize.width /2, contentSize.height);
		thisLayer.shapeFireV.setCollisionType(SpriteTag.fire);
        thisLayer.space.addShape(thisLayer.shapeFireV);
        thisLayer.spriteFireV.setBody(thisLayer.bodyFireV);
		thisLayer.spriteFireV.setTag(thisLayer.shapeFireV.hashid);
        thisLayer.spriteSheetChar.addChild(thisLayer.spriteFireV);	
	    thisLayer.fire.push({sprite:thisLayer.spriteFireV,shape:thisLayer.shapeFireV});
	}
	
	if(key==53){ //one fire 3
	     if(!thisLayer.spriteDragonFire){
			Sound.playFire3();
			thisLayer.spriteDragonFire = new cc.PhysicsSprite("#dragon_fire00.png");
			var contentSize = thisLayer.spriteDragonFire.getContentSize();
			thisLayer.bodyDragonFire = new cp.Body(.00001, cp.momentForBox(1, 30*contentSize.width, 30*contentSize.height));
			thisLayer.bodyDragonFire.p = cc.p(thisLayer.body.p.x + thisLayer.sprite.getBoundingBox().width - thisLayer.sprite.getBoundingBox().width/4, thisLayer.body.p.y-10);
			//thisLayer.space.addBody(thisLayer.bodyDragonFire);
			thisLayer.spriteDragonFire.setTag('dragonFire');
			thisLayer.shapeDragonFire = new cp.BoxShape(thisLayer.bodyDragonFire, contentSize.width, contentSize.height);
			thisLayer.shapeDragonFire.setCollisionType(SpriteTag.rocket);
			thisLayer.space.addShape(thisLayer.shapeDragonFire);
			thisLayer.spriteDragonFire.setBody(thisLayer.bodyDragonFire);
			thisLayer.spriteDragonFire.runAction(thisLayer.actionDragonFire);
			thisLayer.spriteDragonFire.setTag(thisLayer.shapeDragonFire.hashid);
			thisLayer.spriteSheetChar.addChild(thisLayer.spriteDragonFire);	
		}
	}
	
	if(key==54){ //double fire 3
		Sound.playFire3();
	     if(!thisLayer.spriteDragonFire && !thisLayer.spriteDragonFireV){
			thisLayer.spriteDragonFire = new cc.PhysicsSprite("#dragon_fire00.png");
			var contentSize = thisLayer.spriteDragonFire.getContentSize();
			thisLayer.bodyDragonFire = new cp.Body(.00001, cp.momentForBox(1, 30*contentSize.width, 30*contentSize.height));
			thisLayer.bodyDragonFire.p = cc.p(thisLayer.body.p.x + thisLayer.sprite.getBoundingBox().width - thisLayer.sprite.getBoundingBox().width/4, thisLayer.body.p.y-10);
			thisLayer.spriteDragonFire.setTag('dragonFire');
			thisLayer.shapeDragonFire = new cp.BoxShape(thisLayer.bodyDragonFire, contentSize.width, contentSize.height);
			thisLayer.shapeDragonFire.setCollisionType(SpriteTag.rocket);
			thisLayer.space.addShape(thisLayer.shapeDragonFire);
			thisLayer.spriteDragonFire.setBody(thisLayer.bodyDragonFire);
			thisLayer.spriteDragonFire.runAction(thisLayer.actionDragonFire);
			thisLayer.spriteDragonFire.setTag(thisLayer.shapeDragonFire.hashid);
			thisLayer.spriteSheetChar.addChild(thisLayer.spriteDragonFire);	
			thisLayer.spriteDragonFireV = new cc.PhysicsSprite("#dragon_fire00.png");
			thisLayer.bodyDragonFireV = new cp.Body(.00001, cp.momentForBox(1, 30*contentSize.width, 30*contentSize.height));
			thisLayer.spriteDragonFireV.setTag('dragonFire');
			thisLayer.shapeDragonFireV = new cp.BoxShape(thisLayer.bodyDragonFireV, contentSize.width, contentSize.height);
			thisLayer.shapeDragonFireV.setCollisionType(SpriteTag.rocket);
			thisLayer.space.addShape(thisLayer.shapeDragonFireV);
			thisLayer.spriteDragonFireV.setBody(thisLayer.bodyDragonFireV);
			thisLayer.spriteDragonFireV.runAction(thisLayer.actionDragonFireV);
			thisLayer.spriteDragonFireV.setTag(thisLayer.shapeDragonFireV.hashid);
			thisLayer.spriteSheetChar.addChild(thisLayer.spriteDragonFireV);
			thisLayer.bodyDragonFireV.setAngle(45)
			thisLayer.spriteDragonFireV.setRotation(-45);
		}
	}
	
	if(key==70){
		////debugger; 
		if(GameController.getInstance().profile.rockets>0){
			
			thisLayer.spriteBullet8 = new cc.PhysicsSprite("#rocket00.png");
			var contentSize = thisLayer.spriteBullet8.getContentSize();
			// init body
			thisLayer.bodyBullet8 = new cp.Body(.35, cp.momentForBox(1, 30*contentSize.width, 30*contentSize.height));
			thisLayer.bodyBullet8.p = cc.p(thisLayer.body.p.x + thisLayer.sprite.getBoundingBox().width - thisLayer.sprite.getBoundingBox().width/4, thisLayer.body.p.y-10);
			thisLayer.space.addBody(thisLayer.bodyBullet8);
			thisLayer.bodyBullet8.applyImpulse(cp.v(100, 100), cp.v(100, 0));
			thisLayer.shapeBullet8 = new cp.BoxShape(thisLayer.bodyBullet8, contentSize.width /2, contentSize.height);
			thisLayer.shapeBullet8.setCollisionType(SpriteTag.rocket);
			thisLayer.space.addShape(thisLayer.shapeBullet8);
			thisLayer.spriteBullet8.setBody(thisLayer.bodyBullet8);
			thisLayer.spriteBullet8.runAction(thisLayer.flyingAction8);
			thisLayer.spriteBullet8.setTag(thisLayer.shapeBullet8.hashid);
		thisLayer.spriteSheetChar.addChild(thisLayer.spriteBullet8);	
			thisLayer.rockets.push({sprite:thisLayer.spriteBullet8,shape:thisLayer.shapeBullet8});
			GameController.getInstance().profile.rockets--;
			Sound.playRocketStart();
	    }
	};
	
	if(key==69){
				      var l_pParticle = cc.ParticleSpiral.create();
						l_pParticle.initWithTotalParticles(33);//count of particles																  
						l_pParticle.setPosition(cc.p(thisLayer.body.p.x + thisLayer.sprite.getBoundingBox().width - thisLayer.sprite.getBoundingBox().width/4, thisLayer.body.p.y-10));
						l_pParticle.setTexture(
						    thisLayer.particleSrc.getTexture()
						);
                        
						l_pParticle.setAutoRemoveOnFinish(true);//set whether or not the node will be auto-removed when it has no particles left.By default it is false.

						thisLayer.addChild(l_pParticle,200);						
					
	}	
	    //console.log(event);
		//console.log(key);
		if(key==13){};
		var impulsH=impulsV=0;
		 if(key==39){
			 
			 ////debugger;	
			impulsH=25;//+5;
			 //thisLayer.sprite.setPositionX(thisLayer.sprite.getPositionX()+10)
		 }
		 if(key==37){
			 impulsH=0//-5;
			 
		 }
		  if(key==38)impulsV=110;
		   if(key==40)impulsV=-110;
		this._node.body.applyImpulse(cp.v(impulsH, impulsV), cp.v(0, 0));
		this._node.bodyBullet2.applyImpulse(cp.v(impulsH, impulsV), cp.v(0, 0));//run speed
		this._node.bodyBullet2.setAngle(0);
		this._node.body.setAngle(0);
	},
	
	locationTapped:function(location,event) {////debugger;
		 this._node.jump();
    },

    onExit:function() {
        this._super();
    },

    initAction:function () {
    	this.particleSrc = new cc.Sprite(res.particle_star_png);//res.particle_png);
	    var animFrames = [];
        for (var i = 0; i < 8; i++) {
            var str = "runner" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
        this.runningAction.retain();

        // init jumpUpAction
        animFrames = [];
        for (var i = 0; i < 4; i++) {
            var str = "runnerJumpUp" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        animation = new cc.Animation(animFrames, 0.2);
        this.jumpUpAction = new cc.Animate(animation);
        this.jumpUpAction.retain();

        // init jumpDownAction
        animFrames = [];
        for (var i = 0; i < 2; i++) {
            var str = "runnerJumpDown" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        animation = new cc.Animation(animFrames, 0.3);
        this.jumpDownAction = new cc.Animate(animation);
        this.jumpDownAction.retain();
	
    	var animFrames1=[];
		var animFrames3=[];
		var animFrames4=[];
		var animFrames5=[];
		var animFrames6=[];
		var animFrames7=[];
		var animFrames8=[];
		var animFrames9=[];
		var animFrames10=[];
		var animFrames11=[];
		var animFrames2=[],
		animFramesDragonFire = [];
		
        for (var i = 0; i < 8; i++) {
            var str = "cristall0" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames2.push(frame);
        }
		 for (var i = 7; i >0; i--) {
            var str = "cristall0" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames2.push(frame);
        }
		
		 var animationChar2 = new cc.Animation(animFrames2, 0.1);
        this.flyingAction2 = new cc.RepeatForever(new cc.Animate(animationChar2));
        this.flyingAction2.retain();

	    for (var i = 0; i < 5; i++) {
            var str = "green0" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames3.push(frame);
        }
		var animFrames3 = animFrames3.concat(animFrames3.reverse());
		var animationChar3 = new cc.Animation(animFrames3, 0.1);
        this.flyingAction3 = new cc.RepeatForever(new cc.Animate(animationChar3));
        this.flyingAction3.retain();
		
		for (var i = 0; i < 5; i++) {
            var str = "chick0" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames4.push(frame);
        }
		var animFrames4 = animFrames4.concat(animFrames4.reverse());
	    var animationChar4 = new cc.Animation(animFrames4, 0.1);
        this.flyingAction4 = new cc.RepeatForever(new cc.Animate(animationChar4));
        this.flyingAction4.retain();
	    for (var i = 0; i < 5; i++) {
            var str = "eagle0" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames5.push(frame);
        }
		var animFrames5 = animFrames5.concat(animFrames5.reverse());
			
        var animationChar5 = new cc.Animation(animFrames5, 0.1);
        this.flyingAction5 = new cc.RepeatForever(new cc.Animate(animationChar5));
        this.flyingAction5.retain();

         for (var i = 0; i < 3; i++) {
            var str = "robo0" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames6.push(frame);
        }
		var animFrames6 = animFrames6.concat(animFrames6.reverse());
	    var animationChar6 = new cc.Animation(animFrames6, 0.1);
        this.flyingAction6 = new cc.RepeatForever(new cc.Animate(animationChar6));
        this.flyingAction6.retain();	
			
		for (var i = 0; i < 8; i++) {
            var str = "dragon_fire0" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFramesDragonFire.push(frame);
        }
		var animFramesTmp = animFramesDragonFire.slice();
		var animFramesR = animFramesTmp.reverse();
        var animationDragonFireV = new cc.Animation(animFramesR, 0.1);
        this.actionDragonFireV = new cc.RepeatForever(new cc.Animate(animationDragonFireV));
        this.actionDragonFireV.retain();
		
		var animationDragonFire = new cc.Animation(animFramesDragonFire, 0.1);
        this.actionDragonFire = new cc.RepeatForever(new cc.Animate(animationDragonFire));
        this.actionDragonFire.retain();
				
		for (var i = 0; i < 3; i++) {
            var str = "rocket0" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames8.push(frame);
        }
		var animFrames8 = animFrames8.concat(animFrames8.reverse());
	    var animationChar8 = new cc.Animation(animFrames8, 0.1);
        this.flyingAction8 = new cc.RepeatForever(new cc.Animate(animationChar8));
        this.flyingAction8.retain();
		
        for (var i = 0; i < 8; i++) {
            var str = "dragon0" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames10.push(frame);
        }
		var animFrames10 = animFrames10.concat(animFrames10.reverse());
	    var animationChar10 = new cc.Animation(animFrames10, 0.1);
        this.flyingAction10 = new cc.RepeatForever(new cc.Animate(animationChar10));
        this.flyingAction10.retain();	
		
        for (var i = 0; i < 7; i++) {
            var str = "exsplosion0" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames11.push(frame);
        }////debugger
		var animFrames11 = animFrames11.concat(animFrames11.reverse());
	    var animationChar11 = new cc.Animation(animFrames11, 0.1);
        this.flyingAction11 = new cc.Repeat(new cc.Animate(animationChar11),1);
        this.flyingAction11.retain();

		var exsplosionF = [];
		for (var i = 0; i < 8; i++) {
            var str = "exsplosionF0" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            exsplosionF.push(frame);
        }////debugger
		
	    var animationCharF = new cc.Animation(exsplosionF, 0.05);
        this.fireAction = new cc.Repeat(new cc.Animate(animationCharF),1);
        this.fireAction.retain();		
	
    },
    onTouchBegan:function(touch, event) {
        var pos = touch.getLocation();
        event.getCurrentTarget().recognizer.beginPoint(pos.x, pos.y);
        return true;
    },
    onTouchMoved:function(touch, event) {
        var pos = touch.getLocation();
        event.getCurrentTarget().recognizer.movePoint(pos.x, pos.y);
    },
    onTouchEnded:function(touch, event) {
        var rtn = event.getCurrentTarget().recognizer.endPoint();
        cc.log("rnt = " + rtn);
        switch (rtn) {
            case "up":
                event.getCurrentTarget().jump();
                break;
            default:
                break;
        }
    },
    jump:function () {
        cc.log("jump");
        if (this.stat == RunnerStat.running && this.sprite.stamina>0) {
			Sound.playPlayerJump()
            this.body.applyImpulse(cp.v(0, 250), cp.v(0, 0));
            //cc.audioEngine.playEffect(res.jump_mp3);
			var statusLayer = this.getParent().getParent().getChildByTag(TagOfLayer.Status);
			////debugger
			this.sprite.stamina -= .25; 
			var percent = this.sprite.stamina;
			var def_width = 66;
			statusLayer.stamina_bar.setScaleX(percent);
			var curr_width = statusLayer.stamina_bar.getBoundingBox().width;
			statusLayer.stamina_bar.setPosition(cc.p(statusLayer.stamina_bar.getPositionX()-def_width/2*(percent+.25)+curr_width/2,statusLayer.stamina_bar.getPositionY()));
			this.backupStamina();
        } else{
			Sound.playPlayerStaminaError();
		}
    },
	 backupStamina:function () {
			setTimeout(function(){
				if (this.stat == RunnerStat.running && this.sprite.stamina>=0) {
					var statusLayer = this.getParent().getParent().getChildByTag(TagOfLayer.Status);
					
					
					this.sprite.stamina += .25; 
					var percent = this.sprite.stamina;
					var def_width = 66;
					statusLayer.stamina_bar.setScaleX(percent);
					var curr_width = statusLayer.stamina_bar.getBoundingBox().width;
					statusLayer.stamina_bar.setPosition(cc.p(statusLayer.stamina_bar.getPositionX()+def_width/2*(percent+.25)-curr_width/2,statusLayer.stamina_bar.getPositionY()));
				}
			}.bind(this),3000);
			
    },
	onMouseUp:function (event) {
			console.log(111)
    },
    getEyeX:function () {
        return this.sprite.getPositionX() - g_runnerStartX;
    },
   explosiveRemove:function (bullet) {
	      bullet.removeFromParent();
      	 bullet = null;					
	},
	removeRocketsByShape:function (shape) {////debugger;
        for (var i = 0; i < this.rockets.length; i++) {
            if (this.rockets[i].sprite.tag == shape.hashid) {
				   shape.space.removeBody(shape.getBody());//    1----shape
				   shape.space.removeShape(shape);//                  2----body
				   this.rockets[i].sprite.removeFromParent();//         3----sprite
				   this.rockets[i] = null;
                this.rockets.splice(i, 1);
                break;
            }
        }
    },
	removeFireByShape:function (shape) {////debugger;
        for (var i = 0; i < this.fire.length; i++) {
            if (this.fire[i].sprite.tag == shape.hashid) {
		           shape.space.removeBody(shape.getBody());//    1----shape
				   shape.space.removeShape(shape);//                  2----body
				   this.fire[i].sprite.removeFromParent();//         3----sprite
				   this.fire[i] = null;
                this.fire.splice(i, 1);
                break;
            }
        }
    },
    update:function (dt) {
		
		//debugger
		//this.spritePervPos = this.sprite.getPosition().x;
		if(this.body.getVel().x<80){////debugger
			this.body.applyImpulse(cp.v(80, 0), cp.v(80, 0));//run speed
		} else{
			//debugger
			
			if(cc.director.getRunningScene().getChildByTag(TagOfLayer.FrontLayer)){
			/*	var backLayer = new BackLayer([res.background_map00_tmx],1,[1]);
				cc.director.getRunningScene().addChild(backLayer, 0, TagOfLayer.BackLayer);
				var frontLayer = new FrontLayer([res.before_front_map00_tmx,res.front_map00_tmx],5,[1,2]);
				cc.director.getRunningScene().addChild(frontLayer, 10, TagOfLayer.FrontLayer);
			} else {*/
				cc.director.getRunningScene().getChildByTag(TagOfLayer.FrontLayer).updateLayer();
				cc.director.getRunningScene().getChildByTag(TagOfLayer.BackLayer).updateLayer();
			}
		}
		
		if(this.body.getVel().x>80){////debugger
			this.body.getVel().x=80
		} 
		
		for (var i = 0; i < this.fire.length; i++) {
            if (
				this.fire[i].sprite.getPosition().y<=g_groundHeight+this.fire[i].sprite.getBoundingBox().height/2 || 
				this.fire[i].sprite.getPosition().x>cc.director.getWinSize().width+this.sprite.getPosition().x
			) {
                ////debugger
						/*var l_pParticle = cc.ParticleExplosion.create();
						l_pParticle.initWithTotalParticles(10);//count of particles
					    l_pParticle.setStartSize(2.0);// size of particles
						l_pParticle.setEndSize(20.0);// size of particles
						l_pParticle.setDuration(.2);//set run seconds of the emitter
						l_pParticle.setLife(.5);//life of each particle setter
						l_pParticle.setLifeVar(.5);//life variance of each particle setter                                          
						l_pParticle.setPosition(this.fire[i].sprite.getPosition());
						l_pParticle.setTexture(
						    this.particleSrc.getTexture()
						);

						l_pParticle.setAutoRemoveOnFinish(true);//set whether or not the node will be auto-removed when it has no particles left.By default it is false.

						this.addChild(l_pParticle,200);*/	
					   this.fire[i].sprite.removeFromParent();
					   this.space.removeBody(this.fire[i].sprite._body);
					   this.space.removeShape(this.fire[i].shape);
					   this.fire[i] = null;
				   
                this.fire.splice(i, 1);
                break;
            }
        }
		
        var statusLayer = this.getParent().getParent().getChildByTag(TagOfLayer.Status);
		var setToStatus = {
			money: GameController.getInstance().profile.money, 
			lives:GameController.getInstance().profile.lives, 
			power:GameController.getInstance().profile.power, 
			rockets:GameController.getInstance().profile.rockets, 
			fire_status:GameController.getInstance().profile.fire_type
		}		
        statusLayer.updateStatus(setToStatus);
        // check and update runner stat
        var vel = this.body.getVel();
		if(vel.x<0){
			vel.x = 0;
		}
		////debugger
		
		var bgLayer = this.getParent().getChildByTag(TagOfLayer.background);
		var objArr = bgLayer.objects;
		var lenBodys = objArr.length;
		for (var z = 0; z < lenBodys; z++) {
			if(objArr[z]&& objArr[z].shape && objArr[z].shape.collision_type){
			
			   var objZPositionX = bgLayer.spriteSheetcharBig_plist.getChildByTag(objArr[z].shape.hashid)?bgLayer.spriteSheetcharBig_plist.getChildByTag(objArr[z].shape.hashid).getPositionX():0;
			
				if(objArr[z].shape.collision_type==SpriteTag.boss0){//get only boss0
					var boss0 = bgLayer.getChildByTag(objArr[z].shape.hashid);
					////debugger;
					boss0.setPosition(cc.p(boss0.getBody().p.x+60,boss0.getBody().p.y-10));
				}
				
			    if(objArr[z].shape.collision_type==SpriteTag.chick_child){//get only chick_child
				   if(this.sprite.getPositionX()+150>objZPositionX){
						var chick_child = bgLayer.spriteSheetcharBig_plist.getChildByTag(objArr[z].shape.hashid);
						var zombyChild_y =  g_groundHeight+25;
						   
						chick_child.setPosition(cc.p(chick_child.getPositionX()-1.5, zombyChild_y));		
						if(!this.chick_childChildAction){	  
							chick_child.stopAllActions();	
							var animFrames = [];
							 for (var i = 2; i < 4; i++) {
								var str = "child0" + i + ".png";
								var frame = cc.spriteFrameCache.getSpriteFrame(str);
								animFrames.push(frame);
							}
							/*function playChildBite(t){
							   var d = $.Deferred();
							  var actTime = 500*t//10000*Math.random();
							  setTimeout(function(){
							//debugger
								Sound.playChildBite();
								d.resolve();
							  }, actTime);
							  return d.promise(); // вместо самого объекта, вернем его заместителя
							}
							 
							$.when( playChildBite(0))
								.then(playChildBite(1))
								.then(playChildBite(2));
							//debugger*/
							Sound.playChildBite();
							var animation = new cc.Animation(animFrames, 0.2);
							this.chick_childChildAction  = new cc.RepeatForever( new cc.Animate(animation));
											   
							chick_child.runAction(
										cc.sequence(
											cc.scaleTo(.2, 1.2, 1.1)
										)
							);
						   chick_child.runAction(
											this.chick_childChildAction
							);
						}
					}
			}
			   
			if(objArr[z].shape.collision_type==SpriteTag.bomber){//get only bomber(egg)
				
				if(this.sprite.getPositionX()+this.sceneSize>objZPositionX){
						var bomber = bgLayer.spriteSheetcharBig_plist.getChildByTag(objArr[z].shape.hashid);
						bomber.setPosition(cc.p(bomber.getPositionX()-1, bomber.getPositionY()));		
						if(!this.bomberChildAction){	  
							this.bomberChildAction  = new cc.RepeatForever( new cc.Animate(animation));
							bomber.runAction(
											cc.sequence(
												cc.scaleTo(.2, 1.2, 1.1)
											)
							);
						}

						if(bomber.getPositionX()%20 == 0 && this.sprite.getPositionX()-this.sceneSize/6<objZPositionX){
									Sound.playBomberFire();
									this.spriteEgg = new cc.PhysicsSprite("#egg.png");	
									var contentSize = this.spriteEgg.getContentSize();
									this.bodyEgg = new cp.Body(3, cp.momentForBox(1, 30*contentSize.width, 30*contentSize.height));
									this.bodyEgg.p = cc.p(bomber.getPositionX()+10, bomber.getPositionY()-10);
									this.space.addBody(this.bodyEgg);
									this.bodyEgg.applyForce(cp.v(-10, 0), cp.v(-10, 0));
									this.shapeEgg = new cp.BoxShape(this.bodyEgg, contentSize.width /2, contentSize.height);
									this.shapeEgg.setCollisionType(SpriteTag.bombers_bomb);
									this.space.addShape(this.shapeEgg);
									this.spriteEgg.setBody(this.bodyEgg);
									this.spriteEgg.setTag(this.shapeEgg.hashid);
									this.spriteSheetChar.addChild(this.spriteEgg);	
									this.rockets.push({sprite:this.spriteEgg,shape:this.shapeEgg})
						}
						
					}
					if(this.sprite.getPositionX()-this.sceneSize/6>objZPositionX){
						//objArr[z].removeFromParent();
						////debugger
					}
			   }	   
				if(objArr[z].shape.collision_type==SpriteTag.ball){//get only ball(spit)
					if(this.sprite.getPositionX()+this.sceneSize>objZPositionX){
					  var ball = bgLayer.spriteSheetcharBig_plist.getChildByTag(objArr[z].shape.hashid);
						var ballWidth = ball.getBoundingBox().width;   
						ball.setPosition(cc.p(ball.getPositionX()-1, ball.getPositionY()));		
						if(!this.ballChildAction){	  
							this.ballChildAction  = new cc.RepeatForever( new cc.Animate(animation));				   
							ball.runAction(
										cc.sequence(
											cc.scaleTo(.2, 1.2, 1.1)
										)
							);
						}
						if(ball.getPositionX()%60 == 0 && this.sprite.getPositionX()-this.sceneSize/6<objZPositionX){
								Sound.playBallFire();
								this.spriteSpit = new cc.PhysicsSprite("#spit.png");
								var contentSize = this.spriteSpit.getContentSize();
								this.bodySpit = new cp.Body(0.001, cp.momentForBox(1, 30*contentSize.width, 30*contentSize.height));
								this.bodySpit.p = cc.p(ball.getPositionX()-ballWidth/2, ball.getPositionY());
								this.space.addBody(this.bodySpit);
								this.bodySpit.applyForce(cp.v(-1, 0.35), cp.v(-1, 0.35));
								this.shapeSpit = new cp.BoxShape(this.bodySpit, contentSize.width /2, contentSize.height);
								this.shapeSpit.setCollisionType(SpriteTag.balls_bomb);
								this.space.addShape(this.shapeSpit);
								this.spriteSpit.setBody(this.bodySpit);
								this.spriteSpit.setTag(this.shapeSpit.hashid);
								this.spriteSheetChar.addChild(this.spriteSpit);	
								this.rockets.push({sprite:this.spriteSpit,shape:this.shapeSpit})
						}
					}
					if(this.sprite.getPositionX()-this.sceneSize/6>objZPositionX){
						//objArr[z].removeFromParent();
						////debugger
					}
			   }

				if(objArr[z].shape.collision_type==SpriteTag.lazer){//get only lazer
				
					if(this.sprite.getPositionX()+this.sceneSize>objZPositionX){
						////debugger
					
					  var lazer = bgLayer.spriteSheetcharBig_plist.getChildByTag(objArr[z].shape.hashid); 
						var lazerWidth = lazer.getBoundingBox().width;   
						lazer.setPosition(cc.p(lazer.getPositionX()-1, lazer.getPositionY()));		
						if(lazer.getPositionX()%60 == 0 && this.sprite.getPositionX()-this.sceneSize/6<objZPositionX){
								this.spriteLazerFire = new cc.PhysicsSprite("#lazerFire.png");
									var contentSize = this.spriteLazerFire.getContentSize();
									this.bodyLazerFire = new cp.Body(0.001, cp.momentForBox(1, 30*contentSize.width, 30*contentSize.height));
									this.bodyLazerFire.p = cc.p(lazer.getPositionX()-lazerWidth/2, lazer.getPositionY()+5);
									Sound.playLazerFire();
									/*var l_pParticle = cc.ParticleExplosion.create();
									l_pParticle.initWithTotalParticles(33);//count of particles
									l_pParticle.setPosition(cc.p(lazer.getPositionX()-15,lazer.getPositionY()+5));
									l_pParticle.setStartSize(10.0);// size of particles
									l_pParticle.setEndSize(0.0);// size of particles
									l_pParticle.setTexture(
										this.particleSrc.getTexture()
									);
									l_pParticle.setSpeed(50);//Speed of each particle setter
									l_pParticle.setSpeedVar(50);//setSpeedVar
									l_pParticle.setDuration(.5);//set run seconds of the emitter
									l_pParticle.setLife(.5);//life of each particle setter
									l_pParticle.setLifeVar(.5);//life variance of each particle setter					
									l_pParticle.setStartColor(cc.color(254,195,15, 255));
									l_pParticle.setStartColorVar(cc.color(5, 5, 5, 0));
									l_pParticle.setEndColor(cc.color(255, 255, 255, 0));
									l_pParticle.setEndColorVar(cc.color(0, 0, 0, 0));
									l_pParticle.setAutoRemoveOnFinish(true);//set whether or not the node will be auto-removed when it has no particles left.By default it is false.

									this.addChild(l_pParticle,0);	*/
									this.space.addBody(this.bodyLazerFire);
									this.bodyLazerFire.applyForce(cp.v(-1, 0.35), cp.v(-1, 0.35));
									this.shapeLazerFire = new cp.BoxShape(this.bodyLazerFire, contentSize.width /2, contentSize.height);
									this.shapeLazerFire.setCollisionType(SpriteTag.lazerFire);
									this.space.addShape(this.shapeLazerFire);
									this.spriteLazerFire.setBody(this.bodyLazerFire);
									this.spriteLazerFire.setTag(this.shapeLazerFire.hashid);
									this.spriteSheetChar.addChild(this.spriteLazerFire);	
									this.rockets.push({sprite:this.spriteLazerFire,shape:this.shapeLazerFire})
						}
					}
					if(this.sprite.getPositionX()-this.sceneSize/6>objZPositionX){
						//objArr[z].removeFromParent();
						////debugger
					}
			   }	
			}
  //////////////////////////////////////////////////////////////////          
        }
		
	    if(this.sprite && this.sprite.getPositionY()<0 ){
		   
			for (var r = 0; r < objArr.length; r++) {
			    if(objArr[r] && objArr[r].name=='ground'){
					if(objArr[r].shape.bb_l>this.sprite.getPositionX()){
						this.sprite.setPositionY(objArr[r].shape.bb_t+this.sprite.getBoundingBox().height);					
						this.sprite.setPositionX(objArr[r].shape.bb_l);
						Sound.playPlayerFall();
													var blink  = new cc.Repeat(
														cc.sequence(
															 cc.FadeOut.create(.2),
															cc.FadeIn.create(.2)
														),5
													);

													GameController.getInstance().profile.lives--;
													GameController.getInstance().profile.rockets=5;
													
													   this.sprite.runAction(
															 cc.sequence(
																blink
															)
														);
																																		
										if(GameController.getInstance().profile.lives==-1){
											cc.log("==game over");
											cc.audioEngine.stopMusic();
											cc.director.pause();
											cc.director.getRunningScene().addChild(new GameOverLayer(),1111111);
										}
						break;				
					}			
			    }
		    }
		}
		for (var r = 0; r < objArr.length; r++) {
			 if(objArr[r] && objArr[r].name=='child' && objArr[r].sprite && objArr[r].sprite.getPositionY()<0 ){
			   cc.log(objArr[r].sprite.getPositionY() )
			   cc.log(objArr[r].sprite )
				cc.log(objArr[r])
				objArr[r].removeFromParent()
		     }  
		}
		if(this.spriteEgg){
		   this.spriteEgg.setRotation(this.spriteEgg.getRotation()+5);
		}
		if(this.spriteSpit){
		   this.spriteSpit.setRotation(this.spriteSpit.getRotation()+5);
		}
		if(this.spriteDragonFire){
		   this.spriteDragonFire.setPosition(this.sprite.getPositionX()+75,this.sprite.getPositionY()-5);
		}
		if(this.spriteDragonFireV){
		   this.spriteDragonFireV.setPosition(this.sprite.getPositionX()+50,this.sprite.getPositionY()+55);
		}
		var statusLayer = this.getParent().getParent().getChildByTag(TagOfLayer.Status);
				var percent = this.sprite.gun_heat/10;
					var def_width = 66;
					////debugger
					statusLayer.hot_bar.setAnchorPoint(cc.p(0, .5));
					statusLayer.hot_bar.setScaleX(percent);
        if (this.stat == RunnerStat.jumpUp) {
            if (vel.y < 0.1) {
                this.stat = RunnerStat.jumpDown;
                this.sprite.stopAllActions();
                this.sprite.runAction(this.jumpDownAction);
            }
        } else if (this.stat == RunnerStat.jumpDown) {
            if (vel.y == 0) {
                this.stat = RunnerStat.running;
                this.sprite.stopAllActions();
                this.sprite.runAction(this.runningAction);
            }
        }
    }
});