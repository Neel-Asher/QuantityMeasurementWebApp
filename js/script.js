import { getUnits, getHistory, getConversion, saveHistory } from "./api.js";
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

    const fromInput = document.querySelector("#input-section input:first-of-type");
    const toInput = document.querySelector("#input-section input:last-of-type");

    const fromSelect = document.querySelectorAll("select")[0];
    const toSelect = document.querySelectorAll("select")[1];

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

        document.querySelectorAll("#types .card").forEach(card => {
            card.addEventListener("click", async () => {

                state.type = card.innerText.trim();

                setActive(typeSelector, card, ".card");

                // Reset inputs
                fromInput.value = "";
                toInput.value = "";

                state.fromVal = null;
                state.toVal = null;

                // Reset result
                showResult(0, "");

                try {
                    await loadUnits(state.type);
                } catch (error) {
                    showError("Failed to load units.");
                }
            });
        });

        document.querySelectorAll(".action-btn").forEach(btn => {
            btn.addEventListener("click", () => {

                state.action = btn.innerText.trim();

                setActive(actionSelector, btn, ".action-btn");

                const isArithmetic = state.action === "Arithmetic";

                toggleOperators(isArithmetic);
                toggleResult(isArithmetic);

                // Reset result
                showResult(0, "");
            });
        });

        fromInput.addEventListener("input", () => {
            state.fromVal = parseFloat(fromInput.value);
            calculate();
        });

        toInput.addEventListener("input", () => {
            if (state.action === "Conversion") return;
            state.toVal = parseFloat(toInput.value);
            calculate();
        });

        fromSelect.addEventListener("change", () => {
            state.fromUnit = fromSelect.value;
            calculate();
        });

        toSelect.addEventListener("change", () => {
            state.toUnit = toSelect.value;
            calculate();
        });     

        document.querySelectorAll(".operator-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                state.operator = btn.innerText.trim();
                calculate();
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

        fromSelect.selectedIndex = 1;
        toSelect.selectedIndex = 1;

        state.fromUnit = fromSelect.value;
        state.toUnit = toSelect.value;

        calculate();
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

    async function calculate() {
        try {

            // Guard clause (missing inputs)
            if (state.fromVal === null || isNaN(state.fromVal)) return;
            if (!state.fromUnit || !state.toUnit) {
                console.log("Waiting for unit selection...");
                return;
            }

            let result;
            let expression = "";

            if (state.action === "Conversion") {
                const conv = await getConversion(state.fromUnit, state.toUnit);
                result = applyConversion(state.fromVal, conv);
                toInput.value = result.toString();
                expression = `${state.fromVal} ${state.fromUnit} → ${state.toUnit}`;
                showResult(result, state.toUnit);
            }

            else if (state.action === "Comparison") {

                if (state.toVal === null || isNaN(state.toVal)) return;

                const conv1 = await getConversion(state.fromUnit, state.toUnit);
                const conv2 = await getConversion(state.toUnit, state.fromUnit);

                const base1 = applyConversion(state.fromVal, conv1);
                const base2 = applyConversion(state.toVal, conv2);

                result = compareValues(
                    state.fromVal,
                    state.fromUnit,
                    state.toVal,
                    state.toUnit,
                    base1,
                    base2
                );

                expression = `${state.fromVal} ${state.fromUnit} vs ${state.toVal} ${state.toUnit}`;

                showResult(result, "");
            }

            else {

                if (state.toVal === null || isNaN(state.toVal)) return;
                const conv = await getConversion(state.toUnit, state.fromUnit);
                const v2normalised = applyConversion(state.toVal, conv);
                result = performArithmetic(state.fromVal, v2normalised, state.operator);
                expression = `${state.fromVal} ${state.fromUnit} ${state.operator} ${state.toVal} ${state.toUnit}`;
                showResult(result, state.fromUnit);
            }

            const record = {
                type: state.type,
                action: state.action,
                expression,
                result,
                timestamp: new Date().toISOString()
            };

            await saveHistory(record);

            const updatedHistory = await getHistory();
            renderHistory(updatedHistory);

        } catch (e) {
            showResult("Error: " + e.message, "");
        }
    }

    function showError(message) {
        alert(message);
    }
});