import { Outlet } from 'react-router';
import { useState } from 'react';

import { Navbar } from '../../components/navbar/navbar.component';
import { Indicators } from '../../components/indicators/indicatros.component';
import { Menu } from '../../components/menu/menu.component';

import styles from './main.style.scss';

const NAVBAR_ITEMS = [
  { title: 'Правила', link: '/' },
  { title: 'Пример Redux', link: 'redux' },
  { title: 'Другой layout', link: 'login' },
];

const MENU_ITEMS = [
  { title: 'Камеры', link: 'cameras' },
  { title: 'Дефекты', link: 'defects' },
  { title: 'Отчеты', link: 'reports' },
  { title: 'Настройки', link: 'settings' },
];

export const MainLayout: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);
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

        <Indicators count={4} />
      </header>
      <Navbar items={NAVBAR_ITEMS} />
      <main className={styles.layout__main}>
        <Outlet />
      </main>
      <Menu active={menuActive} setActive={setMenuActive} items={MENU_ITEMS} />
    </div>
  );
};
