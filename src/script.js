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
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", (event) => {
    const inputField = event.target;
    inputField.value = format(inputField.value);
  });
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
    let result = Number(sec1in2.value) - Number(sec1in3.value);
    if (result !== 0) {
      sec1res1.innerHTML = result.toFixed(2) + " dt/ha";
    }

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

    if (result1 !== 0 && result2 !== 0) {
      sec2res1.innerHTML = result1.toFixed(2) + " zł";
      sec2res2.innerHTML = result2.toFixed(2) + " zł";
      sec2res3.innerHTML = (result1 + result2).toFixed(2) + " zł";
    }

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
    if (result !== 0) {
      sec3res1.innerHTML = result.toFixed(2) + " zł";
    }
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

    if (result !== 0) {
      sec4res1.innerHTML = result.toFixed(2) + " zł";
    }
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

    if (total !== 0) {
      sec5res1.innerHTML = total.toFixed(2) + " zł";
    }
  });
});

let sec6Inputs = [...document.querySelectorAll("[id^=section-6-input-]")];
let sec6Checks = [...document.querySelectorAll("[id^=section-6-check-]")];
let sec6res1 = document.querySelector("#section-6-result-1");

const exclusionMap = {
  "section-6-check-5": ["section-6-check-10", "section-6-check-11"],
  "section-6-check-8": ["section-6-check-9", "section-6-check-10", "section-6-check-11"],
  "section-6-check-9": ["section-6-check-8", "section-6-check-11"],
  "section-6-check-10": ["section-6-check-5", "section-6-check-8", "section-6-check-11"],
  "section-6-check-11": ["section-6-check-5", "section-6-check-8", "section-6-check-9", "section-6-check-10"],
};

sec6Checks.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    sec6Checks.forEach((c) => (c.disabled = false));

    exclusionMap[checkbox.id]?.forEach((excludedId) => {
      let excludedCheckbox = document.querySelector(`#${excludedId}`);
      if (checkbox.checked && excludedCheckbox) {
        excludedCheckbox.disabled = true;
      }
    });
  });
});

document.querySelectorAll(".section-6, #section-2-input-1").forEach((input) => {
  input.addEventListener("input", () => {
    let total = sec6Inputs.reduce((sum, input) => {
      let idNum = parseInt(input.id.split("-").pop());
      return sum + (idNum < 5 || document.querySelector(`#section-6-check-${idNum}`)?.checked ? Number(input.value) || 0 : 0);
    }, 0);

    total *= Number(sec2in1.value);

    if (total !== 0) {
      sec6res1.innerHTML = total ? total.toFixed(2) + " zł" : "";
    }
  });
});

let res1 = document.querySelector("#result-1");
document.querySelectorAll(".section-1, .section-2, .section-3, .section-4, .section-5, .section-6").forEach((input) => {
  input.addEventListener("input", function () {
    let przychody = parseFloat(sec5res1.innerHTML.replace(" zł", "").trim()) || 0;
    let doplaty = parseFloat(sec6res1.innerHTML.replace(" zł", "").trim()) || 0;

    let total = przychody + doplaty;

    if (total !== 0) {
      res1.innerHTML = total.toFixed(2) + " zł";
    }
  });
});
