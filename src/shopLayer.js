var ShopLayer = cc.LayerGradient.extend({
    // constructor
    ctor : function(){
        //1. call super class's ctor function
        this._super();
		this.init();
    },
    init:function () {
        this._super(cc.color(0, 0, 0, 180));
		//debugger
		cc.spriteFrameCache.addSpriteFrames(res.charBig_plist);
		
		
//////////////////////////////////Profile
		this.diamonds = 20;
		this.my_money = 300;
		this.currentRocket = 5;
		this.currentPow = 2;
		this.currentLife = 5;
//////////////////////////////////
		
		
		
		
		var color1 = cc.color(111,111,111)
		var color2 = cc.color(0,0,0)
		this.setColor(color1,color2);
		//debugger
		var winSize = cc.director.getWinSize();
		var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
		var spritebg = new cc.Sprite('#charMonsters.png');
        spritebg.setPosition(centerPos);
		spritebg.setOpacity(50)
        this.addChild(spritebg,5);
		
       
		this.particleSrc = new cc.Sprite(res.particle_png);
        cc.MenuItemFont.setFontSize(30);
        var menuItemRestart = new cc.MenuItemSprite(
        	new cc.Sprite(res.start_n_png),
        	new cc.Sprite(res.start_s_png),
            this.onRestart, this);
			
		
		var fixMiddle = {x:-30,y:30};

		
		
			////////////////////////////////////
			var shopsArr = [];
			for(var i=0;i<6;i++){
				
				var posshop={x:50,y:-50};
				var labelPos={x:0,y:-5};

				if(this.my_money/100>i){
					var fireActive = new cc.Sprite('#fireShop0'+i+'.png');
					fireActive.setColor(cc.color(100,100,100,0.5));
					var shopButton = new cc.MenuItemSprite(
					new cc.Sprite('#fireShop0'+i+'.png'),
					fireActive,
					this.startshop,
					this);
				} else {
					var shopButton = new cc.MenuItemSprite(
					new cc.Sprite('#fireShop0'+i+'.png'),
					new cc.Sprite('#fireShop0'+i+'.png'),
					function(){debugger},
					this);
					shopButton.setColor(cc.color(100,100,100,0.5));
				}
				shopButton.setPosition(cc.p(posshop.x+i*125+20,posshop.y));
				shopButton.setTag('_'+i)
				var labelButton = new cc.LabelBMFont((i+1)*100, res.showcard_Gothic_fnt, 640, cc.TEXT_ALIGNMENT_CENTER);
				labelButton.setColor(cc.color(255,255,255,0.5));
				labelButton.setPosition(cc.p(50,labelPos.y));
				shopButton.addChild(labelButton,21);
				
				shopsArr.push(shopButton);
				
				
			}
			
			
			var rocketActive = new cc.Sprite('#fireShopRocket.png');
			
					rocketActive.setColor(cc.color(100,100,100,0.5));
					var rocketButton = new cc.MenuItemSprite(
					new cc.Sprite('#fireShopRocket.png'),
					rocketActive,
					this.buyRocket,
					this);
			rocketButton.setPosition(cc.p(winSize.width/6,80));
			
			var powActive = new cc.Sprite('#fireShopPow.png');
					powActive.setColor(cc.color(100,100,100,0.5));
					var powButton = new cc.MenuItemSprite(
					new cc.Sprite('#fireShopPow.png'),
					powActive,
					this.buyPow,
					this);
			powButton.setPosition(cc.p(winSize.width/2,80));
			
			var lifeActive = new cc.Sprite('#fireShopLife.png');
					lifeActive.setColor(cc.color(100,100,100,0.5));
					var lifeButton = new cc.MenuItemSprite(
					new cc.Sprite('#fireShopLife.png'),
					lifeActive,
					this.buyLife,
					this);
			lifeButton.setPosition(cc.p(winSize.width/6*5,80));
			
			
				
			var menuWorld = new cc.Menu(shopsArr[0],shopsArr[1],shopsArr[2],shopsArr[3],shopsArr[4],shopsArr[5],rocketButton,powButton,lifeButton);
			
			this.addChild(menuWorld,20);
			menuWorld.setScale(0);
			menuWorld.setAnchorPoint(0,0);
			menuWorld.setTag('menuWorld')
			
			var spriteActMenuWorld = new cc.EaseBounceOut(new cc.ScaleTo(1, 1));
			
			
		/*for(var j=0;j<1;j++){				menuWorld.blinkColor = {r:255,g:255,b:255};
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
			
		}*/
			
			
			
			
			menuWorld.runAction(
				cc.sequence(
					new cc.DelayTime(.5),
					spriteActMenuWorld,
					cc.callFunc(function(){
						cc.log(this.blinkColor);
						cc.log(this.getTag());
						//this.runAction(cc.tintTo(1,this.blinkColor.r,this.blinkColor.g,this.blinkColor.b));	
					}, menuWorld)
				)
			);
			menuWorld.setPosition(cc.p(0, centerPos.y));
			
			var labelRocket = new cc.LabelBMFont("for      *1 ", res.showcard_Gothic_fnt, 640, cc.TEXT_ALIGNMENT_CENTER);
			labelRocket.setColor(cc.color(255,255,255,0.5));
			labelRocket.setPosition(cc.p(centerPos.x/6, centerPos.y+300));
			//labelWorld.setScale(.7);
			var spriteAct = new cc.EaseBounceOut(new cc.MoveTo(1,cc.p(winSize.width/6, centerPos.y+30)));
			labelRocket.runAction(
				cc.sequence(
					new cc.DelayTime(1),
					spriteAct
				)
			);
			
			this.addChild(labelRocket,21);
			
			var labelPow = new cc.LabelBMFont("for      *10", res.showcard_Gothic_fnt, 640, cc.TEXT_ALIGNMENT_CENTER);
			labelPow.setColor(cc.color(255,255,255,0.5));
			labelPow.setPosition(cc.p(centerPos.x/6, centerPos.y+300));
			//labelWorld.setScale(.7);
			var spriteAct = new cc.EaseBounceOut(new cc.MoveTo(1,cc.p(winSize.width/2, centerPos.y+30)));
			labelPow.runAction(
				cc.sequence(
					new cc.DelayTime(1),
					spriteAct
				)
			);
			this.addChild(labelPow,21);
			
			var labelLife = new cc.LabelBMFont("for      *15", res.showcard_Gothic_fnt, 640, cc.TEXT_ALIGNMENT_CENTER);
			labelLife.setColor(cc.color(255,255,255,0.5));
			labelLife.setPosition(cc.p(centerPos.x/6, centerPos.y+300));
			//labelWorld.setScale(.7);
			var spriteAct = new cc.EaseBounceOut(new cc.MoveTo(1,cc.p(winSize.width/6*5, centerPos.y+30)));
			labelLife.runAction(
				cc.sequence(
					new cc.DelayTime(1),
					spriteAct
				)
			);
			
			this.addChild(labelLife,21);
			
			//menuWorld.setColor(menuWorld.blinkColor.r,menuWorld.blinkColor.g,menuWorld.blinkColor.b,255)

		////////////////////////////////////////
		
		var cristall_shop1 = new cc.Sprite("#cristall_shop.png");
		cristall_shop1.setPosition(cc.p(winSize.width / 2, winSize.height * 2));
		this.addChild(cristall_shop1,20);
		var cristall_shop1Action_ = new cc.EaseBounceOut(new cc.MoveTo(2, cc.p(winSize.width/6+20,  centerPos.y+40)));
		cristall_shop1.runAction(
				cc.sequence(
					new cc.DelayTime(.5),
					cristall_shop1Action_
				)
		);
		
		var cristall_shop2 = new cc.Sprite("#cristall_shop.png");
		cristall_shop2.setPosition(cc.p(winSize.width / 2, winSize.height * 2));
		this.addChild(cristall_shop2,20);
		var cristall_shop2Action_ = new cc.EaseBounceOut(new cc.MoveTo(2, cc.p(winSize.width/2+20,  centerPos.y+40)));
		cristall_shop2.runAction(
				cc.sequence(
					new cc.DelayTime(1),
					cristall_shop2Action_
				)
		);
		
		var cristall_shop3 = new cc.Sprite("#cristall_shop.png");
		cristall_shop3.setPosition(cc.p(winSize.width / 2, winSize.height * 2));
		this.addChild(cristall_shop3,20);
		var cristall_shop3Action_ = new cc.EaseBounceOut(new cc.MoveTo(2, cc.p(winSize.width/6*5+20,  centerPos.y+40)));
		cristall_shop3.runAction(
				cc.sequence(
					new cc.DelayTime(1.5),
					cristall_shop3Action_
				)
		);
		
		
		
		
		
		this.label = new cc.LabelBMFont("Buy best fire for", res.showcard_Gothic_fnt, 640, cc.TEXT_ALIGNMENT_CENTER);
		this.label.setColor(cc.color(255,255,255,0.5));
		var label_width = this.label.getBoundingBox().width;
		this.label.setScale(0);
		var spriteAction_2 = new cc.EaseBounceOut(new cc.ScaleTo(1, 1));
		this.label.runAction(
			cc.sequence(
				new cc.DelayTime(1.5),
				spriteAction_2
			)
		);
		this.label.setPosition(cc.p(winSize.width / 2,winSize.height / 2-140));
		this.addChild(this.label,20);
		this.label.runAction(new cc.Repeat(
			cc.sequence(
			    cc.FadeOut.create(.2),
				cc.FadeIn.create(.2)
			),5
		));
		
		
		var fireCurrency = new cc.Sprite('#fireShopMoney.png')
		fireCurrency.setPosition(cc.p(winSize.width / 2+label_width/2+20,winSize.height / 2-140));
		this.addChild(fireCurrency,21);
		fireCurrency.setScale(0);
		var fireCurrencyAction = new cc.EaseBounceOut(new cc.ScaleTo(1, .4));
		fireCurrency.runAction(
			cc.sequence(
				new cc.DelayTime(2),
				fireCurrencyAction
			)
		);
		
		
		
		
////////////////CURRENCY
		/*this.labelCurrentRocket = new cc.LabelBMFont("current "+this.currentRocket, res.showcard_Gothic_fnt, 640, cc.TEXT_ALIGNMENT_CENTER);
		this.labelCurrentRocket.setColor(cc.color(255,255,255,0.5));
		this.labelCurrentRocket.setScale(0);
		var currentRocketAction = new cc.EaseBounceOut(new cc.ScaleTo(1, .6));
		this.labelCurrentRocket.runAction(
			cc.sequence(
				new cc.DelayTime(1.5),
				currentRocketAction
			)
		);
		this.labelCurrentRocket.setPosition(cc.p(winSize.width/6,winSize.height / 2+20));
		this.addChild(this.labelCurrentRocket,20);
		this.labelCurrentRocket.runAction(new cc.Repeat(
			cc.sequence(
			    cc.FadeOut.create(.2),
				cc.FadeIn.create(.2)
			),5
		));
		
		this.labelCurrentPow = new cc.LabelBMFont("current "+this.currentPow, res.showcard_Gothic_fnt, 640, cc.TEXT_ALIGNMENT_CENTER);
		this.labelCurrentPow.setColor(cc.color(255,255,255,0.5));
		this.labelCurrentPow.setScale(0);
		var currentPowAction = new cc.EaseBounceOut(new cc.ScaleTo(1, .6));
		this.labelCurrentPow.runAction(
			cc.sequence(
				new cc.DelayTime(1.5),
				currentPowAction
			)
		);
		this.labelCurrentPow.setPosition(cc.p(winSize.width/2,winSize.height / 2+20));
		this.addChild(this.labelCurrentPow,20);
		this.labelCurrentPow.runAction(new cc.Repeat(
			cc.sequence(
			    cc.FadeOut.create(.2),
				cc.FadeIn.create(.2)
			),5
		));
		
		this.labelCurrentLife = new cc.LabelBMFont("current "+this.currentLife, res.showcard_Gothic_fnt, 640, cc.TEXT_ALIGNMENT_CENTER);
		this.labelCurrentLife.setColor(cc.color(255,255,255,0.5));
		this.labelCurrentLife.setScale(0);
		var currentLifeAction = new cc.EaseBounceOut(new cc.ScaleTo(1, .6));
		this.labelCurrentLife.runAction(
			cc.sequence(
				new cc.DelayTime(1.5),
				currentLifeAction
			)
		);
		this.labelCurrentLife.setPosition(cc.p(winSize.width/6*5,winSize.height / 2+20));
		this.addChild(this.labelCurrentLife,20);
		this.labelCurrentLife.runAction(new cc.Repeat(
			cc.sequence(
			    cc.FadeOut.create(.2),
				cc.FadeIn.create(.2)
			),5
		));
		
*/
		
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
		
	
    },
	closeShop:function (sender) {
	    //debugger
		var world = sender.getTag().split('_')[0];
		var shop = sender.getTag().split('_')[1]-1;
		cc.log(world+"___"+shop)
		return;
        cc.director.resume();
        cc.director.runScene(new PlayScene());
    },
	buyRocket:function (sender) {
	    if(this.diamonds>0){	
			this.diamonds--;
			this.currentRocket++;
			this.labelCurrentRocket.setString("current "+this.currentRocket);
		}
    },
	buyPow:function (sender) {
	    if(this.diamonds>10){	
			this.diamonds-=10;
			this.currentPow++;
			this.labelCurrentPow.setString("current "+this.currentPow);
		}
    },
	buyLife:function (sender) {
	    if(this.diamonds>15){	
			this.diamonds-=15;
			this.currentLife++;
			this.labelCurrentLife.setString("current "+this.currentLife);
		}
    }
});