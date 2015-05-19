// 0(default), 1(Canvas only), 2(WebGL only)

var MenuLayer = cc.LayerGradient.extend({
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
	
    init:function(){//debugger;
	
	
	this.waitSwitcher = false;
	//this.waitSwitcher2 = false;
	
        //call super class's super function
        this._super();
        //setColor to layer
		var color1 = cc.color(111,111,111)
		var color2 = cc.color(0,0,0)
		this.setColor(color1,color2);
        //2. get the screen size of your game canvas
        var winsize = cc.director.getWinSize();

        //3. calculate the center point
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

        //4. create a background image and set it's position at the center of the screen
        var spritebg = new cc.Sprite(res.helloBG_png);
        spritebg.setPosition(centerpos);
		spritebg.setTag("spritebg");
        //this.addChild(spritebg);
		
		var spritebg2 = new cc.Sprite(res.helloBG_png);
        spritebg2.setPosition(cc.p(winsize.width / 4, winsize.height / 4));
		spritebg2.setTag("spritebg");
        //this.addChild(spritebg);
		
		
		var spritebg3 = new cc.Sprite(res.helloBG_png);
        spritebg3.setPosition(cc.p(winsize.width / 1.5, winsize.height / 1.5));
		spritebg3.setTag("spritebg");
        //this.addChild(spritebg);
		debugger
		
		var spritebg1 = new cc.Sprite(res.helloBG_png);
        spritebg1.setPosition(cc.p(winsize.width / 2, winsize.height / 2));
		spritebg1.setTag("spritebg1");
		spritebg1.setScale(2);
		spritebg1.setOpacity(100);
        //this.addChild(spritebg1);
		//Sound.playMenuBgMusic();
		var stencil = new cc.Node();
		stencil.addChild(spritebg2);
		stencil.addChild(spritebg3);
		stencil.addChild(spritebg);
		var clip = new cc.ClippingNode(stencil)
		clip.addChild(spritebg1);
		
		this.addChild(clip);
 /*var _listener1 = cc.EventListener.create({
        event: cc.EventListener.CUSTOM,
        eventName: "game_custom_event1",
        callback: function(event){
            cc.log("Custom event 1 received, " + event.getUserData());
        }
    });    
    cc.eventManager.addListener(_listener1, 1);
	
	var event = new cc.EventCustom("game_custom_event1");
    event.setUserData('@@@@@@@@@2');
    cc.eventManager.dispatchEvent(event); 

*/




        
        cc.MenuItemFont.setFontSize(60);
		var start_n_png = new cc.Sprite(res.start_n_png);
		var start_s_png = new cc.Sprite(res.start_s_png);
        //6.create a menu and assign onPlay event callback to it
        var menuItemPlay= new cc.MenuItemSprite(
        	start_n_png, // normal state image
        	start_s_png, //select state image
            this.onPlay, this);
        var menu = new cc.Menu(menuItemPlay);  //7. create the menu
        menu.setPosition(cc.p(winsize.width / 2, winsize.height / 1.8));
        this.addChild(menu);
		
		this.drawNode = new cc.DrawNode();
		this.addChild(this.drawNode);
		 
		cc.eventManager.addListener(
			{
				event: cc.EventListener.MOUSE, 
				onMouseMove: function (event) { 
					var p = event.getLocation();
					target = event.getCurrentTarget();  
					var s = target.getContentSize();
					var locationInNode = target.convertToNodeSpace(event.getLocation());  
					var delta = event.getDelta();

					//this.drawNode.drawDot(p, 5, cc.Color(255, 255, 255, 255))
					
					var rect = cc.rect(0, 0, s.width, s.height);
					//if (cc.rectContainsPoint(rect, locationInNode)) {   
						if(this.waitSwitcher) {
								  
								target.x+=delta.x;
								target.y+=delta.y;
								//this.waitSwitcher = true;
								cc.log(locationInNode);
						}
					//}
					//return false;
				}.bind(this), 
				onMouseUp: function(event){
					if(this.waitSwitcher){
						this.target = event.getCurrentTarget();
						this.drawNode.clear();
						//debugger
						this.target = event.getCurrentTarget();
						if (this.target == spritebg1) {
							spritebg1.setLocalZOrder(0);
						} else if (this.target == spritebg) {
							spritebg.setLocalZOrder(100);
						}
					}
					this.waitSwitcher = false;
					this.target =null;
				}.bind(this),
				onMouseDown: function(event) {
					//debugger
					this.target = event.getCurrentTarget();  
					var locationInNode = this.target.convertToNodeSpace(event.getLocation());    
					var s = this.target.getContentSize();
					

					var rect = cc.rect(0, 0, s.width, s.height);
					if (cc.rectContainsPoint(rect, locationInNode)) {       
						event.stopPropagation();
						//debugger
						this.target.initWithTexture(
							cc.textureCache.getTextureForKey(res.restart_n_png),
							cc.rect(0, 0, cc.textureCache.getTextureForKey(res.restart_n_png).getContentSize().width, 
								cc.textureCache.getTextureForKey(res.restart_n_png).getContentSize().height
							)
						)
						this.waitSwitcher = true;
						//return true;
					}
				}
			}, spritebg);

			
			cc.eventManager.addListener(
			{
				event: cc.EventListener.MOUSE, 
				onMouseMove: function (event) { 
					var p = event.getLocation();
					var target = event.getCurrentTarget();
					var delta = event.getDelta(); 
					if(this.waitSwitcher) {
							target.x+=delta.x;
								target.y+=delta.y;
								//this.waitSwitcher = true;

						
						}
					//return false;
				}, 
				onMouseUp: function(event){
					if(this.waitSwitcher){
						this.target = event.getCurrentTarget();
						
						if (this.target == spritebg1) {
							spritebg1.setLocalZOrder(100);
						} else if (this.target == spritebg) {
							spritebg.setLocalZOrder(0);
						}
					}
					this.waitSwitcher = false;
					this.target =null;
				},
				onMouseDown: function(event) {
					//debugger
					

					this.target = event.getCurrentTarget();  
					var locationInNode = this.target.convertToNodeSpace(event.getLocation());    
					var s = this.target.getContentSize();
					cc.log(locationInNode);
					cc.log("--------");
					
					var rect = cc.rect(0, 0, s.width, s.height);
					
					cc.log(rect);
					if (cc.rectContainsPoint(rect, locationInNode)) {       
						this.waitSwitcher = true;
						event.stopPropagation();
						//return true;
					}
				}
			},  spritebg1);
			

		
		
											var blink  = new cc.RepeatForever(
														cc.sequence(
															new cc.EaseBounceOut(new cc.ScaleTo(1, 1.2, 1)),//EaseExponentialOut//cc.FadeOut.create(.2),
															new cc.EaseBounceOut(new cc.ScaleTo(1, 1,1.2))//EaseExponentialOut//cc.FadeIn.create(.2)
														)//,5
													);

													   menuItemPlay.runAction(
															 cc.sequence(
																blink
															)
														);
		
		
		 //add background music
        //Sound.playGameBgMusic();
		
		//this.showWindEffect();
		/*
		var shaky = cc.shaky3D(5, cc.size(15, 10), 40, false);
	    var waves = cc.waves(5, cc.size(15, 10), 5, 20, true, false);
		var lens = cc.lens3D(0.0, cc.size(15, 10), cc.p(cc.winSize.width / 2, cc.winSize.height / 2), 240);
        var shuffle = cc.shuffleTiles(0, cc.size(15, 10), 3);
		//cc.flipX3D(duration);
		//cc.flipY3D(duration )
		//cc.ripple3D(duration, gridSize, position, radius, waves, amplitude)//cc.ripple3D( duration, cc.size(32,24), cc.p(winSize.width/2, winSize.height/2), 240, 4, 160);
		//cc.liquid(duration, gridSize, waves, amplitude)//cc.liquid( duration, cc.size(16,12), 4, 20);
		//cc.twirl(duration, gridSize, position, twirls, amplitude)//cc.twirl( duration, cc.size(12,8), cc.p(winSize.width/2, winSize.height/2), 1, 2.5);
		//cc.shakyTiles3D(duration, gridSize, range, shakeZ)//cc.shakyTiles3D( duration, cc.size(16,12), 5, false)
		//cc.shatteredTiles3D(duration, gridSize, range, shatterZ)//cc.shatteredTiles3D( duration, cc.size(16,12), 5, false);
		//cc.shuffleTiles(duration, gridSize, seed)//cc.shuffleTiles( duration, cc.size(16,12), 25);
		//cc.fadeOutTRTiles( duration, cc.size(16,12));//right/top
		//cc.fadeOutBLTiles( duration, cc.size(16,12));//bottom/left
		//cc.fadeOutUpTiles( duration, cc.size(16,12));//line
		//cc.fadeOutDownTiles( duration, cc.size(16,12));//line
		//cc.turnOffTiles(duration, gridSize, seed)//cc.turnOffTiles( duration, cc.size(48,32), 25);
		//cc.wavesTiles3D(duration, gridSize, waves, amplitude)//cc.wavesTiles3D( duration, cc.size(16,12), 4, 120);
		//cc.jumpTiles3D(duration, gridSize, jumps, amplitude)//cc.jumpTiles3D(duration, cc.size(16,12), 2, 30);
		//cc.splitRows(duration, rows)//cc.splitRows(duration, 9);
		//cc.splitCols(duration, cols)//cc.splitCols(duration, 9);
		//cc.pageTurn3D(duration, gridSize)//cc.pageTurn3D(duration, cc.size(15,10))
		
		//target.runAction(cc.sequence(orbit, orbit_back).repeatForever());
		//target.runAction(cc.sequence(lens, delay, reuse, waves));

/*
var path = [
    cc.p(centerPos.x - 130, centerPos.y - 130),
    cc.p(centerPos.x - 130, centerPos.y + 130),
    cc.p(centerPos.x + 130, centerPos.y + 130),
    cc.p(centerPos.x + 130, centerPos.y - 130),
    cc.p(centerPos.x - 130, centerPos.y - 130)
];	

		//debugger
		
		
		
		
		var winSize = cc.director.getWinSize();
        // the root object just rotates around
        this._root = new cc.Sprite(res.start_n_png);
        this.addChild(this._root, 1);
        this._root.x = winSize.width / 2;
        this._root.y = winSize.height / 2;

        // the target object is offset from root, and the streak is moved to follow it
        this._target = new cc.Sprite(res.start_n_png);
        this._root.addChild(this._target);
        this._target.x = winSize.width / 4;
        this._target.y = 0;

        // create the streak object and add it to the scene
        this._streak = new cc.MotionStreak(2, 1, 300, cc.color.GREEN, res.start_n_png);
        this.addChild(this._streak);
        // schedule an update on each frame so we can syncronize the streak with the target
        this.schedule(this.onUpdate);
		//this.schedule(this.showWindEffect);
		//this.schedule(this.stopWindEffect);
        var a1 = cc.rotateBy(1, 60);

        var action1 = a1.repeatForever();
        var motion = cc.moveBy(2, cc.p(120, 110));
        this._root.runAction(cc.sequence(motion, motion.reverse(), action1, action1.reverse()).repeatForever());//cc.delayTime(1),
        //this._root.runAction(action1);

        var colorAction = cc.sequence(
            cc.tintTo(0.2, 255, 0, 0),
            cc.tintTo(0.2, 0, 255, 0),
            cc.tintTo(0.2, 0, 0, 255),
            cc.tintTo(0.2, 0, 255, 255),
            cc.tintTo(0.2, 255, 255, 0),
            cc.tintTo(0.2, 255, 0, 255),
            cc.tintTo(0.2, 255, 255, 255)
        ).repeatForever();

        this._streak.runAction(colorAction);
		*/
/////////////////////////////////////////
		/*var winSize = cc.director.getWinSize();
		var to1 = cc.progressFromTo(5, 0, 100);

		var left = new cc.ProgressTimer(new cc.Sprite(res.start_n_png));
		left.type = cc.ProgressTimer.TYPE_BAR;//cc.ProgressTimer.TYPE_RADIAL;
		left.barChangeRate = cc.p(0, 1);//-vertical			//cc.p(1, 0)-horizontal			//cc.p(1, 1);- from right bottom
		left.midPoint = cc.p(1, 1);//cc.p(0, 0)-from left to right			//cc.p(1, 1)-top to bottom 		//cc.p(0.5, 0.5)-center
		this.addChild(left);
		left.x = 200;
		left.y = winSize.height / 2;
		left.runAction(to1.repeatForever());
		
		
/////////////////////////////////////////

this.blocks_scaled = new cc.Scale9Sprite(res.start_n_png);
        
        this.blocks_scaled.x = 150;
        this.blocks_scaled.y = 150;

        this.blocks_scaled.width = 80 * 4;
        this.blocks_scaled.height = 80 * 2;
       
        this.addChild(this.blocks_scaled);

		
/////////////////////////////////////////

var rot = cc.rotateBy(10, 360);
var seq = rot.repeatForever();

var rot_back = rot.reverse();
var rot_back_fe = rot_back.repeatForever();

cc.spriteFrameCache.addSpriteFrames(res.charBig_plist); 

var l1 = new cc.Sprite("#dragon00.png");
l1.x = winSize.width / 2;
l1.y = winSize.height / 2;
l1.runAction(seq.clone());
this.addChild(l1);
var l1W = l1.width, l1H = l1.height;

var l2a = new cc.Sprite("#robo00.png");
l2a.x = -50 + l1W / 2;
l2a.y = 0 + l1H / 2;
l2a.runAction(rot_back_fe.clone());
l1.addChild(l2a);
var l2aW = l2a.width, l2aH = l2a.height;

var l2b = new cc.Sprite("#green00.png");
l2b.x = +50 + l1W / 2;
l2b.y = 0 + l1H / 2;
l2b.runAction(rot_back_fe.clone());
l1.addChild(l2b);
var l2bW = l2b.width, l2bH = l2b.height;


////////////////////////////////////////////

 this.mgr = new cc.SpriteBatchNode(res.start_n_png, 9);
        this.addChild(this.mgr);
        this.sp1 = new cc.Sprite(res.start_n_png);
        this.sp2 = new cc.Sprite(res.start_n_png);
        this.sp3 = new cc.Sprite(res.start_n_png);
        this.sp4 = new cc.Sprite(res.start_n_png);
        this.sp5 = new cc.Sprite(res.start_n_png);
        this.sp6 = new cc.Sprite(res.start_n_png);
        this.sp7 = new cc.Sprite(res.start_n_png);
        this.sp8 = new cc.Sprite(res.start_n_png);
        this.sp9 = new cc.Sprite(res.start_n_png);

        this.mgr.addChild(this.sp1, 9);
        this.mgr.addChild(this.sp2, 8);
        this.mgr.addChild(this.sp3, 7);
        this.mgr.addChild(this.sp4, 6);
        this.mgr.addChild(this.sp5, 5);
        this.mgr.addChild(this.sp6, 4);
        this.mgr.addChild(this.sp7, 3);
        this.mgr.addChild(this.sp8, 2);
        this.mgr.addChild(this.sp9, 1);

        this.sp1.vertexZ = 400;
        this.sp2.vertexZ = 300;
        this.sp3.vertexZ = 200;
        this.sp4.vertexZ = 100;
        this.sp5.vertexZ = 0;
        this.sp6.vertexZ = -100;
        this.sp7.vertexZ = -200;
        this.sp8.vertexZ = -300;
        this.sp9.vertexZ = -400;

        this.sp9.scale = 2;
        this.sp9.color = cc.color.YELLOW;

/////////////////////////////////////////
		 
        // create the streak object and add it to the scene
        this._streak = new cc.MotionStreak(2, 5, 64, cc.color.WHITE, res.start_n_png);//(fade, minSeg, stroke, color, texture)
        this.addChild(this._streak);
        this._streak.x = winSize.width / 2;
        this._streak.y = winSize.height / 2;
		cc.eventManager.addListener({
		event: cc.EventListener.MOUSE,
				onMouseMove: function(event){
           
               
                
                var touchLocation =  event.getLocation();
				var location = event.getLocation();
                var streak = event.getCurrentTarget()._streak;
                streak.x = touchLocation.x;
                streak.y = touchLocation.y;
				
				
				
				/////////////////////////////
			
        

            this.sp1.x = location.x;
            this.sp1.y = location.y;
            this.sp2.x = location.x;
            this.sp2.y = location.y;
            this.sp3.x = location.x;
            this.sp3.y = location.y;
            this.sp4.x = location.x;
            this.sp4.y = location.y;
            this.sp5.x = location.x;
            this.sp5.y = location.y;
            this.sp6.x = location.x;
            this.sp6.y = location.y;
            this.sp7.x = location.x;
            this.sp7.y = location.y;
            this.sp8.x = location.x;
            this.sp8.y = location.y;
            this.sp9.x = location.x;
            this.sp9.y = location.y;
        
				////////////////////////////
            }.bind(this)
        }, this);
       
	   
	   this._streakRot = new cc.MotionStreak(2.0, 1.0, 50.0, cc.color(255, 255, 0), res.start_n_png);
        this.addChild(this._streakRot);

        this._center = cc.p(winSize.width / 2, winSize.height / 2);
        this._radius = winSize.width / 3;
        this._angle = 0.0;
        this.schedule(this.updateRot, 0);
		

		var orbit = cc.orbitCamera(5, 1, 2, 0, 180, 0, -90);
		var orbit_back = orbit.reverse();
        var turnoff = cc.turnOffTiles(0, cc.size(15, 10), 3);
		var effect = cc.liquid(2, cc.size(32, 24), 1, 20);
		var stopEffect = cc.sequence(effect, cc.delayTime(2), cc.stopGrid());//.runAction(stopEffect);



		var orbit1 = cc.orbitCamera(2, 1, 0, 0, 180, 0, 0);
        var action1 = cc.sequence(
            orbit1,
            orbit1.reverse());


		 spritebg.runAction(cc.sequence(orbit, orbit_back).repeatForever());
		
		var layer = new BonesLayer();
		//layer.runAction(cc.sequence(action1).repeatForever());
		//this.addChild(layer,20);
		
		
		
		////////////
var sprite = new cc.Sprite(res.start_n_png);
this.addChild(sprite, 0);
sprite.x = winSize.width / 2;
sprite.y = winSize.height / 5;
sprite.color = cc.color.RED;
sprite.setTextureRect(cc.rect(0, 0, 120, 110));
var orbitRED = cc.orbitCamera(5, 1, 1, 0, 360, 0, 0);//t, radius, deltaRadius, angleZ, deltaAngleZ, angleX, deltaAngleX
sprite.runAction(orbitRED.repeatForever());
cc.director.setProjection(cc.Director.PROJECTION_3D);
////////////////////

/*
 if( 'opengl' in cc.sys.capabilities ) {
            var program = new cc.GLProgram(res.example_ColorBars_vsh, res.example_ColorBars_fsh);
            program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
            program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
            program.link();
            program.updateUniforms();

            var label = new cc.LabelBMFont("RETRO EFFECT",res.showcard_Gothic_fnt);
            
            if(cc.sys.isNative)
                label.children[0].shaderProgram = program;
            else
                label.shaderProgram = program;
            
            label.x = winSize.width/2;

            label.y = winSize.height/2;
            this.addChild(label);

            this.scheduleUpdate();

            this.label = label;
            this.accum = 0;
        }


//////////////////////


// LEFT
var sprite = new cc.Sprite(res.start_n_png);
this.addChild(sprite, 0);
sprite.x = winSize.width / 4;
sprite.y = winSize.height / 2;
if ("opengl" in cc.sys.capabilities) {
    var cam = sprite.getCamera();
    cam.setEye(0, 0, 415 / 2);
    cam.setCenter(0, 0, 0);
}

// CENTER
sprite = new cc.Sprite(res.start_n_png);
this.addChild(sprite, 0, 40);
sprite.x = winSize.width / 4 * 2;
sprite.y = winSize.height / 2;
//cam = [sprite camera);
//[cam setEyeX:0 eyeY:0 eyeZ:415/2);

// RIGHT
sprite = new cc.Sprite(res.start_n_png);
this.addChild(sprite, 0, 20);
sprite.x = winSize.width / 4 * 3;
sprite.y = winSize.height / 2;
//cam = [sprite camera);
//[cam setEyeX:0 eyeY:0 eyeZ:-485);
//[cam setCenterX:0 centerY:0 centerZ:0);

this._z = 0;
this.scheduleUpdate();

//Automation parameters
this.autoParam = sprite;



	//////////////////////////////
		
		


    },
	 showWindEffect:function() {
        //if(this._windEffect)
          //  return;
       this._windEffect = new cc.ParticleSystem(res.wind_plist);
        this._windEffect.x = cc.director.getWinSize().width;
        this._windEffect.y = cc.director.getWinSize().height/2;
        this._windEffect.setScaleX(100);
        this.addChild(this._windEffect);
		 /*
		this.Sculls = new cc.ParticleSystem(res.sculls_plist);
        this.Sculls.x = cc.director.getWinSize().width/2;
        this.Sculls.y = cc.director.getWinSize().height/2;
        //this.Sculls.setScaleX(100);
        this.addChild(this.Sculls);
		
		this.sunExplosion_plist = new cc.ParticleSystem(res.sunExplosion_plist);
        this.sunExplosion_plist.x = cc.director.getWinSize().width/2;
        this.sunExplosion_plist.y = cc.director.getWinSize().height/2;
        //this.Sculls.setScaleX(100);
        this.addChild(this.sunExplosion_plist,11);
		
		this.flubber_plist = new cc.ParticleSystem(res.flubber_plist);
        this.flubber_plist.x = cc.director.getWinSize().width/2;
        this.flubber_plist.y = cc.director.getWinSize().height/2;
        //this.Sculls.setScaleX(100);
        this.addChild(this.flubber_plist,11);
		*/
		
		 /*if( 'opengl' in cc.sys.capabilities ) {
            var shaderNode = new ShaderNode("src/Shaders/example_Monjori.vsh", "src/Shaders/example_Monjori.fsh");
            this.addChild(shaderNode,10);
            shaderNode.x = winSize.width/2;
            shaderNode.y = winSize.height/2;
        }*/

    },
	 onUpdate:function (delta) {
	    var pos = this._target.convertToWorldSpace(cc.p(this._target.width/2, 0));
        this._streak.x = pos.x;
        this._streak.y = pos.y;
		///////////////////////////////
		this.accum += dt;

        if(cc.sys.isNative){
            var letters = this.label.children[0];
            for(var i = 0; i< letters.getStringLength(); ++i){
                var sprite = letters.getLetter(i);
                sprite.y = Math.sin( this.accum * 2 + i/2.0) * 20;
                sprite.scaleY  = ( Math.sin( this.accum * 2 + i/2.0 + 0.707) );       
            }
        }else{
            var children = this.label.children;

            for( var i in children ) {
                var sprite = children[i];
                sprite.y = Math.sin( this.accum * 2 + i/2.0) * 20;

                // add fabs() to prevent negative scaling
                var scaleY = ( Math.sin( this.accum * 2 + i/2.0 + 0.707) );

                sprite.scaleY = scaleY;
            }
        }
		
	
    },
	
	 updateRot:function (dt) {
        this._angle += 1.0;
        this._streakRot.x = this._center.x + Math.cos(this._angle / 180 * Math.PI) * this._radius;
        this._streakRot.y = this._center.y + Math.sin(this._angle / 180 * Math.PI) * this._radius;
		
		this._z += dt * 100;
		var sprite = this.getChildByTag(20);
		var cam = sprite.getCamera();
		cam.setEye(0, 0, this._z);
		if(!cc.sys.isNative)
			sprite.setNodeDirty();

		sprite = this.getChildByTag(40);
		cam = sprite.getCamera();
		cam.setEye(0, 0, -this._z);
		if(!cc.sys.isNative)
			sprite.setNodeDirty();
			
		//////////////////////
		//this.blocks_scaled.width--;
		//this.blocks_scaled.height--;
		//////////////////////
		//debugger
		/*this.sp1.vertexZ--;
		this.sp1.setNodeDirty();
		this.sp8.vertexZ++;
		this.sp8.setNodeDirty();*/
    },


    stopWindEffect:function() {
        if(this._windEffect){
            this._windEffect.stopSystem();
            this.removeChild(this._windEffect);
            this._windEffect = null;
        }
    },

    onPlay : function(){//debugger
       cc.log("==onplay clicked");
		/*cc.LoaderScene.preload([
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
			debugger
			if(err) return console.log("load failed");
			
			var scene = new HelloWorldScene();
			cc.director.pushScene(new cc.TransitionFlipAngular(1, scene));
			scene.post_enter();
		}); 

		var scene = new HelloWorldScene();
		cc.director.pushScene(new cc.TransitionFlipAngular(1, scene));
		scene.post_enter();
		*/
		
      GameController.getInstance().createMapScene();
		//debugger
		//cc.spriteFrameCache.addSpriteFrames(res.charBig_plist); 
		//this._streak.texture = cc.textureCache.addImage('src/wind0.png')

		
		/*if(this.targets && this.targets.length>0){
			this.scheduler.resumeTargets(this.targets);
			this.targets=0
		} else {
			this.targets=this.scheduler.pauseAllTargets();
		}*/
		
    }
});


var BonesLayer = cc.Layer.extend({

   /* ctor: function () {
        this._super();

        ccs.armatureDataManager.addArmatureFileInfo(res.boss0_png, res.boss0_plist, res.boss0_json);
        var armature = new ccs.Armature("boss0");
        armature.getAnimation().play("talk");
        armature.getAnimation().setSpeedScale(24/60);
        this.addChild(armature);
        armature.x = cc.winSize.width/2;
        armature.y = cc.winSize.height/2;
    }*/
	
	 _armature:null,
    _direction:1,
    onEnter:function () {
        this._super();

        var winSize = cc.winSize;
        ccs.armatureDataManager.addArmatureFileInfo(res.boss0_png, res.boss0_plist, res.boss0_json);
        this._armature = new ccs.Armature("boss0");
        this._armature.getAnimation().play("talk");
        this._armature.scaleX = -0.5;
        this._armature.scaleY = 0.5;
        this._armature.x = winSize.width / 2 - 150;
        this._armature.y = winSize.height / 2;
        this._armature.getAnimation().setMovementEventCallFunc(this.animationEventHandler,this);
        this.addChild(this._armature);
        this._direction = 1;
    },

    animationEventHandler:function (armature, movementType, movementID) {
		
        if (movementType == ccs.MovementEventType.loopComplete) {
            if (movementID == "talk") {
                var moveBy = cc.moveBy(2, cc.p(150 * this._direction, 0));
                this._armature.stopAllActions();
                this._armature.runAction(
					cc.sequence(
						moveBy, 
						cc.callFunc(this.callbackJump, this), 
						moveBy,
						cc.callFunc(this.callbackRotat, this)
					)
				);
                this._armature.getAnimation().play("walk");

                this._direction *= -1;
            }
        }
    },
	callbackJump:function () {
		//debugger;
		
        //this._armature.runAction(cc.scaleTo(0.1, 0.5 * this._direction * -1, 0.5));
        this._armature.getAnimation().play("jump", 10);
    },
    callbackRotat:function () {
		//debugger
        this._armature.runAction(cc.scaleTo(0.1, 0.5 * this._direction * -1, 0.5));
        this._armature.getAnimation().play("talk", 10);
    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
		var inputlayer = new InputLayer();
        layer.init();
		var blink  = new cc.RepeatForever(
														cc.sequence(
															new cc.MoveTo(1.5, cc.p(0,-5)),//EaseExponentialOut//cc.FadeOut.create(.2),
															new cc.MoveTo(1.5, cc.p(0,5))//EaseExponentialOut//cc.FadeIn.create(.2)
														)//,5
													);

													   inputlayer.runAction(
															 cc.sequence(
																blink
															)
														);
        this.addChild(layer);
		this.addChild(inputlayer);
    }
});



var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

		
	   
	
        var mainscene = ccs.load(res.jsonScene);
        this.addChild(mainscene.node);
		
		//debugger;
			var button_1 = mainscene.node.getChildByName('Button_1');
			
			button_1.addClickEventListener(this.b1_callBack);

		
			
		
        return true;
    },
	b1_callBack:function () {
		debugger;
	}
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
	/*var listener1 = cc.EventListener.create({

				event: cc.EventListener.MOUSE,

				onMouseUp: function (event){
			debugger
				var target = event.getCurrentTarget();

				var locationInNode = target.convertToNodeSpace(event.getLocation());
				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);

				if (cc.rectContainsPoint(rect, locationInNode)) {
					cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
					target.opacity = 180;
					return true;
				}
				return false;
			},
			onTouchMoved: function (touch, event) {
				var target = event.getCurrentTarget();
				var delta = touch.getDelta();
				target.x += delta.x;
				target.y += delta.y;
			},
			onTouchEnded: function (touch, event) {
				var target = event.getCurrentTarget();
				cc.log("sprite onTouchesEnded.. ");
				target.setOpacity(255);
				if (target == sprite2) {
					containerForSprite1.setLocalZOrder(100);
				} else if (target == button_1) {
					containerForSprite1.setLocalZOrder(0);
				}
			}
		});

		cc.eventManager.addListener(listener1, button_1);*/
	},
	post_enter:function () {
		var layer;
		if(layer = new HelloWorldLayer()){
			layer.setTag('HelloWorldLayer');
			this.addChild(layer);
			
			//if not animated push scene
			/*var scene =cc.director.getRunningScene();
			var scene_layer =scene.getChildByTag('HelloWorldLayer');
			var scene_layer_node =scene_layer.getChildByName('Node');
			var button_1 = scene_layer_node.getChildByName('Button_1');
			
			button_1.addClickEventListener(this.b1_callBack);*/
		}
	}
});










var Parallax = cc.Layer.extend({

ctor : function() {
//first image
var firstImage = cc.Sprite.create(first_image);
this.addChild(firstimage);

var moveAction = cc.MoveTo.create(8,cc.p(-1024,0));
var callBack = cc.CallFunc.create(this.reset,this);

var seq = cc.Sequence.create(moveAction,callBack);
var repeat = cc.RepeatForever.create(seq);

firstimage.runAction(repeat);

//second image
var secondImage = cc.Sprite.create(first_image);
this.addChild(secondimage);

var moveAction = cc.MoveTo.create(16,cc.p(-2048,0));
var callBack = cc.CallFunc.create(this.reset,this);

var seq = cc.Sequence.create(moveAction,callBack);
var repeat = cc.RepeatForever.create(seq);

secondImage.runAction(repeat);
},
reset : function() {
	firstImage.setPositionX(1024);

}

});
