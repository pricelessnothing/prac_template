// import classNames from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';

import { MenuProps } from './menu.type';
import styles from './menu.style.scss';

export const Menu = ({ active, setActive, items }: MenuProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={active ? `${styles.menu} ${styles.active}` : styles.menu}
      onClick={() => setActive(false)}
    >
      <div className={styles.blackDrop} />
      <div className={styles.menu__content}>
        <nav className={styles.menu__items}>
          {items.map(({ link, title }) => (
            <NavLink to={link} key={link} className={styles.menu__item}>
              {title}
            </NavLink>
          ))}
        </nav>
        <button className={styles.menu__exit} onClick={() => navigate('login')}>
          Выход
        </button>
      </div>
    </div>
  );
};
