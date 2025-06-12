import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FieldValues } from "react-hook-form";
import type { FormFieldProps } from "./dto";


export function CustomFormField<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = "text",
  step,
  handleBlur,
  disabled,
  value

}: FormFieldProps<T>) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <div className="flex flex-col">
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              type={type}
              step={step}
              onBlur={handleBlur}
              value={value}
            disabled={disabled}
            />
          </FormControl>
        </FormItem>
          <FormMessage />
        </div>
      )}
    />
  );
}