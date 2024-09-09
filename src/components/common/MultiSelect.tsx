import React from "react";
import "./multiselect.scss";

function MultiSelect({
  label,
  options,
  onChange,
  type = "checkbox",
  value,
  atleastOne = false,
  initial,
}: {
  label: string;
  options: { value: string; text: string }[] | string[];
  onChange: (selected: string[]) => void;
  type?: "checkbox" | "radio";
  value?: string;
  atleastOne?: boolean;
  initial?: string[];
}) {
  const [data, setData] = React.useState<
    { selected: boolean; value: string; text: string }[]
  >([]);

  React.useEffect(() => {
    if (typeof options[0] === "string") {
      const data = options.map((option) => {
        return {
          selected: value
            ? option === value
              ? true
              : false
            : initial
            ? initial.includes(option as string)
            : false,
          value: option,
          text: option,
        };
      });

      setData(data as any);
    } else {
      const data = options.map((option) => {
        return {
          ...(option as any),
          selected: false,
        };
      });

      setData(data as any);
    }
  }, [value]);

  function toggleSelect(i: number) {
    const newData = structuredClone(data);

    if (type === "radio") {
      newData.forEach((option, _i) => {
        if (_i !== i) option.selected = false;
      });
    }

    if (atleastOne) newData[i].selected = true;
    else newData[i].selected = !newData[i].selected;

    setData(newData);
    onChange(
      newData.filter((option) => option.selected).map((option) => option.value)
    );
  }

  return (
    <div className="selectMulti">
      <p>{label}</p>
      <div className="options-container flex">
        {data.map((option, i) => (
          <div
            className={
              "select-option " + (option.selected ? "selected-option" : "")
            }
            key={"select-" + option.value}
            onClick={() => toggleSelect(i)}
          >
            <span>{option.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiSelect;
