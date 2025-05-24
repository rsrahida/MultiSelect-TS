import { useState } from "react";
import Select from "./components/Select/Select";
import type { Option } from "./components/Select/types";

const options: Option[] = [
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Yellow", value: "yellow" },
  { label: "Purple", value: "purple" },
  { label: "Orange", value: "orange" },
  { label: "Pink", value: "pink" },
];

function App() {
  const [singleValue, setSingleValue] = useState<Option | null>(null);
  const [multiValue, setMultiValue] = useState<Option[]>([]);

  //*Singleselect
  const handleSingleChange = (value: Option | Option[] | null) => {
    if (Array.isArray(value) || value === null) {
      setSingleValue(null);
    } else {
      setSingleValue(value);
    }
  };

  //*Multiselect
  const handleMultiChange = (value: Option | Option[] | null) => {
    if (Array.isArray(value)) {
      setMultiValue(value);
    } else if (value === null) {
      setMultiValue([]);
    } else {
      setMultiValue([value]);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Single Select</h2>
      <Select
        options={options}
        multiple={false}
        value={singleValue}
        onChange={handleSingleChange}
        placeholder="Select a color"
      />
      <h2 style={{ marginTop: 40 }}>Multi Select</h2>
      <Select
        options={options}
        multiple={true}
        value={multiValue}
        onChange={handleMultiChange}
        placeholder="Select colors"
      />
    </div>
  );
}

export default App;
