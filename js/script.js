import { getUnits, getHistory } from "./api.js";
import { applyConversion, compareValues, performArithmetic } from "./conversion.js";
import { populateDropdown, setActive, showResult, toggleOperators, toggleResult, renderHistory } from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {

    const state = {
        type: "Length",
        action: "Conversion",
        fromVal: null,
        fromUnit: "",
        toVal: null,
        toUnit: "",
        operator: "+"
    };

    attachEventListeners();

    setDefaultActive();

    toggleOperators(false);

    try {
        await loadUnits("Length");
    } catch (error) {
        showError("Server unavailable. Unable to load units.");
    }

    loadHistory();

    function attachEventListeners() {
        const typeContainer = document.querySelector("#types");
        const actionContainer = document.querySelector("#actions");

        const typeCards = document.querySelectorAll(".type-card");
        const actionButtons = document.querySelectorAll(".action-btn");

        typeCards.forEach(card => {
            card.addEventListener("click", async () => {

                // 1. Update state
                state.type = card.dataset.type;

                // 2. Set active UI
                setActive(typeContainer, card, ".type-card");

                // 3. Reset inputs
                const inputs = document.querySelectorAll("#input-section input");
                inputs.forEach(input => input.value = "");

                // 4. Reset result
                showResult(0, "");

                try {
                    // 5. Fetch units
                    const units = await getUnits(state.type);

                    // 6. Populate dropdowns
                    const selects = document.querySelectorAll("#input-section select");

                    populateDropdown(selects[0], units);
                    populateDropdown(selects[1], units);

                    // 7. Reset state units
                    state.fromUnit = "";
                    state.toUnit = "";
                } catch (error) {
                    showError("Failed to load units");
                }
            });
        });

        actionButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                state.action = btn.innerText.trim();
                setActive(actionContainer, btn, ".action-btn");
                const isArithmetic = state.action === "Arithmetic";
                toggleOperators(isArithmetic);
                toggleResult(isArithmetic); 
            });
        });
    }

    function setDefaultActive() {
        const firstCard = document.querySelector("#types .card");
        const firstAction = document.querySelector(".action-btn");

        if (firstCard) firstCard.classList.add("active");
        if (firstAction) firstAction.classList.add("active");
    }

    async function loadUnits(type) {
        const units = await getUnits(type);

        if (!units || units.length === 0) {
            showError("No units found for this type.");
            return;
        }

        const selects = document.querySelectorAll("select");

        selects.forEach(select => {
            populateDropdown(select, units);
        });
    }

    async function loadHistory() {
        const historyData = await getHistory();

        if (!historyData || historyData.length === 0) {
            console.log("No history yet.");
            return;
        }

        renderHistory(historyData);
    }

    function showError(message) {
        alert(message);
    }
});