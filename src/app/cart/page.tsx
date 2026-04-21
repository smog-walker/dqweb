'use client';

import Link from 'next/link';
import { useDemo } from '../../lib/demo-store';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getDiscount, getFinalPrice } =
    useDemo();

  return (
    <div className="section">
      <div className="h1">购物车</div>
      {cart.length === 0 ? (
        <>
          <div className="muted">购物车为空，去首页添加一些商品吧。</div>
          <div className="btnRow" style={{ marginTop: 12 }}>
            <Link className="btn btnPrimary" href="/">
              去首页
            </Link>
          </div>
        </>
      ) : (
        <>
          <div style={{ display: 'grid', gap: 12 }}>
            {cart.map((line) => (
              <div
                key={line.product.id}
                className="card"
                style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12, padding: 12 }}
              >
                <img
                  src={line.product.image}
                  alt={line.product.name}
                  style={{ width: 120, height: 90, borderRadius: 10, objectFit: 'cover' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 900 }}>{line.product.name}</div>
                    <div className="muted" style={{ marginTop: 4 }}>
                      ¥{line.product.price}
                    </div>
                    <div className="btnRow" style={{ marginTop: 10 }}>
                      <button
                        className={`btn ${line.quantity <= 1 ? 'btnDisabled' : ''}`}
                        disabled={line.quantity <= 1}
                        onClick={() =>
                          updateQuantity(line.product.id, Math.max(1, line.quantity - 1))
                        }
                      >
                        -
                      </button>
                      <div className="btn" style={{ cursor: 'default' }}>
                        {line.quantity}
                      </div>
                      <button
                        className="btn"
                        onClick={() => updateQuantity(line.product.id, line.quantity + 1)}
                      >
                        +
                      </button>
                      <button className="btn" onClick={() => removeFromCart(line.product.id)}>
                        删除
                      </button>
                    </div>
                  </div>
                  <div style={{ fontWeight: 900 }}>
                    ¥{(line.product.price * line.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="muted">商品总价</div>
              <div>¥{getTotalPrice().toFixed(2)}</div>
            </div>
            {getDiscount() > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <div className="muted">优惠券</div>
                <div style={{ color: 'var(--danger)', fontWeight: 900 }}>-¥{getDiscount()}</div>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
              <div style={{ fontWeight: 900 }}>合计</div>
              <div style={{ color: 'var(--danger)', fontWeight: 900 }}>
                ¥{getFinalPrice().toFixed(2)}
              </div>
            </div>
          </div>

          <div className="btnRow" style={{ marginTop: 14 }}>
            <Link className="btn" href="/">
              继续购物
            </Link>
            <Link className="btn btnPrimary" href="/checkout">
              去结算
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
