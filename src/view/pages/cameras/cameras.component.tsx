import { Camera } from '../../components/camera/camera.component';

import styles from './cameras.style.scss';
import { Player } from '~/view/components/player/player.component';

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
      <Player playerId={1} />
    </div>
  );
};
