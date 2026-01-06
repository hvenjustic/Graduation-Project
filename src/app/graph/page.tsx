import type { Metadata } from 'next';
import GraphClient from './GraphClient';

export const metadata: Metadata = {
  title: 'Graph | Context-starter'
};

export default function GraphPage() {
  return <GraphClient />;
}
