# Context-starter Template

基于当前项目的 UI Shell 抽取出的无登录版本，便于快速起盘。

## 使用方式
1. 复制 `template` 目录作为新项目根目录。
2. 使用 Node.js 22（`.nvmrc` 已提供），运行 `nvm use` 或自行切换到 22.x。
3. 运行 `npm install` 安装依赖。
4. 执行 `npm run dev` 启动开发环境（Next.js App Router + TailwindCSS v4）。
5. 按需修改 `src/app/page.tsx` 的示例区块和 `src/components/navBar/Navbar.tsx` 的导航配置。

## 已内置
- 全局布局、暗色模式切换、渐变背景。
- 响应式导航栏（无鉴权依赖）。
- 示例首页区块：统计卡片、活动流、目录蓝图与下一步行动卡。
- Tailwind 插件（typography、scrollbar）和基础 ESLint/TS 配置。

## 资产
- `public/context-icon.svg` 可替换为自有品牌图标。
