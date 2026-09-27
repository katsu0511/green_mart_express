import './FormButton.css';
import FormError from '@/components/Atoms/FormError/FormError';
import AtomButton from '@/components/Atoms/AtomButton/AtomButton';

type Props = {
  usage: string
  error: string
  hasClicked: boolean
};

export default function FormButton({ usage, error, hasClicked }: Props) {
  return (
    <div className='button-element'>
      <FormError error={error} />
      <AtomButton usage={usage} hasClicked={hasClicked} />
    </div>
  );
}
