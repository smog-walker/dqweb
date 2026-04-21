'use client';

import { useMemo, useState } from 'react';
import type { ActivityKey } from '../../lib/demo-data';
import { useDemo } from '../../lib/demo-store';

const merchants = ['匠心漆坊', '云漆工房', '墨彩斋'];
const shapes = ['碗', '盘', '杯', '壶', '盒', '屏'];
const bodies = ['木胎', '陶胎', '竹胎', '金属胎'];
const patterns = ['素面', '云纹', '花鸟', '山水', '几何'];

const prizes = ['10元券', '免邮券', '限量周边', '随机小礼', '感谢参与'];

export default function ActivitiesPage() {
  const [active, setActive] = useState<ActivityKey>('A1');
  const {
    petFeedCount,
    petAvailableFeeds,
    feedPet,
    addFeedChance,
    petCouponClaimed,
    claimPetCoupon,
    couponAvailable,
    lacquerPoints,
    workshopLevel,
    materials,
    tools,
    addWorkshopTask,
    addToCart,
  } = useDemo();

  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);

  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizAwarded, setQuizAwarded] = useState(false);

  const [selMerchant, setSelMerchant] = useState<string | null>(null);
  const [selShape, setSelShape] = useState<string | null>(null);
  const [selBody, setSelBody] = useState<string | null>(null);
  const [selPattern, setSelPattern] = useState<string | null>(null);
  const [detail, setDetail] = useState('');
  const [customAdded, setCustomAdded] = useState(false);

  const estimatePrice = useMemo(() => {
    let base = 680;
    if (selShape === '壶' || selShape === '屏') base += 300;
    if (selBody === '金属胎') base += 200;
    if (selPattern && selPattern !== '素面') base += 150;
    return base;
  }, [selBody, selPattern, selShape]);

  const canSubmitCustom =
    !!selMerchant && !!selShape && !!selBody && !!selPattern && detail.trim().length > 0;

  return (
    <>
      <h1 className="h1">活动中心</h1>
      <div className="layout">
        <div className="sidebar">
          {(
            [
              ['A1', '活动一：抽奖'],
              ['A2', '活动二：投喂宠物'],
              ['A3', '活动三：虚拟漆坊'],
              ['A4', '活动四：定制漆器'],
            ] as const
          ).map(([k, label]) => (
            <div
              key={k}
              className={`sideItem ${active === k ? 'sideItemActive' : ''}`}
              onClick={() => setActive(k)}
            >
              {label}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {active === 'A1' && (
            <div className="section">
              <div className="h1">幸运大抽奖</div>
              <div className="muted">点击按钮抽取奖励（演示版：随机结果）</div>
              <div className="btnRow" style={{ marginTop: 12 }}>
                <button
                  className={`btn btnPrimary ${spinning ? 'btnDisabled' : ''}`}
                  disabled={spinning}
                  onClick={() => {
                    setSpinning(true);
                    setSpinResult(null);
                    setTimeout(() => {
                      const pick = prizes[Math.floor(Math.random() * prizes.length)];
                      setSpinResult(pick);
                      setSpinning(false);
                    }, 800);
                  }}
                >
                  {spinning ? '抽奖中...' : '开始抽奖'}
                </button>
              </div>
              {spinResult && (
                <div style={{ marginTop: 14, fontWeight: 900 }}>恭喜获得：{spinResult}</div>
              )}
            </div>
          )}

          {active === 'A2' && (
            <div className="section">
              <div className="h1">养宠物投喂</div>
              <div className="muted">
                已投喂次数：{petFeedCount}，可用投喂次数：{petAvailableFeeds}
              </div>
              <div className="btnRow" style={{ marginTop: 12 }}>
                <button
                  className={`btn btnPrimary ${petAvailableFeeds <= 0 ? 'btnDisabled' : ''}`}
                  disabled={petAvailableFeeds <= 0}
                  onClick={() => feedPet()}
                >
                  投喂零食
                </button>
                <button className="btn" onClick={() => addFeedChance()}>
                  完成活动 +1 次
                </button>
              </div>
              <div className="card" style={{ padding: 14, marginTop: 14 }}>
                <div style={{ fontWeight: 900 }}>投喂达到 20 次可领券（FEED20 -¥50）</div>
                <div className="muted" style={{ marginTop: 6 }}>
                  当前状态：{couponAvailable ? '可用' : '不可用'}，已领取：
                  {petCouponClaimed ? '是' : '否'}
                </div>
                <div className="btnRow" style={{ marginTop: 12 }}>
                  <button
                    className={`btn btnPrimary ${petFeedCount < 20 ? 'btnDisabled' : ''}`}
                    disabled={petFeedCount < 20}
                    onClick={() => claimPetCoupon()}
                  >
                    领取优惠券
                  </button>
                </div>
              </div>
            </div>
          )}

          {active === 'A3' && (
            <div className="section">
              <div className="h1">虚拟漆坊</div>
              <div className="muted">
                漆艺值：{lacquerPoints} · 漆坊等级：{workshopLevel} · 漆料：{materials} · 工具：
                {tools}
              </div>
              <div className="card" style={{ padding: 14, marginTop: 14 }}>
                <div style={{ fontWeight: 900 }}>任务面板</div>
                <div className="btnRow" style={{ marginTop: 10, flexWrap: 'wrap' }}>
                  <button className="btn" onClick={() => addWorkshopTask('signin')}>
                    每日签到 +5
                  </button>
                  <button className="btn" onClick={() => addWorkshopTask('share')}>
                    分享产品动态 +10
                  </button>
                  <button className="btn" onClick={() => addWorkshopTask('invite')}>
                    邀请好友 +50（+1 工具）
                  </button>
                </div>
              </div>

              <div className="card" style={{ padding: 14, marginTop: 14 }}>
                <div style={{ fontWeight: 900 }}>知识问答</div>
                <div style={{ marginTop: 10 }}>大漆的主要来源是什么？</div>
                <div style={{ display: 'grid', gap: 8, marginTop: 10 }}>
                  {(
                    [
                      { key: 'A', text: '漆树树脂', correct: true },
                      { key: 'B', text: '松脂', correct: false },
                      { key: 'C', text: '石油副产物', correct: false },
                    ] as const
                  ).map((op) => (
                    <button
                      key={op.key}
                      className={`btn ${quizSelected === op.key ? 'btnPrimary' : ''}`}
                      onClick={() => setQuizSelected(op.key)}
                      style={{ justifyContent: 'flex-start' }}
                    >
                      {op.key}. {op.text}
                    </button>
                  ))}
                </div>
                <div className="btnRow" style={{ marginTop: 12 }}>
                  <button
                    className={`btn btnPrimary ${!quizSelected || quizAwarded ? 'btnDisabled' : ''}`}
                    disabled={!quizSelected || quizAwarded}
                    onClick={() => {
                      const ok = quizSelected === 'A';
                      if (ok) {
                        addWorkshopTask('quiz');
                        setQuizAwarded(true);
                      }
                    }}
                  >
                    提交答案
                  </button>
                  {quizAwarded && <div className="muted">已获奖励：+20 漆艺值，+1 漆料</div>}
                </div>
              </div>
            </div>
          )}

          {active === 'A4' && (
            <div className="section">
              <div className="h1">定制漆器</div>

              <div className="card" style={{ padding: 14 }}>
                <div style={{ fontWeight: 900 }}>目标商家</div>
                <div className="btnRow" style={{ marginTop: 10, flexWrap: 'wrap' }}>
                  {merchants.map((m) => (
                    <button
                      key={m}
                      className={`btn ${selMerchant === m ? 'btnPrimary' : ''}`}
                      onClick={() => setSelMerchant(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: 14, marginTop: 12 }}>
                <div style={{ fontWeight: 900 }}>目标形状</div>
                <div className="btnRow" style={{ marginTop: 10, flexWrap: 'wrap' }}>
                  {shapes.map((s) => (
                    <button
                      key={s}
                      className={`btn ${selShape === s ? 'btnPrimary' : ''}`}
                      onClick={() => setSelShape(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: 14, marginTop: 12 }}>
                <div style={{ fontWeight: 900 }}>胎体</div>
                <div className="btnRow" style={{ marginTop: 10, flexWrap: 'wrap' }}>
                  {bodies.map((b) => (
                    <button
                      key={b}
                      className={`btn ${selBody === b ? 'btnPrimary' : ''}`}
                      onClick={() => setSelBody(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: 14, marginTop: 12 }}>
                <div style={{ fontWeight: 900 }}>纹路</div>
                <div className="btnRow" style={{ marginTop: 10, flexWrap: 'wrap' }}>
                  {patterns.map((p) => (
                    <button
                      key={p}
                      className={`btn ${selPattern === p ? 'btnPrimary' : ''}`}
                      onClick={() => setSelPattern(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: 14, marginTop: 12 }}>
                <div style={{ fontWeight: 900 }}>其他详情</div>
                <textarea
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  placeholder="工艺偏好、尺寸、色系等"
                  style={{
                    width: '100%',
                    minHeight: 90,
                    marginTop: 10,
                    padding: '10px 12px',
                    borderRadius: 10,
                    border: '1px solid rgba(0,0,0,0.12)',
                  }}
                />
              </div>

              <div className="card" style={{ padding: 14, marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className="muted">预估价格</div>
                  <div style={{ fontWeight: 900, color: 'var(--danger)' }}>¥{estimatePrice}</div>
                </div>
                <div className="btnRow" style={{ marginTop: 12 }}>
                  <button
                    className={`btn btnPrimary ${!canSubmitCustom ? 'btnDisabled' : ''}`}
                    disabled={!canSubmitCustom}
                    onClick={() => {
                      const id = `custom_${Date.now()}`;
                      const product = {
                        id,
                        name: `定制漆器 · ${selMerchant} · ${selShape} · ${selBody} · ${selPattern}`,
                        price: estimatePrice,
                        originalPrice: estimatePrice + 200,
                        image: '/pac/5.jpg',
                        description: detail,
                        category: '定制漆器',
                        stock: 1,
                        rating: 5,
                        reviews: 0,
                      };
                      addToCart(product, 1);
                      setCustomAdded(true);
                    }}
                  >
                    加入购物车
                  </button>
                  {customAdded && <div className="muted">已加入购物车，可前往结算</div>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
