import apiClient from './apiClient';

export const fetchCatalogue = async () => {
  console.log('MOCK FETCH CATALOGUE');
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: '101',
      item_name: 'Classic Gold Ring',
      sku: 'GR-22K-001',
      category: 'ring',
      sale_amount: 45000,
      unit: 'pc',
      net_wt: 5.2,
      purity: '22K Gold',
      in_stock: true,
      imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '102',
      item_name: 'Diamond Necklace',
      sku: 'DN-18K-005',
      category: 'necklace',
      sale_amount: 125000,
      unit: 'pc',
      net_wt: 12.5,
      purity: '18K Gold',
      in_stock: true,
      imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '103',
      item_name: 'Gold Bangles Set',
      sku: 'GB-24K-010',
      category: 'bangles',
      sale_amount: 85000,
      unit: 'set',
      net_wt: 15.0,
      purity: '24K Gold',
      in_stock: false,
      imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '104',
      item_name: 'Silver Anklet',
      sku: 'SA-925-002',
      category: 'anklet',
      sale_amount: 3500,
      unit: 'pair',
      net_wt: 20.0,
      purity: '92.5 Silver',
      in_stock: true,
      imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80'
    }
  ];
};

export default {
  fetchCatalogue,
};
