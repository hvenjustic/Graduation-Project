'use client';

import { useMemo, useState } from 'react';
import {
  FiArrowUpRight,
  FiFilter,
  FiRefreshCw,
  FiSearch,
  FiShoppingBag,
  FiShoppingCart,
  FiStar,
  FiTag,
  FiX
} from 'react-icons/fi';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  status: '现货' | '预售';
  badge?: '新品' | '热卖' | '优惠';
  description: string;
  highlights: string[];
  tags: string[];
};

const catalog: Product[] = [
  {
    id: 'p-01',
    name: 'Graph Max 智能耳机',
    category: '数码影音',
    price: 899,
    rating: 4.7,
    reviews: 1321,
    status: '现货',
    badge: '热卖',
    description: '降噪 + 空间音频，随身 AI 助理可读取购物清单并推送补货提醒。',
    highlights: ['蓝牙 5.3', '48h 续航', '充电盒快充'],
    tags: ['推荐', '蓝牙', '降噪']
  },
  {
    id: 'p-02',
    name: 'Atlas Pro 抽油烟机',
    category: '家电厨卫',
    price: 3299,
    rating: 4.9,
    reviews: 842,
    status: '现货',
    badge: '新品',
    description: '声学降噪 + 油烟检测，自动调节风量并推送滤网寿命告警。',
    highlights: ['20m³/min 大吸力', 'AI 油烟识别', '自清洁'],
    tags: ['智能家居', '新品']
  },
  {
    id: 'p-03',
    name: 'Nova S1 智能手表',
    category: '智能穿戴',
    price: 1599,
    rating: 4.5,
    reviews: 1930,
    status: '预售',
    badge: '优惠',
    description: 'GPS + 心率 + 血氧全域监测，连通 Agent 做健康趋势提醒。',
    highlights: ['AMOLED 常亮', '7 天续航', '支付速刷'],
    tags: ['运动', '健康', '优惠']
  },
  {
    id: 'p-04',
    name: 'Aurora 14 轻薄本',
    category: '电脑办公',
    price: 6299,
    rating: 4.6,
    reviews: 620,
    status: '现货',
    description: '全金属轻薄机身，AI 协同剪辑与会议降噪，满足移动办公。',
    highlights: ['13 代 i7', '1.2kg', 'Wi-Fi 6E'],
    tags: ['轻薄', '长续航']
  },
  {
    id: 'p-05',
    name: 'Sense 智能门锁 X',
    category: '家居安防',
    price: 1999,
    rating: 4.4,
    reviews: 540,
    status: '现货',
    badge: '热卖',
    description: '金融级加密 + 胎动感应，家庭成员出入实时通知，异常自动锁定。',
    highlights: ['多模开锁', '一年续航', '防撬报警'],
    tags: ['智能家居', '安防']
  },
  {
    id: 'p-06',
    name: 'Lumen 空气炸锅',
    category: '家电厨卫',
    price: 699,
    rating: 4.3,
    reviews: 775,
    status: '现货',
    description: '支持 App 菜谱一键烹饪，实时控温并自动翻面提醒，低脂又方便。',
    highlights: ['4.5L 容量', '多段加热', '易清洗'],
    tags: ['轻食', '厨房', '新品']
  }
];

const formatPrice = (value: number) => `¥${value.toLocaleString('zh-CN')}`;

const ratingLabel = (rating: number, reviews: number) => `${rating.toFixed(1)} · ${reviews}+ 评价`;

export default function ProductsClient() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = useMemo(
    () => ['全部', ...Array.from(new Set(catalog.map((item) => item.category)))],
    []
  );

  const allTags = useMemo(
    () => Array.from(new Set(catalog.flatMap((item) => item.tags))).slice(0, 8),
    []
  );

  const filtered = useMemo(() => {
    const matchSearch = (text: string) => text.toLowerCase().includes(search.trim().toLowerCase());

    return catalog
      .filter((item) => (activeCategory === '全部' ? true : item.category === activeCategory))
      .filter((item) => (onlyInStock ? item.status === '现货' : true))
      .filter((item) => {
        if (!selectedTags.length) return true;
        return selectedTags.every((tag) => item.tags.includes(tag));
      })
      .filter((item) => {
        if (!search.trim()) return true;
        return (
          matchSearch(item.name) ||
          matchSearch(item.description) ||
          item.tags.some((tag) => matchSearch(tag))
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return b.rating - a.rating;
      });
  }, [activeCategory, onlyInStock, search, selectedTags, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  return (
    <div className="relative isolate px-6 pb-16">
      <section className="mx-auto mt-8 max-w-[108rem] overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-lg backdrop-blur md:p-12 dark:border-white/10 dark:bg-slate-900/80">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200">
              <FiShoppingBag className="h-4 w-4" />
              商品中心
            </span>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold leading-tight text-slate-900 dark:text-white md:text-4xl">
                选品、搜索、过滤，一页搞定
              </h1>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                支持按品类、库存、标签快速筛选。后续将接入实时库存与价格接口，配合 Agent 推荐补货与动态定价。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-500"
              >
                前往商品列表
                <FiArrowUpRight className="h-4 w-4" />
              </a>
              <button
                onClick={() => {
                  setSearch('');
                  setActiveCategory('全部');
                  setOnlyInStock(false);
                  setSelectedTags([]);
                  setSortBy('popular');
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600"
              >
                <FiRefreshCw className="h-4 w-4" />
                重置筛选
              </button>
            </div>
          </div>
          <div className="glass-panel w-full max-w-md rounded-2xl border border-indigo-100/70 bg-gradient-to-br from-indigo-50/70 via-white to-indigo-100/80 p-5 dark:border-indigo-800/40 dark:from-indigo-950/60 dark:via-slate-900 dark:to-indigo-900/40">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/40">
                <FiFilter className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-200">智能筛选</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  按标签和库存快速收敛候选，后续可接入“Agent 推荐列表”接口。
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-200">
              <div className="rounded-xl bg-white/70 p-3 dark:bg-slate-800/60">
                <p className="text-xs text-slate-500 dark:text-slate-400">现货占比</p>
                <p className="text-lg font-semibold">
                  {Math.round((filtered.filter((i) => i.status === '现货').length / (filtered.length || 1)) * 100)}%
                </p>
              </div>
              <div className="rounded-xl bg-white/70 p-3 dark:bg-slate-800/60">
                <p className="text-xs text-slate-500 dark:text-slate-400">平均评分</p>
                <p className="text-lg font-semibold">
                  {filtered.length
                    ? (filtered.reduce((sum, p) => sum + p.rating, 0) / filtered.length).toFixed(1)
                    : '—'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-[108rem]" id="catalog">
        <div className="glass-panel rounded-2xl border border-gray-200/60 bg-white/80 p-5 shadow-sm dark:border-gray-800/60 dark:bg-slate-900/70">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-800/60">
              <FiSearch className="h-4 w-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索商品名称、描述或标签"
                className="w-full bg-transparent outline-none placeholder:text-slate-400 dark:text-white"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800/60"
              >
                <option value="popular">按评分</option>
                <option value="price-asc">价格从低到高</option>
                <option value="price-desc">价格从高到低</option>
              </select>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800/60">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="h-4 w-4 accent-indigo-600"
                />
                仅看现货
              </label>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  activeCategory === category
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm dark:border-indigo-400 dark:bg-indigo-900/50 dark:text-indigo-100'
                    : 'border-slate-200 text-slate-600 hover:border-indigo-200 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
              <FiTag className="h-3 w-3" />
              标签
            </span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  selectedTags.includes(tag)
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-900/50 dark:text-indigo-100'
                    : 'border-slate-200 text-slate-600 hover:border-indigo-200 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>
            共 {filtered.length} 件商品
            {search ? `，已根据「${search}」过滤` : ''}
          </span>
          <span className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
            <FiFilter className="h-4 w-4" />
            品类筛选 · 标签 · 库存 · 价格
          </span>
        </div>

        <div className="mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <div
              key={product.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedProduct(product)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setSelectedProduct(product);
              }}
              className="glass-panel flex h-full flex-col rounded-2xl border border-gray-200/60 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-800/60 dark:bg-slate-900/70 dark:focus:ring-indigo-500"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-base font-semibold text-slate-900 dark:text-white">{product.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{product.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  {product.badge && (
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-100">
                      {product.badge}
                    </span>
                  )}
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                      product.status === '现货'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-100'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-100'
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{product.description}</p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
                {product.highlights.map((item) => (
                  <span key={item} className="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-800/60">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                    {formatPrice(product.price)}
                  </p>
                  <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-200">
                    <FiStar className="h-4 w-4" />
                    {ratingLabel(product.rating, product.reviews)}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  {product.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 px-2 py-1 dark:border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="mt-auto mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-500"
              >
                <FiShoppingCart className="h-4 w-4" />
                加入清单
              </button>
            </div>
          ))}
        </div>

        {!filtered.length && (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
            未找到匹配的商品，请调整搜索或筛选条件。
          </div>
        )}

        {selectedProduct && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="glass-panel relative w-full max-w-4xl rounded-2xl border border-white/70 bg-white/90 p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900/90"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:rotate-90 hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white"
              >
                <FiX className="h-4 w-4" />
              </button>

              <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {selectedProduct.name}
                    </h3>
                    {selectedProduct.badge && (
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-100">
                        {selectedProduct.badge}
                      </span>
                    )}
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                        selectedProduct.status === '现货'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-100'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-100'
                      }`}
                    >
                      {selectedProduct.status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {selectedProduct.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
                    {selectedProduct.highlights.map((item) => (
                      <span key={item} className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800/60">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
                    {selectedProduct.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full rounded-2xl bg-slate-900 p-5 text-slate-50 shadow-inner md:w-72">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-300">价格</p>
                      <p className="text-2xl font-semibold">{formatPrice(selectedProduct.price)}</p>
                    </div>
                    <div className="rounded-full bg-amber-100/20 px-3 py-1 text-[11px] font-semibold text-amber-100">
                      <FiStar className="mr-1 inline h-4 w-4" />
                      {ratingLabel(selectedProduct.rating, selectedProduct.reviews)}
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-400">品类：{selectedProduct.category}</p>
                  <p className="text-xs text-slate-400">库存状态：{selectedProduct.status}</p>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-400"
                  >
                    <FiShoppingCart className="h-4 w-4" />
                    加入清单并关闭
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="mt-2 w-full rounded-xl border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-slate-500"
                  >
                    继续浏览
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
