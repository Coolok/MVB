var ShopScene = cc.Scene.extend({
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        //debugger
		var shopLayer = new ShopLayer();
		shopLayer.init()
        this.addChild(shopLayer, 0, TagOfLayer.Shop);
		var statusLayer = new StatusLayer(-1);
		statusLayer.init(-1);
		this.addChild(statusLayer, 0, TagOfLayer.Status);
    }
});