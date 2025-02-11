function format(inputString) {
  return inputString
    .replace(/[^0-9.,]/g, "") // Allow only numbers, dots, and commas
    .replace(/^(?!\.)/g, "")
    .replace(/,/g, ".")
    .replace(/^\.($|[^0-9])/, "0.")
    .replace(/\.{2,}/g, ".")
    .replace(/(.*?\..*?)\./g, "$1")
    .replace(/(\d+\.\d{2})\d*/g, "$1");
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

    console.log("dwerwef");
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
    let sec2res3Value = parseFloat(sec2res3.innerHTML.replace(",", ".").replace(" zł", "").replace("&nbsp;", "")) || 0;
    let sec3res1Value = parseFloat(sec3res1.innerHTML.replace(",", ".").replace(" zł", "").replace("&nbsp;", "")) || 0;
    let sec4res1Value = parseFloat(sec4res1.innerHTML.replace(",", ".").replace(" zł", "").replace("&nbsp;", "")) || 0;

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
    let przychody = parseFloat(sec5res1.innerHTML.replace(",", ".").replace(" zł", "").replace("&nbsp;", "")) || 0;
    let doplaty = parseFloat(sec6res1.innerHTML.replace(",", ".").replace(" zł", "").replace("&nbsp;", "")) || 0;

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
let sec11res1 = document.querySelector("#section-11-result-1");
document.querySelectorAll(".section-11").forEach((input) => {
  input.addEventListener("input", function () {
    let result = Number(sec11in1.value) + Number(sec11in2.value) + Number(sec11in3.value);

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0 && result !== Infinity) {
      sec11res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha/rok";
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
    let result = (Number(sec13in1.value) * Number(sec13in4.value) * Number(sec13in3.value)) / 100 + (Number(sec13in2.value) * Number(sec13in5.value) * (100 - Number(sec13in3.value))) / 100;

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0 && result !== Infinity) {
      sec13res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha/rok";
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
let sec15res1 = document.querySelector("#section-15-result-1");
document.querySelectorAll(".section-15").forEach((input) => {
  input.addEventListener("input", function () {
    let result = Number(sec15in1.value) + Number(sec15in2.value) + Number(sec15in3.value) + Number(sec15in4.value) + Number(sec15in5.value) + Number(sec15in6.value) + Number(sec15in7.value);

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0 && result !== Infinity) {
      sec15res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha/rok";
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
    console.log(in7);
    let in8 = parseFloat(sec16in8.value) || 0;
    console.log(in8);
    let in9 = parseFloat(sec16in9.value) || 1;
    console.log(in9);
    let in2 = parseFloat(sec1in2.value) || 0;
    console.log(in2);

    let transportZew = (((in7 * in8) / in9) * in2) / 10;
    console.log(transportZew);
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
let sec17res1 = document.querySelector("#section-17-result-1");
document.querySelectorAll(".section-17").forEach((input) => {
  input.addEventListener("input", function () {
    let result = Number(sec17in1.value) + Number(sec17in2.value) + Number(sec17in3.value);

    if (result > 100000000) {
      result = "za dużo";
    }
    if (result !== 0 && result !== Infinity) {
      sec17res1.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " zł/ha/rok";
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
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", function () {
    let r1 = parseFloat(res1.innerHTML.replace(" zł/ha/rok", "").replace("&nbsp;", "")) || 0;
    let s7 = parseFloat(sec7res1.innerHTML.replace(" zł/ha/rok", "").replace("&nbsp;", "")) || 0;
    let s8 = parseFloat(sec8res1.innerHTML.replace(" zł/ha/rok", "").replace("&nbsp;", "")) || 0;
    let s9 = parseFloat(sec9res1.innerHTML.replace(" zł/ha/rok", "").replace("&nbsp;", "")) || 0;
    let s10 = parseFloat(sec10res1.innerHTML.replace(" zł/ha/rok", "").replace("&nbsp;", "")) || 0;
    let s11 = parseFloat(sec11res1.innerHTML.replace(" zł/ha/rok", "").replace("&nbsp;", "")) || 0;
    let s12 = parseFloat(sec12res1.innerHTML.replace(" zł/ha/rok", "").replace("&nbsp;", "")) || 0;
    let s13 = parseFloat(sec13res1.innerHTML.replace(" zł/ha/rok", "").replace("&nbsp;", "")) || 0;
    let s14 = parseFloat(sec14res1.innerHTML.replace(" zł/ha/rok", "").replace("&nbsp;", "")) || 0;
    let s15 = parseFloat(sec15res1.innerHTML.replace(" zł/ha/rok", "").replace("&nbsp;", "")) || 0;
    let s16 = parseFloat(sec16res1.innerHTML.replace(" zł/ha/rok", "").replace("&nbsp;", "")) || 0;
    let s17 = parseFloat(sec17res1.innerHTML.replace(" zł/ha/rok", "").replace("&nbsp;", "")) || 0;

    let result = s7 + s8 + s9 + s10 + s11 + s12 + s13 + s14 + s15 + s16 + s17;

    if (result !== 0) {
      res2.innerHTML = result.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł/ha/rok";
      res3.innerHTML = (result * Number(sec2in1.value)).toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł";
      res4.innerHTML = r1 - result + " zł";
      if (sec2in2.value !== 0) res5.innerHTML = (result / Number(sec2in2.value)).toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " dt/ha";
      if (sec1in3.value !== 0) res6.innerHTML = (result / Number(sec1in3.value)).toLocaleString("pl-PL", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " zł/t";
    }
  });
});
