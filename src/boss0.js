var Boss0 = cc.Class.extend({
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
    ctor:function (layer, space, pos) {
        this.space = space;
        this.life=2
  //debugger     
        var winSize = cc.winSize;
        ccs.armatureDataManager.addArmatureFileInfo(res.boss0_png, res.boss0_plist, res.boss0_json);
        this._armature = new ccs.Armature("boss0");
        this._armature.getAnimation().play("talk");
        this._armature.scaleX = 0.5;
        this._armature.scaleY = 0.5;
        //this._armature.x = winSize.width / 2 - 150;
        //this._armature.y = winSize.height / 2;
        this._armature.getAnimation().setMovementEventCallFunc(this.animationEventHandler,this);
        //this.addChild(this._armature);

        this._direction = 1;
		
		
		
		
			var contentSize = this._armature.getBoundingBox();
			var mass1 = .5;
			var boxOffset = cp.v(0, 0);	
			this.body = new cp.Body(mass1, cp.momentForBox(mass1, 10, contentSize.width, contentSize.height))
			this.body.setPos(cp.v.add(cp.v( pos.x, pos.y), boxOffset));		
			this._armature.setBody(this.body);
			//this.body.applyForce(cp.v(110, 0), cp.v(0, 0));
			this.space.addBody(this.body);
			var sh = new cp.CircleShape(this.body, contentSize.width/2-10, cp.vzero);
			sh.setCollisionType(SpriteTag.boss0);
			this.shape = this.space.addShape(sh);
			this.shape.setElasticity(1);
			this.shape.setFriction(0);
            this.shape.group = 1;			

	 //debugger
        
      
		

		this.shape.life=this.life
        //Sensors only call collision callbacks, and never generate real collisions
        //this.shape.setSensor(true);
		this._armature.setTag(this.shape.hashid);
        

        // add sprite to sprite sheet
       
        layer.addChild(this._armature, 1);
    },
	
	 animationEventHandler:function (armature, movementType, movementID) {
		//debugger
        if (movementType == ccs.MovementEventType.loopComplete) {
            if (movementID == "talk") {
                //var moveBy = cc.moveBy(2, cc.p(150 * this._direction, 0));
				//debugger
                
                this._armature.runAction(
										cc.sequence(
							//moveBy, 
							cc.delayTime(2),
							cc.callFunc(this.callbackWalk, this)
						)
				);
                //this._armature.getAnimation().play("walk");

                //this._direction *= -1;
            }
			 if (movementID == "walk") {
                //var moveBy = cc.moveBy(2, cc.p(150 * this._direction, 0));
				//debugger
               
                this._armature.runAction(
					cc.sequence(
							//moveBy, 
							cc.delayTime(2),
							cc.callFunc(this.callbackJump, this)
						)
				);
                //this._armature.getAnimation().play("walk");

                //this._direction *= -1;
            }
			if (movementID == "jump") {
                //var moveBy = cc.moveBy(2, cc.p(150 * this._direction, 0));
				//debugger	
                
                this._armature.runAction(
					cc.sequence(
							//moveBy, 
							cc.delayTime(2),
							cc.callFunc(this.callbackTalk, this)
						)
				);
                //this._armature.getAnimation().play("walk");

                //this._direction *= -1;
            }
        }
    },
	callbackJump:function () {
		//debugger;
		this._armature.stopAllActions();
        //this._armature.runAction(cc.scaleTo(0.1, 0.5 * this._direction * -1, 0.5));
        this._armature.getAnimation().play("jump", 10);
    },
	callbackTalk:function () {
		//debugger;
		this._armature.stopAllActions();
        //this._armature.runAction(cc.scaleTo(0.1, 0.5 * this._direction * -1, 0.5));
        this._armature.getAnimation().play("talk", 10);
    },
	callbackWalk:function () {
		//debugger;
		this._armature.stopAllActions();
        //this._armature.runAction(cc.scaleTo(0.1, 0.5 * this._direction * -1, 0.5));
        this._armature.getAnimation().play("walk", 10);
    },
    callbackRotat:function () {
		//debugger
        this._armature.runAction(cc.scaleTo(0.1, 0.5 * this._direction * -1, 0.5));
        this._armature.getAnimation().play("talk", 10);
    },

    removeFromParent:function () {
        this.space.removeShape(this.shape);
        this.shape = null;
        this._armature.removeFromParent();
        this._armature = null;
    },

    getShape:function () {
        return this.shape;
    }
});