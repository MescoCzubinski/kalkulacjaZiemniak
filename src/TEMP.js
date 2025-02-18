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
        <div class="flex w-full justify-center">
          <input type="button" class="mr-2 add-btn bg-top-agrar-green/5" value="Kliknij i dodaj kolejny" />
        </div>
        <div class="flex text-2xl mt-4 w-full justify-center items-center h-fit">
          <div class="p-1 font-bold">SUMA:</div>
          <div class="p-1 ml-2 text-top-agrar-green total-sum">0 zł</div>
        </div>`;

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
              <input type="text" class="cost-per-hour" placeholder="zł za godzinę"/>
              <div class="ml-2 text-xl flex items-center">zł/godz.</div>
            </div>
            <div class="text-xl text-left mb-2 ml-2 mt-4">Dawka na ha:</div>
            <div class="flex">
              <input type="text" class="dose-per-ha" placeholder="godz./ha"/>
              <div class="ml-2 text-xl flex items-center">godz./ha</div>
            </div>
            <div class="text-xl text-left mb-2 ml-2 mt-4">Koszt wody:</div>
            <div class="flex">
              <input type="text" class="cost-per-m3" placeholder="zł za m³"/>
              <div class="ml-2 text-xl flex items-center">zł/m³</div>
            </div>
            <div class="text-xl text-left mb-2 ml-2 mt-4">Dawka wody na ha:</div>
            <div class="flex">
              <input type="text" class="dose-per-m3" placeholder="m³/ha"/>
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
          this.recalculateSectionHeight();
        });
      } else {
        newSection.querySelector(".remove-btn").remove();
      }

      this.sectionContainer.appendChild(newSection);
      this.sections.push(newSection);
      this.addEventListeners(newSection);
      this.recalculateSectionHeight();
    }
  }

  addEventListeners(section) {
    const costPerHour = section.querySelector(".cost-per-hour");
    const dosePerHa = section.querySelector(".dose-per-ha");
    const costPerM3 = section.querySelector(".cost-per-m3");
    const dosePerM3 = section.querySelector(".dose-per-m3");
    const totalCost = section.querySelector(".total-cost");

    const updateCost = () => {
      const costHour = parseFloat(costPerHour.value.replace(",", ".")) || 0;
      const doseHour = parseFloat(dosePerHa.value.replace(",", ".")) || 0;
      const costWater = parseFloat(costPerM3.value.replace(",", ".")) || 0;
      const doseWater = parseFloat(dosePerM3.value.replace(",", ".")) || 0;

      let result = costHour * doseHour + costWater * doseWater;

      totalCost.textContent = result > 0 ? result.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł" : "0 zł";

      this.updateTotalSum();
    };

    [costPerHour, dosePerHa, costPerM3, dosePerM3].forEach((input) => input.addEventListener("input", updateCost));
  }

  updateTotalSum() {
    const totalSumElement = this.result.querySelector(".total-sum");
    let sum = this.sections.reduce((acc, section) => {
      const costText = section.querySelector(".total-cost").textContent.replace(" zł", "").replace(",", ".");
      return acc + (parseFloat(costText) || 0);
    }, 0);

    totalSumElement.textContent = sum > 0 ? sum.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " zł" : "0 zł";
  }

  recalculateSectionHeight() {
    this.sectionContainer.style.height = `${this.sectionContainer.scrollHeight}px`;
  }
}

window.Nawadnianie = new Nawadnianie(document.querySelector("#nawadnianie"), "Nawadnianie");
