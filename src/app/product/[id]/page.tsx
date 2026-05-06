import Link from 'next/link';
import { products } from '../../../lib/demo-data';
import ProductClient from './product-client';

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) {
    return (
      <div className="section">
        <div className="h1">商品不存在</div>
        <Link className="btn" href="/">
          返回首页
        </Link>
      </div>
    );
  }
  return <ProductClient product={product} />;
}
