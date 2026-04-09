import React from 'react';

export default function InputField({ label, type = "text", id, value, onChange, placeholder, error, optional }) {
  return (
    <div className="flex flex-col gap-2 w-full mb-6 relative">
      <label htmlFor={id} className="text-xl font-bold text-slate-800 flex items-center">
        {label}
        {optional && <span className="ml-2 text-base font-normal text-slate-500">(Optional)</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full px-5 py-4 text-xl border-4 rounded-xl focus-ring transition-colors ${
          error ? 'border-red-600 bg-red-50' : 'border-slate-300 bg-white hover:border-slate-400'
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="text-red-700 text-lg font-semibold flex items-center mt-1" role="alert">
          <span className="mr-2" aria-hidden="true">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}
