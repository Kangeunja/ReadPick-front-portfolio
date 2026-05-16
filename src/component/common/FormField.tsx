import { forwardRef, ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  rightSlot?: ReactNode;
  messageSlot?: ReactNode;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      id,
      label,
      required = false,
      type,
      placeholder,
      value,
      onChange,
      disabled,
      rightSlot,
      messageSlot,
    },
    ref,
  ) => {
    return (
      <div className="w-[363px] flex flex-col relative mb-[45px] form-field">
        <label
          htmlFor={id}
          className="absolute top-[-25px] left-[5px] text-[#454545]"
        >
          {label}
          {required && <span className="text-[#b80000]">*</span>}
        </label>

        <div className="flex items-center">
          <input
            ref={ref}
            id={id}
            type={type}
            className="w-full h-10 border border-[#e0e0e0] rounded-[5px]
            p-[10px] text-[#454545] box-border
            disabled:bg-[#f5f5f5] 
            disabled:text-[#9a9a9a]  disabled:opacity-[0.8] disabled:cursor-not-allowed
            "
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          {rightSlot && (
            <div className="flex items-center float-left">{rightSlot}</div>
          )}
        </div>

        {messageSlot && (
          <div className="form-field__message">{messageSlot}</div>
        )}
      </div>
    );
  },
);

export default FormField;
