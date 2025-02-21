function format(inputString) {
  return inputString
    .replace(/[^0-9.,]/g, "")
    .replace(/^(?!\.)/g, "")
    .replace(/,/g, ".")
    .replace(/^\.($|[^0-9])/, "0.")
    .replace(/\.{2,}/g, ".")
    .replace(/(.*?\..*?)\./g, "$1")
    .replace(/(\d+\.\d{2})\d*/g, "$1");
}
document.addEventListener("input", (event) => {
  if (event.target.tagName === "INPUT" && ["text", "number", "email", "password", "tel", "search"].includes(event.target.type)) {
    const inputField = event.target;
    const cursorPosition = inputField.selectionStart;
    const oldLength = inputField.value.length;

    if (!inputField.classList.contains("text")) {
      inputField.value = format(inputField.value);
    }

    const newLength = inputField.value.length;
    inputField.selectionStart = inputField.selectionEnd = cursorPosition + (newLength - oldLength);
  }
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

    btn.textContent = content.style.height === "0px" ? "Rozwiń" : "Zwiń";
  });
});

function recalculateSectionHeight() {
  document.querySelectorAll(".show-hide-content").forEach((content) => {
    if (content.style.height !== "0px" && content.style.height) {
      content.style.height = content.scrollHeight + "px";
    }
  });
}
let sec1in2 = document.querySelector("#section-1-input-2");
let sec1in3 = document.querySelector("#section-1-input-3");
let sec1res1 = document.querySelector("#section-1-result-1");
document.querySelectorAll(".section-1").forEach((input) => {
  input.addEventListener("input", function () {
    let result = Number(sec1in2.value) - Number(sec1in3.value);

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0) {
      sec1res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " dt/ha";
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

    if (result1 > 100000000) {
      result1 = "za dużo";
    }
    if (result2 > 100000000) {
      result2 = "za dużo";
    }
    if (result1 !== 0 && result2 !== 0) {
      sec2res1.innerHTML = result1.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł";
      sec2res2.innerHTML = result2.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł";
      sec2res3.innerHTML = (result1 + result2).toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł";
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
    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0) {
      sec3res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł";
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

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0) {
      sec4res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł";
    }
    recalculateSectionHeight();
  });
});

let sec5res1 = document.querySelector("#section-5-result-1");
document.querySelectorAll(".section-1, .section-2, .section-3, .section-4").forEach((input) => {
  input.addEventListener("input", function () {
    let sec2res3Value = parseFloat(sec2res3.innerHTML.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0;
    let sec3res1Value = parseFloat(sec3res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0;
    let sec4res1Value = parseFloat(sec4res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0;

    let result = sec2res3Value + sec3res1Value + sec4res1Value;

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0) {
      sec5res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł";
    }
  });
});

let sec6Inputs = [...document.querySelectorAll("[id^=section-6-input-]")];
let sec6Checks = [...document.querySelectorAll("[id^=section-6-check-]")];
let sec6res1 = document.querySelector("#section-6-result-1");

const exclusionMap = {
  "section-6-check-5": ["section-6-check-10", "section-6-check-11"],
  "section-6-check-6": [],
  "section-6-check-7": [],
  "section-6-check-8": ["section-6-check-9", "section-6-check-10", "section-6-check-11"],
  "section-6-check-9": ["section-6-check-8", "section-6-check-11"],
  "section-6-check-10": ["section-6-check-5", "section-6-check-8", "section-6-check-11"],
  "section-6-check-11": ["section-6-check-5", "section-6-check-8", "section-6-check-9", "section-6-check-10"],
};

sec6Checks.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    sec6Checks.forEach((c) => (c.disabled = false)); // Najpierw odblokuj wszystkie checkboxy

    // Sprawdzamy, które checkboxy mają być wyłączone
    sec6Checks.forEach((checkbox) => {
      exclusionMap[checkbox.id]?.forEach((excludedId) => {
        let excludedCheckbox = document.querySelector(`#${excludedId}`);
        if (checkbox.checked && excludedCheckbox) {
          excludedCheckbox.disabled = true;
        }
      });
    });
  });
});

let res1 = document.querySelector("#result-1");
document.querySelectorAll(".section-6").forEach((input) => {
  input.addEventListener("input", () => {
    let result = sec6Inputs.reduce((sum, input) => {
      let idNum = parseInt(input.id.split("-").pop());
      let checkbox = document.querySelector(`#section-6-check-${idNum}`);
      return sum + (checkbox?.checked ? Number(input.value) || 0 : 0);
    }, 0);

    result *= Number(sec2in1.value);

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0) {
      sec6res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł";
    } else {
      sec6res1.innerHTML = "dodaj lub uzupełnij wartość";
      res1.innerHTML = "dodaj lub uzupełnij wartość";
    }
  });
});

//suma przychodów
document.querySelectorAll(".section-1, .section-2, .section-3, .section-4, .section-5, .section-6").forEach((input) => {
  input.addEventListener("input", function () {
    let przychody = parseFloat(sec5res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0;
    let doplaty = parseFloat(sec6res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0;

    let result = przychody + doplaty;

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0) {
      res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł";
    }
  });
});

//badanie gleby
let sec7in1 = document.querySelector("#section-7-input-1");
let sec7in2 = document.querySelector("#section-7-input-2");
let sec7in3 = document.querySelector("#section-7-input-3");
let sec7res1 = document.querySelector("#section-7-result-1");
document.querySelectorAll(".section-7").forEach((input) => {
  input.addEventListener("input", function () {
    let result = (Number(sec7in1.value) * Number(sec7in2.value)) / Number(sec7in3.value);

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0 && result !== Infinity) {
      sec7res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha/rok";
    }
    recalculateSectionHeight();
  });
});

//wapno
let sec8in1 = document.querySelector("#section-8-input-1");
let sec8in2 = document.querySelector("#section-8-input-2");
let sec8in3 = document.querySelector("#section-8-input-3");
let sec8in4 = document.querySelector("#section-8-input-4");
let sec8in5 = document.querySelector("#section-8-input-5");
let sec8res1 = document.querySelector("#section-8-result-1");
document.querySelectorAll(".section-8").forEach((input) => {
  input.addEventListener("input", function () {
    let result = (Number(sec8in1.value) * Number(sec8in4.value)) / Number(sec8in5.value) + Number(sec8in2.value) / Number(sec8in5.value) + (Number(sec8in3.value) * Number(sec8in4.value)) / Number(sec8in5.value);

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0 && result !== Infinity) {
      sec8res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha/rok";
    }
    recalculateSectionHeight();
  });
});

//międzyplon
let sec9in1 = document.querySelector("#section-9-input-1");
let sec9in2 = document.querySelector("#section-9-input-2");
let sec9in3 = document.querySelector("#section-9-input-3");
let sec9in4 = document.querySelector("#section-9-input-4");
let sec9res1 = document.querySelector("#section-9-result-1");
document.querySelectorAll(".section-9").forEach((input) => {
  input.addEventListener("input", function () {
    let result = (Number(sec9in1.value) * Number(sec9in3.value)) / Number(sec9in4.value) + Number(sec9in2.value) / Number(sec9in4.value);

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0 && result !== Infinity) {
      sec9res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha/rok";
    }
    recalculateSectionHeight();
  });
});

//nawozy naturalne
let sec10in1 = document.querySelector("#section-10-input-1");
let sec10in2 = document.querySelector("#section-10-input-2");
let sec10in3 = document.querySelector("#section-10-input-3");
let sec10in4 = document.querySelector("#section-10-input-4");
let sec10in5 = document.querySelector("#section-10-input-5");
let sec10res1 = document.querySelector("#section-10-result-1");
document.querySelectorAll(".section-10").forEach((input) => {
  input.addEventListener("input", function () {
    let result = (Number(sec10in1.value) * Number(sec10in4.value)) / Number(sec10in5.value) + Number(sec10in2.value) / Number(sec10in5.value) + (Number(sec10in3.value) * Number(sec10in4.value)) / Number(sec10in5.value);

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0 && result !== Infinity) {
      sec10res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha/rok";
    }
    recalculateSectionHeight();
  });
});

//zabiegi jesienne
let sec11in1 = document.querySelector("#section-11-input-1");
let sec11in2 = document.querySelector("#section-11-input-2");
let sec11in3 = document.querySelector("#section-11-input-3");
let sec11ch1 = document.querySelector("#check-section-11-1");
let sec11ch2 = document.querySelector("#check-section-11-2");
let sec11ch3 = document.querySelector("#check-section-11-3");
let sec11res1 = document.querySelector("#section-11-result-1");
document.querySelectorAll(".section-11").forEach((input) => {
  input.addEventListener("input", function () {
    let result = 0;
    if (sec11ch1.checked) result += Number(sec11in1.value);
    if (sec11ch2.checked) result += Number(sec11in2.value);
    if (sec11ch3.checked) result += Number(sec11in3.value);

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== Infinity) {
      sec11res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha/rok";
    }
    if (result === 0) {
      sec11res1.innerHTML = "podaj wartości";
    }
    recalculateSectionHeight();
  });
});

//glifosat
let sec12in1 = document.querySelector("#section-12-input-1");
let sec12in2 = document.querySelector("#section-12-input-2");
let sec12in3 = document.querySelector("#section-12-input-3");
let sec12in4 = document.querySelector("#section-12-input-4");
let sec12res1 = document.querySelector("#section-12-result-1");
document.querySelectorAll(".section-12").forEach((input) => {
  input.addEventListener("input", function () {
    let result = Number(sec12in1.value) * Number(sec12in3.value) + Number(sec12in2.value) * Number(sec12in4.value);

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0 && result !== Infinity) {
      sec12res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha/rok";
    }
    recalculateSectionHeight();
  });
});

//sadzeniaki
let sec13in1 = document.querySelector("#section-13-input-1");
let sec13in2 = document.querySelector("#section-13-input-2");
let sec13in3 = document.querySelector("#section-13-input-3");
let sec13in4 = document.querySelector("#section-13-input-4");
let sec13in5 = document.querySelector("#section-13-input-5");
let sec13ch1 = document.querySelector("#check-section-13-part-1");
let sec13ch2 = document.querySelector("#check-section-13-part-2");
let sec13res1 = document.querySelector("#section-13-result-1");
sec13in3.addEventListener("input", function () {
  if (Number(sec13in3.value) > 100) {
    sec13in3.value = "";
  }
});
document.querySelectorAll(".section-13").forEach((input) => {
  if (Number(sec13in3.value) > 100) {
    sec13in3.value = 0;
  }
  input.addEventListener("input", function () {
    let result = 0;
    if (sec13ch1.checked) {
      result += (Number(sec13in1.value) * Number(sec13in4.value) * Number(sec13in3.value)) / 100;
    }
    if (sec13ch2.checked) {
      result += (Number(sec13in2.value) * Number(sec13in5.value) * (100 - Number(sec13in3.value))) / 100;
    }
    if (!sec13ch2.checked && !sec13ch1.checked) {
      result = 0;
    }
    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== Infinity) {
      sec13res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha/rok";
    }
    if (result === 0) {
      sec13res1.innerHTML = "kliknij + by policzyć";
    }
    recalculateSectionHeight();
  });
});

//odkamienianie
let sec14in1 = document.querySelector("#section-14-input-1");
let sec14in2 = document.querySelector("#section-14-input-2");
let sec14res1 = document.querySelector("#section-14-result-1");
document.querySelectorAll(".section-14").forEach((input) => {
  input.addEventListener("input", function () {
    let result = Number(sec14in1.value) / Number(sec14in2.value);

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0 && result !== Infinity) {
      sec14res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha/rok";
    }
    recalculateSectionHeight();
  });
});

//zabiegi wiosenne
let sec15in1 = document.querySelector("#section-15-input-1");
let sec15in2 = document.querySelector("#section-15-input-2");
let sec15in3 = document.querySelector("#section-15-input-3");
let sec15in4 = document.querySelector("#section-15-input-4");
let sec15in5 = document.querySelector("#section-15-input-5");
let sec15in6 = document.querySelector("#section-15-input-6");
let sec15in7 = document.querySelector("#section-15-input-7");
let sec15ch1 = document.querySelector("#check-section-15-1");
let sec15ch2 = document.querySelector("#check-section-15-2");
let sec15ch3 = document.querySelector("#check-section-15-3");
let sec15ch4 = document.querySelector("#check-section-15-4");
let sec15ch5 = document.querySelector("#check-section-15-5");
let sec15ch6 = document.querySelector("#check-section-15-6");
let sec15ch7 = document.querySelector("#check-section-15-7");

let sec15res1 = document.querySelector("#section-15-result-1");
document.querySelectorAll(".section-15").forEach((input) => {
  input.addEventListener("input", function () {
    let result = 0;
    if (sec15ch1.checked) result += Number(sec15in1.value);
    if (sec15ch2.checked) result += Number(sec15in2.value);
    if (sec15ch3.checked) result += Number(sec15in3.value);
    if (sec15ch4.checked) result += Number(sec15in4.value);
    if (sec15ch5.checked) result += Number(sec15in5.value);
    if (sec15ch6.checked) result += Number(sec15in6.value);
    if (sec15ch7.checked) result += Number(sec15in7.value);

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== Infinity) {
      sec15res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha/rok";
    }
    if (result === 0) {
      sec15res1.innerHTML = "uzupełnij wartości";
    }
    recalculateSectionHeight();
  });
});

//zbiór
let sec16in1 = document.querySelector("#section-16-input-1");
let sec16in2 = document.querySelector("#section-16-input-2");
let sec16in3 = document.querySelector("#section-16-input-3");
let sec16in4 = document.querySelector("#section-16-input-4");
let sec16in5 = document.querySelector("#section-16-input-5");
let sec16in6 = document.querySelector("#section-16-input-6");
let sec16in7 = document.querySelector("#section-16-input-7");
let sec16in8 = document.querySelector("#section-16-input-8");
let sec16in9 = document.querySelector("#section-16-input-9");
let sec16res1 = document.querySelector("#section-16-result-1");
document.querySelectorAll(".section-16").forEach((input) => {
  input.addEventListener("input", function () {
    let kombajn = Number(sec16in1.value) * Number(sec16in4.value);
    let pracownicy = Number(sec16in2.value) * Number(sec16in3.value) * Number(sec16in4.value);
    let transportWew = Number(sec16in5.value) * Number(sec16in6.value);

    let in7 = parseFloat(sec16in7.value) || 0;
    let in8 = parseFloat(sec16in8.value) || 0;
    let in9 = parseFloat(sec16in9.value) || 1;
    let in2 = parseFloat(sec1in2.value) || 0;

    let transportZew = (((in7 * in8) / in9) * in2) / 10;
    let result = kombajn + pracownicy + transportWew + transportZew;
    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0 && result !== Infinity) {
      sec16res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha/rok";
    }
    recalculateSectionHeight();
  });
});

//zarządzanie
let sec17in1 = document.querySelector("#section-17-input-1");
let sec17in2 = document.querySelector("#section-17-input-2");
let sec17in3 = document.querySelector("#section-17-input-3");
let sec17ch1 = document.querySelector("#check-section-17-1");
let sec17ch2 = document.querySelector("#check-section-17-2");
let sec17ch3 = document.querySelector("#check-section-17-3");
let sec17res1 = document.querySelector("#section-17-result-1");
document.querySelectorAll(".section-17").forEach((input) => {
  input.addEventListener("input", function () {
    let result = 0;
    if (sec17ch1.checked) result += Number(sec17in1.value);
    if (sec17ch2.checked) result += Number(sec17in2.value);
    if (sec17ch3.checked) result += Number(sec17in3.value);

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== Infinity) {
      sec17res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha/rok";
    }
    if (result === 0) {
      sec17res1.innerHTML = "podaj wartości";
    }
    recalculateSectionHeight();
  });
});

// suma kosztów
let res2 = document.querySelector("#result-2");
let res3 = document.querySelector("#result-3");
let res4 = document.querySelector("#result-4");
let res5 = document.querySelector("#result-5");
let res6 = document.querySelector("#result-6");
let check7 = document.querySelector("#check-section-7");
let check8 = document.querySelector("#check-section-8");
let check9 = document.querySelector("#check-section-9");
let check12 = document.querySelector("#check-section-12");
let check14 = document.querySelector("#check-section-14");

document.addEventListener("input", function (event) {
  if (event.target.matches("input")) {
    let r1 = parseFloat(res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł/ha/rok", "").replace(",", ".")) || 0;
    let s7 = parseFloat(sec7res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł/ha/rok", "").replace(",", ".")) || 0;
    if (!check7.checked) s7 = 0;
    let s8 = parseFloat(sec8res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł/ha/rok", "").replace(",", ".")) || 0;
    if (!check8.checked) s8 = 0;
    let s9 = parseFloat(sec9res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł/ha/rok", "").replace(",", ".")) || 0;
    if (!check9.checked) s9 = 0;
    let s10 = parseFloat(sec10res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł/ha/rok", "").replace(",", ".")) || 0;
    let s11 = parseFloat(sec11res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł/ha/rok", "").replace(",", ".")) || 0;
    let s12 = parseFloat(sec12res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł/ha/rok", "").replace(",", ".")) || 0;
    if (!check12.checked) s12 = 0;
    let s13 = parseFloat(sec13res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł/ha/rok", "").replace(",", ".")) || 0;
    let s14 = parseFloat(sec14res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł/ha/rok", "").replace(",", ".")) || 0;
    if (!check14.checked) s14 = 0;
    let s15 = parseFloat(sec15res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł/ha/rok", "").replace(",", ".")) || 0;
    let s16 = parseFloat(sec16res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł/ha/rok", "").replace(",", ".")) || 0;
    let s17 = parseFloat(sec17res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł/ha/rok", "").replace(",", ".")) || 0;
    let s20 = parseFloat(sec20res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0;
    let s21 = parseFloat(sec21res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0;
    let s22 = parseFloat(sec22res1.innerHTML.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0;

    let nawoz1 = document.querySelector("#NawozenieMineralne");
    let nawoz2 = document.querySelector("#NawozenieDolistne");
    let nawoz3 = document.querySelector("#SOR");
    let nawoz4 = document.querySelector("#biopreparat");
    let nawoz5 = document.querySelector("#Nawadnianie");

    let sNawoz1 = nawoz1 ? parseFloat(nawoz1.innerHTML.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0 : 0;
    let sNawoz2 = nawoz2 ? parseFloat(nawoz2.innerHTML.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0 : 0;
    let sNawoz3 = nawoz3 ? parseFloat(nawoz3.innerHTML.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0 : 0;
    let sNawoz4 = nawoz4 ? parseFloat(nawoz4.innerHTML.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0 : 0;
    let sNawoz5 = nawoz5 ? parseFloat(nawoz5.innerHTML.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0 : 0;

    let result = s7 + s8 + s9 + s10 + s11 + s12 + s13 + s14 + s15 + s16 + s17 + sNawoz1 + s20 + sNawoz2 + sNawoz3 + s21 + sNawoz4 + s22 + sNawoz5;

    if (result !== 0) {
      res2.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł/ha/rok";
      res3.innerHTML = (result * Number(sec2in1.value)).toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł";
      res4.innerHTML = (r1 - result * Number(sec2in1.value)).toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł";
      if (Number(sec2in2.value) !== 0) res5.innerHTML = (result / Number(sec2in2.value)).toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " dt/ha";
      if (Number(sec1in3.value) !== 0) res6.innerHTML = (result / Number(sec1in3.value)).toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " zł/t";
    }
  }
});

class miniKalkulator {
  constructor(path, name, unit1, unit2, divide) {
    this.path = path;
    this.unit1 = unit1;
    this.unit2 = unit2;
    this.name = name;
    this.divide = divide;
    this.sections = [];

    this.result = document.createElement("div");
    this.result.classList.add("main-container");

    this.renderBase();
  }

  renderBase() {
    this.result.innerHTML = `
          <div class="section-container">
            <div class="section">
              <div class="border-t-2 mb-2 border-bg-info"></div>
              <div class="flex">
                  <input type="text" class="name text" placeholder="nazwa" />
              </div>
              <div class="flex flex-col w-10/12">
                  <div class="text-xl text-left mb-2 ml-2 mt-4">Koszt jednostkowy:</div>
                  <div class="flex">
                      <input type="text"  inputmode="numeric" pattern="[0-9]*" class="cost-per-unit" placeholder="koszt za ${this.unit1.replace("zł/", "")}" class="${this.name}"/>
                      <div class="ml-2 text-xl flex items-center">${this.unit1}</div>
                  </div>
                  <div class="text-xl text-left mb-2 ml-2 mt-4">Dawka na ha:</div>
                  <div class="flex">
                      <input type="text"  inputmode="numeric" pattern="[0-9]*" class="dose-per-ha" placeholder="ile na 1 ha" class="${this.name}"/>
                      <div class="ml-2 text-xl flex items-center">${this.unit2}</div>
                  </div>
              </div>
              <div class="flex text-xl mt-4 w-full items-center h-fit">
                <div class="p-1">Koszt:</div>
                <div class="p-1 ml-2 text-top-agrar-green total-cost">0</div>
              </div>

              </div>
              </div>
              <div class="flex text-2xl mt-4 w-full justify-start flex-col items-center h-fit">
                            <div class="flex justify-center w-72">
                <input type="button" class="mr-2 add-btn  bg-top-agrar-green/5" value="Kliknij i dodaj kolejny" />
              </div>
          <div class="w-72 flex mt-4 mb-4">
            <div class="p-1 font-bold">SUMA:</div>
            <div class="p-1 ml-2 text-top-agrar-green total-sum" id="${this.name}">podaj wartości</div>
          </div></div>`;

    this.path.appendChild(this.result);

    this.sectionContainer = this.result.querySelector(".section-container");
    this.sections.push(this.result.querySelector(".section"));

    this.result.querySelector(".add-btn").addEventListener("click", () => this.addCalc());
    this.addEventListeners(this.result.querySelector(".section"));
  }

  addCalc() {
    const newSection = document.createElement("div");
    newSection.classList.add("section");
    newSection.innerHTML = `
          <div class="border-t-2 mb-2 border-bg-info"></div>
          <div class="flex">
              <input type="text" class="name text" placeholder="nazwa" />
              <input type="button" class="ml-2 mt-2 remove-btn" value="-" />
          </div>
          <div class="flex flex-col w-10/12">
              <div class="text-xl text-left mb-2 ml-2 mt-4">Koszt jednostkowy:</div>
              <div class="flex">
                  <input type="text"  inputmode="numeric" pattern="[0-9]*" class="cost-per-unit" placeholder="koszt za ${this.unit1.replace("zł/", "")}" class="${this.name}"/>
                  <div class="ml-2 text-xl flex items-center">${this.unit1}</div>
              </div>
              <div class="text-xl text-left mb-2 ml-2 mt-4">Dawka na ha:</div>
              <div class="flex">
                  <input type="text"  inputmode="numeric" pattern="[0-9]*" class="dose-per-ha" placeholder="ile na 1 ha" class="${this.name}"/>
                  <div class="ml-2 text-xl flex items-center">${this.unit2}</div>
              </div>
              <div class="flex text-xl mt-4 w-full items-center h-fit">
                <div class="p-1">Koszt:</div>
                <div class="p-1 ml-2 text-top-agrar-green total-cost">podaj wartości</div>
              </div>
          </div>`;

    newSection.querySelector(".remove-btn").addEventListener("click", () => {
      newSection.remove();
      this.sections = this.sections.filter((s) => s !== newSection);
      this.updateTotalSum();
    });

    this.sectionContainer.appendChild(newSection);
    this.sections.push(newSection);
    this.addEventListeners(newSection);

    recalculateSectionHeight();
  }

  addEventListeners(section) {
    const costInput = section.querySelector(".cost-per-unit");
    const doseInput = section.querySelector(".dose-per-ha");
    const totalCost = section.querySelector(".total-cost");

    const updateCost = () => {
      const cost = parseFloat(costInput.value) || 0;
      const dose = parseFloat(doseInput.value) || 0;
      console.log(cost + " * " + dose + " / " + this.divide);
      let result = (cost * dose) / this.divide;

      if (result === 0) {
        totalCost.textContent = "podaj wartości";
      }
      if (result < 100000000) {
        totalCost.textContent = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł";
      } else {
        totalCost.textContent = "za dużo";
      }

      this.updateTotalSum();
    };

    costInput.addEventListener("input", updateCost);
    doseInput.addEventListener("input", updateCost);
  }

  updateTotalSum() {
    const totalSumElement = this.result.querySelector(".total-sum");

    let sum = this.sections.reduce((acc, section) => {
      const costText = section.querySelector(".total-cost").innerHTML.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".");
      const cost = parseFloat(costText) || 0;
      return acc + cost;
    }, 0);

    totalSumElement.textContent = sum === 0 ? "podaj wartości" : sum.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł";
  }
}

window.NawozenieMineralne = new miniKalkulator(document.querySelector("#nawozenie-mineralne"), "NawozenieMineralne", "zł/t", "kg/ha", 1000);

window.NawozenieDolistne = new miniKalkulator(document.querySelector("#nawozy-dolistne"), "NawozenieDolistne", "zł/l, kg", "l, kg/ha", 1);

window.SOR = new miniKalkulator(document.querySelector("#SORiA"), "SOR", "zł/l, kg", "l, kg/ha", 1);

window.biopraparat = new miniKalkulator(document.querySelector("#biopreparaty"), "biopreparat", "zł/l, kg", "l, kg/ha", 1);

let sec20in1 = document.querySelector("#section-20-input-1");
let sec20in2 = document.querySelector("#section-20-input-2");
let sec20res1 = document.querySelector("#section-20-result-1");
document.querySelectorAll(".section-20").forEach((input) => {
  input.addEventListener("input", function () {
    let val1 = Number(sec20in1.value) || 0;
    let val2 = Number(sec20in2.value) || 0;
    let result = val1 * val2;

    if (result > 100000000) {
      result = "za dużo";
    } else if (result === 0) {
      sec20res1.innerHTML = "podaj wartości";
      return;
    } else {
      result = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha";
    }

    sec20res1.innerHTML = result;
    recalculateSectionHeight();
  });
});
let sec21in1 = document.querySelector("#section-21-input-1");
let sec21in2 = document.querySelector("#section-21-input-2");
let sec21res1 = document.querySelector("#section-21-result-1");
document.querySelectorAll(".section-21").forEach((input) => {
  input.addEventListener("input", function () {
    let val1 = Number(sec21in1.value) || 0;
    let val2 = Number(sec21in2.value) || 0;
    let result = val1 * val2;

    if (result > 100000000) {
      result = "za dużo";
    } else if (result === 0) {
      result = "podaj wartości";
    } else {
      result = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha";
    }

    sec21res1.innerHTML = result;
    recalculateSectionHeight();
  });
});
let sec22in1 = document.querySelector("#section-22-input-1");
let sec22in2 = document.querySelector("#section-22-input-2");
let sec22res1 = document.querySelector("#section-22-result-1");
document.querySelectorAll(".section-22").forEach((input) => {
  input.addEventListener("input", function () {
    let val1 = Number(sec22in1.value) || 0;
    let val2 = Number(sec22in2.value) || 0;
    let result = val1 * val2;

    if (result > 100000000) {
      result = "za dużo";
    } else if (result === 0) {
      result = "podaj wartości";
    } else {
      result = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha";
    }

    sec22res1.innerHTML = result;
    recalculateSectionHeight();
  });
});

class Nawadnianie {
  constructor(path, name) {
    this.path = path;
    this.name = name;
    this.sections = [];

    this.result = document.createElement("div");
    this.result.classList.add("main-container");

    this.renderBase();
  }

  renderBase() {
    this.result.innerHTML = `
        <div class="section-container">
        </div>
        <div class="flex text-2xl mt-4 w-full justify-center items-center h-fit flex-col">
        <div class="flex justify-center w-72">
          <input type="button" class="mr-2 add-btn bg-top-agrar-green/5" value="Kliknij i dodaj kolejny" />
        </div>
        <div class="flex mt-4 mb-4">
          <div class="p-1 font-bold">SUMA:</div>
          <div class="p-1 ml-2 text-top-agrar-green total-sum" id="${this.name}">podaj wartości</div>
        </div></div>
        `;

    this.path.appendChild(this.result);
    this.sectionContainer = this.result.querySelector(".section-container");

    this.result.querySelector(".add-btn").addEventListener("click", () => this.addCalc());
    this.addCalc();
  }

  addCalc() {
    if (this.sections.length === 0 || this.sections.length > 0) {
      const newSection = document.createElement("div");
      newSection.classList.add("section");
      newSection.innerHTML = `
          <div class="border-t-2 mb-2 border-bg-info"></div>
          <div class="flex flex-col">
            <div class="text-xl text-left mb-2 ml-2 mt-4">Godzinowy koszt pompowania:</div>
            <div class="flex">
              <input type="text"  inputmode="numeric" pattern="[0-9]*" class="cost-per-hour" placeholder="zł za godzinę"/>
              <div class="ml-2 text-xl flex items-center">zł/godz.</div>
            </div>
            <div class="text-xl text-left mb-2 ml-2 mt-4">Czas nawadniania 1 ha:</div>
            <div class="flex">
              <input type="text"  inputmode="numeric" pattern="[0-9]*" class="dose-per-ha" placeholder="godz./ha"/>
              <div class="ml-2 text-xl flex items-center">godz./ha</div>
            </div>
            <div class="text-xl text-left mb-2 ml-2 mt-4">Koszt wody:</div>
            <div class="flex">
              <input type="text"  inputmode="numeric" pattern="[0-9]*" class="cost-per-m3" placeholder="zł za m³"/>
              <div class="ml-2 text-xl flex items-center">zł/m³</div>
            </div>
            <div class="text-xl text-left mb-2 ml-2 mt-4">Dawka wody na ha:</div>
            <div class="flex">
              <input type="text"  inputmode="numeric" pattern="[0-9]*"  inputmode="numeric" pattern="[0-9]*" class="dose-per-m3" placeholder="m³/ha"/>
              <div class="ml-2 text-xl flex items-center">m³/ha</div>
            </div>
          </div>
          <div class="flex text-xl mt-4 w-full items-center h-fit">
            <div class="p-1">Koszt:</div>
            <div class="p-1 ml-2 text-top-agrar-green total-cost">0 zł</div>
          </div>
          <div class="flex w-full justify-center">
            <input type="button" class="remove-btn bg-top-agrar-green/5" value="Usuń" />
          </div>`;

      if (this.sections.length > 0) {
        newSection.querySelector(".remove-btn").addEventListener("click", () => {
          newSection.remove();
          this.sections = this.sections.filter((s) => s !== newSection);
          this.updateTotalSum();
        });
      } else {
        newSection.querySelector(".remove-btn").remove();
      }

      this.sectionContainer.appendChild(newSection);
      this.sections.push(newSection);
      this.addEventListeners(newSection);
      recalculateSectionHeight();
    }
  }

  addEventListeners(section) {
    const costPerHour = section.querySelector(".cost-per-hour");
    const dosePerHa = section.querySelector(".dose-per-ha");
    const costPerM3 = section.querySelector(".cost-per-m3");
    const dosePerM3 = section.querySelector(".dose-per-m3");
    const totalCost = section.querySelector(".total-cost");

    const updateCost = () => {
      const costHour = parseFloat(costPerHour.value.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0;
      const doseHour = parseFloat(dosePerHa.value.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0;
      const costWater = parseFloat(costPerM3.value.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0;
      const doseWater = parseFloat(dosePerM3.value.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".")) || 0;

      let result = costHour * doseHour + costWater * doseWater;

      if (result === 0) {
        totalCost.textContent = "podaj wartości";
      }
      if (result < 100000000) {
        totalCost.textContent = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł";
      } else {
        totalCost.textContent = "za dużo";
      }

      this.updateTotalSum();
    };

    [costPerHour, dosePerHa, costPerM3, dosePerM3].forEach((input) => input.addEventListener("input", updateCost));
  }

  updateTotalSum() {
    const totalSumElement = this.result.querySelector(".total-sum");
    let sum = this.sections.reduce((acc, section) => {
      const costText = section.querySelector(".total-cost").innerHTML.replaceAll("&nbsp;", "").replace(" zł", "").replace(",", ".");
      const cost = parseFloat(costText) || 0;
      return acc + cost;
    }, 0);

    totalSumElement.textContent = sum === 0 ? "podaj wartości" : sum.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł";
  }
}

window.Nawadnianie = new Nawadnianie(document.querySelector("#nawadnianie"), "Nawadnianie");

const resetBtn = document.querySelector("#reset");
function resetAll() {
  document.querySelectorAll("input").forEach((input) => {
    if (input.type === "checkbox" || input.type === "radio") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });

  document.querySelectorAll("[id$='result-1'], [id$='result-2'], [id$='result-3'], [id$='result-4'], [id$='result-5'], [id$='result-6']").forEach((result) => {
    result.innerHTML = "podaj wartości";
  });

  document.querySelector("#nawozenie-mineralne").innerHTML = "";
  document.querySelector("#nawozy-dolistne").innerHTML = "";
  document.querySelector("#SORiA").innerHTML = "";
  document.querySelector("#biopreparaty").innerHTML = "";
  document.querySelector("#nawadnianie").innerHTML = "";
  window.NawozenieMineralne = new miniKalkulator(document.querySelector("#nawozenie-mineralne"), "NawozenieMineralne", "zł/t", "kg/ha", 1000);
  window.NawozenieDolistne = new miniKalkulator(document.querySelector("#nawozy-dolistne"), "NawozenieDolistne", "zł/l", "l/ha", 1);
  window.SOR = new miniKalkulator(document.querySelector("#SORiA"), "SOR", "zł/l, kg", "l, kg/ha", 1);
  window.biopraparat = new miniKalkulator(document.querySelector("#biopreparaty"), "biopreparat", "zł/l, kg", "l, kg/ha", 1);
  window.Nawadnianie = new Nawadnianie(document.querySelector("#nawadnianie"), "Nawadnianie", 1);

  document.querySelectorAll(".show-hide-content").forEach((content) => {
    content.style.height = "0px";
  });

  document.querySelectorAll(".display-state-button").forEach((btn) => {
    btn.textContent = "Rozwiń";
  });
  document.querySelector("#section-2-input-1").value = 1;
  document.querySelector("#section-6-input-1").value = 1580.89;
  document.querySelector("#section-6-input-2").value = 483.2;
  document.querySelector("#section-6-input-3").value = 168.79;
  document.querySelector("#section-6-input-4").value = 256.55;
  document.querySelector("#section-6-input-5").value = 435.1;
  document.querySelector("#section-6-input-6").value = 87.02;
  document.querySelector("#section-6-input-7").value = 225.01;
  document.querySelector("#section-6-input-8").value = 174.04;
  document.querySelector("#section-6-input-9").value = 261.06;
  document.querySelector("#section-6-input-10").value = 251.94;
  document.querySelector("#section-6-input-11").value = 134.6;
}

resetBtn.addEventListener("click", resetAll);
