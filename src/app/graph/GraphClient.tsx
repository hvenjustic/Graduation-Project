'use client';

import { useCallback, useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { FiMapPin, FiRefreshCw } from 'react-icons/fi';

type MapPoint = {
  id: string;
  name: string;
  coordinates: [number, number];
  latitude: number;
  longitude: number;
  size: number;
  color: string;
};

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const POINT_COUNT = 28;
const PREVIEW_COUNT = 8;
const POINT_PALETTE = ['#2563eb', '#0ea5e9', '#22c55e', '#f97316', '#e11d48', '#a855f7', '#14b8a6', '#f59e0b'];

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

const generatePoints = (count: number): MapPoint[] =>
  Array.from({ length: count }, (_, index) => {
    const longitude = Number(randomInRange(-170, 170).toFixed(2));
    const latitude = Number(randomInRange(-60, 75).toFixed(2));
    return {
      id: `point-${index + 1}`,
      name: `点位 ${index + 1}`,
      coordinates: [longitude, latitude],
      longitude,
      latitude,
      size: Number(randomInRange(3, 7).toFixed(1)),
      color: POINT_PALETTE[index % POINT_PALETTE.length]
    };
  });

export default function GraphClient() {
  const [points, setPoints] = useState<MapPoint[]>([]);

  const regeneratePoints = useCallback(() => {
    setPoints(generatePoints(POINT_COUNT));
  }, []);

  useEffect(() => {
    regeneratePoints();
  }, [regeneratePoints]);

  const preview = points.slice(0, PREVIEW_COUNT);
  const remaining = Math.max(points.length - preview.length, 0);

  return (
    <div className="relative isolate px-6 pb-16">
      <section className="mx-auto mt-8 max-w-[108rem] overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-8 shadow-lg backdrop-blur md:p-12 dark:border-white/10 dark:bg-slate-900/80">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200">
              <FiMapPin className="h-4 w-4" />
              Graph
            </span>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold leading-tight text-slate-900 dark:text-white md:text-4xl">
                Graph 地图：二维分布预览
              </h1>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                使用 react-simple-maps 渲染世界地图，随机生成点位以模拟图谱坐标或地理信号。
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={regeneratePoints}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-slate-600"
          >
            <FiRefreshCw className="h-4 w-4" />
            重新生成点位
          </button>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-[108rem] gap-6 lg:grid-cols-[1.6fr_0.8fr]">
        <div className="glass-panel rounded-2xl border border-gray-200/60 bg-white/80 p-5 shadow-sm dark:border-gray-800/60 dark:bg-slate-900/70">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">二维地图</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">World Map · Mercator</p>
            </div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">点位：{points.length || '—'}</span>
          </div>
          <div className="h-[70vh] w-full rounded-2xl bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-2 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 145 }}
              style={{ width: '100%', height: '100%' }}
              className="h-full w-full"
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      className="transition-colors fill-slate-200 stroke-white/80 hover:fill-indigo-200 dark:fill-slate-800 dark:stroke-slate-700 dark:hover:fill-slate-700"
                    />
                  ))
                }
              </Geographies>
              {points.map((point) => (
                <Marker key={point.id} coordinates={point.coordinates}>
                  <title>{point.name}</title>
                  <circle r={point.size} fill={point.color} fillOpacity={0.85} stroke="#ffffff" strokeWidth={1} />
                </Marker>
              ))}
            </ComposableMap>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">地图数据来自 world-atlas，点位为前端随机生成。</p>
        </div>

        <div className="glass-panel rounded-2xl border border-gray-200/60 bg-white/70 p-5 shadow-sm dark:border-gray-800/60 dark:bg-slate-900/70">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">点位概览</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {points.length ? `展示前 ${preview.length} 个点位` : '正在生成随机点位...'}
          </p>
          <div className="mt-4 space-y-3">
            {points.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 px-3 py-4 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                生成中...
              </div>
            ) : (
              preview.map((point) => (
                <div
                  key={point.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: point.color }} />
                    <span>{point.name}</span>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400">
                    纬度 {point.latitude.toFixed(2)}° · 经度 {point.longitude.toFixed(2)}°
                  </span>
                </div>
              ))
            )}
            {remaining > 0 && (
              <div className="text-xs text-slate-500 dark:text-slate-400">还有 {remaining} 个点位未展开</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
