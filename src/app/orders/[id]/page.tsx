'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useDemo } from '../../../lib/demo-store';

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const { orders } = useDemo();
  const order = useMemo(() => orders.find((o) => o.id === params.id), [orders, params.id]);

  if (!order) {
    return (
      <div className="section">
        <div className="h1">订单不存在</div>
        <div className="btnRow" style={{ marginTop: 12 }}>
          <Link className="btn btnPrimary" href="/orders">
            返回订单列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="h1">订单详情</div>
      <div className="muted">订单号：{order.id}</div>
      <div className="muted">状态：{order.status}</div>
      <div className="muted">下单时间：{new Date(order.createdAt).toLocaleString('zh-CN')}</div>

      <div style={{ marginTop: 14, fontWeight: 900 }}>商品清单</div>
      <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>
        {order.items.map((l) => (
          <div
            key={l.product.id}
            className="card"
            style={{ padding: 12, display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 10 }}
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
            <div style={{ fontWeight: 900 }}>¥{(l.product.price * l.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 900 }}>实付金额</div>
        <div style={{ fontWeight: 900, color: 'var(--danger)' }}>¥{order.total.toFixed(2)}</div>
      </div>

      <div className="btnRow" style={{ marginTop: 14 }}>
        <Link className="btn" href="/orders">
          返回订单列表
        </Link>
        <Link className="btn btnPrimary" href="/">
          继续逛逛
        </Link>
      </div>
    </div>
  );
}
