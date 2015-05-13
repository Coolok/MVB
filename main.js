cc.game.onStart = function(){
    cc.view.setDesignResolutionSize(760, 570, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(true);
    //load resources
	
    cc.LoaderScene.preload(g_resources, function () {
        var gameController = new GameController();
		gameController.init()
    }, this);
};
cc.game.run();