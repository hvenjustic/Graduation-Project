import type { Metadata } from 'next';
import AgentConsole from './AgentConsole';

export const metadata: Metadata = {
  title: 'Agent | 知识图谱电商'
};

export default function AgentPage() {
  return <AgentConsole />;
}
