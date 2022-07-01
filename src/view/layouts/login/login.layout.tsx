import { Outlet } from 'react-router';

import styles from './login.style.scss';

export const LoginLayout: React.FC = () => {
  return (
    <main className={styles.layout}>
      <Outlet />
    </main>
  );
};
