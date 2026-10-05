export const formatPrice = (price: number) => new Intl.NumberFormat('en-US').format(price);

export const formatDate = (datetime: string) => {
  return new Date(datetime).toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};
