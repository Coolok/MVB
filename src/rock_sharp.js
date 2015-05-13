var Rock_sharp = cc.Class.extend({
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
    ctor:function (spriteSheet, space, pos) {
        this.space = space;
//debugger;
		
        this.sprite = new cc.PhysicsSprite("#rock_sharp.png");
        var body = new cp.StaticBody();
        body.setPos(pos);
        this.sprite.setBody(body);

        this.shape = new cp.BoxShape(body,
        this.sprite.getContentSize().width,
        this.sprite.getContentSize().height);
		this.shape2 = new cp.BoxShape(body,
        this.sprite.getContentSize().width,
        this.sprite.getContentSize().height);
        this.shape.setCollisionType(SpriteTag.rock_sharp);
		this.shape.setSensor(true);
        this.space.addStaticShape(this.shape);
		this.space.addStaticShape(this.shape2);
        spriteSheet.addChild(this.sprite);
    },

    removeFromParent:function () {
        this.space.removeStaticShape(this.shape);
        this.shape = null;
        this.sprite.removeFromParent();
        this.sprite = null;
    },

    getShape:function () {
        return this.shape;
    }
});