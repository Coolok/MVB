var WinnerScene = cc.Scene.extend({
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        //debugger
		var winnerLayer = new WinnerLayer();
		winnerLayer.init()
        this.addChild(winnerLayer, 0, TagOfLayer.Winner);
    },
    onRestart:function (sender) {//debugger
		this.addChild(new BackgroundLayer(this.space), 0, TagOfLayer.background);
    },
	startNextLevel:function (sender) {
        cc.director.resume();
        cc.director.runScene(new PlayScene());
    },
});