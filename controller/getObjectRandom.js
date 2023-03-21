const getObject = () => {
    let cant = process.env.CANT_BUCLE;
    if (!cant) {
      cant = 100000000;
    }
    let arr = [];
    let data = {};
  
    //Crea un array de 0 -1000, utiliza del 1 al 1000
    for (let i = 0; i <= 1000; i++) {
      arr[i] = 0;
    }
  
    //Utiliza las posiciones del array para guardar el conteo del numero random
    for (let i = 0; i <= cant; i++) {
      let numRandom = Math.floor(Math.random() * (1001 - 1) + 1);
      arr[numRandom]++;
    }
  
    //Crae el objeto de salida clave - valor
    for (let i = 0; i <= arr.length - 1; i++) {
      data[i] = {
        vecesQueAparece: arr[i],
      };
    }
  
    //console.table(data)
    return data;
  };
  const objectAleatorio = getObject();
  
  process.send(objectAleatorio);