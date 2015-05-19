var MapScene = cc.Scene.extend({
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
	onEnter: function  () {  
        this ._super ();  
        // Custom loading of layer  
       debugger
    }, 
    init:function () {
        //debugger
		
		 this.space2 = new cp.Space();
        // Gravity
        this.space2.gravity = cp.v(0, -100);
		     this.space2.setIterations(120)
             //this.space2.gravity = cp.v(0, -300)
             this.space2.collisionSlop = .5
             this.space2.sleepTimeThreshold = .5
             this.space2.damping = .9
		
		this.scheduleUpdate();
		
		var mapLayer = new MapLayer(this.space2);
		mapLayer.init()
        this.addChild(mapLayer, 0, TagOfLayer.Map);
		var statusLayer = new StatusLayer(-1);
		statusLayer.init(-1);
		this.addChild(statusLayer, 0, TagOfLayer.Status);
		
					
		
    },
    onRestart:function (sender) {//debugger
		this.addChild(new BackgroundLayer(this.space), 0, TagOfLayer.background);
    },
	update:function (dt) {
	 
	 this.space2.step(dt);
	},
	startNextLevel:function (sender) {
        cc.director.resume();
        cc.director.runScene(new PlayScene());
    },
});