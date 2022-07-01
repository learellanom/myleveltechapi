const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: '*'
}));
/*
*
* Data
*
*/
const myFile = './json/data0.json';
/*
*
* Obtiene todos los empleados
*
*/
app.get('/getdata', (req,res) => {

    const myData = fs.readFileSync(myFile);
    const myRes = JSON.parse(myData);
    res.json(myRes);    
    // res.json({
    //     "data" : myRes
    // });
})

app.get('/dataById/:id', (req,res) => {
    const myId = req.params.id;
    const myData = fs.readFileSync(myFile);
    const myRes = JSON.parse(myData);   
    const myResId = myRes.find( (x) => {
        return +x.id === +myId;
    });
    res.json(myResId);
})

app.get('/dataByMail/:mail', (req,res) => {
    const myMail = req.params.mail;
    const myData = fs.readFileSync(myFile);
    const myRes = JSON.parse(myData);   
    const myResId = myRes.find( (x) => {
        return +x.celectronico === +myMail;
    });
    res.json(myResId);
})

app.post('/dataInsert', (req,res) => {
    const myData = fs.readFileSync(myFile);
    const myRes = JSON.parse(myData);   
    const myResponse = {
        error : false,
        msg: "Registro Exitoso",
        data: null
    };

    console.log("usuario llega : " + JSON.stringify(req.body));

    const usuario = {
        id : myRes.length + 1,
        nombre: req.body.nombre,
        celectronico: req.body.celectronico,
        clave: req.body.clave
    };
    console.log("usuario : " + JSON.stringify(usuario));
    myRes.push(usuario);

    fs.writeFile(myFile,JSON.stringify(myRes), (err) => {
        myResponse.error = true;
        myResponse.msg = "Error en Registro";
    });
    myResponse.data = myRes;

    res.json(myResponse);
})

app.put('/dataUpdate/:id', (req,res) => {
    const myId = req.params.id;    
    const myData = fs.readFileSync(myFile);
    const myRes = JSON.parse(myData);   
    const myResponse = {
        error : false,
        msg: "Actualización Exitosa",
        data: null
    };  

    // console.log("busca en : " + JSON.stringify(myRes));

    const myExiste = myRes.findIndex( (x) => {
        return +x.id == +myId;
    });

    if (myExiste == -1) {
        myResponse.error = true;
        myResponse.msg = "Error Actualizando - Registro no encontrado ID : " + myId;

        res.json(myResponse);
        return;    
    }    


    console.log("Actualiza llega :  " + myId + " : " + JSON.stringify(myRes[myExiste]));
    console.log("Actualiza params :  " + myId + " : " + JSON.stringify(req.params));
    console.log("Actualiza body :  " + myId + " : " + JSON.stringify(req.body));    
    console.log("Actualiza papellido : " + myId + " : " + myRes[myExiste].nombre);
    console.log("Actualiza fregistro : " + myId + " : " + myRes[myExiste].celectronico);

    console.log("este es id  index : " + myExiste); 

    myRes[myExiste].nombre = req.body.nombre;
    myRes[myExiste].celectronico = req.body.celectronico;
    myRes[myExiste].clave = req.body.clave;

    fs.writeFile(myFile,JSON.stringify(myRes), (err) => {
        myResponse.error = true;
        myResponse.msg = "Error Actualizando";
    });

    res.json(myResponse);
})

app.delete('/dataDelete/:id', (req,res) => {
    const myId = req.params.id;    
    const myData = fs.readFileSync(myFile);
    const myRes = JSON.parse(myData);   
    const myResponse = {
        error : false,
        msg: "Borrado Exitoso",
        data: null
    };  

    // console.log("busca en : " + JSON.stringify(myRes));

    const myExiste = myRes.findIndex( (x) => {
        return +x.id == +myId;
    });

    if (myExiste == -1) {
        myResponse.error = true;
        myResponse.msg = "Error Borrando - Registro no encontrado ID : " + myId;    

        res.json(myResponse);
        return;           
    }

    const myResult = myRes.filter((x) => {
        return +x.id !== +myId;
    });

    fs.writeFile(myFile,JSON.stringify(myResult), (err) => {
        myResponse.error = true;
        myResponse.msg = "Error Borrando";
    });    

    res.json(myResponse);
})

app.listen(3000, ()=> {
    console.log("Servidor cidenet API iniciado en puerto 3000");
});
	
     