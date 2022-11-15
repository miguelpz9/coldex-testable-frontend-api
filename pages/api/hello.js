import fs from 'fs';
import path from 'path';
const { createCanvas, loadImage } = require('@napi-rs/canvas')

const layersOrder = [
    { name: "Background", ids: [0] },
    { name: "Eyeball", ids: [10, 11] },
    { name: "Eye Color", ids: [4, 5, 6, 7, 8, 9] },
    { name: "Iris", ids: [13, 14, 15] },
    { name: "Shine", ids: [16] },
    { name: "Bottom lid", ids: [1, 2, 3] },
    { name: "Top lid", ids: [17, 18, 19] },
    { name: "Goo", ids: [12] },
  ];

  const layersDir = 'layers';
  

export default async function handler(req, res) {
    const traits = JSON.stringify(req.query.traits).replaceAll("\"", "");
    const traitsList = JSON.parse(traits);
    let typesArray = new Map();

    for(let i = 0; i < layersOrder.length; i++){
        for(let j = 0; j < layersOrder[i].ids.length; j++){
            if(traitsList[i] !== layersOrder[i].ids[j]){
                console.log(`Numbers dont match: ${traitsList[i]} !== ${layersOrder[i].ids[j]}`);
                typesArray.set(layersOrder[i].name, 0);
            }else{
                typesArray.set(layersOrder[i].name, traitsList[i]);
                break;
            }
       }
    }
   
    typesArray.forEach(type => {
        console.log(type);
    })

    //const dirRelativeToPublicFolder = 'layers'


    const image = await drawImage(typesArray);
    res.setHeader('Content-Type', 'image/jpg')
    res.send(image)
}

const drawImage= async (typesArray) => {
    const  canvas = createCanvas(512, 512);
    const  ctx = canvas.getContext("2d");
    for(let i = 0; i < layersOrder.length; i++){
        if(typesArray.get(layersOrder[i].name) === 0){
            console.log("Trait doesnt selected");
        } else{
            //fs.readFile(path.join(process.cwd(), './public/layers/file.json'))
            const filePath = path.resolve(process.cwd(), `./${layersDir}/${layersOrder[i].name}/${typesArray.get(layersOrder[i].name)}.png`)
            const dir = fs.readFileSync(filePath)
            const image = new Image();
            image.src = dir;
            image.width = 512;
            image.height = 512;
            console.log(filePath);
            console.log(dir);
            //const layer = await loadImage(dir);
            ctx.drawImage(image,0,0,512,512);
        }
    }
    const buffer = canvas.toBuffer(); 
    return buffer;
}