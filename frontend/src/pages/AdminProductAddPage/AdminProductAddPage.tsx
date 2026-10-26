import Heading from '@/components/Atoms/Heading/Heading';
import FormInput from '@/components/Modules/FormInput/FormInput';
import FormButton from '@/components/Modules/FormButton/FormButton';
import PageLink from '@/components/Atoms/PageLink/PageLink';

export default function AdminProductAddPage() {
  return (
    <div className='product-add-page'>
      <form className='product-add-form' onSubmit={addProduct}>
        <Heading title='New Product' />
        <FormInput label='Name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <FormInput label='Description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
        <FormInput label='Price' type='number' value={price.toString()} onChange={(e) => setPrice(Number(e.target.value))} />
        <FormInput label='Stock' type='number' value={stock.toString()} onChange={(e) => setStock(Number(e.target.value))} />
        <FormButton usage='Add' error={error} hasClicked={hasClicked} />
        <PageLink path='../login' display='Login' />
      </form>
    </div>
  );
}
