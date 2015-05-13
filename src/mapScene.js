var MapScene = cc.Scene.extend({
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        //debugger
		var mapLayer = new MapLayer();
		mapLayer.init()
        this.addChild(mapLayer, 0, TagOfLayer.Map);
		var statusLayer = new StatusLayer(-1);
		statusLayer.init(-1);
		this.addChild(statusLayer, 0, TagOfLayer.Status);
		
    },
    onRestart:function (sender) {//debugger
		this.addChild(new BackgroundLayer(this.space), 0, TagOfLayer.background);
    },
	startNextLevel:function (sender) {
        cc.director.resume();
        cc.director.runScene(new PlayScene());
    },
});