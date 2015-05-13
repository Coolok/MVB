var Lazer = cc.Class.extend({
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
    ctor:function (spriteSheet, space, pos) {
        this.space = space;
        this.life=4
       
        var animFrames = [];
		
		 for (var i = 0; i < 5; i++) {
            var str = "lazer0" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
		
		var animFramesTmp = animFrames.slice();
		var animFramesR = animFramesTmp.concat(animFrames.reverse());
	    var animation = new cc.Animation(animFramesR, .1);
		
        this.lazerAction = new cc.RepeatForever(new cc.Animate(animation));
        this.lazerAction.retain();	

		
		

		
		 this.sprite = new cc.PhysicsSprite("#lazer00.png");
		 
			var mass1 = 1;
			var contentSize = this.sprite.getContentSize();
			
			var boxOffset = cp.v(contentSize.width, contentSize.height);

			this.body = new cp.Body(mass1, cp.momentForBox(mass1, 10, contentSize.width, contentSize.height))
			this.body.setPos(cp.v.add(cp.v( pos.x, pos.y), boxOffset));
			this.runSearch = new cc.RepeatForever(cc.sequence(
							cc.moveBy(2,cc.p(-100,0)),
                            cc.moveBy(2,cc.p(100,0))
						));
			this.runJump = new cc.RepeatForever(cc.sequence(
							cc.moveBy(2,cc.p(0,55)),
                            cc.moveBy(2,cc.p(0,-55))
						));			
		
		
		
		
        //this.sprite.runAction(this.runSearch);
			
			//this.body.applyForce(cp.v(110, 0), cp.v(0, 0));
			//this.space.addBody(this.body);
			//debugger
			var sh = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
			sh.setCollisionType(SpriteTag.lazer);
			this.shape = this.space.addShape(sh);
			this.shape.setElasticity(111);
			this.shape.setFriction(0.1);
            this.shape.group = 1;			

	    this.sprite.setBody(this.body);
		this.shape.life=this.life
        //Sensors only call collision callbacks, and never generate real collisions
        //this.shape.setSensor(true);
		this.sprite.setTag(this.shape.hashid);
        

        // add sprite to sprite sheet
        this.sprite.runAction(this.lazerAction);
		//this.sprite.runAction(this.runJump);
        spriteSheet.addChild(this.sprite, 10);
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