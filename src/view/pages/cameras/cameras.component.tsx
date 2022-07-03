import { Camera } from '../../components/camera/camera.component';

import styles from './cameras.style.scss';

const AMOUNT_CAMERAS: number = 6;

export const Cameras = () => {
  const getCameras = (amount: number) => {
    const cameras = [];
    for (let i = 0; i < amount; i++) {
      cameras.push(<Camera />);
    }
    return cameras;
  };

  return (
    <div className={styles.cameras}>
      <div className={styles.wrapper}>{getCameras(AMOUNT_CAMERAS)}</div>
      <button className={styles.cameras__btn} />
    </div>
  );
};
