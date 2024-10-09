import React, { useState, useEffect } from "react";
import "./App.css";
import validatePositiveInt from "./functions/validatePositiveInt";
import ProgressBar from "./components/ProgressBar";
import Select from "./components/Select";
import Range from "./components/Range";
import NumImp from "./components/NumImp";
import TextArea from "./components/TextArea";
import File from "./components/File";
import Button from "./components/Button";
import saveText from "./functions/saveText";
import Clock from "./components/Clock";
import RbGroup from "./components/RbGroup";
import ChbGroup from "./components/ChbGroup";
import flower from "./pics/flower.jpg";
import Image from "./components/Image";

function App() {
  const [initialCountDown, setInitialCountDown] = useState(0);
  const [countDown, setCountDown] = useState(0);

  const fruits = ["Jahody", "Maliny", "Borůvky", "Angrešt", "Ostružiny"];

  const [fruit, setFruit] = useState("Borůvky");
  const [amount, setAmount] = useState(3);
  const [mem1, setMem1] = useState(0);
  const [mem2, setMem2] = useState(0);
  const [text, setText] = useState("");
  const [quality, setQuality] = useState("A");
  const [checkboxes, setCheckboxes] = useState([]);
  const [show, setShow] = useState(true);
  useEffect(() => {
    let temp = prompt("Zadejte počet sekund pro odpočet.", 10);
    while (!validatePositiveInt(temp)) {
      temp = prompt("Zadejte počet sekund pro odpočet.", 10);
    }
    setInitialCountDown(parseInt(temp));
    setCountDown(parseInt(temp));
  }, []);

  useEffect(() => {
    if (countDown > 0) {
      const timer = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countDown]);

  const progress =
    countDown > 0
      ? ((initialCountDown - countDown) / initialCountDown) * 100
      : 100;

  const product = mem1 * mem2;

  const handleData = (data, source) => {
    switch (source) {
      case "sel-fruits": {
        setFruit(data);
        break;
      }
      case "rng-amount": {
        setAmount(data);
        break;
      }
      case "num-mem1": {
        setMem1(data);
        break;
      }
      case "num-mem2": {
        setMem2(data);
        break;
      }
      case "txa-text": {
        setText(data);
        break;
      }
      case "file-load": {
        setText(data);
        break;
      }
      case "rbg-quality": {
        setQuality(data);
        break;
      }
      case "chb-checkboxes": {
        setCheckboxes(data);
        break;
      }
      default:
        break;
    }
  };

  const handleEvent = (source) => {
    switch (source) {
      case "btn-download": {
        saveText(text);
        break;
      }
      case "btn-reset": {
        setCountDown(initialCountDown);
        break;
      }
      case "btn-show": {
        setShow(true);
        break;
      }
      case "btn-hide": {
        setShow(false);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="bg-info-subtle vw-100 vh-100">
      <div className="container bg-warning-subtle">
        <div className="row p-4">
          <div className="col-6">
            <Select
              label="Ovoce"
              id="sel-fruits"
              selectedValue={fruit}
              dataIn={fruits}
              handleData={handleData}
            />
            <Range
              min="0"
              max="20"
              label="Množství"
              id="rng-amount"
              dataIn={amount}
              handleData={handleData}
            />
            <p>
              {fruit}, {amount} kg, jakost {quality}
            </p>
            <div className="row">
              <div className="col-6">
                <NumImp
                  id="num-mem1"
                  label="čitatel 1"
                  dataIn={mem1}
                  handleData={handleData}
                />
              </div>
              <div className="col-6">
                <NumImp
                  id="num-mem2"
                  label="čitatel 2"
                  dataIn={mem2}
                  handleData={handleData}
                />
              </div>
            </div>
            <p>Součin dvou čísel: {product}</p>
            <TextArea
              id="txa-text"
              label="Operace s textem"
              dataIn={text}
              handleData={handleData}
              height={150}
            />
            <div className="row">
              <div className="col-6">
                <File
                  id="file-load"
                  label="Načti text ze souboru"
                  handleData={handleData}
                />
              </div>
              <div className="col-6">
                <Button
                  id="btn-download"
                  label="Stáhni soubor s textem"
                  handleEvent={handleEvent}
                />
              </div>
            </div>
            <Clock />
            Počet checkboxů: {checkboxes.length}
          </div>
          <div className="col-6">
            <RbGroup
              label="Jakost"
              id="rbg-quality"
              selectedValue={quality}
              handleData={handleData}
              dataIn={[
                { label: "Jakost A", value: "A" },
                { label: "Jakost B", value: "B" },
                { label: "Jakost C", value: "C" },
              ]}
            />
            <ChbGroup
              label="Operace s checkboxy"
              id="chb-checkboxes"
              selectedValue={checkboxes}
              handleData={handleData}
              dataIn={[
                { label: "CheckBox 1", value: "A" },
                { label: "CheckBox 2", value: "B" },
                { label: "CheckBox 3", value: "C" },
                { label: "CheckBox 4", value: "D" },
                { label: "CheckBox 5", value: "E" },
                { label: "CheckBox 6", value: "F" },
                { label: "CheckBox 7", value: "G" },
                { label: "CheckBox 8", value: "H" },
              ]}
            />
            <Button
              id="btn-reset"
              label="Resetuj progressbar"
              handleEvent={handleEvent}
            />
            <div className="row">
              <div className="col-6">
                <Button
                  id="btn-show"
                  label="Ukaž obrázek"
                  handleEvent={handleEvent}
                />
              </div>
              <div className="col-6">
                <Button
                  id="btn-hide"
                  label="Skryj obrázek"
                  handleEvent={handleEvent}
                />
              </div>
            </div>
            <Image source={flower} id="flower" enabled={show} width="100%" />
          </div>
        </div>
        <ProgressBar id="pgb-progress" dataIn={progress} />
      </div>
    </div>
  );
}

export default App;
