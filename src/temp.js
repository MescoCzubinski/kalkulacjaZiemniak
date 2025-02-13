class miniKalkulator {
  constructor(path, name, unit1, unit2) {
    this.path = path;
    this.unit1 = unit1;
    this.unit2 = unit2;
    this.name = name;
    this.subCalcIndex = 1;

    this.result = document.createElement("div");
    this.result.classList.add("main-container");

    this.renderBase();
  }

  renderBase() {
    this.result.innerHTML = `
        <div class="section">
          <div class="flex w-full justify-center">
              <input type="button" class="mr-2 add-btn" value="dodaj kalkulacje" />
          </div>
          <div class="border-t-2 mt-2 mb-2 border-bg-info"></div>
          <div class="flex">
              <input type="text" class="name" placeholder="nazwa" />
          </div>
          <div class="flex flex-col">
              <div class="text-xl text-left mb-2 ml-2 mt-4">Koszt jednostkowy:</div>
              <div class="flex">
                  <input type="text" placeholder="koszt za t" />
                  <div class="ml-2 text-xl flex items-center">zł/${this.unit1}</div>
              </div>
              <div class="text-xl text-left mb-2 ml-2 mt-4">Liczba na ha:</div>
              <div class="flex">
                  <input type="text" placeholder="ile na 1 ha" />
                  <div class="ml-2 text-xl flex items-center">zł/${this.unit2}</div>
              </div>
          </div>
            <div class="flex text-xl mt-4 w-full items-center h-fit">
              <div class="p-1">Koszt:</div>
              <div class="p-1 ml-2 text-top-agrar-green" >podaj wartości</div>
            </div>
        </div>`;

    this.path.appendChild(this.result);

    this.result.querySelector(".add-btn").addEventListener("click", () => this.addCalc());
  }

  addCalc() {
    const newSection = document.createElement("div");
    newSection.classList.add("section");
    newSection.innerHTML = `
        <div class="border-t-2 mb-2 border-bg-info"></div>
        <div class="flex">
            <input type="text" class="name " placeholder="nazwa" />
            <input type="button" class="ml-2 mt-2 remove-btn" data-id="${this.subCalcIndex}" value="-" />
        </div>
        <div class="flex flex-col">
            <div class="text-xl text-left mb-2 ml-2 mt-4">Koszt jednostkowy:</div>
            <div class="flex">
                <input type="text" placeholder="koszt za t" />
                <div class="ml-2 text-xl flex items-center">zł/${this.unit1}</div>
            </div>
            <div class="text-xl text-left mb-2 ml-2 mt-4">Liczba na ha:</div>
            <div class="flex">
                <input type="text" placeholder="ile na 1 ha" />
                <div class="ml-2 text-xl flex items-center">zł/${this.unit2}</div>
            </div>
            <div class="flex text-xl mt-4 w-full items-center h-fit">
              <div class="p-1">Koszt:</div>
              <div class="p-1 ml-2 text-top-agrar-green">podaj wartości</div>
            </div>
        </div>`;

    newSection.querySelector(".remove-btn").addEventListener("click", () => {
      newSection.remove();
    });

    this.result.appendChild(newSection);
    this.subCalcIndex++;

    recalculateSectionHeight();
  }
}

let nawozenie = document.querySelector("#nawozenie-mineralne");
window.NawozenieMineralne = new miniKalkulator(nawozenie, "NawozenieMineralne", "zł/t", "kg/ha");
