import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: '商品中心 | Context-starter'
};

export default function ProductsPage() {
  return <ProductsClient />;
}
