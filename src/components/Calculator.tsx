import React, { useState } from "react";

import styles from "./Calculator.module.css";

const Calculator = () => {
  const [display, setDisplay] = useState<number | string>("");
  const [errorDisplay, setErrorDisplay] = useState("");
  const [output, setOutput] = useState(0);

  const clear = () => {
    setDisplay("0");
    setErrorDisplay("");
    setOutput(0);
  };

  const handleCalculatorButtonPress = (character: string) => {
    // Early exits

    // There was a previous result in there
    if (
      output &&
      character !== "/" &&
      character !== "+" &&
      character !== "-" &&
      character !== "*"
    ) {
      console.log("resetting.");
      setDisplay(character);
      setOutput(0);
      return;
    }

    if (
      output &&
      (character === "/" ||
        character === "*" ||
        character === "+" ||
        character === "-")
    ) {
      setOutput(0);
    }

    let typeSafeDisplay = display.toString();
    console.log("typeSafeDisplay", typeSafeDisplay);

    if (character === ".")
      for (let i = typeSafeDisplay.length - 1; i >= 0; i--) {
        if (typeSafeDisplay.charAt(i) === ".") {
          setErrorDisplay(
            "You cannot have two decimal points within the same number. Not today."
          );
          console.log("Found another dot!", typeSafeDisplay);
          return;
        }
        if (/^\D$/.test(typeSafeDisplay.charAt(i))) {
          break;
        }
      }

    if (
      /^\d$/.test(character) &&
      typeSafeDisplay.charAt(typeSafeDisplay.length - 1) === "0" &&
      /^\D$/.test(typeSafeDisplay.charAt(typeSafeDisplay.length - 2))
    ) {
      setErrorDisplay(
        "You cannot have other digits after 0 if the number starts with that."
      );
      console.log(
        '"You cannot have other digits after 0 if the number starts with that."',
        typeSafeDisplay
      );
      return;
    }

    // two operators case
    if (
      /^\D$/.test(character) &&
      /^\D$/.test(typeSafeDisplay.charAt(typeSafeDisplay.length - 1))
    ) {
      if (
        // case of * - +, will be handled later, since we need to cut down from the state and actually replace the last two chars
        !(
          (character === "+" || character === "*" || character === "/") &&
          /^\D$/.test(typeSafeDisplay.charAt(typeSafeDisplay.length - 1)) &&
          /^\D$/.test(typeSafeDisplay.charAt(typeSafeDisplay.length - 2))
        )
      ) {
        if (
          !(
            (character === "+" || character === "-") &&
            /^[\/\*]$/.test(
              typeSafeDisplay.charAt(typeSafeDisplay.length - 1)
            ) &&
            /^\d$/.test(typeSafeDisplay.charAt(typeSafeDisplay.length - 2))
          )
        ) {
          setErrorDisplay("Inserting two consecutive non-digits? Nope.");
          console.log(
            '"Inserting two consecutive non-digits? Nope."',
            typeSafeDisplay
          );
          return;
        }
      }
    }
    if (/^[+-/*]$/.test(character) && typeSafeDisplay.length === 0) {
      setErrorDisplay("The expression cannot start with an operator.");
      console.log(
        '"The expression cannot start with an operator."',
        typeSafeDisplay
      );
      return;
    }

    // Special post-clear case concatenation
    let newDisplay = typeSafeDisplay;
    if (typeSafeDisplay.length === 1 && typeSafeDisplay.charAt(0) === "0") {
      newDisplay = "";
    }

    // Special case, we need to replace the last two chars
    if (
      (character === "+" || character === "*" || character === "/") &&
      /^\D$/.test(typeSafeDisplay.charAt(typeSafeDisplay.length - 1)) &&
      /^\D$/.test(typeSafeDisplay.charAt(typeSafeDisplay.length - 2))
    ) {
      console.log("SPECIAL CASE!!!");
      setDisplay(
        newDisplay.slice(0, typeSafeDisplay.length - 2).concat(character)
      );
    } else {
      // Set new display
      console.log("concatenating as usual");
      setDisplay(newDisplay.concat(character));
    }
  };

  const calculate = () => {
    if (typeof display !== "string") return;
    console.log("result of", display, "is", eval(display));
    setDisplay(eval(display));
    setOutput(eval(display));
  };

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.calculatorButtons}>
        <div
          id="zero"
          className={styles.calculatorButton}
          onClick={() => handleCalculatorButtonPress("0")}
        >
          0
        </div>
        <div
          id="one"
          className={styles.calculatorButton}
          onClick={() => handleCalculatorButtonPress("1")}
        >
          1
        </div>
        <div
          id="two"
          className={styles.calculatorButton}
          onClick={() => handleCalculatorButtonPress("2")}
        >
          2
        </div>
        <div
          id="three"
          className={styles.calculatorButton}
          onClick={() => handleCalculatorButtonPress("3")}
        >
          3
        </div>
        <div
          id="four"
          className={styles.calculatorButton}
          onClick={() => handleCalculatorButtonPress("4")}
        >
          4
        </div>
        <div
          id="five"
          className={styles.calculatorButton}
          onClick={() => handleCalculatorButtonPress("5")}
        >
          5
        </div>
        <div
          id="six"
          className={styles.calculatorButton}
          onClick={() => handleCalculatorButtonPress("6")}
        >
          6
        </div>
        <div
          id="seven"
          className={styles.calculatorButton}
          onClick={() => handleCalculatorButtonPress("7")}
        >
          7
        </div>
        <div
          id="eight"
          className={styles.calculatorButton}
          onClick={() => handleCalculatorButtonPress("8")}
        >
          8
        </div>
        <div
          id="nine"
          className={styles.calculatorButton}
          onClick={() => handleCalculatorButtonPress("9")}
        >
          9
        </div>
        <div
          id="add"
          className={styles.calculatorButton}
          onClick={() => handleCalculatorButtonPress("+")}
        >
          +
        </div>
        <div
          id="subtract"
          className={styles.calculatorButton}
          onClick={() => handleCalculatorButtonPress("-")}
        >
          -
        </div>
        <div
          id="multiply"
          className={styles.calculatorButton}
          onClick={() => handleCalculatorButtonPress("*")}
        >
          *
        </div>
        <div
          id="divide"
          className={styles.calculatorButton}
          onClick={() => handleCalculatorButtonPress("/")}
        >
          /
        </div>
        <div
          id="decimal"
          className={styles.calculatorButton}
          onClick={() => handleCalculatorButtonPress(".")}
        >
          .
        </div>
        <div id="clear" className={styles.calculatorButton} onClick={clear}>
          Clear
        </div>
        <div
          id="equals"
          className={styles.calculatorButton}
          onClick={calculate}
        >
          =
        </div>
      </div>
      <div className={styles.displays}>
        <div id="display" className={styles.display}>
          {output !== 0 ? output : display}
        </div>
        <div className={`${styles.display} ${styles.errorDisplay}`}>
          {errorDisplay}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
