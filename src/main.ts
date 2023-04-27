class Persona{
    nome: string;
    cognome: string;

    constructor(nome:string,cognome:string){
        this.nome = nome;
        this.cognome = cognome;
      }
}

type verso = () => string;

class Papero extends Persona{
    parla: verso | undefined;
  
    constructor(nome:string,cognome:string, versoAnimale?:verso){
        super(nome,cognome)
        this.parla = versoAnimale; 
    }
}

class AlberoGenealogico{
    radice : Persona;
    famiglia: Array<Persona>;

    constructor(radice: Persona){
        this.radice = radice;
        this.famiglia = [radice];
    }

    addFiglio(figlio: Persona):void {
        this.famiglia.push(figlio);
    }

    rimuovi():Persona|undefined{
        // pila
        return this.famiglia.pop();
        // coda
        // let ret = this.famiglia[0];
        // this.famiglia.splice(0,1);
        // return ret;
    }

    toString(){
        return this.famiglia;
    }
}

const quackmore = new Papero("Quackmore","Duck")
const paperino = new Papero("Paperino","Duck")
const duckFamily = new AlberoGenealogico(quackmore) 
duckFamily.addFiglio(paperino)
console.log("restituito: ",duckFamily.rimuovi());
console.log(duckFamily.toString())
