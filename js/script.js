import { getUnits, getHistory } from "./api.js";
import { applyConversion, compareValues, performArithmetic } from "./conversion.js";
import { populateDropdown, setActive } from "./ui.js";

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

        const typeCards = document.querySelectorAll("#types .card");
        const actionButtons = document.querySelectorAll(".action-btn");

        typeCards.forEach(card => {
            card.addEventListener("click", () => {
                state.type = card.innerText.trim();
                setActive(typeContainer, card, ".card");
                loadUnits(state.type);
            });
        });

        actionButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                state.action = btn.innerText.trim();
                setActive(actionContainer, btn, ".action-btn");
            });
        });
    }

    function setDefaultActive() {
        const firstCard = document.querySelector("#types .card");
        const firstAction = document.querySelector(".action-btn");

        if (firstCard) firstCard.classList.add("active");
        if (firstAction) firstAction.classList.add("active");
    }

    function toggleOperators(show) {
        const operatorRow = document.querySelector("#operators");

        if (!operatorRow) return;

        operatorRow.style.display = show ? "flex" : "none";
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

        console.log("History:", historyData);
    }

    function showError(message) {
        alert(message);
    }
});