import icon from '../../../assets/icon_indicator.png';

import { IndicatorsProps } from './indicators.type';
import styles from './indicators.style.scss';

export const Indicators = ({ count }: IndicatorsProps) => {
  const getIndicators = (count: number) => {
    const indicators = [];
    for (let i = 0; i < count; i++) {
      indicators.push(
        <a href="#">
          <img src={icon} />
        </a>,
      );
    }
    return indicators;
  };
  return <div className={styles.indicators}>{getIndicators(count)}</div>;
};
