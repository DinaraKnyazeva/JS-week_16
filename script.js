let form = document.forms.form;
let brandAuto = form.elements.brand;
let modelAuto = form.elements.model;
let button = document.getElementById("button");
let resultSum = document.getElementById("resultSum");

// Марка машин
let AUDI = document.getElementById("brand-AUDI");
let BMW = document.getElementById("brand-BMW");
let HAVAL = document.getElementById("brand-HAVAL");
let HYUNDAI = document.getElementById("brand-HYUNDAI");
let MINI = document.getElementById("brand-MINI");

// Модели марок
let modelAUDI = document.querySelectorAll(".model-AUDI");
let modelBMW = document.querySelectorAll(".model-BMW");
let modelHAVAL = document.querySelectorAll(".model-HAVAL");
let modelHYUNDAI = document.querySelectorAll(".model-HYUNDAI");
let modelMINI = document.querySelectorAll(".model-MINI");

// Функция для переключения моделей в зависимости от марки авто
function updateModels() {
  let i = 0;
  for (i = 0; i < modelAUDI.length; i++) {
    modelAUDI[i].style.display = "none";
  }
  for (i = 0; i < modelBMW.length; i++) {
    modelBMW[i].style.display = "none";
  }
  for (i = 0; i < modelHAVAL.length; i++) {
    modelHAVAL[i].style.display = "none";
  }
  for (i = 0; i < modelHYUNDAI.length; i++) {
    modelHYUNDAI[i].style.display = "none";
  }
  for (i = 0; i < modelMINI.length; i++) {
    modelMINI[i].style.display = "none";
  }

  if (brandAuto.value === "AUDI") {
    for (i = 0; i < modelAUDI.length; i++) {
      modelAUDI[i].style.display = "block";
    }
  } else if (brandAuto.value === "BMW") {
    for (i = 0; i < modelBMW.length; i++) {
      modelBMW[i].style.display = "block";
    }
  } else if (brandAuto.value === "HAVAL") {
    for (i = 0; i < modelHAVAL.length; i++) {
      modelHAVAL[i].style.display = "block";
    }
  } else if (brandAuto.value === "HYUNDAI") {
    for (i = 0; i < modelHYUNDAI.length; i++) {
      modelHYUNDAI[i].style.display = "block";
    }
  } else if (brandAuto.value === "MINI") {
    for (i = 0; i < modelMINI.length; i++) {
      modelMINI[i].style.display = "block";
    }
  }
}

// Добавляем обработчик события change для каждой марки автомобиля
brandAuto.addEventListener("change", updateModels);

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  // Расчет цены в зависимости от марки и модели
  function calculate() {
    const carPrices = {
      "AUDI-A8": "5 000 000",
      "AUDI-S8": "6 500 000",
      "AUDI-Q8": "7 000 000",
      "BMW-X4": "3 000 000",
      "BMW-X5": "4 500 000",
      "BMW-X6": "5 000 000",
      "HAVAL-JOLION": "2 000 000",
      "HAVAL-DARGO": "2 500 000",
      "HAVAL-F7X": "3 000 000",
      "HYUNDAI-CRETA": "2 000 000",
      "HYUNDAI-SOLARIS": "1 500 000",
      "HYUNDAI-SONATA": "2 500 000",
      "MINI-COOPER": "2 500 000",
      "MINI-CLUBMAN": "2 000 000",
      "MINI-PACEMAN": "3 000 000",
    };

    const key = brandAuto.value + "-" + modelAuto.value;

    if (carPrices.hasOwnProperty(key)) {
      resultSum.innerText = carPrices[key];
    } else {
      resultSum.innerText = "Цена не найдена";
    }
  }

  calculate();
});
