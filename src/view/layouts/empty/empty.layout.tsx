import { Outlet } from 'react-router';

import styles from './empty.style.scss';

export const EmptyLayout: React.FC = () => {
  return (
    <main className={styles.layout}>
      <Outlet />
    </main>
  );
};
