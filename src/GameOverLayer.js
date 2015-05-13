var GameOverLayer = cc.LayerColor.extend({
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super(cc.color(0, 0, 0, 180));
        var winSize = cc.director.getWinSize();

        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        cc.MenuItemFont.setFontSize(30);
        var menuItemRestart = new cc.MenuItemSprite(
        	new cc.Sprite(res.restart_n_png),
        	new cc.Sprite(res.restart_s_png),
            this.onRestart, this);
        var menu = new cc.Menu(menuItemRestart);
        menu.setPosition(centerPos);
        this.addChild(menu);
		var gameOver = new cc.Sprite("#gameOver.png");
		gameOver.setPosition(cc.p(winSize.width / 2, winSize.height / 2+100));
		this.addChild(gameOver);
    },
    onRestart:function (sender) {
        cc.director.resume();
        GameController.getInstance().createMapScene();
    }
});