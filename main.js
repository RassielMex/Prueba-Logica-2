const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Obtener el valor del año
rl.question("Escribe rango de valores : ", (yearsInput) => {
  if (yearsInput.length > 0) {
    //Obtener años y era (BC o AD)
    const fYear = parseInt(yearsInput.split("-")[0].slice(0, -2));
    const fEra = yearsInput.split("-")[0].slice(-2);
    const sYear = parseInt(yearsInput.split("-")[1].slice(0, -2));
    const sEra = yearsInput.split("-")[1].slice(-2);

    //Obtener años de acuerdo a la era
    const fRange = fEra === "AD" ? fYear + 753 : 754 - fYear;
    const sRange = sEra === "AD" ? sYear + 753 : 754 - sYear;

    let rangeArray = [];
    //Obtener un arreglo que contenga todos los valores
    if (fEra === sEra) {
      rangeArray = converToArrayOfValues(fRange, sRange);
    } else {
      rangeArray =
        fRange > sRange
          ? converToArrayOfValues(1, fRange)
          : converToArrayOfValues(1, sRange);
    }

    //Convert each value to Roman Number
    const rangeInRoman = rangeArray.map((value) => {
      return convertToRoman(value);
    });

    //Get elements with max characteres
    const itemWithMaxLength = rangeInRoman.reduce((prev, curr) => {
      return prev.length > curr.length ? prev : curr;
    });

    console.log(itemWithMaxLength.length);
  } else {
    console.log("Introduzca un valor adecuado");
  }
  rl.close();
});

const convertToRoman = (number) => {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];

  let romanNumber = "";

  values.forEach((value, index) => {
    while (number >= value) {
      romanNumber += symbols[index];
      number -= value;
    }
  });

  return romanNumber;
};

const converToArrayOfValues = (lowerLimit, upperLimit) => {
  let arrayOfValues = [];
  if (lowerLimit <= upperLimit) {
    for (let index = lowerLimit; index <= upperLimit; index++) {
      arrayOfValues.push(index);
    }
  }
  return arrayOfValues;
};
