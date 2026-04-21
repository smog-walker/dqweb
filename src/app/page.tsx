import Link from 'next/link';
import { products } from '../lib/demo-data';

export default function HomePage() {
  return (
    <>
      <h1 className="h1">首页商品</h1>
      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <img className="img" src={p.image} alt={p.name} />
            <div className="cardBody">
              <div className="name">{p.name}</div>
              <div className="priceRow">
                <div className="price">¥{p.price}</div>
                {p.originalPrice && p.originalPrice > p.price && (
                  <div className="oprice">¥{p.originalPrice}</div>
                )}
              </div>
              <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
                ⭐ {p.rating}（{p.reviews}）
              </div>
              <div className="btnRow">
                <Link className="btn" href={`/product/${p.id}`}>
                  查看详情
                </Link>
                <Link className="btn btnPrimary" href={`/product/${p.id}`}>
                  立即购买
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
