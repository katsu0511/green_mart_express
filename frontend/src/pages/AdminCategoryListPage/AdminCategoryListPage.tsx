import './AdminCategoryListPage.css';
import { useState, useEffect } from 'react';
import type { Category } from '@/types/category';
import useModal from '@/lib/useModal';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminCategoryListPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { setErrorMessage, setDisplayErrorModal } = useModal();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/categories`);

        if (res.ok) {
          const categoryList: Category[] = await res.json();
          setCategories(categoryList);
        } else {
          const data = await res.json();
          setErrorMessage(data.error);
          setDisplayErrorModal(true);
        }
      } catch {
        setError('Failed to load categories');
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, []);

  const filteredCategories = categories.filter((category) => {
    const searchValue = search.trim();

    return (
      category.name.includes(searchValue) ||
      category.slug.includes(searchValue)
    );
  });

  return (
    <div className='admin-category-list-page'>
      <div className='admin-category-list-page__header'>
        <div>
          <p className='admin-category-list-page__eyebrow'>CATALOG MANAGEMENT</p>
          <h1 className='admin-category-list-page__title'>Categories</h1>
          <p className='admin-category-list-page__subtitle'>Manage the categories used to organize your products.</p>
        </div>

        <Link to='/admin/categories/add' className='admin-category-list-page__add-button'>
          <span aria-hidden='true'>+</span>
          Add Category
        </Link>
      </div>

      <section className='admin-category-list-page__panel'>
        <div className='admin-category-list-page__toolbar'>
          <div className='admin-category-list-page__list-heading'>
            <h2>Category List</h2>
            <span className='admin-category-list-page__count'>{categories.length}</span>
          </div>

          <div className='admin-category-list-page__search'>
            <span aria-hidden='true' className='admin-category-list-page__search-icon'>⌕</span>
            <input type='search' value={search} placeholder='Search categories...' aria-label='Search categories' onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {isLoading ? (
          <div className='admin-category-list-page__state'>
            <span className='admin-category-list-page__spinner' />
            <p>Loading categories...</p>
          </div>
        ) : error ? (
          <div className='admin-category-list-page__state admin-category-list-page__state--error'>
            <p>{error}</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className='admin-category-list-page__state'>
            <div className='admin-category-list-page__empty-icon'>▤</div>
            <h3>{search ? 'No matching categories' : 'No categories yet'}</h3>
            <p>{search ? 'Try another search term.' : 'Add your first category to start organizing products.'}</p>
          </div>
        ) : (
          <div className='admin-category-list-page__table-wrapper'>
            <table className='admin-category-list-page__table'>
              <thead>
                <tr>
                  <th className='admin-category-list-page__id-column'>ID</th>
                  <th>Category Name</th>
                  <th>Slug</th>
                  <th className='admin-category-list-page__action-column'>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id}>
                    <td className='admin-category-list-page__id'>#{category.id}</td>
                    <td>
                      <div className='admin-category-list-page__name-cell'>
                        <span className='admin-category-list-page__category-icon'>▦</span>
                        <span>{category.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className='admin-category-list-page__slug'>{category.slug}</span>
                    </td>
                    <td className='admin-category-list-page__action'>
                      <Link to={`/admin/categories/${category.id}/edit`} className='admin-category-list-page__edit-button' aria-label={`Edit ${category.name}`}>Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && !error && (
          <div className='admin-category-list-page__footer'>Showing {filteredCategories.length} of {categories.length} categories</div>
        )}
      </section>
    </div>
  );
}
