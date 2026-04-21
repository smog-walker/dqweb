import './globals.css';
import Link from 'next/link';
import Providers from './providers';

export const metadata = {
  title: '大漆 · 展示站',
  description: '无后端演示版：活动中心+购物闭环',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <Providers>
          <div className="nav">
            <div className="navTitle">大漆 · 展示站</div>
            <div className="navLinks">
              <Link href="/">首页</Link>
              <Link href="/activities">活动中心</Link>
              <Link href="/cart">购物车</Link>
              <Link href="/orders">订单</Link>
            </div>
          </div>
          <div className="container">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
