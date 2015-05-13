var Zomby = cc.Class.extend({
    space:null,
    sprite:null,
    shape:null,
    _mapIndex:0,// which map belongs to
    get mapIndex() {
        return this._mapIndex;
    },
    set mapIndex(index) {
        this._mapIndex = index;
    },

    /** Constructor
     * @param {cc.SpriteBatchNode *}
     * @param {cp.Space *}
     * @param {cc.p}
     */
    ctor:function (spriteSheet, space, pos, rotation) {
	//debugger
        this.space = space;
        this.life=4
        var str,frame;
        var animFrames = [];
		 for (var i = 0; i < 3; i++) {
            str = "zomby0" + i + ".png";
            frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
		
		str = "zomby00.png";
        frame = cc.spriteFrameCache.getSpriteFrame(str);
        for (var i = 0; i < 7; i++) {
			animFrames.push(frame);
		}
		
		var animFramesTmp = animFrames.slice();
		var animFramesR = animFramesTmp.concat(animFrames.reverse());
		
	    var animation = new cc.Animation(animFramesR, 0.1);//debugger
		
        this.zombyAction = new cc.RepeatForever(new cc.Animate(animation));
		this.zombyAction.setTag('zomby');
        this.zombyAction.retain();	


		var boxOffset = cp.v(0, 0);
		 this.sprite = new cc.PhysicsSprite("#zomby00.png");
		 
		 var body = new cp.StaticBody();
        body.setPos(pos);
        this.sprite.setBody(body);

        this.shape = new cp.BoxShape(body,
            this.sprite.getContentSize().width,
            this.sprite.getContentSize().height);
        this.shape.setCollisionType(SpriteTag.zomby);

        this.space.addStaticShape(this.shape);
        
		this.shape.life=this.life
        //Sensors only call collision callbacks, and never generate real collisions
        this.shape.setSensor(true);
		this.sprite.setTag(this.shape.hashid);
        

        // add sprite to sprite sheet
        this.sprite.runAction(this.zombyAction);
		this.sprite.setRotation(rotation);
        spriteSheet.addChild(this.sprite, 1);
    },

    removeFromParent:function () {
        this.space.removeShape(this.shape);
        this.shape = null;
        this.sprite.removeFromParent();
        this.sprite = null;
    },

    getShape:function () {
        return this.shape;
    }
});