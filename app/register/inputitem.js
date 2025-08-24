'use client'
import { useState } from 'react';

export default function InputItem({label, name, placeholder, type, description, value, onChange}){
  const [internalValue, setInternalValue] = useState(value || '');
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return(
    <div className="flex flex-col gap-[10px]">
      <strong className="w-[50px] text-sm text-[#4d5566] font-[700]">{label}</strong>
      <input 
        name={name} 
        type={type} 
        placeholder={placeholder} 
        value={internalValue}
        onChange={handleChange}
        className="w-[300px] h-[40px] rounded-md border-1 border-[#4d5566] pl-[10px] pr-[10px] text-left text-sm text-[#4d5566] font-[500]"
      />
      {description && (
        <p className="text-sm text-[#4d5566] font-[500]">{description}</p>
      )}
    </div>
  )
}