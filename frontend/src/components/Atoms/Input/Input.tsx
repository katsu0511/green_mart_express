import './Input.css';
import type { ChangeEvent } from 'react';

type Props = {
  label: string
  type: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
};

export default function Input({ label, type, value, onChange }: Props) {
  return <input id={label} type={type} className='form-input' value={value} onChange={onChange} required />;
}
