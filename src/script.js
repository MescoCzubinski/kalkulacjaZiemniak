function format(inputString) {
  return inputString
    .replace(/^0/g, "")
    .replace(/,/g, ".")
    .replace(/^\.($|[^0-9])/, "0.")
    .replace(/\.{2,}/g, ".")
    .replace(/(.*?\..*?)\./g, "$1")
    .replace(/(\d+\.\d{2})\d*/g, "$1")
    .replace(/[a-zA-Z]+/g, "");
}
document.querySelector("input").addEventListener("input", (event) => {
  const inputField = event.target;
  inputField.value = format(inputField.value);
});
const visitedElements = document.querySelectorAll("input, select");
visitedElements.forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value) {
      this.classList.add("visited");
    } else {
      this.classList.remove("visited");
    }
  });
});
document.querySelectorAll(".display-state-button").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const content = document.querySelectorAll(".show-hide-content")[index];

    content.style.height = content.style.height === "0px" || !content.style.height ? content.scrollHeight + "px" : "0px";

    btn.textContent = content.style.height === "0px" ? "Pokaż" : "Ukryj";
  });
});

function recalculateSectionHeight() {
  document.querySelectorAll(".show-hide-content").forEach((content) => {
    content.style.height = content.scrollHeight + "px";
  });
}

let sec1in2 = document.querySelector("#section-1-input-2");
let sec1in3 = document.querySelector("#section-1-input-3");
let sec1res1 = document.querySelector("#section-1-result-1");
document.querySelectorAll(".section-1").forEach((input) => {
  input.addEventListener("input", function () {
    console.log(sec1in2.value);
    sec1res1.innerHTML = (Number(sec1in2.value) - Number(sec1in3.value)).toFixed(2) + " dt/ha";

    recalculateSectionHeight();
  });
});

let sec2in1 = document.querySelector("#section-2-input-1");
let sec2in2 = document.querySelector("#section-2-input-2");
let sec2in3 = document.querySelector("#section-2-input-3");
let sec2res1 = document.querySelector("#section-2-result-1");
let sec2res2 = document.querySelector("#section-2-result-2");
let sec2res3 = document.querySelector("#section-2-result-3");
document.querySelectorAll(".section-2").forEach((input) => {
  input.addEventListener("input", function () {
    let result1 = Number(sec2in1.value) * Number(sec1in3.value) * Number(sec2in2.value);
    let result2 = Number(sec2in1.value) * (Number(sec1in2.value) - Number(sec1in3.value)) * Number(sec2in3.value);
    sec2res1.innerHTML = result1.toFixed(2) + " zł";
    sec2res2.innerHTML = result2.toFixed(2) + " zł";
    sec2res3.innerHTML = (result1 + result2).toFixed(2) + " zł";

    recalculateSectionHeight();
  });
});

let sec3rad1 = document.querySelector("#section-3-radio-1");
let sec3rad2 = document.querySelector("#section-3-radio-2");
let sec3in1 = document.querySelector("#section-3-input-1");
let sec3in2 = document.querySelector("#section-3-input-2");
let sec3res1 = document.querySelector("#section-3-result-1");
document.querySelectorAll(".section-3").forEach((input) => {
  input.addEventListener("input", function () {
    let result = Number(sec2in1.value) * Number(sec1in3.value) * Number(sec3in2.value);
    if (sec3rad2.checked) {
      result *= Number(sec3in1.value) / 100;
    }
    sec3res1.innerHTML = result.toFixed(2) + " zł";

    recalculateSectionHeight();
  });
});

let sec4in1 = document.querySelector("#section-4-input-1");
let sec4in2 = document.querySelector("#section-4-input-2");
let sec4in3 = document.querySelector("#section-4-input-3");
let sec4in4 = document.querySelector("#section-4-input-4");
let sec4res1 = document.querySelector("#section-4-result-1");
document.querySelectorAll(".section-4").forEach((input) => {
  input.addEventListener("input", function () {
    let result = Number(sec4in1.value) * Number(sec4in2.value) + Number(sec4in3.value) * Number(sec4in4.value);
    sec4res1.innerHTML = result.toFixed(2) + " zł";

    recalculateSectionHeight();
  });
});

let sec5res1 = document.querySelector("#section-5-result-1");
document.querySelectorAll(".section-1, .section-2, .section-3, .section-4").forEach((input) => {
  input.addEventListener("input", function () {
    let sec2res3Value = parseFloat(sec2res3.innerHTML.replace(" zł", "").trim()) || 0;
    let sec3res1Value = parseFloat(sec3res1.innerHTML.replace(" zł", "").trim()) || 0;
    let sec4res1Value = parseFloat(sec4res1.innerHTML.replace(" zł", "").trim()) || 0;

    let total = sec2res3Value + sec3res1Value + sec4res1Value;

    sec5res1.innerHTML = total.toFixed(2) + " zł";
  });
});
