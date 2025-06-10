import mysql from "mysql";

export const db=mysql.createConnection({
    host:"179.127.27.130",
    user:"amadouser",
    password:"FEv61a6o4Ek63u6ut8vu27N7hEWIc1",
    database:"amado",
})

db.connect(function (err){
    console.log("tudo certo");
})

db.query("CALL pdselusuarios()",function(err,row,){
    if(!err){
        console.log("Resultado:",row);
    }
    else{
        console.log("erro");
    }
})