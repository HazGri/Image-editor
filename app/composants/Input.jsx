'use client';
import clsx from 'clsx';

export const Input = ({type, isImage, isRange,min,max,value,onChange}) => {

  return(
    <input type={type} onChange={onChange} className={clsx(
      'max-w-96',
      isImage && 'file-input file-input-primary w-fit max-w-xs', 
      isRange && 'range range-primary' 
    )}
    {...(isRange && { min, max, value })}
    />
    
  )
}


