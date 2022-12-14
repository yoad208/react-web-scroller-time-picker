import React, { useEffect, useState } from "react";
import TimePicker from "./components/TimePicker.js";

function App() {
  const [value, setValue] = useState("10:00");

  const onChange = (time) => {
    setValue(time);
  };

  useEffect(() => {
    console.log(value.split(":"));
  }, [value]);

  return (
    <div className="App">
      <TimePicker onChange={onChange} value={value} />
    </div>
  );
}

export default App;
