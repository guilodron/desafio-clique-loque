import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export type FormFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  step?: string;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: string;
};