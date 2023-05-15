// + выпадающий список с маркой автомобиля (Reno, Opel, Mazda, Jaguar);
// + выпадающий список с моделью автомобиля;
// + чекбокс или радиокнопка для выбор топлива (бензин, дизель, газ, электричество)
// + инпут для ввода объёма двигателя (от 1.1 литра до 3.5 литров);
// - чекбокс или радиокнопка для выбора состояния автомобиля (новый, подержанный);
// - если автомобиль подержанный, то появляется чекбокс или радиокнопка с количеством владельцев (1-2 владельца, более 3х);
// - чекбокс или радиокнопка для выбора способа оплаты (картой, наличными, счёт на юридическое лицо;

//элементы формы
let form = document.forms.form;
let brandAuto = form.elements.brand;
let modelAuto = form.elements.model;
let button = document.getElementById("button");
let resultSum = document.getElementById("resultSum");
let containerQuantity = document.getElementById("content-quantity");

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

//радиокнопки

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
      "AUDI-A8": 5000000,
      "AUDI-S8": 6500000,
      "AUDI-Q8": 7000000,
      "BMW-X4": 3000000,
      "BMW-X5": 4500000,
      "BMW-X6": 5000000,
      "HAVAL-JOLION": 2000000,
      "HAVAL-DARGO": 2500000,
      "HAVAL-F7X": 3000000,
      "HYUNDAI-CRETA": 2000000,
      "HYUNDAI-SOLARIS": 1500000,
      "HYUNDAI-SONATA": 2500000,
      "MINI-COOPER": 2500000,
      "MINI-CLUBMAN": 2000000,
      "MINI-PACEMAN": 3000000,
    };

    const key = brandAuto.value + "-" + modelAuto.value;

    if (carPrices.hasOwnProperty(key)) {
      resultSum.innerText = carPrices[key];
    } else {
      resultSum.innerText = "Цена не найдена";
    }

    // Расчет цены в зависимости от выбора топлива
    let carPrice = carPrices[key];
    const radioTypeFuel = document.querySelector('input[name="fuel"]:checked'); //вид топливо
    if (radioTypeFuel) {
      if (radioTypeFuel.value === "dizel") {
        carPrice = carPrice * 1.1; //нужно будет "* 100000" убрать когда результат преобразую в строку
      } else if (radioTypeFuel.value === "gaz") {
        carPrice = carPrice * 1.15;
      } else if (radioTypeFuel.value === "electro") {
        carPrice = carPrice * 1.5;
      }
    }
    carPrice = carPrice.toFixed(2); // Округление до 2 знаков после запятой
    resultSum.innerText = carPrice; // обновляет результат с учетом выбора топлива

    //Расчет цены в зависимости от объёма двигателя
    const inputEngine = document.getElementById("engine-input"); //объем двигателя
    if (inputEngine.value > 3.1) {
      carPrice = carPrice * 1;
    } else if (inputEngine.value > 2) {
      carPrice = carPrice * 0.98;
    } else if (inputEngine.value < 1.99) {
      carPrice = carPrice * 0.96;
    }
    carPrice = carPrice.toLocaleString(); // Округление до 2 знаков после запятой
    resultSum.innerText = carPrice; // обновляет результат с учетом выбора топлива

    //Расчет цены в зависимости от состояния автомобиля
    const radioTypeCondition = document.querySelector(
      'input[name="condition"]:checked'
    ); //объем двигателя
    //прослушивание инпута (состояние авто), при подержанном добавляется выбор кол-ва владельца
    radioTypeCondition.addEventListener("input", function () {
      if (radioTypeCondition.value === "used") {
        containerQuantity.style.display = "block";
      } else if (radioTypeCondition.value === "new") {
        containerQuantity.style.display = "none";
      }
    });

    console.log(carPrice);
  }
  calculate();
});
