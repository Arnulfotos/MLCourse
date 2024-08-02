class SketchPad {

    constructor(container, size = 400) { // Al iniciar el objeto, pasandole un contenedos div y un tamaño
        this.canvas = document.createElement("canvas"); // Creamos el elemento canvas
        this.canvas.width = size;//Les damos un tamaño 
        this.canvas.height = size;
        this.canvas.style = `
        background-color:white;
        box-shadow: 0px 0px 10px 2px black;
        `;//Les damos estilo
        container.appendChild(this.canvas);//agregamos el canvas al container
        const lineBreak = document.createElement("br");//creamor un br
        container.appendChild(lineBreak);//lo agregamos al container
        this.undoBtn = document.createElement("button");//lo mismo...
        this.undoBtn.innerHTML = "UNDO"
        container.appendChild(this.undoBtn)
        this.ctx = this.canvas.getContext("2d");//NOs traemos el contexto de trabajo
        this.reset()
        this.#addEventListeners();//Iniciamos 

    }
    reset() {
        this.paths = [];//Iniciamos el array de dibujos, por que los dibujos solo son un conjunto de trazos
        this.isDrawing = false;//NO estamos dibujando, y lo declaramos
        this.#reDraw()
    }

    #addEventListeners() {
        this.canvas.onmousedown = (evt) => {
            const mouse = this.#getMouse(evt);//Trae las coordenadas el mouse

            this.paths.push([mouse])//Inica un array, 2D con los valores de mouse
            this.isDrawing = true; // Comunicamos que isDrawing is true
        }//1

        this.canvas.onmousemove = (evt) => {//Mientras el mouse de mueva
            if (this.isDrawing) {//Evaluamos que el mouse este dibujando
                const mouse = this.#getMouse(evt);//trae las coordenadas

                const lastPath = this.paths[this.paths.length - 1]


                lastPath.push(mouse)//Agregale el nuevo dibujo, esto es un array que le agregaras otro array
                this.#reDraw();//MOuestralo en pantalla
            }//2
        }




        document.onmouseup = () => {
            this.isDrawing = false;//Terminamos el dibujo
        }


        this.canvas.ontouchstart = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousedown(loc)
        }
        this.canvas.ontouchmove = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousemove(loc)
        }
        document.ontouchend = (evt) => {
            document.onmouseup()
        }
        this.undoBtn.onclick = () => {
            this.paths.pop();
            this.#reDraw();
        }


    }

    #reDraw() {//3
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)//limpia el canva

        draw.paths(this.ctx, this.paths)//dibuja los paths
        if (this.paths.length > 0) {
            this.undoBtn.disabled = false
        } else {
            this.undoBtn.disabled = true

        }
    }

    #getMouse = (evt) => {
        const rect = this.canvas.getBoundingClientRect();//trae los margenes del cuadro

        return [
            Math.round(evt.clientX - rect.left),//resta el margen menos la posicion
            Math.round(evt.clientY - rect.top)
        ]
    }





}

//Hay que leer las coordenadas
//ponerlas en un array
//Cada que estes alimentando el array, dibuja

/* Todo esto es un array tridimensional, que tiene muntos los cuales se van construyendo 

Iniciamos un array 2D, le metemos los valores iniciales de array, una vez que comenzamos a dibujar, llamamos a ese array 2d y le comenzamos a meter mas arrrays con puntos. Una vez temrinado el dobujo, y si se vuelve a dibujar, se inicia otro arra

Es un array(dibujo) de arrays(lineas) de arryas (puntos)
*/