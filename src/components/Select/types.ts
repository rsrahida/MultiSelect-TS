export interface Option {
  label: string;
  value: string | number;
}

export interface SelectProps {
  options: Option[];
  multiple?: boolean;
  value: Option | Option[] | null;
  onChange: (value: Option | Option[] | null) => void;
  placeholder?: string;
}
