import './FormInput.css';
import type { ChangeEvent } from 'react';
import Label from '@/components/Atoms/Label/Label';
import Input from '@/components/Atoms/Input/Input';

type Props = {
  label: string
  type: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
};

export default function FormInput({ label, type, value, onChange }: Props) {
  return (
    <div className='input-element'>
      <Label label={label} />
      <Input label={label} type={type} value={value} onChange={onChange} />
    </div>
  );
}
