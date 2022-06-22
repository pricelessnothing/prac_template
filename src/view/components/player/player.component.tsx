import { FC, useEffect, useState } from 'react';

import styles from './player.style.scss';

import { camerasService } from '~/app/cameras/cameras.service';

export const Player: FC = () => {
  let interval: NodeJS.Timer;
  const [isMetaShown, setIsShowed] = useState<boolean>(true);
  const [isStopped, setIsStopped] = useState<boolean>(false);

  useEffect(() => {
    if (isStopped) {
      clearInterval(interval);
    } else {
      interval = setInterval(() => {
        playFrames();
      }, 167);
    }
    return () => clearInterval(interval);
  }, [isStopped]);

  const showMetaHandler = () => {
    isMetaShown ? console.log('Meta disabled') : console.log('Meta enabled');
    setIsShowed(!isMetaShown);
  };

  const pauseHandler = () => {
    setIsStopped(!isStopped);
    isStopped ? console.log('Resume') : console.log('Stop');
  };

  const downloadHandler = () => {
    //TODO: implement me
    console.log('Download');
  };

  const playFrames = () => {
    //TODO: implement me
    console.log('New frame');
    camerasService.getFrame();
  };

  return (
    <div className={styles.player}>
      <div className={styles.player__img_view}>
        <img
          className={`${styles.player__img_view} ${styles.img}`}
          /*src= TODO: implement me */
          alt="картинка с камеры"
        />
        {isMetaShown ? (
          <span className={`${styles.player__img_view} ${styles.meta_inf}`}>
            {/* TODO: implement me */} Мета-информация о кадре
          </span>
        ) : (
          ''
        )}
      </div>
      <div className={styles.player__btm_panel}>
        <img
          onClick={pauseHandler}
          className={`${styles.player__btm_panel__button} ${styles.play_or_pause}`}
          src={isStopped ? '../ic_pause_button.svg' : '../ic_play_button.svg'}
          alt={isStopped ? 'Кнопка паузы' : 'Кнопка проигрывания'}
        />
        <img
          onClick={downloadHandler}
          className={`${styles.player__btm_panel__button} ${styles.download}`}
          src="../ic_download_button.svg"
          alt="Кнопка скачать"
        />
        <img
          onClick={showMetaHandler}
          className={`${styles.player__btm_panel__button} ${styles.toggle_meta}`}
          src="../ic_list_button.svg"
          alt="Кнопка сокрытия мета информации"
        />
      </div>
    </div>
  );
};
