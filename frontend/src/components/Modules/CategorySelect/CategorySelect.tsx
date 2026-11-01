import type { Category } from '@/types/category';
import { Select, MenuItem } from '@mui/material';

type Props = {
  label: string
  categories: Category[]
  category: Category | null
  setCategory: React.Dispatch<React.SetStateAction<Category | null>>
};

export default function CategorySelect({ label, categories, category, setCategory }: Props) {
  return (
    <Select
      id={label}
      labelId={label}
      sx={{ width: '195px' }}
      value={category?.id || ''}
      label={label}
      onChange={(event) => {
        const selectedCategory = categories.find(
          (item) => item.id === Number(event.target.value)
        );
        setCategory(selectedCategory ?? null);
      }}
    >
      {categories.map((category) => (
        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
      ))}
    </Select>
  );
}
