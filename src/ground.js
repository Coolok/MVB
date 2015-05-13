var Ground = cc.Class.extend({
    space:null,
    sprite:null,
    shape:null,
    _map:0,// which map belong to
    get map() {
        return this._map;
    },
    set map(newMap) {
        this._map = newMap;
    },

    /** Constructor
     * @param {cc.SpriteBatchNode *}
     * @param {cp.Space *}
     * @param {cc.p}
     */
    ctor:function (width, height, spriteSheet, space, pos) {
        this.space = space;

		
		
       // this.sprite = new cc.PhysicsSprite("#ground.png");
        var body = new cp.StaticBody();
        body.setPos(cc.p(pos.x+width/2,pos.y+height/2));
        //this.sprite.setBody(body);
        this.name = 'ground'
        this.shape = new cp.BoxShape(body,
           width,
           height);
        this.shape.setCollisionType(SpriteTag.ground);
		this.shape.setElasticity(-.1);
		this.shape.setFriction(0);
        this.space.addStaticShape(this.shape);
        //spriteSheet.addChild(this.sprite);
    },

    removeFromParent:function () {
        this.space.removeStaticShape(this.shape);
        this.shape = null;
        //this.sprite.removeFromParent();
        //this.sprite = null;
    },

    getShape:function () {
        return this.shape;
    }
});