"use client";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

export default function LocationSelect({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const options: Option[] = [
    { value: "hanoi", label: "Hanoi, Vietnam" },
    { value: "hcmc", label: "Ho Chi Minh City, Vietnam" },
    { value: "danang", label: "Da Nang, Vietnam" },
    { value: "hoian", label: "Hoi An, Vietnam" },
    { value: "bangkok", label: "Bangkok, Thailand" },
    { value: "singapore", label: "Singapore" },
    { value: "tokyo", label: "Tokyo, Japan" },
  ];

  return (
    <Select
      options={options}
      placeholder="Select a location"
      onChange={(option) => onChange(option ? (option as Option).label : "")}
      className="text-left"
      classNamePrefix="react-select"
    />
  );
}
