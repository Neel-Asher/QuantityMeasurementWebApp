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