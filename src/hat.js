var Hat = cc.Class.extend({
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
		 for (var i = 0; i < 6; i++) {
            var str = "hat0" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
		
		var animFramesTmp = animFrames.slice();
		var animFramesR = animFramesTmp.concat(animFrames.reverse());
		
	    var animation = new cc.Animation(animFramesR, 0.1);
        this.hatAction = new cc.RepeatForever(new cc.Animate(animation));
        this.hatAction.retain();	


		var boxOffset = cp.v(0, 0);
		 this.sprite = new cc.PhysicsSprite("#hat00.png");
			var mass1 = 1;
			var contentSize = this.sprite.getContentSize();

			this.body = new cp.Body(mass1, cp.momentForBox(mass1, 10, contentSize.width, contentSize.height, cp.v(0,0)))
			this.body.setPos(cp.v.add(cp.v( pos.x, pos.y), boxOffset));
			this.space.addBody(this.body);
			this.shape = this.space.addShape(new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height, cp.v(0,0)));
			this.shape.setCollisionType(SpriteTag.hat);
			this.shape.setElasticity(1);
			this.shape.setFriction(7);		

		var radius2 = contentSize.width/2;
			var mass2 = 2;
			var body2 = new cp.Body(mass2, cp.momentForCircle(mass2, 10, radius2, cp.v(0,110)))
			body2.setPos(cp.v.add(cp.v( pos.x, pos.y), boxOffset));
			//this.space.addBody(body2);
			var shape2 = new cp.CircleShape(body2, radius2, cp.v(0,0));
			//this.space.addShape(shape2);
			shape2.setElasticity(0.1);
			shape2.setFriction(0);	
	
        // init physics
        var radius = 0.95 * this.sprite.getContentSize().width / 2;

        this.sprite.setBody(this.body);
		
		var POS_A = function() { return cp.v.add(boxOffset, pos); };
		this.space.addConstraint(new cp.PivotJoint(body2, space.staticBody, POS_A()));
		this.body.setAngle(0);
		this.space.addConstraint(new cp.SimpleMotor(this.body, body2, -Math.PI/2));
		//this.space.addConstraint(new cp.RatchetJoint(this.body, body2, 0, Math.PI/2));
		
		this.space.addConstraint(new cp.DampedSpring(this.body, body2, cp.v(0,0), cp.v(10,10), 1, 4, 0.003));//body+body+?+speed+broke_arrow

        
		this.shape.life=this.life
        //Sensors only call collision callbacks, and never generate real collisions
        this.shape.setSensor(true);
		this.sprite.setTag(this.shape.hashid);
        

        // add sprite to sprite sheet
        this.sprite.runAction(this.hatAction);
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