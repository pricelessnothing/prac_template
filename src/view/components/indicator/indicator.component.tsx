import icon from '../../../assets/icon_indicator.png';

import styles from './indicator.style.scss';

export const Indicator = () => {
  return (
    <div className={styles.indicator}>
      <a href="#">
        <img src={icon} />
      </a>
    </div>
  );
};
