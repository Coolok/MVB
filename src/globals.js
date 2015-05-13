var g_groundHeight = 60;
var g_runnerStartX = 80;
var MAP_COUNT =4;
var LEVELS_ON_MAP_COUNT = 3;//(0,1,2,3)

if(typeof TagOfLayer == "undefined") {
    var TagOfLayer = {};
    TagOfLayer.background = 0;
    TagOfLayer.Animation = 1;
    TagOfLayer.GameLayer = 2;
    TagOfLayer.Status = 3;
	TagOfLayer.Winner = 4;
	TagOfLayer.Map = 5;
	TagOfLayer.Shop = 6;
	TagOfLayer.FrontLayer = 7;
	TagOfLayer.BackLayer = 8;
};

// collision type for chipmunk
if(typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.runner = 16;
    SpriteTag.coin = 1;
    SpriteTag.rock = 2;
	SpriteTag.charBig = 3;
	SpriteTag.rocket = 4;
	SpriteTag.fire = 5;
	SpriteTag.pink = 6;
	SpriteTag.chick = 7;
	SpriteTag.eagle = 8;
	SpriteTag.hat = 9;
	SpriteTag.white = 10;
	SpriteTag.car = 11;
	SpriteTag.ice = 12;
	SpriteTag.bomb = 13;
	SpriteTag.zomby = 14;
	SpriteTag.chick_child = 15;
	SpriteTag.bomber = 17;
	SpriteTag.bombers_bomb = 18;
	SpriteTag.ground = 19;
	SpriteTag.dragonFire = 20;
	SpriteTag.ball = 21;
	SpriteTag.balls_bomb = 22;
	SpriteTag.lazer = 23;
	SpriteTag.lazerFire = 24;
	SpriteTag.rock_sharp = 25;
	SpriteTag.boss0 = 26;
	SpriteTag.boss0Fire = 27;
};