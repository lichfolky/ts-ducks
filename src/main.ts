interface Printable {
    toString(): string;
}

class Persona implements Printable {
    nome: string;
    cognome: string;

    constructor(nome: string, cognome: string) {
        this.nome = nome;
        this.cognome = cognome;
    }

    toString(): string {
        return this.nome + " " + this.cognome;
    }
}

// optional chaining
let persona = new Persona("aaa", "bb")
//console.log(persona?.nome);

type verso = () => string;

class Papero extends Persona {
    parla: verso | undefined;

    constructor(nome: string, cognome: string, versoAnimale?: verso) {
        super(nome, cognome)
        this.parla = versoAnimale;
    }
}

// Array<string>

class Nodo<Type>{
    value: Type | [Type, Type];
    figli: Array<Nodo<Type>>;
    livello: number;

    constructor(value: Type, livello: number) {
        this.value = value;
        this.figli = [];
        this.livello = livello;
    }

    addPartner(partner: Type) {
        if (!Array.isArray(this.value)) {
            this.value = [this.value, partner]
        }
    }
}

class AlberoGenealogico<Type extends Printable>{
    radice: Nodo<Type>;
    famiglia: Array<Nodo<Type>>;

    constructor(valoreRadice: Type) {
        this.radice = new Nodo(valoreRadice, 0);
        this.famiglia = [this.radice];
    }

    addFiglio(valorePadre: Type | [Type, Type], valoreFiglio: Type | [Type, Type]): void {
        let padreTrovato = this.famiglia.find((nodo) =>
            Array.isArray(nodo.value) ? nodo.value[0] === valorePadre || nodo.value[1] === valorePadre : nodo.value === valorePadre
        )
        if (padreTrovato) {
            let figlio
            if (Array.isArray(valoreFiglio)) {
                figlio = new Nodo(valoreFiglio[0], padreTrovato.livello + 1)
                figlio.addPartner(valoreFiglio[1]);
            } else {
                figlio = new Nodo(valoreFiglio, padreTrovato.livello + 1)
            }
            padreTrovato.figli.push(figlio);
            this.famiglia.push(figlio);
        }
        //padreTrovato?.figli.push(new Nodo(valoreFiglio));
    }

    // vista in ampiezza
    toString() {
        let str = "";
        let daVedere = [this.radice];
        while (daVedere.length > 0) {
            let current = daVedere[0];
            daVedere.splice(0, 1);
            for (let i = 0; i < current.figli.length; i++) {
                daVedere.push(current.figli[i]);
            }
            str += current.livello + ":" + current.value.toString() + ", ";
        }
        return str;
    }


    visitaAmpiezza() {
        let visita = new Array<Array<Type | [Type, Type]>>();
        let daVedere = [this.radice];
        while (daVedere.length > 0) {
            let current = daVedere[0];
            daVedere.splice(0, 1);
            for (const figlio of current.figli) {
                daVedere.push(figlio);
            }
            if (visita[current.livello]) {
                visita[current.livello].push(current.value);
            }
            else {
                visita[current.livello] = new Array<Type | [Type, Type]>(current.value);
            }
        }
        return visita;
    }

    printDom() {
        let visita = this.visitaAmpiezza();
        let tree = document.querySelector(".albero");
        if (tree) {
            for (let i = 0; i < visita.length; i++) {
                this.printLvDom(tree, visita[i], i);
            }
        }
    }

    printLvDom(treeElement: Element, values: (Type | [Type, Type])[], livello: number) {
        //treeElement.innerHTML += "<div>" + this.radice.value + "</div>";
        let lvNode = document.createElement("div");
        lvNode.style.display = "flex";
        lvNode.style.gap = "2rem"
        for (const value of values) {
            let nodeElement = document.createElement("span");
            nodeElement.innerText = value.toString();
            lvNode.append(nodeElement);
        }
        treeElement.append(lvNode);
    }

    // printNodo(value: Type, posizione: number, livello: number) {

    // }

    printCanvas() {
        let visita = this.visitaAmpiezza();
        let tree = document.querySelector(".albero");
        if (tree) {
            for (let i = 0; i < visita.length; i++) {
                this.printCanvasLv(visita[i], i);
            }
        }
    }

    printCanvasLv(visitaLv: (Type | [Type, Type])[], lv: number) {
        for (let j = 0; j < visitaLv.length; j++) {
            this.printCanvasNodo(visitaLv[j].toString(), lv, j);
            console.log("lv: " + j)
        }
    }

    printCanvasNodo(testo: string, lv: number, pos: number) {
        if (canvasEl) {
            const ctx = canvasEl.getContext("2d");
            if (ctx) {
                let marginX = 10;
                let marginY = 10;
                let rectH = 50;
                let rectW = 150;
                ctx.fillStyle = "white";
                ctx.strokeStyle = "#454545";
                // x, y, larghezza, altezza
                ctx.strokeRect(
                    marginX + marginX * pos + rectW * pos,
                    marginY + marginY * lv + rectH * lv,
                    rectW, rectH);
                ctx.fillStyle = "#w";
                ctx.fillStyle = "black";
                ctx.font = "1rem serif";
                ctx.fillText(testo,
                    2 * marginX + marginX * pos + rectW * pos,
                    rectH / 2 + marginY * 1.5 + marginY * lv + rectH * lv);
            }
        }
    }
}

let canvasEl = document.querySelector("canvas");
if (canvasEl) {
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerWidth;
}

const quackmore = new Papero("Quackmore", "Duck")
const della = new Papero("Della", "Duck")
const duck = new Papero("Duck", "?")
const paperino = new Papero("Paperino", "Duck")
const qui = new Papero("Qui", "Duck")
const quo = new Papero("Quo", "Duck")
const qua = new Papero("Qua", "Duck")

const duckFamily = new AlberoGenealogico(quackmore)
duckFamily.addFiglio(quackmore, paperino)
duckFamily.addFiglio(quackmore, [della, duck])
duckFamily.addFiglio(della, qui)
duckFamily.addFiglio(della, quo)
duckFamily.addFiglio(della, qua)
//console.log(duckFamily.toString())
duckFamily.printDom();
duckFamily.printCanvas();

