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

// Array<string>

class Nodo<Type>{
    value:Type;
    constructor(value: Type){
        this.value = value;
    } 
}

class AlberoGenealogico<Type>{
    radice : Nodo<Type>;
    famiglia: Array<Nodo<Type>>;

    constructor(valoreRadice: Type){
        this.radice = new Nodo(valoreRadice);
        this.famiglia = [this.radice];
    }

    addFiglio(figlio: Type):void {
        this.famiglia.push(new Nodo(figlio));
    }

    rimuovi():Type|undefined{
        // pila
        return this.famiglia.pop()?.value;
        // coda
        // let ret = this.famiglia[0];
        // this.famiglia.splice(0,1);
        // return ret;
    }

    toString(){
        return this.famiglia.map(nodo => nodo.value);
    }
}

const quackmore = new Papero("Quackmore","Duck")
const paperino = new Papero("Paperino","Duck")
const duckFamily = new AlberoGenealogico(quackmore) 
duckFamily.addFiglio(paperino)
console.log(duckFamily.toString())
