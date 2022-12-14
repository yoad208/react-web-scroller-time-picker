import React, { useEffect, useState } from "react";
import HourFormat from "./HourFormat";
import HourWheel from "./HourWheel";
import MinuteWheel from "./MinuteWheel";

function TimePickerSelection({
  pickerDefaultValue,
  initialValue,
  onChange,
  height,
  controllers,
  setControllers,
  setInputValue,
  seperator,
  use12Hours,
  onAmPmChange,
}) {
  const initialTimeValue = use12Hours ? initialValue.slice(0, 5) : initialValue;
  const [value, setValue] = useState(
    initialValue === null ? pickerDefaultValue : initialTimeValue
  );
  const [hourFormat, setHourFormat] = useState({
    mount: false,
    hourFormat: initialValue.slice(6, 8),
  });

  useEffect(() => {
    const finalSelectedValue = use12Hours
      ? `${value} ${hourFormat.hourFormat}`
      : value;
    setInputValue(finalSelectedValue);
    onChange(finalSelectedValue);
  }, [value]);

  useEffect(() => {
    if (hourFormat.mount) {
      onAmPmChange(hourFormat.hourFormat);
    }
  }, [hourFormat]);

  const params = {
    height,
    value,
    setValue,
    controllers,
    use12Hours,
    onAmPmChange,
    setHourFormat,
    hourFormat,
  };

  return (
    <div
      className="react-ios-time-picker  react-ios-time-picker-transition"
      style={{ position: "relative" }}
    >
      <div
        className="react-ios-time-picker-container"
        style={
          controllers
            ? { height: `${height * 5 + 40}px` }
            : { height: `${height * 5 - 70}px` }
        }
      >
        <div
          className="react-ios-time-picker-selected-overlay"
          style={{
            top: controllers ? `${height * 2 + 15}px` : `${height * 2 - 41}px`,
            height: `${height + 8}px`,
          }}
        />
        <button
          style={{
            position: "absolute",
            left: "5%",
            top: controllers ? "41%" : "25%",
            width: "90%",
            height: controllers ? "20%" : "55%",
            zIndex: 90,
          }}
          onClick={() => setControllers((controllers) => !controllers)}
        />
        {controllers ? (
          <HourWheel {...params} />
        ) : (
          <p
            style={{
              paddingRight: "8px",
              fontSize: "26px",
              color: "white",
              zIndex: 99999,
            }}
          >
            {value.split(":")[0]}
          </p>
        )}
        {seperator && <div className="react-ios-time-picker-colon">:</div>}

        {controllers ? (
          <MinuteWheel {...params} />
        ) : (
          <p
            style={{
              paddingLeft: "8px",
              fontSize: "26px",
              color: "white",
              zIndex: 99999,
            }}
          >
            {value.split(":")[1]}
          </p>
        )}

        {use12Hours && <HourFormat {...params} />}
      </div>
    </div>
  );
}

export default TimePickerSelection;
