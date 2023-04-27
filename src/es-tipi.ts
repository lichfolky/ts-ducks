

/*
interface Animale{
  nome: string;
  cognome: string;
  tipo: string;
  // opzionale
  parla: verso | undefined;
}

class Papero implements Animale{
  nome: string;
  cognome: string;
  tipo: string;
  parla: verso | undefined;

  constructor(nome:string,cognome:string, versoAnimale?:verso){
    this.nome = nome;
    this.cognome=cognome;
    this.tipo = "papero";
    this.parla = versoAnimale; 
  }
  
}

//type verso = () => string;
type verso = "Qua Qua" | "bau bau";

let numero = 30;

let paperino = {
    nome:"Paperino",
    cognome:"Duck",
     tipo: "papero",
     parla: undefined
}

let paperoga = {
  nome:"Paperoga",
   tipo: "papero",
   parla: undefined
}

let zioPaperone:Papero = new Papero("Zio Paperone","Duck");


function convertToString(number:number):string{
    let str:string = "" + number;
    return str;
}

// restituisce nomi paperi
// Array<Paperi> -> Array<string>

function getNomiPaperi(paperi:Array<Papero>):Array<string>{
    return paperi.map((roba:{nome:string}) => roba.nome);
}

function getNomiAnimali(paperi:Array<Animale>):Array<string>{
  return paperi.map((roba:{nome:string}) => roba.nome);
}


//let result = [4,5,6].map(elemento => elemento);

//console.log("result " + result)

//let numeroTesto = convertToString(numero);
let nuovoPaperoga = {...paperoga, cognome:"Duck"};

let nomiPaperi = getNomiPaperi([nuovoPaperoga, zioPaperone, paperino]);
console.log(nomiPaperi);

let variabile:undefined;

if(variabile == undefined){

}

if(typeof variabile == undefined){

}*/