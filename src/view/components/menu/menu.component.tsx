// import classNames from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { MenuProps } from './menu.type';
import styles from './menu.style.scss';

export const Menu = ({ active, setActive, items }: MenuProps) => {
  const navigate = useNavigate();

  return (
    <div className={active ? `${styles.menu} ${styles.active}` : styles.menu}>
      <div className={styles.blackDrop} onClick={() => setActive(false)} />
      <div className={styles.menu__content}>
        <nav className={styles.menu__items}>
          {items.map(({ link, title }) => (
            <NavLink
              to={link}
              key={link}
              className={({ isActive }) =>
                classNames(styles.menu__item, { [styles.active]: isActive })
              }
              onClick={() => setActive(false)}
            >
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
