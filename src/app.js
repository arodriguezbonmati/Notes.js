import fs from 'fs';
import yargs from 'yargs';
import chalk from 'chalk';
import uuid from 'uuid'; 

let obj;



const add = function(argv){
    const nota = {
        uuid: uuid.v4(),
        title: argv.title,
        body: argv.body,
        author: argv.author
    }
    obj.notes.push(nota);
}


yargs.command ({
    command: 'add',
    describe: 'add a new note',
    builder : {
        title:{
            describe: 'Title of a note',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Body of a note',
            demandOption: true,
            type: 'string'
        },
        author:{
            describe: 'Author of a note',
            demandOption: true,
            type: 'string'
        }
    },

    handler:add,
    
})

yargs.command ({
    command: 'list',
    describe: 'print notes',
    
    handler: function(argv){
        obj.notes.forEach((element, index) => {
            console.log(element.title + " -- " + index)
            
        });
    }
    
})

yargs.command ({
    command: 'read',
    describe: 'read notes',
    builder : {
        id:{
            describe: 'id',
            demandOption: true,
            type: Number
        },
    handler: function(argv){
        obj.notes.forEach((valor, indice)=>{
            if(argv.id === indice){
                console.log(valor.title),
                console.log(valor.body),
                console.log(valor.author)
            }

        })        
    }
    }
})

const path = './notas.txt';
fs.access(path, fs.F_OK, (err) => {
  if (err) {
    fs.writeFileSync("notas.txt", "");
  }
  const data = fs.readFileSync("notas.txt").toString();
 // console.log(`archivo: ${data}`);

  if(data !== ""){
      obj = JSON.parse(data);
  }else{
      obj = {
          notes: [

          ]
      }
    };
    yargs.parse();
    fs.writeFileSync("notas.txt", JSON.stringify(obj));
});
