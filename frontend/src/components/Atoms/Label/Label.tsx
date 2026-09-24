import './Label.css';

export default function Label({ label }: { label: string }) {
  return <label htmlFor={label} className='form-label'>{label}: </label>;
}
