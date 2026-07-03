import { forwardRef, ReactNode } from 'react';

interface FormFieldProps {
  id: string;
  className?: string;
  name?: string;
  direction?: 'row' | 'column';
  label?: string;
  required?: boolean;
  type?: string;
  placeholder: string;
  isFullWidth?: boolean;
  maxLength?: number;
  value?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  actionSlot?: ReactNode;
  rightSlot?: ReactNode;
  messageSlot?: ReactNode;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      id,
      className,
      label,
      required,
      type,
      placeholder,
      value,
      onChange,
      disabled,
      rightSlot,
      actionSlot,
      messageSlot,
      direction,
      isFullWidth,
    },
    ref,
  ) => {
    const containerClass = className
      ? 'relative flex flex-col'
      : direction === 'row'
        ? 'flex items-center w-full justify-center'
        : 'relative mb-[45px] flex w-[363px] flex-col';

    const labelClass = direction === 'row' ? 'flex w-[115px] text-[14px]' : 'absolute left-[5px] top-[-25px] text-[14px]';

    const inputWidthClass = direction === 'row' ? (isFullWidth ? 'w-[290px]' : 'w-[205px]') : 'w-full';

    const inputClass =
      className ||
      `relative box-border h-[35px] border border-[#e0e0e0] p-[10px] text-[13px] text-[#454545] disabled:cursor-not-allowed disabled:bg-[#f5f5f5] disabled:text-[#9a9a9a] disabled:opacity-[0.8] ${inputWidthClass} ${actionSlot ? 'mr-[10px]' : ''}`;

    return (
      <div className={containerClass}>
        <label className={labelClass}>
          {label}
          {required && <span className="text-red-600">*</span>}
        </label>

        <div className="flex flex-col">
          <div className="relative flex">
            <input
              ref={ref}
              id={id}
              type={type}
              className={inputClass}
              placeholder={placeholder}
              disabled={disabled}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            {rightSlot && (
              <div
                className={`absolute right-[10px] flex cursor-pointer items-center justify-center ${className ? 'top-[12px]' : 'top-[50%] translate-y-[-50%]'}`}
              >
                {rightSlot}
              </div>
            )}

            {actionSlot && <div className="flex items-center">{actionSlot}</div>}
          </div>
          {messageSlot && <p className="ml-[5px] mt-[5px] block">{messageSlot}</p>}
        </div>
      </div>
    );
  },
);

export default FormField;
