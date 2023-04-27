interface Printable{
    toString():string;
}

class Persona implements Printable{
    nome: string;
    cognome: string;

    constructor(nome:string,cognome:string){
        this.nome = nome;
        this.cognome = cognome;
      }

    toString(): string {
        return this.nome + " " + this.cognome;
    }
}

// optional chaining
let persona = new Persona("aaa","bb")
//console.log(persona?.nome);

type verso = () => string;

class Papero extends Persona{
    parla: verso | undefined;
  
    constructor(nome:string,cognome:string, versoAnimale?:verso){
        super(nome,cognome)
        this.parla = versoAnimale; 
    }
}

// Array<string>

class Nodo<Type extends Printable>{
    value:Type;
    figli: Array<Nodo<Type>>;

    constructor(value: Type){
        this.value = value;
        this.figli = [];
    } 
}

class AlberoGenealogico<Type extends Printable>{
    radice : Nodo<Type>;
    famiglia: Array<Nodo<Type>>;

    constructor(valoreRadice: Type){
        this.radice = new Nodo(valoreRadice);
        this.famiglia = [this.radice];
    }

    addFiglio(valorePadre:Type, valoreFiglio: Type):void {
        let padreTrovato = this.famiglia.find((nodo)=>nodo.value === valorePadre);
        if(padreTrovato){
            let figlio = new Nodo(valoreFiglio)
            padreTrovato.figli.push(figlio);
            this.famiglia.push(figlio);
        }
        //padreTrovato?.figli.push(new Nodo(valoreFiglio));
    }

    rimuovi():Type|undefined{
        // pila
        return this.famiglia.pop()?.value;
        // coda
        // let ret = this.famiglia[0];
        // this.famiglia.splice(0,1);
        // return ret;
    }

    // vista in ampiezza
    toString(){
        let str = "";
        let daVedere = [this.radice];
        while(daVedere.length>0){
            let current = daVedere[0];
            daVedere.splice(0,1);
            for (const figlio of current.figli) {
                daVedere.push(figlio);
            }
            str += current.value.toString() + ", ";
        }
        return str;
    }
}

const quackmore = new Papero("Quackmore","Duck")
const della = new Papero("Della","Duck")
const paperino = new Papero("Paperino","Duck")
const qui = new Papero("Qui","Duck")
const quo = new Papero("Quo","Duck")
const qua = new Papero("Qua","Duck")

const duckFamily = new AlberoGenealogico(quackmore) 
duckFamily.addFiglio(quackmore,paperino)
duckFamily.addFiglio(quackmore,della)
duckFamily.addFiglio(della,qui)
duckFamily.addFiglio(della,quo)
duckFamily.addFiglio(della,qua)
console.log(duckFamily.toString())
