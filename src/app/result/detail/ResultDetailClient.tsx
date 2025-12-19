'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiArrowLeft, FiRefreshCw, FiExternalLink, FiChevronDown, FiChevronRight } from 'react-icons/fi';

const API_BASE = process.env.NEXT_PUBLIC_GO_API ?? 'http://www.hvenjustic.top:4010';

type MarkdownStore = {
    nums?: number;
    raw_markdown?: string[];
    fit_markdown?: string[];
    markdown_with_citations?: string[];
};

type ResultItem = {
    id?: number | string;
    url?: string;
    site_name?: string | null;
    result_md?: string | null;
    crawled_at?: string | null;
    llm_processed_at?: string | null;
    page_count?: number;
    chunk_count?: number;
};

type ResultDetailResponse = {
    item?: ResultItem;
};

type PreviewState = {
    url: string;
    type: string;
    content: string;
    loading: boolean;
    error?: string;
};

type SectionKey = 'raw_markdown' | 'fit_markdown' | 'markdown_with_citations';

export default function ResultDetailClient() {
    const searchParams = useSearchParams();
    const id = useMemo(() => searchParams.get('id')?.trim() || '', [searchParams]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState<ResultDetailResponse | null>(null);
    const [mdStore, setMdStore] = useState<MarkdownStore | null>(null);
    const [openSection, setOpenSection] = useState<SectionKey | null>('fit_markdown');
    const [preview, setPreview] = useState<PreviewState | null>(null);

    const fetchDetail = async () => {
        if (!id) return;
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API_BASE}/api/results/${encodeURIComponent(id)}`, { cache: 'no-store' });
            if (!res.ok) throw new Error(`请求失败：${res.status}`);
            const json = (await res.json()) as ResultDetailResponse;
            setData(json);

            const rawStr = json?.item?.result_md ?? '';
            if (rawStr) {
                try {
                    const parsed = JSON.parse(rawStr) as MarkdownStore;
                    setMdStore(parsed);
                } catch (e) {
                    setMdStore(null);
                    setError('解析 result_md 失败，请检查返回格式');
                }
            } else {
                setMdStore(null);
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : '未知错误');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetail();
    }, [id]);

    const sections: { key: SectionKey; title: string; desc: string; data: string[] }[] = useMemo(() => {
        const store = mdStore || {};
        return [
            { key: 'fit_markdown', title: 'Fit Markdown', desc: '主用于展示/知识库', data: store.fit_markdown ?? [] },
            { key: 'raw_markdown', title: 'Raw Markdown', desc: '原始清洗后文本', data: store.raw_markdown ?? [] },
            {
                key: 'markdown_with_citations',
                title: 'Markdown with Citations',
                desc: '含引用标注',
                data: store.markdown_with_citations ?? [],
            },
        ];
    }, [mdStore]);

    const handleOpenSection = (key: SectionKey) => {
        setOpenSection((prev) => (prev === key ? null : key));
    };

    const handleLoadMD = async (url: string, type: string) => {
        if (!url) return;
        setPreview({ url, type, content: '', loading: true, error: undefined });
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`下载失败：${res.status}`);
            const text = await res.text();
            setPreview({ url, type, content: text, loading: false });
        } catch (e) {
            setPreview({
                url,
                type,
                content: '',
                loading: false,
                error: e instanceof Error ? e.message : '下载出错',
            });
        }
    };

    return (
        <div className="px-6 pb-16">
            <div className="mx-auto mt-8 max-w-6xl space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/result"
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600"
                        >
                            <FiArrowLeft className="h-4 w-4" />
                            返回
                        </Link>
                        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                            任务详情{id ? ` #${id}` : ''}
                        </h1>
                    </div>
                    <button
                        onClick={fetchDetail}
                        disabled={!id}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600"
                    >
                        <FiRefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        刷新
                    </button>
                </div>

                {!id && (
                    <div className="glass-panel rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-sm text-amber-800 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-100">
                        缺少参数 <code>id</code>，请从结果列表点击进入（示例：<code>/result/detail?id=123</code>）。
                    </div>
                )}

                {error && (
                    <div className="glass-panel rounded-2xl border border-red-200 bg-red-50/70 p-5 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-200">
                        {error}
                    </div>
                )}

                <div className="glass-panel rounded-2xl border border-gray-200/60 bg-white/70 p-5 shadow-sm dark:border-gray-800/60 dark:bg-slate-900/70 space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <span>结果ID：{data?.item?.id ?? '—'}</span>
                        <span>URL：{data?.item?.url ?? '—'}</span>
                        <span>站点：{data?.item?.site_name ?? '—'}</span>
                        <span>页数：{data?.item?.page_count ?? '—'}</span>
                        <span>分片：{data?.item?.chunk_count ?? '—'}</span>
                    </div>
                    {!mdStore && <div className="text-sm text-slate-500 dark:text-slate-400">暂无 markdown 链接数据。</div>}

                    {sections.map((sec) => {
                        const isOpen = openSection === sec.key;
                        return (
                            <div
                                key={sec.key}
                                className="rounded-xl border border-slate-200 bg-white/70 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
                            >
                                <button
                                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100"
                                    onClick={() => handleOpenSection(sec.key)}
                                >
                                    <div className="flex items-center gap-2">
                                        {isOpen ? <FiChevronDown /> : <FiChevronRight />}
                                        <span>{sec.title}</span>
                                        <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                                            {sec.desc}（{sec.data.length} 个）
                                        </span>
                                    </div>
                                </button>
                                {isOpen && (
                                    <div className="px-4 pb-4">
                                        <div className="max-h-48 overflow-auto space-y-2 rounded-lg border border-dashed border-slate-200 p-3 dark:border-slate-700">
                                            {sec.data.length === 0 && (
                                                <div className="text-xs text-slate-500 dark:text-slate-400">暂无链接</div>
                                            )}
                                            {sec.data.map((u, idx) => (
                                                <button
                                                    key={`${sec.key}-${idx}-${u}`}
                                                    onClick={() => handleLoadMD(u, sec.title)}
                                                    className="group flex w-full items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-left text-xs text-slate-700 transition hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                                                >
                                                    <span className="truncate">{u || '空链接'}</span>
                                                    <FiExternalLink className="ml-2 h-4 w-4 shrink-0 text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {preview && (
                    <div className="glass-panel rounded-2xl border border-indigo-200/70 bg-indigo-50/70 p-5 shadow-sm dark:border-indigo-900/40 dark:bg-slate-900/70">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                预览：{preview.type} - {preview.url}
                            </div>
                            {preview.loading && <span className="text-xs text-slate-500">加载中...</span>}
                            {preview.error && <span className="text-xs text-red-500">{preview.error}</span>}
                        </div>
                        <div className="max-h-[50vh] overflow-auto rounded-xl bg-slate-900 p-4 text-xs leading-relaxed text-slate-50 shadow-inner">
                            {preview.loading ? '加载中...' : preview.content || '内容为空'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

