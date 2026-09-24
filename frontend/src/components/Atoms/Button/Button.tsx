import './Button.css';

export default function Button({ usage, hasClicked }: { usage: string, hasClicked: boolean }) {
  return <input type='submit' disabled={hasClicked} value={hasClicked ? 'Loading..' : usage} className={`form-button ${hasClicked && 'form-button__clicked'}`} />;
}
