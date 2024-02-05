



//% color=#f84c08
namespace hundred {

    export let projectile: Sprite = null
    let numItems = 0;



    export enum ScrollDir {
        //% block="left"
        //% jres=ICON.long-left-arrow-white
        Left = -50,
        //% block="right"
        //% jres=ICON.long-right-arrow-white
        Right = 50,
        //% block="up"
        //% jres=ICON.long-up-arrow-white
        Up = -50,
        //% block="down"
        //% jres=ICON.long-down-arrow-white
        Down = 50,
        //% block="stop"
        //% jres=ICON.hand-pause-white
        Stop=0
    }


    export enum Durs {
        //% block="fast"
        //% jres=ICON.rabbit-white
        Fast = 75,
        //% block="slow"
        //% jres=ICON.turtle-white
        Slow = 225
    }


    /**
     * Run code when the play button is pressed
     * (Like on start, but jr)
     */
    //% color=#a62e08
    //% help=game/on-start-simple 
    //% weight=99 
    //% afterOnStart=false
    //% blockId=on_start_simple 
    //% block="on `ICON.play`"
    //% blockAllowMultiple=0
    export function onStartSimple(a: () => void): void {
        a();
    }


    /**
    * Play music in background
    */
    //% blockId=play_music
    //% color=#e000bf
    //% block="`ICON.music-play-white` $thisSong"
    //% thisSong.shadow=music_song_field_editor
    //% help=github:docs/play_music
    export function playSong(thisSong: music.Playable) {
        music.play(thisSong, music.PlaybackMode.InBackground)
    }

    /**
    * Repeat music in background
    */
    //% blockId=repeat_music
    //% color=#e000bf
    //% block="`ICON.music-repeat-white` $thisSong"
    //% thisSong.shadow=music_song_field_editor
    //% help=github:docs/repeat_music
    export function repeatSong(thisSong: music.Playable) {
        music.play(thisSong, music.PlaybackMode.LoopingInBackground)
    }


    /**
    * Play soundeffect in background
    */
    //% blockId=play_sef
    //% color=#e000bf
    //% block="`ICON.music-play-white` $thisSound"
    //% thisSound.shadow=soundExpression_createSoundEffect
    //% help=github:docs/play_sef
    export function playSound(thisSound: music.Playable) {
        music.play(thisSound, music.PlaybackMode.InBackground)
    }



    /**
    * Stop sounds
    */
    //% blockId=stop_sounds
    //% color=#e000bf
    //% block="`ICON.music-stop-white` `ICON.music-note-white`"
    //% thisSound.shadow=soundExpression_createSoundEffect
    //% help=github:docs/stop_sounds
    export function stopSounds() {
        music.stopAllSounds()
    }


    /**
    * Set Scene (No Scrolling)
    */
    //% blockId=set_scene
    //% block="scene $thisScene"
    //% thisScene.shadow=screen_image_picker
    //% help=github:docs/set_scene
    export function setScene(thisScene: Image) {
        scene.setBackgroundImage(thisScene)
    }


    /**
    * Add thing that will be projectile
    */
    //% blockId=add_thing
    //% block="add $thisImg"
    //% thisImg.shadow=screen_image_picker
    //% help=github:docs/add_thing
    export function addThing(thisImg: Image) {
        hundred.projectile = sprites.createProjectileFromSide(thisImg, -90, 0)
        hundred.projectile.y = randint(40, 100)
    }

   

    /**
     * Register code run when a controller event occurs
    * @param event
    * @param handler
    */
    //% weight=99 blockGap=8
    //% blockId=ctrlonA block="on `ICON.a-button-white-invert`"
    //% color=#a62e08
    //% help=docs/on-a
    export function onA(handler: () => void) {
        controller.A.onEvent(ControllerButtonEvent.Pressed, handler)
    }

    /**
    * Special win sequence
    */
    //% blockId=set_win
    //% color=#8854D0
    //% block="game over `ICON.smile-beam-white`"
    //% help=github:docs/set_win
    export function setWin() {
        game.setGameOverMessage(true, "That's " + numItems +"!")
        game.gameOver(true)
    }

    /**
    * Special animation sequence
    */
    //% blockId=set_ani
    //% color=#058954
    //% block="$thisAn $thisSpeed"
    //% thisAn.shadow=animation_editor
    //% thisSpeed.defl=hundred.Durs.Fast
    //% thisSpeed.fieldEditor="imagedropdown"
    //% thisSpeed.fieldOptions.columns="1"
    //% thisSpeed.fieldOptions.width="200"
    //% thisSpeed.fieldOptions.maxRows=4
    //% help=github:docs/set_ani
    export function setAni(thisAn:Image[], thisSpeed:hundred.Durs) {
        animation.runImageAnimation(
            hundred.projectile,
            thisAn,
            thisSpeed,
            true
        )
    }

    /**
    * Pause for thisTime ms
    */
    //% blockId=kid_pause
    //% color=#10bc56
    //% block="`ICON.hand-pause-white` $thisTime (ms)"
    //% thisTime.defl=100
    //% help=github:docs/kid_pause
    export function kidPause(thisTime:number) {
        pause(thisTime)
    }

    /**
    * Scroll background in direction
    */
    //% blockId=kid_scroll
    //% color=#fb7aa0
    //% block="scroll $thisImg $thisWay"
    //% thisImg.shadow=screen_image_picker
    //% thisWay.defl=left
    //% thisWay.fieldEditor="imagedropdown"
    //% thisWay.fieldOptions.columns="1"
    //% thisWay.fieldOptions.width="200"
    //% thisWay.fieldOptions.maxRows=4
    //% help=github:docs/kid_scroll
    export function kidScroll(thisImg:Image, thisWay:hundred.ScrollDir) {

        scene.setBackgroundImage(thisImg)
        if (thisWay != hundred.ScrollDir.Left && thisWay != hundred.ScrollDir.Right ) {
            scroller.scrollBackgroundWithSpeed(0, thisWay)
        } else {
            scroller.scrollBackgroundWithSpeed(thisWay,0)
        }
    }



    //% block="`ICON.arrow-loop-white` x $times"
    //% times.defl=100
    //% color=#10bc56
    //% handlerStatement
    export function loopThis(times: number, handler: () => void): void {
        numItems = times;
        for (let index = 0; index < times; index++) {
            handler();
        }
    }

}
