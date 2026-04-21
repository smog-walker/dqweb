'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDemo } from '../../lib/demo-store';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    couponAvailable,
    couponApplied,
    applyCoupon,
    getTotalPrice,
    getDiscount,
    getFinalPrice,
    placeOrder,
  } = useDemo();
  const [address, setAddress] = useState('北京市朝阳区示例路 88 号');
  const [pay, setPay] = useState<'alipay' | 'wechat' | 'card'>('alipay');

  if (cart.length === 0) {
    return (
      <div className="section">
        <div className="h1">确认订单</div>
        <div className="muted">购物车为空。</div>
        <div className="btnRow" style={{ marginTop: 12 }}>
          <Link className="btn btnPrimary" href="/">
            去首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="layout" style={{ gridTemplateColumns: '1fr' }}>
      <div className="section">
        <div className="h1">确认订单</div>

        <div style={{ display: 'grid', gap: 12 }}>
          <div className="card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 900, marginBottom: 8 }}>收货地址</div>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid rgba(0,0,0,0.12)',
              }}
            />
          </div>

          <div className="card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 900, marginBottom: 8 }}>支付方式</div>
            <div className="btnRow">
              <button
                className={`btn ${pay === 'alipay' ? 'btnPrimary' : ''}`}
                onClick={() => setPay('alipay')}
              >
                支付宝
              </button>
              <button
                className={`btn ${pay === 'wechat' ? 'btnPrimary' : ''}`}
                onClick={() => setPay('wechat')}
              >
                微信
              </button>
              <button
                className={`btn ${pay === 'card' ? 'btnPrimary' : ''}`}
                onClick={() => setPay('card')}
              >
                银行卡
              </button>
            </div>
          </div>

          <div className="card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 900, marginBottom: 8 }}>优惠券</div>
            {couponApplied ? (
              <div className="muted">已使用 FEED20（-¥50）</div>
            ) : couponAvailable ? (
              <button
                className="btn btnPrimary"
                onClick={() => {
                  applyCoupon();
                }}
              >
                应用 FEED20 -¥50
              </button>
            ) : (
              <div className="muted">暂无可用优惠券（可在活动二投喂达到 20 次领取）</div>
            )}
          </div>

          <div className="card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 900, marginBottom: 10 }}>商品清单</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {cart.map((l) => (
                <div
                  key={l.product.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr auto',
                    gap: 10,
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={l.product.image}
                    alt={l.product.name}
                    style={{ width: 80, height: 60, borderRadius: 10, objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 900 }}>{l.product.name}</div>
                    <div className="muted" style={{ fontSize: 12 }}>
                      ¥{l.product.price} × {l.quantity}
                    </div>
                  </div>
                  <div style={{ fontWeight: 900 }}>
                    ¥{(l.product.price * l.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 900, marginBottom: 8 }}>价格汇总</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="muted">商品总价</div>
              <div>¥{getTotalPrice().toFixed(2)}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <div className="muted">运费</div>
              <div>¥0.00</div>
            </div>
            {getDiscount() > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <div className="muted">优惠券</div>
                <div style={{ color: 'var(--danger)', fontWeight: 900 }}>-¥{getDiscount()}</div>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
              <div style={{ fontWeight: 900 }}>实付金额</div>
              <div style={{ color: 'var(--danger)', fontWeight: 900 }}>
                ¥{getFinalPrice().toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className="btnRow" style={{ marginTop: 14 }}>
          <Link className="btn" href="/cart">
            返回购物车
          </Link>
          <button
            className="btn btnPrimary"
            onClick={() => {
              if (!address.trim()) return;
              const order = placeOrder();
              if (order) router.push(`/orders/${order.id}`);
            }}
          >
            提交订单
          </button>
        </div>
      </div>
    </div>
  );
}
