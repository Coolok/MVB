var PlayScene = cc.Scene.extend({
    space:null,
    shapesToRemove:[],
	rocketsToRemove:[],
	fireToRemove:[],
    gameLayer:null,
	curRunner:null,
	curRunner_undied:666,
	curRunner_flag:777,
	runnerSprite:null,
	animation_layer:null,
	ctor:function (worldNum,levelNum) {
        this._super();
		this.curRunner  = GameController.getInstance().profile;
		this.curRunner.lives=5;
		this.curRunner.rockets=5;
		
		this.levelNum = levelNum?levelNum:0;
		this.worldNum = worldNum?worldNum:0;
    },
    // init space of chipmunk
    initPhysics:function() {
        this.space = new cp.Space();
        // Gravity
        this.space.gravity = cp.v(0, -350);
        // set up Walls
		  var wallTop = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, this.height),// start point
            cp.v(4294967295, this.height),// MAX INT:4294967295
            0);// thickness of wall

		 this.wallLeft = new cp.SegmentShape(this.space.staticBody,
            cp.v(10, 0),// start point
            cp.v(10, this.height),// MAX INT:4294967295
            10);// thickness of wall
		
		this.space.addStaticShape(wallTop);
		this.space.addStaticShape(this.wallLeft);
        // setup chipmunk CollisionHandler
        this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.coin,
            this.collisionCoinBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.rock, SpriteTag.fire,
            this.collisionFireRockBigBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(0, SpriteTag.fire,
            this.collisionFireRockBigBegin.bind(this), null, null, null);
			
	     this.space.addCollisionHandler(SpriteTag.rocket, SpriteTag.charBig,
            this.collisionRocketCharBigBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.charBig,
            this.collisionRunnerCharBigBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.rock_sharp,
            this.collisionRunnerRockSharp.bind(this), null, null, null);
					
		this.space.addCollisionHandler(SpriteTag.rock_sharp, SpriteTag.rocket,
            this.collisionRocketRockBigBegin.bind(this), null, null, null);
		
		 this.space.addCollisionHandler(SpriteTag.rock_sharp, SpriteTag.fire,
            this.collisionFireRockBigBegin.bind(this), null, null, null);
					
	    this.space.addCollisionHandler(SpriteTag.rock, SpriteTag.rocket,
            this.collisionRocketRockBigBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.ground, SpriteTag.rocket,
            this.collisionRocketRockBigBegin.bind(this), null, null, null);
			
		 this.space.addCollisionHandler(SpriteTag.fire, SpriteTag.charBig,
            this.collisionFireCharBigBegin.bind(this), null, null, null);
			
		 this.space.addCollisionHandler(SpriteTag.dragonFire, SpriteTag.charBig,
            this.collisionRocketCharBigBegin.bind(this), null, null, null);	
			
		 this.space.addCollisionHandler(SpriteTag.lazerFire, SpriteTag.charBig,
            this.collisionRocketCharBigBegin.bind(this), null, null, null);						
	
//pink COLLISIONS				
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.pink,
            this.collisionRunnerCharBigBegin.bind(this), null, null, null);
			
		 this.space.addCollisionHandler(SpriteTag.fire, SpriteTag.pink,
            this.collisionFireCharBigBegin.bind(this), null, null, null);
			
		 this.space.addCollisionHandler(SpriteTag.rocket, SpriteTag.pink,
            this.collisionRocketCharBigBegin.bind(this), null, null, null);
//chick COLLISIONS					
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.chick,
            this.collisionRunnerCharBigBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.fire, SpriteTag.chick,
            this.collisionFireCharBigBegin.bind(this), null, null, null);
			
		 this.space.addCollisionHandler(SpriteTag.rocket, SpriteTag.chick,
            this.collisionRocketCharBigBegin.bind(this), null, null, null);
//eagle COLLISIONS			
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.eagle,
            this.collisionRunnerCharBigBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.fire, SpriteTag.eagle,
            this.collisionFireCharBigBegin.bind(this), null, null, null);
			
		 this.space.addCollisionHandler(SpriteTag.rocket, SpriteTag.eagle,
            this.collisionRocketCharBigBegin.bind(this), null, null, null);
		
//HAT COLLISIONS		
	    this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.hat,
            this.collisionRunnerCharBigBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.fire, SpriteTag.hat,
            this.collisionFireCharBigBegin.bind(this), null, null, null);
			
		 this.space.addCollisionHandler(SpriteTag.rocket, SpriteTag.hat,
            this.collisionRocketCharBigBegin.bind(this), null, null, null);
			
//white COLLISIONS		
	    this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.white,
            this.collisionRunnerCharBigBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.fire, SpriteTag.white,
            this.collisionFireCharBigBegin.bind(this), null, null, null);
			
		 this.space.addCollisionHandler(SpriteTag.rocket, SpriteTag.white,
            this.collisionRocketCharBigBegin.bind(this), null, null, null);
			
//car COLLISIONS				
		this.space.addCollisionHandler( SpriteTag.car,SpriteTag.fire,
            this.collisionFireRockBigBegin.bind(this), null, null, null);
			
		 this.space.addCollisionHandler(SpriteTag.car, SpriteTag.rocket,
            this.collisionRocketRockBigBegin.bind(this), null, null, null);
			
//zomby COLLISIONS		
	    this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.zomby,
            this.collisionRunnerZombyBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.fire, SpriteTag.zomby,
            this.collisionFireCharBigBegin.bind(this), null, null, null);
			
		 this.space.addCollisionHandler(SpriteTag.rocket, SpriteTag.zomby,
            this.collisionRocketCharBigBegin.bind(this), null, null, null);
			
//ice COLLISIONS		
	    this.space.addCollisionHandler(SpriteTag.ice, SpriteTag.car,
            this.collisionIceCarBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.ice,SpriteTag.fire, 
            this.collisionFireRockBigBegin.bind(this), null, null, null);
			
		 this.space.addCollisionHandler(SpriteTag.ice, SpriteTag.rocket, 
            this.collisionRocketIceBegin.bind(this), null, null, null);

//chick_child COLLISIONS		
	    this.space.addCollisionHandler( SpriteTag.fire,SpriteTag.chick_child,
            this.collisionFireChik_childBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.rocket, SpriteTag.chick_child,
            this.collisionRocketCharBigBegin.bind(this), null, null, null);
		
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.chick_child,
            this.collisionRunnerChick_childBegin.bind(this),  null, null, null);
			
//bomber COLLISIONS		
	    this.space.addCollisionHandler( SpriteTag.fire, SpriteTag.bomber,
            this.collisionFireChik_childBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.rocket, SpriteTag.bomber,
            this.collisionRocketCharBigBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.bomber,
            this.collisionRunnerCharBigBegin.bind(this),  null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.bombers_bomb,
            this.collisionRunnerCharBigBegin.bind(this),  null, null, null);

	    this.space.addCollisionHandler(SpriteTag.ground, SpriteTag.bombers_bomb,
            this.collisionRocketRockBigBegin.bind(this),  null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.lazer, SpriteTag.bombers_bomb,
            this.collisionRocketRockBigBegin.bind(this),  null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.rock, SpriteTag.bombers_bomb,
            this.collisionRocketRockBigBegin.bind(this),  null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.rock_sharp, SpriteTag.bombers_bomb,
            this.collisionRocketRockBigBegin.bind(this),  null, null, null);	

//ball COLLISIONS		
	    this.space.addCollisionHandler( SpriteTag.fire,SpriteTag.ball,
            this.collisionFireChik_childBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.rocket, SpriteTag.ball,
            this.collisionRocketCharBigBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.ball,
            this.collisionRunnerCharBigBegin.bind(this),  null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.balls_bomb,
            this.collisionRunnerCharBigBegin.bind(this),  null, null, null);

	    this.space.addCollisionHandler(0, SpriteTag.balls_bomb,
            this.collisionRocketRockBigBegin.bind(this),  null, null, null);

//lazer COLLISIONS		
	    this.space.addCollisionHandler( SpriteTag.fire, SpriteTag.lazer,
            this.collisionFireChik_childBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.rocket, SpriteTag.lazer,
            this.collisionRocketCharBigBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.lazer,
            this.collisionRunnerCharBigBegin.bind(this),  null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.lazerFire,
            this.collisionRunnerCharBigBegin.bind(this),  null, null, null);

	    this.space.addCollisionHandler(0, SpriteTag.lazerFire,
            this.collisionRocketRockBigBegin.bind(this),  null, null, null);

		this.space.addCollisionHandler(SpriteTag.rock, SpriteTag.lazerFire,
            this.collisionRocketRockBigBegin.bind(this),  null, null, null);

		this.space.addCollisionHandler(SpriteTag.rock_sharp, SpriteTag.lazerFire,
            this.collisionRocketRockBigBegin.bind(this),  null, null, null);

//boss0 COLLISIONS		
	    this.space.addCollisionHandler( SpriteTag.fire, SpriteTag.boss0,
            this.collisionFireChik_childBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.rocket, SpriteTag.boss0,
            this.collisionRocketCharBigBegin.bind(this), null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.boss0,
            this.collisionRunnerCharBigBegin.bind(this),  null, null, null);
			
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.boss0Fire,
            this.collisionRunnerCharBigBegin.bind(this),  null, null, null);

	    this.space.addCollisionHandler(0, SpriteTag.boss0Fire,
            this.collisionRocketRockBigBegin.bind(this),  null, null, null);

		this.space.addCollisionHandler(SpriteTag.rock, SpriteTag.boss0Fire,
            this.collisionRocketRockBigBegin.bind(this),  null, null, null);

		this.space.addCollisionHandler(SpriteTag.rock_sharp, SpriteTag.boss0Fire,
            this.collisionRocketRockBigBegin.bind(this),  null, null, null);			
			
    },
	
	
	collisionRunnerChick_childBegin:function (arbiter, space) {
		if(this.gameLayer.getChildByTag(TagOfLayer.Animation).spriteSheetChar.getChildByTag(SpriteTag.runner).getBody().shapeList[0].hashid ==
			   arbiter.getA().getBody().shapeList[0].hashid){
		 cc.log('player CHILD!')
		 var shapes = arbiter.getShapes();
				//arbiter.handler.b
				Sound.playChildDie();
		this.animation_layer.sprite11 = new cc.Sprite("#exsplosion00.png");
						 var contentSize11 = this.animation_layer.sprite11.getContentSize();
						   
						this.animation_layer.sprite11.attr({
							x: contentSize11.width,
							y: contentSize11.height
						});
						var collis_pos = arbiter.body_a.p;//position of detection
						this.animation_layer.sprite11.setPosition( cc.p(collis_pos.x, collis_pos.y));
						this.animation_layer.sprite11.runAction(//
							cc.sequence(
								//cc.scaleTo(.2, 10, 10),
								this.animation_layer.flyingAction11,
								cc.FadeOut.create(.2)
							)
						);
						
						this.animation_layer.addChild(this.animation_layer.sprite11, 0);
						
					this.gameLayer.getChildByTag(TagOfLayer.background).spriteSheetcharBig_plist.getChildByTag(shapes[1].hashid).stopAllActions();
						//this.gameLayer.getChildByTag(TagOfLayer.background).spriteSheetcharBig_plist.getChildByTag(shapes[1].hashid).runAction(//
							//cc.FadeOut.create(.2)
						//);
						this.shapesToRemove.push(shapes[1]);
						//animation_layer.addChild(animation_layer.sprite11, 0);
                        var blink  = new cc.Repeat(
							cc.sequence(
							    cc.FadeOut.create(.2),
								cc.FadeIn.create(.2)
							),5
						);
						if(this.curRunner_flag == 777 &&this.curRunner_undied == 666){
						    this.curRunner_flag = 666;
							this.curRunner.lives--;
							this.curRunner.rockets=5;
							this.runnerSprite.runAction(
								 cc.sequence(
									blink,
									cc.callFunc(function(){////debugger
									   //curRunner_undied=undefined;
									  this.curRunner_flag = 777
									},this)
								)
							);
						 
						 } else {
 						   
						  this.runnerSprite.runAction(
								 cc.sequence(
									blink
								)
							);
						 }
		
			if(this.curRunner.lives==-1){
			       cc.log("==game over");

					//stop bg music
					cc.audioEngine.stopMusic();

					cc.director.pause();
					var gameOver = new GameOverLayer();
					//debugger
					gameOver.setPosition(cc.p(cc.director.getWinSize().width/2))
					cc.director.getRunningScene().addChild(new GameOverLayer(),1000);
					/*this.curRunner.lives = 5;
					var statusLayer = this.getChildByTag(TagOfLayer.Status);
					var setToStatus = {
						lives:this.curRunner.lives
					}		
					statusLayer.updateStatus(setToStatus);*/
			}
		}
    },
	
	
	collisionFireChik_childBegin:function (arbiter, space) {////debugger;
		Sound.playChildDie();
		var shapes = arbiter.getShapes();
        // shapes[0] is runner
		 var collis_pos = arbiter.body_a.p;//position of detection
        if(shapes[1].life==1){
		     cc.log('enemy die!')
		    this.shapesToRemove.push(shapes[1]);
			var statusLayer = this.getChildByTag(TagOfLayer.Status);
            statusLayer.addCoin(1);	  
			
						 this.animation_layer.sprite11 = new cc.Sprite("#exsplosion00.png");
						 var contentSize11 = this.animation_layer.sprite11.getContentSize();
						   
						this.animation_layer.sprite11.attr({
							x: contentSize11.width,
							y: contentSize11.height
						});
						this.animation_layer.sprite11.setPosition( cc.p(collis_pos.x, collis_pos.y));
						this.animation_layer.sprite11.runAction(//
							cc.sequence(
								//cc.scaleTo(.2, 10, 10),
								this.animation_layer.flyingAction11,
								cc.FadeOut.create(.2)
							)
						);
						
						this.animation_layer.addChild(this.animation_layer.sprite11, 0);
		} else {
		    shapes[1].life--;
			 
						/*var l_pParticle = cc.ParticleExplosion.create();
						l_pParticle.initWithTotalParticles(10);//count of particles
					    l_pParticle.setStartSize(2.0);// size of particles
						l_pParticle.setEndSize(20.0);// size of particles
						l_pParticle.setDuration(.2);//set run seconds of the emitter
						l_pParticle.setLife(.5);//life of each particle setter
						l_pParticle.setLifeVar(.5);//life variance of each particle setter                                      
						l_pParticle.setPosition(collis_pos);

						l_pParticle.setTexture(
						    animation_layer.particleSrc.getTexture()
						);

						l_pParticle.setAutoRemoveOnFinish(true);//set whether or not the node will be auto-removed when it has no particles left.By default it is false.

						animation_layer.addChild(l_pParticle,200);	*/
                        var blink  = new cc.Repeat(
							cc.sequence(
							     cc.FadeOut.create(.2),
								cc.FadeIn.create(.2)
							),2
						);
						
						this.gameLayer.getChildByTag(TagOfLayer.background).spriteSheetcharBig_plist.getChildByTag(shapes[1].hashid)?this.gameLayer.getChildByTag(TagOfLayer.background).spriteSheetcharBig_plist.getChildByTag(shapes[1].hashid).runAction(blink):1;
		}
		this.fireToRemove.push(shapes[0]);
        cc.audioEngine.playEffect(res.pickup_coin_mp3);
       
    },
	
	collisionIceCarBegin:function (arbiter, space) {////debugger;
		cc.log('IceCar!')
			//arbiter.handler.b
		Sound.playIceBroke();
		var collis_pos = arbiter.body_a.p;//position of detection
		var shapes = arbiter.getShapes();
						 this.fireToRemove.push(shapes[1]);
						 //////////////////////////////
						/*var l_pParticle = cc.ParticleExplosion.create();
						l_pParticle.initWithTotalParticles(10);//count of particles
					    l_pParticle.setStartSize(2.0);// size of particles
						l_pParticle.setEndSize(20.0);// size of particles
						l_pParticle.setDuration(.2);//set run seconds of the emitter
						l_pParticle.setLife(.5);//life of each particle setter
						l_pParticle.setLifeVar(.5);//life variance of each particle setter                                      
						l_pParticle.setPosition(collis_pos);

						l_pParticle.setTexture(
						    animation_layer.particleSrc.getTexture()
						);

						l_pParticle.setAutoRemoveOnFinish(true);//set whether or not the node will be auto-removed when it has no particles left.By default it is false.

						animation_layer.addChild(l_pParticle,200);	*/

        var shapes = arbiter.getShapes();
        // shapes[0] is runner
        this.shapesToRemove.push(shapes[0]);
		
        cc.audioEngine.playEffect(res.pickup_coin_mp3);

        var statusLayer = this.getChildByTag(TagOfLayer.Status);
        statusLayer.addCoin(1);
    },
	
		collisionRocketIceBegin:function (arbiter, space) {////debugger;
			 Sound.playIceBroke();
			 Sound.playRocketEnd();
			 cc.log('RocketIce!')
					//arbiter.handler.b
				var collis_pos = arbiter.body_a.p;//position of detection
				var shapes = arbiter.getShapes();
						 this.fireToRemove.push(shapes[1]);
						 //////////////////////////////
						/*var l_pParticle = cc.ParticleExplosion.create();
						l_pParticle.initWithTotalParticles(10);//count of particles
					    l_pParticle.setStartSize(2.0);// size of particles
						l_pParticle.setEndSize(20.0);// size of particles
						l_pParticle.setDuration(.2);//set run seconds of the emitter
						l_pParticle.setLife(.5);//life of each particle setter
						l_pParticle.setLifeVar(.5);//life variance of each particle setter                                      
						l_pParticle.setPosition(collis_pos);

						l_pParticle.setTexture(
						    animation_layer.particleSrc.getTexture()
						);

						l_pParticle.setAutoRemoveOnFinish(true);//set whether or not the node will be auto-removed when it has no particles left.By default it is false.

						animation_layer.addChild(l_pParticle,200);	*/

        var shapes = arbiter.getShapes();
        // shapes[0] is runner
        this.shapesToRemove.push(shapes[0]);
		this.rocketsToRemove.push(shapes[1]);
        //cc.audioEngine.playEffect(res.pickup_coin_mp3);

        var statusLayer = this.getChildByTag(TagOfLayer.Status);
        statusLayer.addCoin(1);
    },
	
	collisionFireRockBigBegin:function (arbiter, space) {//debugger;
			 cc.log('FireRock!')
					//arbiter.handler.b
					
			var collis_pos = arbiter.body_a.p;//position of detection
			var shapes = arbiter.getShapes();
						 this.fireToRemove.push(shapes[1]);
						 //////////////////////////////
						/* var l_pParticle = cc.ParticleExplosion.create();
						l_pParticle.initWithTotalParticles(10);//count of particles
					    l_pParticle.setStartSize(2.0);// size of particles
						l_pParticle.setEndSize(20.0);// size of particles
						l_pParticle.setDuration(.2);//set run seconds of the emitter
						l_pParticle.setLife(.5);//life of each particle setter
						l_pParticle.setLifeVar(.5);//life variance of each particle setter                                      
						l_pParticle.setPosition(collis_pos);

						l_pParticle.setTexture(
						    animation_layer.particleSrc.getTexture()
						);

						l_pParticle.setAutoRemoveOnFinish(true);//set whether or not the node will be auto-removed when it has no particles left.By default it is false.

						animation_layer.addChild(l_pParticle,200);	*/
						 
	////////////////////////////////
	
	
	var sprite11 = new cc.Sprite("#explosionMinor.png");
						 var contentSize11 = sprite11.getContentSize();
						   
						 sprite11.attr({
							x: contentSize11.width,
							y: contentSize11.height
						});
						
						var collis_pos = arbiter.body_a.p;//position of detection
						 sprite11.setPosition( cc.p(collis_pos.x, collis_pos.y));
						 sprite11.setScale(0);
						 sprite11.runAction(//
							cc.Spawn.create(
								//cc.scaleTo(.2, 10, 10),
								cc.ScaleTo.create(.35,1),
								cc.FadeOut.create(.35),
								cc.callFunc(
									function(){
										this.runAction(
											cc.sequence(
												cc.delayTime(0.35),
												cc.callFunc(
													function(){
														this.removeFromParent();
														
														////debugger;
													},
												this)
											)
										)
										
									}, sprite11)
							)
						);
						
						/*this.helloLabel.runAction(
							cc.Spawn.create(
								cc.MoveBy.create(2.5, cc.p(0, size.height - 40)),
								cc.TintTo.create(2.5,255,125,0),
								cc.CallFunc.create(function(){this.circle.runAction(cc.MoveTo.create(1.5,cc.p(size.width/2,size.height/2)));},this)
							)
						);*/
						
						sprite11.setRotation(360*Math.random())
						this.animation_layer.addChild(sprite11, 0);
						
						
						
        var shapes = arbiter.getShapes();
        // shapes[0] is runner
        this.shapesToRemove.push(shapes[1]);

        //cc.audioEngine.playEffect(res.pickup_coin_mp3);

        var statusLayer = this.getChildByTag(TagOfLayer.Status);
        statusLayer.addCoin(1);
		
		Sound.playFireRock();
    },
	
	collisionFireCharBigBegin:function (arbiter, space) {//debugger;
		
		var shapes = arbiter.getShapes();
        // shapes[0] is runner
		 var collis_pos = arbiter.body_a.p;//position of detection
        if(shapes[1].life==1){
		     cc.log('enemy die!');
			 switch (arbiter.a.collision_type) {
				case SpriteTag.charBig:
				    Sound.playCharBigDie();
					break;
				case SpriteTag.chick:
				    Sound.playChickDie();
					break;
				case SpriteTag.pink:
				    Sound.playPinkDie();
					break;
				case SpriteTag.eagle:
				    Sound.playEagleDie();
					break;
				case SpriteTag.white:
				    Sound.playWhiteDie();
					break;
				case SpriteTag.fire:
					if(arbiter.b.collision_type==SpriteTag.zomby)Sound.playZombyDie();
					break;
				case SpriteTag.hat:
				    Sound.playHatHit();
					break;
			}		
 
			 
			 
		    this.shapesToRemove.push(shapes[1]);
			var statusLayer = this.getChildByTag(TagOfLayer.Status);
            statusLayer.addCoin(1);	  
						 //////////////////////////////
						 this.animation_layer.sprite11 = new cc.Sprite("#exsplosion00.png");
						 var contentSize11 = this.animation_layer.sprite11.getContentSize();
						   
						this.animation_layer.sprite11.attr({
							x: contentSize11.width,
							y: contentSize11.height
						});
						this.animation_layer.sprite11.setPosition( cc.p(collis_pos.x, collis_pos.y));
						this.animation_layer.sprite11.runAction(//
							cc.sequence(
								//cc.scaleTo(.2, 10, 10),
								this.animation_layer.flyingAction11,
								cc.FadeOut.create(.2)
							)
						);
						
						this.animation_layer.addChild(this.animation_layer.sprite11, 0);
		} else {
		    shapes[1].life--;
			switch (arbiter.a.collision_type) {
				case SpriteTag.charBig:
				    Sound.playCharBigHit();
					break;
				case SpriteTag.chick:
				    Sound.playChickHit();
					break;
				case SpriteTag.pink:
				    Sound.playPinkHit();
					break;
				case SpriteTag.eagle:
				    Sound.playEagleHit();
					break;
				case SpriteTag.hat:
				    Sound.playHatDie();
					break;
				case SpriteTag.white:
				    Sound.playWhiteHit();
					break;
				case SpriteTag.fire:
					if(arbiter.b.collision_type==SpriteTag.zomby)Sound.playZombyHit();
					break;
			}		
			/*var l_pParticle = cc.ParticleExplosion.create();
						l_pParticle.initWithTotalParticles(10);//count of particles
					    l_pParticle.setStartSize(2.0);// size of particles
						l_pParticle.setEndSize(20.0);// size of particles
						l_pParticle.setDuration(.2);//set run seconds of the emitter
						l_pParticle.setLife(.5);//life of each particle setter
						l_pParticle.setLifeVar(.5);//life variance of each particle setter                                      
						l_pParticle.setPosition(collis_pos);

						l_pParticle.setTexture(
						    animation_layer.particleSrc.getTexture()
						);

						l_pParticle.setAutoRemoveOnFinish(true);//set whether or not the node will be auto-removed when it has no particles left.By default it is false.

						animation_layer.addChild(l_pParticle,200);	*/
                        var blink  = new cc.Repeat(
							cc.sequence(
							     cc.FadeOut.create(.2),
								cc.FadeIn.create(.2)
							),2
						);
						this.gameLayer.getChildByTag(TagOfLayer.background).spriteSheetcharBig_plist.getChildByTag(shapes[1].hashid).runAction(blink);;
		}
		this.fireToRemove.push(shapes[0]);
	
        //cc.audioEngine.playEffect(res.pickup_coin_mp3);
    },
	
	collisionRocketRockBigBegin:function (arbiter, space) {//debugger;
		cc.log('RocketRock!')
		//arbiter.handler.b

		switch (arbiter.a.collision_type) {
				case SpriteTag.charBig:
				    Sound.playCharBigHit();
					break;
				case SpriteTag.chick:
				    Sound.playChickHit();
					break;
				case SpriteTag.pink:
				    Sound.playPinkHit();
					break;
				case SpriteTag.rocket:
				    Sound.playRocketEnd();
					break;
				case SpriteTag.bombers_bomb:
				    Sound.playBomberBombFelt();
					break;
			}		
		
		
		Sound.playRocketEnd();
		var collis_pos = arbiter.body_a.p;//position of detection
		var shapes = arbiter.getShapes();
						 this.rocketsToRemove.push(shapes[1]);
						 //////////////////////////////
						/*var l_pParticle = cc.ParticleExplosion.create();
						l_pParticle.initWithTotalParticles(10);//count of particles
					    l_pParticle.setStartSize(2.0);// size of particles
						l_pParticle.setEndSize(20.0);// size of particles
						l_pParticle.setDuration(.2);//set run seconds of the emitter
						l_pParticle.setLife(.5);//life of each particle setter
						l_pParticle.setLifeVar(.5);//life variance of each particle setter                                      
						l_pParticle.setPosition(collis_pos);

						l_pParticle.setTexture(
						    animation_layer.particleSrc.getTexture()
						);

						l_pParticle.setAutoRemoveOnFinish(true);//set whether or not the node will be auto-removed when it has no particles left.By default it is false.

						animation_layer.addChild(l_pParticle,200);*/	
	////////////////////////////////
				 var sprite11 = new cc.Sprite("#exsplosionF00.png");
						 var contentSize11 = sprite11.getContentSize();
						   
						 sprite11.attr({
							x: contentSize11.width,
							y: contentSize11.height
						});
						
						var collis_pos = arbiter.body_a.p;//position of detection
						 sprite11.setPosition( cc.p(collis_pos.x, collis_pos.y));
						 sprite11.runAction(//
							cc.Spawn.create(
								//cc.scaleTo(.2, 10, 10),
								this.animation_layer.fireAction,
								cc.FadeOut.create(.35),
								cc.callFunc(
									function(){
										this.runAction(
											cc.sequence(
												cc.delayTime(0.35),
												cc.callFunc(
													function(){
														this.removeFromParent();
														////debugger;
													},
												this)
											)
										)
										
									}, sprite11)
							)
						);
						
						/*this.helloLabel.runAction(
							cc.Spawn.create(
								cc.MoveBy.create(2.5, cc.p(0, size.height - 40)),
								cc.TintTo.create(2.5,255,125,0),
								cc.CallFunc.create(function(){this.circle.runAction(cc.MoveTo.create(1.5,cc.p(size.width/2,size.height/2)));},this)
							)
						);*/
						
						sprite11.setRotation(360*Math.random())
						this.animation_layer.addChild(sprite11, 0);
						
        var shapes = arbiter.getShapes();
        // shapes[0] is runner
        this.shapesToRemove.push(shapes[1]);

        //cc.audioEngine.playEffect(res.pickup_coin_mp3);

        var statusLayer = this.getChildByTag(TagOfLayer.Status);
        statusLayer.addCoin(1);
    },
	
	collisionRunnerZombyBegin:function (arbiter, space) {////debugger;
		 if(this.gameLayer.getChildByTag(TagOfLayer.Animation).spriteSheetChar.getChildByTag(SpriteTag.runner).getBody().shapeList[0].hashid ==
			   arbiter.getA().getBody().shapeList[0].hashid){
		 cc.log('player ZOMBY!')
		 Sound.playZombyBite();
				//arbiter.handler.b
				var animFrames = [];
		 for (var i = 3; i < 10; i++) {
            var str = "zomby0" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
		var animFramesTmp = animFrames.slice();
		var animFramesR = animFramesTmp.concat(animFrames.reverse());
		var shapes = arbiter.getShapes();
	    var animation = new cc.Animation(animFramesR, 0.1);
		 var zombyAction  = new cc.Repeat(
							cc.sequence(
							    new cc.Animate(animation),
								cc.delayTime(.5),
								cc.FadeOut.create(.2)
							),1
						);
        
			var collis_pos = arbiter.body_a.p;//position of detection
								 
						this.gameLayer.getChildByTag(TagOfLayer.background).spriteSheetcharBig_plist.getChildByTag(shapes[1].hashid).stopAllActions();
						this.gameLayer.getChildByTag(TagOfLayer.background).spriteSheetcharBig_plist.getChildByTag(shapes[1].hashid).runAction(//
							zombyAction
						);
						
						//animation_layer.addChild(animation_layer.sprite11, 0);
                        var blink  = new cc.Repeat(
							cc.sequence(
							    cc.FadeOut.create(.2),
								cc.FadeIn.create(.2)
							),5
						);
						if(this.curRunner_flag == 777 &&this.curRunner_undied == 666){
						    this.curRunner_flag = 666;
						    this.curRunner.lives--;
							this.curRunner.rockets=5;
							this.runnerSprite.runAction(
								 cc.sequence(
									blink,
									cc.callFunc(function(){////debugger
									   //curRunner_undied=undefined;
									  this.curRunner_flag = 777
									},this)
								)
							);
						 
						 } else {
 						   
						  this.runnerSprite.runAction(
								 cc.sequence(
									blink
								)
							);
						 }
										
			if(this.curRunner.lives==-1){
				////////////////////////////////
					cc.log("==game over");

					//stop bg music
					cc.audioEngine.stopMusic();

					cc.director.pause();
					this.gameLayer.getChildByTag(TagOfLayer.background).addChild(new GameOverLayer());
			}
		}
    },
	
		collisionRunnerRockSharp:function (arbiter, space) {////debugger;
		 if(this.gameLayer.getChildByTag(TagOfLayer.Animation).spriteSheetChar.getChildByTag(SpriteTag.runner).getBody().shapeList[0].hashid ==
			   arbiter.getA().getBody().shapeList[0].hashid){
			 cc.log('player die!');
			 Sound.playPlayerHit();
					//arbiter.handler.b
			var collis_pos = arbiter.body_a.p;//position of detection
						

				
						 //////////////////////////////
						
						
					if(arbiter.body_a.p.x<arbiter.body_b.p.x){
					this.runnerSprite.setPosition(cc.p(this.runnerSprite.getPositionX()-10,this.runnerSprite.getPositionY()));
					}
					if(arbiter.body_a.p.x>arbiter.body_b.p.x){
					this.runnerSprite.setPosition(cc.p(this.runnerSprite.getPositionX()+10,this.runnerSprite.getPositionY()));
					}
					if(arbiter.body_a.p.y<arbiter.body_b.p.y){
					this.runnerSprite.setPosition(cc.p(this.runnerSprite.getPositionX()+10,this.runnerSprite.getPositionY()));
					}
					if(arbiter.body_a.p.y>arbiter.body_b.p.y){
					this.runnerSprite.setPosition(cc.p(this.runnerSprite.getPositionX()-10,this.runnerSprite.getPositionY()));
					}
						
                        var blink  = new cc.Repeat(
							cc.sequence(
							     cc.FadeOut.create(.2),
								cc.FadeIn.create(.2)
							),5
						);
						blink.setTag('blink');
						////debugger
						 if(this.curRunner_flag == 777 &&this.curRunner_undied == 666){
						   this.curRunner_flag = 666;
							this.curRunner.lives--;
							this.curRunner.rockets=5;
							this.runnerSprite.runAction(
								 cc.sequence(
									blink,
									cc.callFunc(function(){////debugger
									   //curRunner_undied=undefined;
									  this.curRunner_flag = 777
									},this)
								)
							);
						 
						 } else {
 						   
						  this.runnerSprite.runAction(
								 cc.sequence(
									blink
								)
							);
						 }
						
						
			if(this.curRunner.lives==-1){
				////////////////////////////////
					 cc.log("==game over");
					Sound.playPlayerDie();
					//stop bg music
					cc.audioEngine.stopMusic();

					cc.director.pause();
					this.addChild(new GameOverLayer());
			}
		}
    },
	
	collisionRunnerCharBigBegin:function (arbiter, space) {//debugger;
		 if(this.gameLayer.getChildByTag(TagOfLayer.Animation).spriteSheetChar.getChildByTag(SpriteTag.runner).getBody().shapeList[0].hashid ==
			   arbiter.getA().getBody().shapeList[0].hashid){
		 cc.log('player hit!')
				//arbiter.handler.b
			var collis_pos = arbiter.body_a.p;//position of detection
					////debugger			 
						 //////////////////////////////
						  //var animation_layer = this.gameLayer.getChildByTag(TagOfLayer.Animation);
						  //this.curRunner = animation_layer.spriteSheetChar.getChildByTag(SpriteTag.runner);
					
							
							this.animation_layer.sprite11 = new cc.Sprite("#exsplosion00.png");
							var contentSize11 = this.animation_layer.sprite11.getContentSize();
							   
							this.animation_layer.sprite11.attr({
								x: contentSize11.width,
								y: contentSize11.height
							});
							this.animation_layer.sprite11.setPosition( cc.p(collis_pos.x, collis_pos.y));
							this.animation_layer.sprite11.runAction(//
								cc.sequence(
									//cc.scaleTo(.2, 10, 10),
									this.animation_layer.flyingAction11,
									cc.FadeOut.create(.2)
								)
							);	
							var shapes = arbiter.getShapes();
							// shapes[0] is runner
							this.shapesToRemove.push(shapes[1]);
							this.animation_layer.addChild(this.animation_layer.sprite11, 0);
						
						
						
						
                        var blink  = new cc.Repeat(
							cc.sequence(
							     cc.FadeOut.create(.2),
								cc.FadeIn.create(.2)
							),5
						);
						blink.setTag('blink');
						////debugger
						 if(this.curRunner_flag == 777 &&this.curRunner_undied == 666){
						   this.curRunner_flag = 666;
							this.curRunner.lives--;
							this.curRunner.rockets=5;
							this.runnerSprite.runAction(
								 cc.sequence(
									blink,
									cc.callFunc(function(){////debugger
									   //curRunner_undied=undefined;
									  this.curRunner_flag = 777
									},this)
								)
							);
						 
						 } else {
 						   
						  this.runnerSprite.runAction(
								 cc.sequence(
									blink
								)
							);
						 }
						
						
			if(this.curRunner.lives==-1){
				////////////////////////////////
					 cc.log("==game over");
					Sound.playPlayerDie();
					//stop bg music
					cc.audioEngine.stopMusic();

					cc.director.pause();
					this.addChild(new GameOverLayer());
			} else {
				Sound.playPlayerHit();
			}
		}
    },

    collisionCoinBegin:function (arbiter, space) {
	
	if(this.gameLayer.getChildByTag(TagOfLayer.Animation).spriteSheetChar.getChildByTag(SpriteTag.runner).getBody().shapeList[0].hashid ==
	   arbiter.getA().getBody().shapeList[0].hashid){
	   ////debugger
				var shapes = arbiter.getShapes();
				
				this.gameLayer.getChildByTag(TagOfLayer.background).spriteSheetcharBig_plist.getChildByTag(shapes[1].hashid)
				
				// shapes[0] is runner
				this.shapesToRemove.push(shapes[1]);

				Sound.playCristallPick();

				var statusLayer = this.getChildByTag(TagOfLayer.Status);
				statusLayer.addCoin(1);
		}
    },
	
	collisionRocketCharBigBegin:function (arbiter, space) {////debugger;
      
		var shapes = arbiter.getShapes();
        // shapes[0] is runner
		 var collis_pos = arbiter.body_a.p;//position of detection
       
		     cc.log('enemy die!')
		    this.shapesToRemove.push(shapes[1]);
			var statusLayer = this.getChildByTag(TagOfLayer.Status);
            statusLayer.addCoin(1);	  

						 this.animation_layer.sprite11 = new cc.Sprite("#exsplosion00.png");
						 var contentSize11 = this.animation_layer.sprite11.getContentSize();
						   
						this.animation_layer.sprite11.attr({
							x: contentSize11.width,
							y: contentSize11.height
						});
						this.animation_layer.sprite11.setPosition( cc.p(collis_pos.x, collis_pos.y));
						this.animation_layer.sprite11.runAction(//
							cc.sequence(
								//cc.scaleTo(.2, 10, 10),
								this.animation_layer.flyingAction11,
								cc.FadeOut.create(.2)
							)
						);
						
						this.animation_layer.addChild(this.animation_layer.sprite11, 0);
				  
		this.rocketsToRemove.push(shapes[0]);	
        cc.audioEngine.playEffect(res.pickup_coin_mp3);       
    },
	
    collisionRockBegin:function (arbiter, space) {
        cc.log("==game over");

        //stop bg music
        cc.audioEngine.stopMusic();

        cc.director.pause();
        this.addChild(new GameOverLayer());
    },

    onEnter:function () {
        this._super();
        this.initPhysics();

        this.gameLayer = new cc.Layer();

        //add three layer in the right order
		
		
		var backLayer = new BackLayer([res.background_map00_tmx],1,[1]);
		//debugger
		this.addChild(backLayer, 0, TagOfLayer.BackLayer);
		
		var backgroundLayer = new BackgroundLayer(this.space, this.worldNum, this.levelNum)
        this.gameLayer.addChild(backgroundLayer, 1, TagOfLayer.background);
		backgroundLayer.initStart();
		
        this.gameLayer.addChild(new AnimationLayer(this.space), 2, TagOfLayer.Animation);
		
		var frontLayer = new FrontLayer([res.before_front_map00_tmx,res.front_map00_tmx],5,[1,2]);
		this.addChild(frontLayer, 10, TagOfLayer.FrontLayer);
		
        this.addChild(this.gameLayer);
		var stLayer = new StatusLayer();
		stLayer.init();
        this.addChild(stLayer, 0, TagOfLayer.Status);

		
		this.animation_layer = this.gameLayer.getChildByTag(TagOfLayer.Animation);
		this.runnerSprite = this.animation_layer.spriteSheetChar.getChildByTag(SpriteTag.runner);
		
        //add background music
        //cc.audioEngine.playMusic(res.background_ogg, true);

        this.scheduleUpdate();

    },
    update:function (dt) {
	//debugger
		//GameController.getInstance().profile = this.curRunner;
       if(this.animation_layer){
			var eyeX = this.animation_layer.getEyeX();
			/*if(eyeX>100){
				cc.log("==win game");
				//stop bg music
				//cc.director.pushScene(new WinnerScene());
				GameController.getInstance().createWinnerScene();
			}*/
	// chipmunk step
			this.space.step(dt);
	////debugger;
			// Simulation cpSpaceAddPostStepCallback
			for(var i = 0; i < this.shapesToRemove.length; i++) {
				var shape = this.shapesToRemove[i];
				this.gameLayer.getChildByTag(TagOfLayer.background).removeObjectByShape(shape);
			}
			this.shapesToRemove = [];
			
			 for(var j = 0; j < this.rocketsToRemove.length; j++) {
				
				this.animation_layer.removeRocketsByShape( this.rocketsToRemove[j]);
			}
			this.rocketsToRemove = [];
			for(var k = 0; k < this.fireToRemove.length; k++) {
				
				this.animation_layer.removeFireByShape( this.fireToRemove[k]);
			}
			this.fireToRemove = [];
		
			if(this.animation_layer.body.vx<0){this.animation_layer.body.vx=0}
			this.animation_layer.body.rot= {x: 0,y:0};
			this.animation_layer.body.w= 0;
			
			

			this.gameLayer.setPosition(cc.p(-eyeX,0));
		}
	}
});