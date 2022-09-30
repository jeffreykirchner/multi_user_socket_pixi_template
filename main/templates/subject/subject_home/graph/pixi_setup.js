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

    app.tilingSprite = new PIXI.TilingSprite(
        PIXI.Loader.shared.resources['bg_tex'].texture,
        app.pixi_app.screen.width,
        app.pixi_app.screen.height,
    );
    app.tilingSprite.position.set(0,0);

    app.pixi_app.stage.addChild(app.tilingSprite);

    app.pixi_app.ticker.add(app.gameLoop);

    const gr  = new PIXI.Graphics();
    gr.beginFill(0xffffff);
    gr.drawCircle(25, 25, 10);
    gr.endFill();
    app.pixi_app.stage.addChild(gr)
},

gameLoop(delta){
    //app.tilingSprite.tilePosition.x += (1.1 * delta);
    //app.tilingSprite.tilePosition.y += (2.344 * delta);
},
