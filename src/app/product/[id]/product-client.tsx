'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import type { Product } from '../../../lib/demo-data';
import { useDemo } from '../../../lib/demo-store';

export default function ProductClient({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useDemo();
  const [quantity, setQuantity] = useState(1);
  const discount = useMemo(() => {
    if (!product.originalPrice || product.originalPrice <= product.price) return null;
    return Math.round((1 - product.price / product.originalPrice) * 100);
  }, [product.originalPrice, product.price]);

  return (
    <div className="layout" style={{ gridTemplateColumns: '1fr' }}>
      <div className="section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <img className="img" src={product.image} alt={product.name} style={{ height: 320 }} />
          <div>
            <div className="h1">{product.name}</div>
            <div className="priceRow">
              <div className="price">¥{product.price}</div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="oprice">¥{product.originalPrice}</div>
              )}
              {discount !== null && (
                <div
                  style={{
                    marginLeft: 10,
                    fontSize: 12,
                    padding: '4px 8px',
                    borderRadius: 999,
                    background: '#ffe4e1',
                    border: '1px solid rgba(139, 69, 19, 0.25)',
                    fontWeight: 800,
                  }}
                >
                  {discount}% OFF
                </div>
              )}
            </div>
            <div className="muted" style={{ marginTop: 8 }}>
              ⭐ {product.rating}（{product.reviews}） · 库存 {product.stock}
            </div>
            <div style={{ marginTop: 14, lineHeight: 1.6 }}>{product.description}</div>

            <div style={{ marginTop: 16 }}>
              <div className="muted" style={{ fontWeight: 800, marginBottom: 8 }}>
                购买数量
              </div>
              <div className="btnRow">
                <button
                  className={`btn ${quantity <= 1 ? 'btnDisabled' : ''}`}
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <div className="btn" style={{ cursor: 'default' }}>
                  {quantity}
                </div>
                <button
                  className={`btn ${quantity >= product.stock ? 'btnDisabled' : ''}`}
                  disabled={quantity >= product.stock}
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="btnRow" style={{ marginTop: 18 }}>
              <button
                className="btn"
                onClick={() => {
                  addToCart(product, quantity);
                  router.push('/cart');
                }}
              >
                加入购物车
              </button>
              <button
                className="btn btnPrimary"
                onClick={() => {
                  addToCart(product, quantity);
                  router.push('/checkout');
                }}
              >
                立即购买
              </button>
              <Link className="btn" href="/">
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
