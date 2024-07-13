import React, { forwardRef } from "react";

// To get that access,
// we need to do something in that custom input component file.
// We need to forward incoming refs
// so that we can use them in here
// and we can establish this cross component ref connection.

const Input = forwardRef(function Input({ label, textArea, ...props }, ref) {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-700 focus:outline-none focus:border-stone-700";
  return (
    <p className="flex flex-col gap-4 my-4">
      {/* flex-col ====> vertical axis */}

      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {textArea ? (
        <textarea ref={ref} className={classes} {...props} />
      ) : (
        <input ref={ref} className={classes} {...props} />
      )}
    </p>
  );
});

export default Input;
