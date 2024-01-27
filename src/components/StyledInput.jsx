import React from 'react';

function StyledInput({
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
  content,
  styledClass,
}) {
  /* Format error message to remove the tick and capitilize the first letter */
  let fieldName = name.replace(/-/gi, ' ');
  fieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  return (
    <div className={`flex flex-col justify-start items-start ${customClass}`}>
      <label htmlFor={labelFor} className="font-nunito font-normal mb-1">
        {labelText}
      </label>
      <div
        className={`flex ${styledClass} items-center justify-between rounded-md w-full  border border-primary md:border-primary/[0.40]  placeholder-gray-500  sm:text-sm  py-2 px-3`}
      >
        <input
          {...register(name, {
            value: value,
            required: {
              value: isRequired,
              message: `${fieldName} is required`,
            },
          })}
          type={type}
          className={` border focus:border-transparent focus:ring-0 w-full border-none outline-none ${inputStyle}`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <div className="w-fit">{content}</div>
      </div>

      <div className="">
        <small className="font-nunito text-red-600">
          {isRequired && errors[name] && errors[name].message}
        </small>
      </div>
    </div>
  );
}

export default StyledInput;
