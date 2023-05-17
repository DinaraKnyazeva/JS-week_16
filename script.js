//элементы формы
let form = document.forms.form;
let brandAuto = form.elements.brand;
let modelAuto = form.elements.model;
let button = document.getElementById("button");
let resultSum = document.getElementById("resultSum");
let containerQuantity = document.querySelector(".content-quantity");

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

// обработчик события change для каждой марки автомобиля
brandAuto.addEventListener("change", updateModels);

const radioTypeCondition = document.querySelectorAll('input[name="condition"]'); //инпуты с состоянием (новый/подер.)
const radioTypeQuantity = document.querySelectorAll('input[name="quantity"]'); //инпуты с кол-м влад. (по name)

//при выборе нового авто инпуты с кол-ом владельцев становится не активным:
radioTypeCondition.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "new") {
      radioTypeQuantity.forEach((quantityRadio) => {
        quantityRadio.disabled = true;
      });
    } else if (radio.value === "used") {
      radioTypeQuantity.forEach((quantityRadio) => {
        quantityRadio.disabled = false;
      });
    }
  });
  // Проверяем начальное состояние при загрузке страницы
  if (radio.checked && radio.value === "new") {
    radioTypeQuantity.forEach((quantityRadio) => {
      quantityRadio.disabled = true;
    });
  }
});

//функция валидация - как только все поля будут заполнены только тогда кнопка станет активной
function validate() {
  if (
    brandAuto.value !== "" &&
    modelAuto.value !== "" &&
    radioTypeFuel !== null &&
    inputEngine.value !== "" &&
    radioTypeQuantity !== null &&
    radioTypePayment !== null
  ) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

//функция отправки формы
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
        carPrice = carPrice * 1.1;
      } else if (radioTypeFuel.value === "gaz") {
        carPrice = carPrice * 1.15;
      } else if (radioTypeFuel.value === "electro") {
        carPrice = carPrice * 1.5;
      }
    }

    //Расчет цены в зависимости от объёма двигателя
    const inputEngine = document.getElementById("engine-input"); //объем двигателя
    if (inputEngine.value > 3) {
      carPrice = carPrice * 1.1;
    } else if (inputEngine.value > 2) {
      carPrice = carPrice * 1;
    } else if (inputEngine.value < 1.99) {
      carPrice = carPrice * 0.98;
    }

    // Расчет цены в зависимости от состояния автомобиля
    const radioTypeQuantityClass = document.querySelector(
      'input[class="quantity"]:checked'
    ); //инпуты с кол-ом владельцев (по классу)
    if (radioTypeQuantityClass) {
      if (radioTypeQuantityClass.value === "1") {
        carPrice = carPrice * 0.85;
      } else if (radioTypeQuantityClass.value === "2") {
        carPrice = carPrice * 0.75;
      } else if (radioTypeQuantityClass.value === "3") {
        carPrice = carPrice * 0.65;
      }
    }

    // Расчет цены в зависимости от способа оплаты
    const radioTypePayment = document.querySelector(
      'input[name="payment"]:checked'
    );
    if (radioTypePayment && radioTypePayment.value === "cash") {
      carPrice = carPrice * 0.98;
    }

    carPrice = carPrice.toLocaleString(); // Округление до 2 знаков после запятой
    resultSum.innerText = carPrice; // Обновляет результат с учетом выбора топлива

    console.log(carPrice);
  }
  validate();
  calculate();
});
