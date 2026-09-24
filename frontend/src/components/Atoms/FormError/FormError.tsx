import './FormError.css';

export default function FormError({ error }: { error: string }) {
  return error && <p className='form-error'>{error}</p>;
}
