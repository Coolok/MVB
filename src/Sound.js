
var Sound = {
    silence:false,
    _eatEffect:1,
    playMenuBgMusic:function(){//debugger
        if(!Sound.silence)
            cc.audioEngine.playMusic(res.playMenuBgMusic, true);
    },
    playGameBgMusic:function(){
        if(!Sound.silence)
            cc.audioEngine.playMusic("res/sounds/sfx/level_clear2.mp3", true);
    },
	playGameBgLoseMusic:function(){
        if(!Sound.silence)
            cc.audioEngine.playMusic("res/sounds/sfx/level_clear2.mp3", true);
    },
	playGameBgWinMusic:function(){
        if(!Sound.silence)
            cc.audioEngine.playMusic("res/sounds/sfx/level_clear2.mp3", true);
    },
    playFire1:function(){
        if(!Sound.silence)
        {
			cc.audioEngine.playEffect(res.playFire1, false);
           // if(Sound._eatEffect)
            //    cc.audioEngine.stopEffect(Sound._eatEffect);
           // Sound._eatEffect = cc.audioEngine.playEffect("res/sounds/sfx/level_clear2.mp3", false);
        }
    },
	playFire2:function(){
        if(!Sound.silence)
        {
			cc.audioEngine.playEffect(res.playFire2, false);
            //if(Sound._eatEffect)
            //    cc.audioEngine.stopEffect(Sound._eatEffect);
            //Sound._eatEffect = cc.audioEngine.playEffect("res/sounds/sfx/level_clear2.mp3", false);
        }
    },
	playFire3:function(){
        if(!Sound.silence)
        {
			cc.audioEngine.playEffect(res.playFire3, false);
            //if(Sound._eatEffect)
               // cc.audioEngine.stopEffect(Sound._eatEffect);
            //Sound._eatEffect = cc.audioEngine.playEffect("res/sounds/sfx/level_clear2.mp3", false);
        }
    },
    playRocketStart:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playRocketStart, false);
    },
	playRocketEnd:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playRocketEnd, false);
    },
    playButton:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playButton, false);
    },
	playPowChage:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playPowChage, false);
    },
	playPlayerJump:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playPlayerJump, false);
    },
	playPlayerStaminaError:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playPlayerStaminaError, false);
    },
	playPlayerGunHeat:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playPlayerGunHeat, false);
    },
	playPlayerFall:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playPlayerFall, false);
    },
    playPlayerHit:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playPlayerHit, false);
    },
	playPlayerDie:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playPlayerDie, false);
    },
	playBombDie:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playBombDie, false);
    },
	playBomberBombFelt:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playBomberBombFelt, false);
    },
	playBomberFire:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playBomberFire, false);
    },
	playBomberDie:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playBomberDie, false);
    },
	playBallDie:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playBallDie, false);
    },
	playBallHit:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playBallHit, false);
    },
	playBallFire:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playBallFire, false);
    },
	playCharBigDie:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playCharBigDie, false);
    },
	playCharBigHit:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playCharBigHit, false);
    },
	playChickHit:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playChickHit, false);
    },
	playChickDie:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playChickDie, false);
    },
	playChildDie:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playChildDie, false);
    },
	playChildBite:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playChildBite, false);
    },
	playCristallPick:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playCristallPick, false);
    },
	playEagleDie:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playEagleDie, false);
    },
	playEagleHit:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playEagleHit, false);
    },
	playHatDie:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playHatDie, false);
    },
	playHatHit:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playHatHit, false);
    },
	playLazerDie:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playLazerDie, false);
    },
	playLazerFire:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playLazerFire, false);
    },
	playLazerHit:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playLazerHit, false);
    },
	playPinkDie:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playPinkDie, false);
    },
	playPinkHit:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playPinkHit, false);
    },
	playWhiteDie:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playWhiteDie, false);
    },
	playWhiteHit:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playWhiteHit, false);
    },
	playZombyDie:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playZombyDie, false);
    },
	playZombyBite:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playZombyBite, false);
    },
	playZombyHit:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playZombyHit, false);
    },
	playIceBroke:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playIceBroke, false);
    },
	playFireRock:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect(res.playFireRock, false);
    },
    playHurt:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect("res/sounds/sfx/level_clear2.mp3", false);
    },
    playLose:function(){
        if(!Sound.silence)
            cc.audioEngine.playEffect("res/sounds/sfx/level_clear2.mp3", false);
    },
    stop:function(){
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic();
    },
    toggleOnOff:function(){
        /*if(Sound.silence){
            Sound.silence = false;
            cc.audioEngine.setEffectsVolume(1);
            cc.audioEngine.setMusicVolume(1);
        }
        else{
            Sound.silence = true;
            cc.audioEngine.setEffectsVolume(0);
            cc.audioEngine.setMusicVolume(0);
        }*/
		if(cc.audioEngine.getMusicVolume()==0 && cc.audioEngine.getEffectsVolume()==0){
		   cc.audioEngine.setEffectsVolume(100);
		   cc.audioEngine.setMusicVolume(100);
		    Sound.silence = false;
		   //cc.director.resume();
			//cc.director.runScene(new PlayScene());
			//this.removeFromParent();
		} else {
			 Sound.silence = true;
			cc.audioEngine.setEffectsVolume(0);
		   cc.audioEngine.setMusicVolume(0);
		   //cc.director.resume();
			//cc.director.runScene(new PlayScene());
			//this.removeFromParent();
		}
    }
};