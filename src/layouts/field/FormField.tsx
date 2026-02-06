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
    ref
  ) => {
    return (
      <div className="mypage-edit__field form-field">
        <label htmlFor={id} className="mypage-edit__label">
          {label}
          {required && <span> *</span>}
        </label>

        <div className="form-field__control">
          <input
            ref={ref}
            id={id}
            type={type}
            className="mypage-edit__input"
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          {rightSlot && (
            <div className="form-field__right-slot">{rightSlot}</div>
          )}
        </div>

        {messageSlot && (
          <div className="form-field__message">{messageSlot}</div>
        )}
      </div>
    );
  }
);

export default FormField;
