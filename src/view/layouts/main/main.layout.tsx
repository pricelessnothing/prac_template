import { Outlet } from 'react-router';
import { useState } from 'react';

import { Indicator } from '../../components/indicator/indicator.component';
import { Menu } from '../../components/menu/menu.component';

import styles from './main.style.scss';

const MENU_ITEMS = [
  { title: 'Камеры', link: 'cameras' },
  { title: 'Дефекты', link: 'defects' },
  { title: 'Отчеты', link: 'reports' },
  { title: 'Настройки', link: 'settings' },
];

const INDICATORS_NUMBER: number = 4;

export const MainLayout: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);

  const getIndicators = (amount: number) => {
    const indicators = [];
    for (let i = 0; i < amount; i++) {
      indicators.push(<Indicator />);
    }
    return indicators;
  };

  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>
        <div
          className={
            menuActive
              ? `${styles.layout__header__toggleBtn} ${styles.active}`
              : styles.layout__header__toggleBtn
          }
          onClick={() => setMenuActive(!menuActive)}
        >
          <span />
        </div>
        <div className={styles.layout__header__indicators}>{getIndicators(INDICATORS_NUMBER)}</div>
      </header>
      <main className={styles.layout__main}>
        <Outlet />
      </main>
      <Menu active={menuActive} setActive={setMenuActive} items={MENU_ITEMS} />
    </div>
  );
};
