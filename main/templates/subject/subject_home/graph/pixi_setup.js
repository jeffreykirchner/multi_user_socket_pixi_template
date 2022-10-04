{% load static %}

/**
 * update the pixi players with new info
 */
setupPixi(){    
    app.resetPixiApp();
    PIXI.Loader.shared.add("{% static graph_sprite_sheet %}")
                      .add('bg_tex',"{% static 'background_tile_low.jpg'%}")
                      .load(app.setupPixiSheets);
},

resetPixiApp(){
    let canvas = document.getElementById('sd_graph_id');
    //     ctx = canvas.getContext('2d');

    // app.canvas_width = ctx.canvas.width;
    // app.canvas_height = ctx.canvas.height;

    app.pixi_app = new PIXI.Application({resizeTo : canvas,
                                        backgroundColor : 0xFFFFFF,
                                        autoResize: true,
                                        antialias: false,
                                        resolution: 1,
                                        view: canvas });

    app.canvas_width = canvas.width;
    app.canvas_height = canvas.height;


    //add background rectangle
    // let background = new PIXI.Graphics();
    // background.beginFill(0xffffff);
    // background.drawRect(0, 0, canvas.width, canvas.height);
    // background.endFill();

    // background.interactive = true;
    // background.on("pointerup", app.handleStagePointerUp)
    //           .on("pointermove", app.handleStagePointerMove);
    // app.pixi_app.stage.addChild(background);

},

/** load pixi sprite sheets
*/
setupPixiSheets(){
    app.sprite_sheet = PIXI.Loader.shared.resources["{% static graph_sprite_sheet %}"].spritesheet;
    //app.background_tile_tex = PIXI.Texture.from("{% static 'sprite_sheet.png' %}");
    app.background_tile_tex = app.sprite_sheet.textures["background_tile_a_1024.png"]

    // app.grid_x = 11;
    // app.grid_y = 5;

    // app.grid_y_padding = 30;

    // app.canvas_scale_height = app.canvas_height / app.grid_y;
    // app.canvas_scale_width = app.canvas_width / app.grid_x;
    // app.canvas_scale = app.canvas_scale_height /  app.house_sprite.height;

    // app.pixi_loaded = true;
    // app.setupPixiPlayers();

    //layout for testing
    //app.setupGrid();

    //add background tile
    //app.pixi_app.screen.width,
    //app.pixi_app.screen.height,

    app.background = new PIXI.Graphics();
    app.background.beginFill(0xffffff);
    app.background.drawRect(0, 0, app.stage_width, app.stage_height);
    app.background.endFill();
    //app.background.scale.set(app.pixi_scale, app.pixi_scale);
    //app.background.pivot.set(app.stage_width/2, app.stage_height/2);

    // background.interactive = true;
    // background.on("pointerup", app.handleStagePointerUp)
    //           .on("pointermove", app.handleStagePointerMove);
    app.pixi_app.stage.addChild(app.background);

    let tilingSprite = new PIXI.TilingSprite(
        PIXI.Loader.shared.resources['bg_tex'].texture,
        app.pixi_app.screen.width,
        app.pixi_app.screen.height,
    );
    tilingSprite.position.set(0,0);

    tilingSprite.interactive = true;
    tilingSprite.on("pointerup", app.handleStagePointerUp);

    app.background.addChild(tilingSprite);

    app.pixi_app.ticker.add(app.gameLoop);
    
    if(app.pixi_mode=="subject")
    {
        app.pixi_target = new PIXI.Graphics();
        app.pixi_target.lineStyle(3, 0x000000);
        app.pixi_target.alpha = 0.33;
        app.pixi_target.drawCircle(0, 0, 10);
        //app.pixi_target.scale.set(app.pixi_scale, app.pixi_scale);
        app.background.addChild(app.pixi_target)
    }
},

gameLoop(delta){
    app.movePlayer(delta);
    app.updateOffsets(delta);    
},

updateZoom(){
    app.background.scale.set(app.pixi_scale, app.pixi_scale);
    //app.background.x += (app.background.x*app.pixi_scale);
   // app.background.y += (app.background.y*app.pixi_scale);

    if(app.pixi_mode=="subject")
    {
        app.pixi_target.scale.set(app.pixi_scale, app.pixi_scale);

        // app.pixi_target.x *= app.pixi_scale;
        // app.pixi_target.y *= app.pixi_scale;

        // app.current_location.x *= app.pixi_scale;
        // app.current_location.y *= app.pixi_scale;

        // app.target_location.x *= app.pixi_scale;
        // app.target_location.y *= app.pixi_scale;
    }
},

movePlayer(delta){

    if(app.target_location.x !=  app.current_location.x ||
       app.target_location.y !=  app.current_location.y )
    {
        
        let noX = false;
        let noY = false;
        let temp_move_speed = (app.move_speed * delta);

        let temp_angle = Math.atan2(app.target_location.y - app.current_location.y,
                                    app.target_location.x - app.current_location.x)

        if(!noY){
            if(Math.abs(app.target_location.y - app.current_location.y) < temp_move_speed)
                app.current_location.y = app.target_location.y;
            else
                app.current_location.y += temp_move_speed * Math.sin(temp_angle);
        }

        if(!noX){
            if(Math.abs(app.target_location.x - app.current_location.x) < temp_move_speed)
                app.current_location.x = app.target_location.x;
            else
                app.current_location.x += temp_move_speed * Math.cos(temp_angle);        
        }
    }

},

updateOffsets(delta){
    
    offset = app.getOffset();

    app.background.x = -offset.x;
    app.background.y = -offset.y;
    
    if(app.pixi_mode=="subject")
    {
        app.pixi_target.x = app.target_location.x;
        app.pixi_target.y = app.target_location.y;
    }
},

getOffset(){
    return {x:app.current_location.x * app.pixi_scale - app.pixi_app.screen.width/2,
            y:app.current_location.y * app.pixi_scale - app.pixi_app.screen.height/2};
},

/**
 *pointer up on stage
 */
 handleStagePointerUp(event){

    offset = app.getOffset();

    //console.log('Stage up: ' + event);
    //app.turnOffHighlights();
    if(app.pixi_mode=="subject")
    {
        let local_pos = event.data.getLocalPosition(event.currentTarget);
        app.target_location.x = local_pos.x;
        app.target_location.y = local_pos.y;
    }
},

