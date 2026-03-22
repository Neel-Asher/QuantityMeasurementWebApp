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