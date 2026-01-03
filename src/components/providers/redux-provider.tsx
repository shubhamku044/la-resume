import { Provider } from '@/store';

function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}

export default ReduxProvider;
