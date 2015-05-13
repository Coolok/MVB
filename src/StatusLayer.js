var StatusLayer = cc.Layer.extend({
    labelCoin:null,
    labelMoney:null,
    coins:0,

    ctor : function(staminaFlag){
        //1. call super class's ctor function
        this._super();
		//debugger
    },
    init:function (staminaFlag) {
        this._super();
        var winsize = cc.director.getWinSize();
//debugger
		var profile = GameController.getInstance().profile;
		this.rocketsStatus_bg = new cc.Sprite("#status_bg.png");
		this.rocketsStatus_bg.setPosition(cc.p(20, 20));
		//this.rockets.setAnchorPoint(0.5,.5);
		this.rocketsStatus_bg.setScaleX(1.8)
		this.addChild(this.rocketsStatus_bg);
		
		this.lifeStatus_bg = new cc.Sprite("#status_bg.png");
		this.lifeStatus_bg.setPosition(cc.p(40,  winsize.height - 20));
		//this.rockets.setAnchorPoint(0.5,.5);
		this.lifeStatus_bg.setScaleX(5.5)
		this.addChild(this.lifeStatus_bg);
		
        this.labelLives = new cc.LabelTTF(profile.lives, "Helvetica", 20);
        this.labelLives.setColor(cc.color(0,0,0));//black color
        this.labelLives.setPosition(cc.p(48, winsize.height - 22));
        this.addChild(this.labelLives);
		
		this.labelPow = new cc.LabelTTF(profile.power, "Helvetica", 20);
        this.labelPow.setColor(cc.color(0,0,0));//black color
        this.labelPow.setPosition(cc.p(118, winsize.height - 22));
        this.addChild(this.labelPow);
		
		this.labelCoin = new cc.LabelTTF(profile.diamonds, "Helvetica", 20);
        this.labelCoin.setColor(cc.color(0,0,0));//black color
        this.labelCoin.setPosition(cc.p(188, winsize.height - 22));
        this.addChild(this.labelCoin);

        this.labelMoney = new cc.LabelTTF(profile.money, "Helvetica", 20);
        this.labelMoney.setPosition(cc.p(winsize.width - 30, winsize.height - 20));
        this.addChild(this.labelMoney);
		
		this.lives = new cc.Sprite("#hart.png");
		this.lives.setPosition(cc.p(20, winsize.height - 20));
		this.addChild(this.lives);

		this.diamond = new cc.Sprite("#diamond.png");
		this.diamond.setPosition(cc.p(160, winsize.height - 20));
		this.addChild(this.diamond);
		
		this.power = new cc.Sprite("#power.png");
		this.power.setPosition(cc.p(90, winsize.height - 20));
		this.addChild(this.power);
		
		this.coin = new cc.Sprite("#fireShopMoney.png");
		this.coin.setPosition(cc.p(winsize.width - 70, winsize.height - 20));
		this.coin.setScale(.3)
		this.addChild(this.coin);
		if(staminaFlag!=-1){
			this.stamina_bar_bg = new cc.Sprite("#stamina_bar_bg.png");
			this.stamina_bar_bg.setPosition(cc.p(250, winsize.height - 20));
			this.addChild(this.stamina_bar_bg);
			
			this.stamina_bar = new cc.Sprite("#stamina_bar.png");
			this.stamina_bar.setPosition(cc.p(250, winsize.height - 20));
			//this.stamina_bar.setAnchorPoint(0.5,.5);
			this.stamina_bar.setScaleX(1)
			this.addChild(this.stamina_bar);
			//debugger
			this.labelStamina = new cc.LabelTTF("stamina", "Helvetica", 12);
			this.labelStamina.setColor(cc.color(0,0,0));//black color
			this.labelStamina.setPosition(cc.p(250, winsize.height - 20));
			this.addChild(this.labelStamina);
			
					
			this.hot_bar_bg = new cc.Sprite("#stamina_bar_bg.png");
			this.hot_bar_bg.setPosition(cc.p(150, 20));
			this.addChild(this.hot_bar_bg);
			
			this.hot_bar = new cc.Sprite("#stamina_bar.png");
			this.hot_bar.setPosition(cc.p(116.5, 20));
			//this.hot_bar.setAnchorPoint(0.5,.5);
			this.hot_bar.setScaleX(1)
			this.addChild(this.hot_bar);
			
			this.labelHot_bar = new cc.LabelTTF("gun heat", "Helvetica", 12);
			this.labelHot_bar.setColor(cc.color(0,0,0));//black color
			this.labelHot_bar.setPosition(cc.p(150, 20));
			this.addChild(this.labelHot_bar);
			
		
		}
		
		
		
		this.rockets = new cc.Sprite("#rocket_status.png");
		this.rockets.setPosition(cc.p(20, 20));
		//this.rockets.setAnchorPoint(0.5,.5);
		this.rockets.setScaleX(1)
		this.addChild(this.rockets);
		
		this.labelRockets = new cc.LabelTTF(GameController.getInstance().profile.rockets, "Helvetica", 20);
        this.labelRockets.setColor(cc.color(0,0,0));//black color
        this.labelRockets.setPosition(cc.p(48, 20));
        this.addChild(this.labelRockets);
		
		
		var typeFire;
		if(profile.fire_type==1){
			typeFire='';
		}else{
			typeFire= profile.fire_type;
		}		
		this.fires = new cc.Sprite("#fire"+typeFire+"_status.png");
		this.fires.setTag('fire_status');
		this.fires.setPosition(cc.p(75, 20));
		//this.fires.setAnchorPoint(0.5,.5);
		this.fires.setScaleX(1)
		this.addChild(this.fires);
		//debugger
		/*this.labelFires = new cc.LabelTTF("X2", "Helvetica", 12);
        this.labelFires.setColor(cc.color(0,0,0));//black color
        this.labelFires.setPosition(cc.p(75, 10));
        this.addChild(this.labelFires);
		*/
		
		//this.settings = new cc.Sprite("#settings.png");
		//this.settings.setPosition(cc.p(450, 20));
		//this.addChild(this.settings);
		
							//stop bg music
							//menu_button
		//var settings = new cc.Sprite("#settings.png");					
			//settings.setRotation(180);				
							        //var winSize = cc.director.getWinSize();

        var settings = new cc.Sprite("#settings.png");
		var settings_act = new cc.Sprite("#settings_act.png");
        cc.MenuItemFont.setFontSize(30);
        var menuItem = new cc.MenuItemSprite(
        	settings,
			settings_act,
            this.menuAction, this);
        var menu = new cc.Menu(menuItem);
        menu.setPosition(cc.p(winsize.width - 30, 20));
        this.addChild(menu);
		
		
		var soundOn = new cc.Sprite("#soundOn.png");
		var soundOff = new cc.Sprite("#soundOff.png");
      //debugger
        var menuItemSoundOn = new cc.MenuItemSprite(
        	new cc.Sprite("#soundOn.png"),
			new cc.Sprite("#soundOn_a.png"),
            this.onSoundOff, this);
        //var menu = new cc.Menu(menuItemSound);
        menuItemSoundOn.setPosition(cc.p(-50, 0));
		
		var menuItemSoundOff = new cc.MenuItemSprite(
        	new cc.Sprite("#soundOff.png"),
			new cc.Sprite("#soundOff_a.png"),
            this.onSoundOn, this);
        //var menu = new cc.Menu(menuItemSound);
        menuItemSoundOff.setPosition(cc.p(-50, 0));
		
		if(Sound.silence){
			var toggler = new cc.MenuItemToggle( menuItemSoundOff, menuItemSoundOn, this.onSound, this);
		} else {
			var toggler = new cc.MenuItemToggle( menuItemSoundOn, menuItemSoundOff, this.onSound, this);
		}
		 toggler.setPosition(cc.p(-80, 0));
        menu.addChild(toggler);
		

		
    },
	 menuAction:function (num) {
	//debugger
					//cc.audioEngine.stopMusic();
					Sound.playButton();
					cc.director.pause();
					this.addChild(new SettingsLayer());
	
	},
	onSound:function (sender) {debugger
		Sound.toggleOnOff();
		
    },
	 changeFireStatus:function (num) {
        var src = '#fire_status';
		
		switch (num) {
            case 0:
                src = "#fire_status.png";
                break;
			case 1:
                src = "#fire2_status.png"
                break;
			case 2:
                src = "#force_status.png"
                break;
			case 3:
                src = "#force2_status.png"
                break;
			case 4:
                src = "#dragon_fire_status.png"
                break;
			case 5:
                src = "#dragon_fire2_status.png"
                break;
            default:
			    src = '#fire_status.png';
                break;
        }
		//debugger;
		
		this.getChildByTag('fire_status').removeFromParent();
		this.fires = new cc.Sprite(src);
		this.fires.setTag('fire_status');
		this.fires.setPosition(cc.p(75, 20));
		this.addChild(this.fires);
		
    },	

    addCoin:function (num) {
        this.coins += num;
        this.labelCoin.setString(num);
    },

    updateStatus:function (setToStatus) {
	
	    setToStatus.fire_status?this.changeFireStatus(setToStatus.fire_status):1;
        setToStatus.money?this.labelMoney.setString(setToStatus.money):1;
		setToStatus.lives?this.labelLives.setString(setToStatus.lives):1;
		setToStatus.power?this.labelPow.setString(setToStatus.power):1;
		setToStatus.rockets?this.labelRockets.setString(setToStatus.rockets):1;
    }

});
