
var SoundScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        debugger
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
	
		var layer;
		if(layer = new SoundLayer()){
			layer.setTag('SoundLayer');
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


var SoundLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {debugger
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
			//var button_1 = mainscene.node.getChildByName('Button_1');
			
		//	button_1.addClickEventListener(this.b1_callBack);

		
			
		
        return true;
    },
	b1_callBack:function () {
		debugger;
	}
});
