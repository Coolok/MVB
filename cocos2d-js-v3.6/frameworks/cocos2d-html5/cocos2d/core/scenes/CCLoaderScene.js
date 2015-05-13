/****************************************************************************
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
/**
 * <p>cc.LoaderScene is a scene that you can load it when you loading files</p>
 * <p>cc.LoaderScene can present thedownload progress </p>
 * @class
 * @extends cc.Scene
 * @example
 * var lc = new cc.LoaderScene();
 */
cc.LoaderScene = cc.Scene.extend({
    _interval : null,
    _label : null,
    _loadingBar : null,
    _className:"LoaderScene",
    /**
     * Contructor of cc.LoaderScene
     * @returns {boolean}
     */
    init : function(){
        var self = this;

        //logo
        var logoWidth = 160;
        var logoHeight = 200;

        // bg
        //var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(32, 32, 32, 255));
        //var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(255, 255, 255, 255));
        //self.addChild(bgLayer, 0);

        //console.log(cc._loaderImage);
        //cc._loaderImage = res.splash_splash_1920;

        //image move to CCSceneFile.js
        /*
        var fontSize = 24, lblHeight =  -logoHeight / 2 + 100;
        if(cc._loaderImage){
            //loading logo
            cc.loader.loadImg(cc._loaderImage, {isCrossOrigin : false }, function(err, img){
                logoWidth = img.width;
                logoHeight = img.height;
                self._initStage(img, cc.visibleRect.center);
            });
            fontSize = 14;
            lblHeight = -logoHeight / 2 - 10;
        }

        //loading percent
		*/
		var size = cc.director.getWinSize();
        var label = self._label = new cc.LabelTTF("Loading... 0%", "Arial", 15);
        label.setPosition(cc.p(size.width / 2, 17));
        label.setColor(cc.color(180, 180, 180));
        this.addChild(this._label, 10);
        

        // custom part
        
        var bgLoader = cc.Sprite.create(res.charMonsters_png);
        bgLoader.setPosition(cc.p(size.width / 2, size.height / 2));
        bgLoader.setScale(1.6);
        self.addChild(bgLoader, 10);

        //bgLoader.setOpacity(0);
        //var bgLoaderAction = cc.FadeIn.create(2);
        //var bgLayarSequince_action = cc.Sequence.create(bgLoaderAction);
        //bgLayer.runAction(bgLayarSequince_action);
        //bgLoader.runAction(bgLoaderAction);

        var bgPreloader = cc.Sprite.create(res.cristall_bg_png);
        bgPreloader.setPosition(cc.p(size.width / 2, size.height/ 10));
        bgPreloader.setScale(1.40);
        self.addChild(bgPreloader, 11);
        //bgPreloader.setOpacity(0);
        //var bgPreloader_action = cc.FadeIn.create(2);
        //bgPreloader.runAction(bgPreloader_action);

        self._loadingBar = new ccui.LoadingBar();
        self._loadingBar.setName("loadingBar");
        self._loadingBar.loadTexture(res.cristall_png);
        self._loadingBar.setPercent(0);
        self._loadingBar.setScale(1.40);
        self._loadingBar.x = size.width / 2;
        self._loadingBar.y = size.height / 10;
        self.addChild(self._loadingBar, 12);

        // end custom part

        return true;

    },

    _initStage: function (img, centerPos) {
        var self = this;
        var texture2d = self._texture2d = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var logo = self._logo = new cc.Sprite(texture2d);
        logo.setScale(cc.contentScaleFactor());
        logo.x = centerPos.x;
        logo.y = centerPos.y;
        //self._bgLayer.addChild(logo, 10);
    },
    /**
     * custom onEnter
     */
    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);
    },
    /**
     * custom onExit
     */
    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        var tmpStr = "Loading... 0%";
        this._label.setString(tmpStr);
    },

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} cb
     */
    initWithResources: function (resources, cb) {
        if(cc.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        cc.loader.load(res,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                self._label.setString("Loading... " + percent + "%");

                self._loadingBar.setPercent( percent );
            }, function () {
                if (self.cb)
                    self.cb();
            });
    }
});
/**
 * <p>cc.LoaderScene.preload can present a loaderScene with download progress.</p>
 * <p>when all the resource are downloaded it will invoke call function</p>
 * @param resources
 * @param cb
 * @returns {cc.LoaderScene|*}
 * @example
 * //Example
 * cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new HelloWorldScene());
    }, this);
 */
cc.LoaderScene.preload = function(resources, cb){
    var _cc = cc;
    if(!_cc.loaderScene) {
        _cc.loaderScene = new cc.LoaderScene();
        _cc.loaderScene.init();
    }
    _cc.loaderScene.initWithResources(resources, cb);

    cc.director.runScene(_cc.loaderScene);
    return _cc.loaderScene;
};