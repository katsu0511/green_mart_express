import type { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

type Props = {
  label: string
  type: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
};

export default function Input({ label, type, value, onChange }: Props) {
  return <TextField id={label} label={label} type={type} value={value} variant='outlined' onChange={onChange} required />;
}
