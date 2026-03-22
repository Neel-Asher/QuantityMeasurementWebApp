export function populateDropdown(selectEl, units) {

    // Safety check
    if (!selectEl) {
        console.warn("populateDropdown: select element not found");
        return;
    }

    // Clear existing options
    selectEl.innerHTML = "";

    // Default option
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "-- Select Unit --";
    defaultOption.disabled = true;
    defaultOption.selected = true;

    selectEl.appendChild(defaultOption);

    // Handle empty units
    if (!units || units.length === 0) {
        return;
    }

    // Populate options
    units.forEach(u => {
        const opt = document.createElement("option");
        opt.value = u.symbol;
        opt.textContent = `${u.label} (${u.symbol})`;

        selectEl.appendChild(opt);
    });
}

export function setActive(parentEl, clickedEl, childSelector) {

    // Safety check
    if (!parentEl) {
        console.warn("setActive: parent element not found");
        return;
    }

    // Remove active from all siblings
    const children = parentEl.querySelectorAll(childSelector);

    children.forEach(el => el.classList.remove("active"));

    // Add active to clicked element
    if (clickedEl) {
        clickedEl.classList.add("active");
    }
}

export function showResult(value, unitSymbol) {

    const valueEl = document.querySelector("#result-value");
    const unitEl = document.querySelector("#result-unit");

    // Safety check
    if (!valueEl || !unitEl) {
        console.warn("showResult: result elements not found");
        return;
    }

    // Handle null/invalid
    if (value === null || value === undefined) {
        valueEl.textContent = "—";
        unitEl.textContent = "";
        return;
    }

    // Set values
    valueEl.textContent = value;
    unitEl.textContent = unitSymbol || "";

    // Highlight animation
    valueEl.classList.add("highlight");

    setTimeout(() => {
        valueEl.classList.remove("highlight");
    }, 1500);
}

export function toggleOperators(show) {

    const operatorRow = document.querySelector("#operator-selector");

    // Safety check
    if (!operatorRow) {
        console.warn("toggleOperators: operator selector not found");
        return;
    }

    // Show / Hide
    operatorRow.style.display = show ? "flex" : "none";
}

export function toggleResult(show) {
    const resultBox = document.querySelector("#result-box");

    if (!resultBox) {
        console.warn("Result box not found");
        return;
    }

    resultBox.style.display = show ? "block" : "none";
}