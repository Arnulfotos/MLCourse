const draw = {};

draw.path = (ctx, path, color = "black") => {//pasamos el contexto, los paths x and y // 5
    ctx.strokeStyle = color;//le damos un color al punto
    ctx.lineWidth = 3;//le damos grosos
    ctx.beginPath();//iniciamos path
    ctx.moveTo(...path[0]);//iniciamos con las coordenadas iniciales del path

    for (let i = 1; i < path.length; i++) {//iteramos por todos los paths

        ctx.lineTo(...path[i]);


    }
    ctx.lineCap = "round";//Estilos
    ctx.lineJoin = "round";
    ctx.stroke();//Y da el strokes

}

draw.paths = (ctx, paths, color = "black") => {//4
    for (const path of paths) {



        draw.path(ctx, path, color)
    }
}

//Osea es, puntos lineas, y paths
//

if (typeof module !== 'undefined') {
    module.exports = draw;
}
