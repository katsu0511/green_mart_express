import './FormButton.css';
import FormError from '@/components/Atoms/FormError/FormError';
import Button from '@/components/Atoms/Button/Button';

type Props = {
  usage: string
  error: string
  hasClicked: boolean
};

export default function FormButton({ usage, error, hasClicked }: Props) {
  return (
    <div className='button-element'>
      <FormError error={error} />
      <Button usage={usage} hasClicked={hasClicked} />
    </div>
  );
}
