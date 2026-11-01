import './FormSelect.css';
import type { Category } from '@/types/category';
import Label from '@/components/Atoms/Label/Label';
import CategorySelect from '@/components/Modules/CategorySelect/CategorySelect';

type Props = {
  label: string
  categories: Category[]
  category: Category | null
  setCategory: React.Dispatch<React.SetStateAction<Category | null>>
};

export default function FormSelect({ label, categories, category, setCategory }: Props) {
  return (
    <div className='select-element'>
      <Label label={label} />
      <CategorySelect label={label} categories={categories} category={category} setCategory={setCategory} />
    </div>
  );
}
