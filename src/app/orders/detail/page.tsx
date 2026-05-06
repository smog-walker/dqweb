import { Suspense } from 'react';
import OrderDetailClient from './order-detail-client';

export default function OrderDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="section">
          <div className="h1">订单详情</div>
          <div className="muted">加载中…</div>
        </div>
      }
    >
      <OrderDetailClient />
    </Suspense>
  );
}
