var textInputGetRect = function (node) {
    var rc = cc.rect(node.x, node.y, node.width, node.height);
    rc.x -= rc.width / 2;
    rc.y -= rc.height / 2;
    return rc;
};
var InputLayer = cc.Layer.extend({
    _textField:null,
    _textFieldAction:null,
    _action:false,
    _charLimit:0, // the textfield max char limit

    ctor:function () {
        this._super();
		 if( 'touches' in cc.sys.capabilities ){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesEnded: this.onTouchesEnded
            }, this);
        } else if ('mouse' in cc.sys.capabilities )
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: this.onMouseUp
            }, this);
    },

    callbackRemoveNodeWhenDidAction:function (node) {
        this.removeChild(node, true);
    },
	
	 onMouseUp:function (event) {
        var target = event.getCurrentTarget();
        if (!target._trackNode)
            return;

        var point = event.getLocation();

        // decide the trackNode is clicked.
        cc.log("KeyboardNotificationLayer:clickedAt(" + point.x + "," + point.y + ")");

        var rect = textInputGetRect(target._trackNode);
        cc.log("KeyboardNotificationLayer:TrackNode at(origin:" + rect.x + "," + rect.y
            + ", size:" + rect.width + "," + rect.height + ")");

        target.onClickTrackNode(cc.rectContainsPoint(rect, point));
        cc.log("----------------------------------");
    },

    // KeyboardNotificationLayer
    subtitle:function () {
        return "CCTextFieldTTF with action and char limit test";
    },
    onClickTrackNode:function (clicked) {
        var textField = this._trackNode;
        if (clicked) {
            // TextFieldTTFTest be clicked
            cc.log("TextFieldTTFActionTest:CCTextFieldTTF attachWithIME");
            textField.attachWithIME();
        } else {
            // TextFieldTTFTest not be clicked
            cc.log("TextFieldTTFActionTest:CCTextFieldTTF detachWithIME");
            textField.detachWithIME();
        }
    },

    //CCLayer
    onEnter:function () {
        this._super();

        this._charLimit = 20;
        this._textFieldAction = cc.sequence(
            cc.fadeOut(0.25),
            cc.fadeIn(0.25)
        ).repeatForever();
        this._action = false;

        // add CCTextFieldTTF
        var winSize = cc.director.getWinSize();

        this._textField = new cc.TextFieldTTF('click to enter you name',"Showcard Gothic", 30);
		//debugger
        this.addChild(this._textField);
        this._textField.setDelegate(this);

        this._textField.x = winSize.width / 2;
        this._textField.y = winSize.height / 6;
        this._trackNode = this._textField;
    },

    //CCTextFieldDelegate
    onTextFieldAttachWithIME:function (sender) {
        if (!this._action) {
            this._textField.runAction(this._textFieldAction);
            this._action = true;
        }
        return false;
    },
    onTextFieldDetachWithIME:function (sender) {
        if (this._action) {
            this._textField.stopAction(this._textFieldAction);
            this._textField.opacity = 255;
            this._action = false;
        }
        return false;
    },
    onTextFieldInsertText:function (sender, text, len) {
        // if insert enter, treat as default to detach with ime
        if ('\n' == text) {
            return false;
        }

        // if the textfield's char count more than m_nCharLimit, doesn't insert text anymore.
        if (sender.getCharCount() >= this._charLimit) {
            return true;
        }

        // create a insert text sprite and do some action
        var label = new cc.LabelTTF(text, "Showcard Gothic", 30);
        this.addChild(label);
        var color = cc.color(2,146,69);
        label.color = color;

        // move the sprite from top to position
        var endX = sender.x, endY = sender.y;
        if (sender.getCharCount()) {
            endX += sender.width / 2;
        }

        var duration = 0.5;
        label.x = endX;
        label.y = cc.director.getWinSize().height - label.height * 2;
        label.scale = 8;

        var seq = cc.sequence(
            cc.spawn(
                cc.moveTo(duration, cc.p(endX, endY)),
                cc.scaleTo(duration, 1),
                cc.fadeOut(duration)),
            cc.callFunc(this.callbackRemoveNodeWhenDidAction, this));
        label.runAction(seq);
        return false;
    },

    onTextFieldDeleteBackward:function (sender, delText, len) {
        // create a delete text sprite and do some action
        var label = new cc.LabelTTF(delText, "Showcard Gothic", 30);
        this.addChild(label);

        // move the sprite to fly out
        var beginX = sender.x, beginY = sender.y;
        beginX += (sender.width - label.width) / 2.0;

        var winSize = cc.director.getWinSize();
        var endPos = cc.p(-winSize.width / 4.0, winSize.height * (0.5 + Math.random() / 2.0));

        var duration = 1;
        var rotateDuration = 0.2;
        var repeatTime = 5;
        label.x = beginX;
        label.y = beginY;

        var seq = cc.sequence(
            cc.spawn(
                cc.moveTo(duration, endPos),
                cc.rotateBy(rotateDuration, (Math.random() % 2) ? 360 : -360).repeat(repeatTime),
                cc.fadeOut(duration)),
            cc.callFunc(this.callbackRemoveNodeWhenDidAction, this));
        label.runAction(seq);
        return false;
    },
    onDraw:function (sender) {
        return false;
    }
});