import React from "react";
import Input from "./Input";
import "./multiinput.scss";

interface Props {
  DataDisplay: React.ComponentType<{ onDelete: () => void; value: string }>;
  onChange: (data: string[]) => void;
  label: string;
  initial?: string[];
  Inputer?: React.ComponentType<any>;
}

const MultiInput: React.FC<Props> = ({
  DataDisplay,
  onChange,
  label,
  initial,
  Inputer,
}) => {
  const [data, setData] = React.useState<string[]>(initial || []);
  const [inputValue, setInputValue] = React.useState<string>("");

  return (
    <div className="multi-inputer">
      <div className="multi-input-field-container flex">
        {Inputer ? (
          <>
            <Inputer
              onData={(inputValue: string) => {
                setData([...data, inputValue]);
                onChange([...data, inputValue]);
              }}
            />
          </>
        ) : (
          <>
            <Input
              type="text"
              label={label}
              onChange={(e: Event) => {
                const target = e.target as HTMLInputElement;
                const value = target.value;
                setInputValue(value);
              }}
              value={inputValue}
            ></Input>
            <button
              className="outline-btn"
              type="button"
              onClick={() => {
                if (!inputValue) return;
                setData([...data, inputValue]);
                onChange([...data, inputValue]);
                setInputValue("");
              }}
            >
              Add
            </button>
          </>
        )}
      </div>
      {data.length > 0 && (
        <div className="multi-input-data-container">
          <div className="flex input-data">
            {data.map((value, i) => {
              return (
                <DataDisplay
                  onDelete={() => {
                    const newData = [...data.slice(0, i), ...data.slice(i + 1)];
                    setData(newData);
                    onChange(newData);
                  }}
                  key={"multi-input-" + i}
                  value={value}
                ></DataDisplay>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiInput;
