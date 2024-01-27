import React from 'react';

function Input({
  labelFor,
  labelText,
  name,
  type,
  errors,
  placeholder,
  customClass,
  inputStyle,
  isRequired,
  register,
  onChange,
  value,
  ...props
}) {
  /* Format error message to remove the tick and capitilize the first letter */
  let fieldName = name.replace(/-/gi, ' ');
  fieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

  return register ? (
    <div className={`flex flex-col justify-start items-start ${customClass}`}>
      <label htmlFor={labelFor} className="font-nunito font-normal mb-1">
        {labelText}
      </label>
      <input
        {...register(name, {
          required: {
            value: isRequired,
            message: `${fieldName} is required`,
          },
        })}
        type={type}
        className={`rounded-md appearance-none relative block w-full px-3 py-2 border border-primary md:border-primary/[0.40]  placeholder-gray-500 focus:appearance-none focus:outline-none focus:ring-1 focus:ring-primary/[0.25] focus:border-primary focus:z-10 sm:text-sm  focus:shadow-sm ${inputStyle}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...props}
      />
      <div className="">
        <small className="font-nunito text-red-600">
          {isRequired && errors[name] && errors[name].message}
        </small>
      </div>
    </div>
  ) : (
    <div
      className={`flex flex-col justify-start items-start mb-2 ${customClass}`}
    >
      <label htmlFor={labelFor} className="font-nunito font-normal mb-1">
        {labelText}
      </label>
      <input
        type={type}
        className={`rounded-md appearance-none relative block w-full px-3 py-2 border border-primary md:border-primary/[0.40]  placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary/[0.25] focus:border-primary focus:z-10 sm:text-sm  focus:shadow-sm ${inputStyle}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default Input;
