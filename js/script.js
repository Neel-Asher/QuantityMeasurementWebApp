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
    toggleResult(false);

    try {
        await loadUnits("Length");
    } catch (error) {
        showError("Server unavailable. Unable to load units.");
    }

    loadHistory();

    function attachEventListeners() {

        const typeSelector = document.querySelector("#types");
        const actionSelector = document.querySelector("#actions");

        const fromInput = document.querySelector("#input-section input:first-of-type");
        const toInput = document.querySelector("#input-section input:last-of-type");

        const fromSelect = document.querySelectorAll("select")[0];
        const toSelect = document.querySelectorAll("select")[1];

        document.querySelectorAll("#types .card").forEach(card => {
            card.addEventListener("click", async () => {

                state.type = card.dataset.type;

                setActive(typeSelector, card, ".card");

                // Reset inputs
                fromInput.value = "";
                toInput.value = "";

                // Reset result
                showResult(0, "");

                try {
                    const units = await getUnits(state.type);

                    populateDropdown(fromSelect, units);
                    populateDropdown(toSelect, units);

                    // Reset selected units in state
                    state.fromUnit = "";
                    state.toUnit = "";

                } catch (error) {
                    showError("Failed to load units.");
                }
            });
        });

        document.querySelectorAll(".action-btn").forEach(btn => {
            btn.addEventListener("click", () => {

                state.action = btn.dataset.action;

                setActive(actionSelector, btn, ".action-btn");

                const isArithmetic = state.action === "Arithmetic";

                toggleOperators(isArithmetic);
                toggleResult(isArithmetic);

                // Reset result
                showResult(0, "");
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
        try {
            const historyData = await getHistory();

            if (!historyData || historyData.length === 0) {
                console.log("No history yet.");
                return;
            }

            renderHistory(historyData);

        } catch (error) {
            console.error("Failed to load history");
        }
    }

    function showError(message) {
        alert(message);
    }
});