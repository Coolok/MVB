var Car = cc.Class.extend({
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
            var str = "car0" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
		
		var animFramesTmp = animFrames.slice();
		var animFramesR = animFramesTmp.concat(animFrames.reverse());
		
	    var animation = new cc.Animation(animFramesR, 0.1);
        this.carAction = new cc.RepeatForever(new cc.Animate(animation));
        this.carAction.retain();	


		var boxOffset = cp.v(0, 0);
		 this.sprite = new cc.PhysicsSprite("#car00.png");
			var mass1 = 1;
			var contentSize = this.sprite.getContentSize();

			this.body = new cp.Body(mass1, cp.momentForBox(mass1, 10, contentSize.width, contentSize.height, cp.v(0,0)))
			this.body.setPos(cp.v.add(cp.v( pos.x, pos.y), boxOffset));
			this.space.addBody(this.body);
	

		var radius2 = contentSize.width/2;
			var mass2 = 2;
			var body2 = new cp.Body(mass2, cp.momentForCircle(mass2, 10, radius2, cp.v(0,110)))
			body2.setPos(cp.v.add(cp.v( pos.x, pos.y), boxOffset));
			//this.space.addBody(body2);

	
        // init physics
        var radius = 0.95 * this.sprite.getContentSize().width / 2;

        //this.sprite.setBody(this.body);
		
//////////////////////////////////////////////////
//debugger

var v = cp.v;
var posA = v( pos.x+50, pos.y+60);
var posB = v(pos.x+110, pos.y+60);
		var addWheel = function(pos,this_space,that)
	{
		var radius = 15;
		var mass = 1;
		var body = this_space.addBody(new cp.Body(mass, cp.momentForCircle(mass, 0, radius, v(0,0))));
		body.setPos(v.add(pos, boxOffset));
		var sh = new cp.CircleShape(body, radius, v(0,0));
		sh.setCollisionType(SpriteTag.car);
		var shape = this_space.addShape(sh);
		shape.setElasticity(1);
		shape.setFriction(1);
		shape.group = 1; // use a group to keep the car parts from colliding
		
		return body;
	};		
	
	var addChassis = function(pos, this_space, that)
	{
		var mass = 1;
		var width = 80;
		var height = 30;
		
		var body = this_space.addBody(new cp.Body(mass, cp.momentForBox(mass, width, height)));
		body.setPos(v.add(pos, boxOffset));
		var sh = new cp.BoxShape(body, width, height);
		sh.setCollisionType(SpriteTag.car);
		var shape = this_space.addShape(sh);
		shape.setElasticity(1);
		shape.setFriction(1);
		shape.group = 1; // use a group to keep the car parts from colliding
		
		return body;
	};

// Make a car with some nice soft suspension
	boxOffset = v(0, 0);
	this.wheelSprite1 = new cc.PhysicsSprite("#wheel1.png");
	this.wheelSprite2 = new cc.PhysicsSprite("#wheel2.png");
	this.wheel1 = addWheel(posA, this.space);
	this.wheel2 = addWheel(posB, this.space);
	this.wheelSprite1.setBody(this.wheel1);
	this.wheelSprite2.setBody(this.wheel2);
	
	this.chassis = addChassis(v(pos.x+80, pos.y+100), this.space);
	//this.chassis.applyImpulse(cp.v(111, 1), cp.v(111, 1));//run speed
	//this.chassis.applyForce(cp.v(220, 30), cp.v(220, 30));
	this.wheel2.setAngle(11);
	this.sprite.setBody(this.chassis);
	this.space.addConstraint(new cp.GrooveJoint(this.chassis, this.wheel1, v(-30, -10), v(-30, -25), v(0,0)));
	this.space.addConstraint(new cp.GrooveJoint(this.chassis, this.wheel2, v( 30, -10), v( 30, -25), v(0,0)));
	//this.space.addConstraint(new cp.SimpleMotor(this.wheel1, this.wheel2, Math.PI));
	//this.space.addConstraint(new cp.DampedRotarySpring(this.wheel1, this.wheel2, 0, 3000, 60));
	this.space.addConstraint(new cp.DampedSpring(this.chassis, this.wheel1, v(-30, 0), v(0,0), 50, 20, 10));
	this.space.addConstraint(new cp.DampedSpring(this.chassis, this.wheel2, v( 30, 0), v(0,0), 50, 20, 10));
///////////////////////////////////

		
		/*var POS_A = function() { return cp.v.add(boxOffset, pos); };
		this.space.addConstraint(new cp.PivotJoint(body2, space.staticBody, POS_A()));
		this.body.setAngle(0);
		//this.space.addConstraint(new cp.SimpleMotor(this.body, body2, -Math.PI/2));
		this.space.addConstraint(new cp.RatchetJoint(this.body, body2, 0, Math.PI/2));
		
		this.space.addConstraint(new cp.DampedSpring(this.body, body2, cp.v(0,0), cp.v(10,10), 10, 5, 0.03));//body+body+?+speed+broke_arrow
*/
        
		
        //Sensors only call collision callbacks, and never generate real collisions
       // this.shape.setSensor(true);
		//this.sprite.setTag(this.shape.hashid);
        

        // add sprite to sprite sheet
        this.sprite.runAction(this.carAction);
		spriteSheet.addChild(this.wheelSprite1, 1);
		spriteSheet.addChild(this.wheelSprite2, 1);
        spriteSheet.addChild(this.sprite, 1);
    },

    removeFromParent:function () {
        this.space.removeShape(this.wheel1.shapeList[0]);
		this.space.removeShape(this.wheel2.shapeList[0]);
		this.space.removeShape(this.chassis.shapeList[0]);
        this.wheel1 = null;
		this.wheel2 = null;
		this.chassis = null;
        this.sprite.removeFromParent();
        this.sprite = null;
		this.wheelSprite1.removeFromParent();
        this.wheelSprite1 = null;
		this.wheelSprite2.removeFromParent();
        this.wheelSprite2 = null;
    },

    getShape:function () {
        return this.shape;
    }
});