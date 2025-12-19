declare module 'react-markdown' {
  import type { ComponentType } from 'react';
  // 使用 unknown 避免 any，同时保持灵活的 props 透传
  const ReactMarkdown: ComponentType<unknown>;
  export default ReactMarkdown;
}

