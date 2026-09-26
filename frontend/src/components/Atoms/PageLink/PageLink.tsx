import './PageLink.css';
import { Link } from 'react-router-dom';

export default function PageLink({ path, display }: { path: string, display: string }) {
  return (
    <div className='page-link__element'>
      <Link to={path} className='page-link'>&gt;&gt; {display}</Link>
    </div>
  );
}
