import React, { useEffect, useState } from "react";
import { Portal } from "react-portal";
import TimePickerSelection from "./TimePickerSelection";
import "../styles/react-ios-time-picker.css";

function TimePicker({
  value: initialValue = null,
  cellHeight = 28,
  placeHolder = "Select Time",
  pickerDefaultValue = "10:00",
  onChange = () => {},
  onFocus = () => {},
  onSave = () => {},
  onCancel = () => {},
  disabled = false,
  required = false,
  cancelButtonText = "Cancel",
  saveButtonText = "Save",
  seperator = true,
  id = null,
  use12Hours = false,
  onAmPmChange = () => {},
  name = null,
  popupClassName = null,
  inputClassName = null,
}) {
  const [height, setHeight] = useState(cellHeight);
  const [inputValue, setInputValue] = useState(initialValue);
  const [controllers, setControllers] = useState(true);

  let finalValue = inputValue;

  if (initialValue === null && use12Hours) {
    finalValue = `${pickerDefaultValue} AM`;
  } else if (initialValue === null && !use12Hours) {
    finalValue = pickerDefaultValue;
  }

  const params = {
    onChange,
    height,
    onSave,
    onCancel,
    cancelButtonText,
    saveButtonText,
    controllers,
    setControllers,
    setInputValue,
    seperator,
    use12Hours,
    onAmPmChange,
    initialValue: finalValue,
    pickerDefaultValue,
  };

  return (
    <>
      <Portal>
        <div>
          <div className="react-ios-time-picker-popup">
            <div
              className={`react-ios-time-picker-popup-overlay ${
                popupClassName || ""
              }`}
            />
            <TimePickerSelection {...params} />
          </div>
        </div>
      </Portal>
    </>
  );
}

export default TimePicker;
