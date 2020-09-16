import React, { useState } from "react";
let operatorClickedFlag = false;
let tempCalculationLine = 0;
let dotPresentFlag = false;
let newCalculationFlag = false;
let divideClickedAlready = false;
let multiplyClickedAlready = false;
let plusClickedAlready = false;
let minusClickedAlready = false;

function Calculator() {
  const [calculationLine, setCalculationLine] = useState("");
  const [operationLine, setOperationLine] = useState("");

  const clearOperatorsAlreadyClickedFlags = () => {
    divideClickedAlready = false;
    multiplyClickedAlready = false;
    plusClickedAlready = false;
    minusClickedAlready = false;
  };
  const clearOperationLinesControlFlags = () => {
    newCalculationFlag = false;
    operatorClickedFlag = false;
    dotPresentFlag = false;
  };
  const initializeCalculator = () => {
    setCalculationLine(() => setCalculationLine(""));
    setOperationLine(() => setOperationLine(""));
    clearOperationLinesControlFlags();
    clearOperatorsAlreadyClickedFlags();
    tempCalculationLine = 0;
  };
  const handleDivideButton = () => {
    if (!divideClickedAlready) {
      divideClickedAlready = true;
      dotPresentFlag = false;
      operatorClickedFlag = true;
      setOperationLine("/");
      if (
        !multiplyClickedAlready &&
        !plusClickedAlready &&
        !minusClickedAlready
      ) {
        performCalculation();
      } else {
        multiplyClickedAlready = false;
        plusClickedAlready = false;
        minusClickedAlready = false;
      }
    }
  };
  const handleMultiplyButton = () => {
    if (!multiplyClickedAlready) {
      multiplyClickedAlready = true;
      dotPresentFlag = false;
      operatorClickedFlag = true;
      setOperationLine("*");
      if (
        !divideClickedAlready &&
        !plusClickedAlready &&
        !minusClickedAlready
      ) {
        performCalculation();
      } else {
        divideClickedAlready = false;
        plusClickedAlready = false;
        minusClickedAlready = false;
      }
    }
  };
  const handlePlusButton = () => {
    if (!plusClickedAlready) {
      plusClickedAlready = true;
      dotPresentFlag = false;
      operatorClickedFlag = true;
      setOperationLine("+");
      if (
        !divideClickedAlready &&
        !minusClickedAlready &&
        !multiplyClickedAlready
      ) {
        performCalculation();
      } else {
        divideClickedAlready = false;
        multiplyClickedAlready = false;
        minusClickedAlready = false;
      }
    }
  };
  const handleMinusButton = () => {
    if (!minusClickedAlready) {
      minusClickedAlready = true;
      dotPresentFlag = false;
      operatorClickedFlag = true;
      setOperationLine("-");
      if (
        !divideClickedAlready &&
        !plusClickedAlready &&
        !multiplyClickedAlready
      ) {
        performCalculation();
      } else {
        divideClickedAlready = false;
        multiplyClickedAlready = false;
        plusClickedAlready = false;
      }
    }
  };
  const updateCalculationLine = (numberClicked) => {
    clearOperatorsAlreadyClickedFlags();
    if (newCalculationFlag) {
      clearOperationLinesControlFlags();
      tempCalculationLine = Number(calculationLine);
      setCalculationLine(numberClicked);
    } else {
      if (!operatorClickedFlag) {
        setCalculationLine(calculationLine + String(numberClicked));
      } else {
        tempCalculationLine = Number(calculationLine);
        setCalculationLine(numberClicked);
        operatorClickedFlag = false;
      }
    }
  };
  const performCalculation = () => {
    let num = 0;
    switch (operationLine) {
      case "+":
        num = Number(calculationLine) + tempCalculationLine;
        setCalculationLine(Math.round((num + Number.EPSILON) * 10000) / 10000);
        break;

      case "-":
        num = tempCalculationLine - Number(calculationLine);
        setCalculationLine(Math.round((num + Number.EPSILON) * 10000) / 10000);
        break;

      case "*":
        num = Number(calculationLine) * tempCalculationLine;
        setCalculationLine(Math.round((num + Number.EPSILON) * 10000) / 10000);
        break;

      case "/":
        num = tempCalculationLine / Number(calculationLine);
        console.log(tempCalculationLine, calculationLine);
        setCalculationLine(Math.round((num + Number.EPSILON) * 10000) / 10000);
        break;
      default:
        setCalculationLine(Number(calculationLine));
    }
  };
  return (
    <>
      <div className="calculationLine">
        <input
          type="text"
          id="calculationLine-numeric"
          maxLength="10"
          value={calculationLine}
          readOnly
        ></input>
        <input
          type="text"
          id="calculationLine-sign"
          maxLength="1"
          value={operationLine}
          readOnly
        ></input>
      </div>

      <div className="calculator">
        <div>
          <div className="zero-styling">
            <div className="column">
              <button onClick={() => initializeCalculator("AC")}>AC</button>
              <button onClick={() => updateCalculationLine(7)}>7</button>
              <button onClick={() => updateCalculationLine(4)}>4</button>
              <button onClick={() => updateCalculationLine(1)}>1</button>
            </div>

            <div className="column">
              <button
                onClick={() => {
                  if (Number(calculationLine) !== 0) {
                    setCalculationLine(Number(calculationLine) * -1);
                  }
                }}
              >
                &plusmn;
              </button>
              <button onClick={() => updateCalculationLine(8)}>8</button>
              <button onClick={() => updateCalculationLine(5)}>5</button>
              <button onClick={() => updateCalculationLine(2)}>2</button>
            </div>
          </div>
          <button
            id="double-button"
            onClick={() => {
              if (
                calculationLine === "" ||
                Number(calculationLine) !== 0 ||
                operatorClickedFlag ||
                /*  */
                (typeof calculationLine === "string" &&
                  calculationLine.includes("."))

                /* https://stackoverflow.com/questions/41820770/using-includes-method-in-a-function */
              ) {
                updateCalculationLine(0);
              }
            }}
          >
            0
          </button>
        </div>

        <div className="column">
          <button
            onClick={() => {
              if (Number(calculationLine) !== 0) {
                setCalculationLine(
                  Math.round(
                    (Number(calculationLine) + Number.EPSILON) * 10000
                  ) / 1000000
                );
              }
            }}
          >
            &#x25;
          </button>
          <button onClick={() => updateCalculationLine(9)}>9</button>
          <button onClick={() => updateCalculationLine(6)}>6</button>
          <button onClick={() => updateCalculationLine(3)}>3</button>
          <button
            onClick={() => {
              if (!dotPresentFlag) {
                dotPresentFlag = true;
                updateCalculationLine(".");
              }
            }}
          >
            .
          </button>
        </div>

        <div className="column">
          <button
            onClick={() => {
              handleDivideButton();
            }}
          >
            &divide;
          </button>
          <button
            onClick={() => {
              handleMultiplyButton();
            }}
          >
            &times;
          </button>
          <button
            onClick={() => {
              handleMinusButton();
            }}
          >
            &minus;
          </button>
          <button
            onClick={() => {
              handlePlusButton();
            }}
          >
            &#x2b;
          </button>
          <button
            onClick={() => {
              if (!operatorClickedFlag) {
                newCalculationFlag = true;
                performCalculation();
                tempCalculationLine = 0;
                setOperationLine(() => setOperationLine(""));
              }
            }}
          >
            &#x3d;
          </button>
        </div>
      </div>
      <footer>&copy; Copyright Amr Fouad 2020</footer>
    </>
  );
}

export default Calculator;
