'use client';

import Link from 'next/link';
import { useDemo } from '../../lib/demo-store';

export default function OrdersPage() {
  const { orders } = useDemo();
  return (
    <div className="section">
      <div className="h1">我的订单</div>
      {orders.length === 0 ? (
        <>
          <div className="muted">暂无订单，先去下单体验流程。</div>
          <div className="btnRow" style={{ marginTop: 12 }}>
            <Link className="btn btnPrimary" href="/">
              去首页
            </Link>
          </div>
        </>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {orders.map((o) => (
            <Link
              key={o.id}
              href={`/orders/${o.id}`}
              className="card"
              style={{ padding: 14, display: 'grid', gap: 6 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 900 }}>订单号：{o.id}</div>
                <div className="muted">{new Date(o.createdAt).toLocaleString('zh-CN')}</div>
              </div>
              <div className="muted">状态：{o.status}</div>
              <div style={{ fontWeight: 900, color: 'var(--danger)' }}>
                实付：¥{o.total.toFixed(2)}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
