import { FC, useEffect, useState } from 'react';

import styles from './player.style.scss';

import { downloadFile } from '~/app/utils/downloadFile';
import { camerasService } from '~/app/cameras/cameras.service';
import icDownloadButton from '~/assets/ic_download_button.svg';
import icListButton from '~/assets/ic_list_button.svg';
import icPauseButton from '~/assets/ic_pause_button.svg';
import icPlayButton from '~/assets/ic_play_button.svg';

type PlayerProps = {
  playerId: number;
};

export const Player: FC<PlayerProps> = props => {
  const [isMetaShown, setIsMetaShown] = useState<boolean>(true);
  const [isStopped, setIsStopped] = useState<boolean>(false);
  const [meta, setMeta] = useState<Record<string, string>>({});
  const [imageURL, setImageURL] = useState<string>('');

  let interval: number;

  useEffect(() => {
    if (isStopped) {
      window.clearInterval(interval);
    } else {
      interval = window.setInterval(() => {
        void playFrames();
      }, 167); // 167 ms ~ 6 fps
    }
    return () => window.clearInterval(interval);
  }, [isStopped]);

  const showMetaHandler = () => {
    setIsMetaShown(!isMetaShown);
  };

  const pauseHandler = () => {
    setIsStopped(!isStopped);
  };

  const downloadHandler = () => {
    if (imageURL === undefined) {
      throw Error('Bad image in component');
    }
    downloadFile(imageURL, 'frame');
  };

  const playFrames = async () => {
    const frame = await camerasService.getFrame();
    setMeta(frame.meta);
    URL.revokeObjectURL(
      (document.getElementById(`frame_${props.playerId}`) as HTMLImageElement).src,
    );
    setImageURL(frame.imageURL);
  };

  return (
    <div className={styles.player}>
      <div className={styles.player__img_view}>
        <img
          className={`${styles.player__img_view} ${styles.img}`}
          alt="Картинка с камеры"
          id={`frame_${props.playerId}`}
          src={imageURL}
        />
        {isMetaShown && (
          <div className={`${styles.player__img_view} ${styles.meta_inf}`}>
            {Object.entries(meta).map(([metaKey, metaValue]) => (
              <p key={metaKey}>
                {metaKey}:{metaValue}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className={styles.player__btm_panel}>
        <img
          onClick={pauseHandler}
          className={`${styles.player__btm_panel__button} ${styles.play_or_pause}`}
          src={isStopped ? icPauseButton : icPlayButton}
          alt={isStopped ? 'Кнопка паузы' : 'Кнопка проигрывания'}
        />
        <img
          className={`${styles.player__btm_panel__button} ${styles.download}`}
          onClick={downloadHandler}
          src={icDownloadButton}
          alt="Скачать изображение"
        />
        <img
          onClick={showMetaHandler}
          className={`${styles.player__btm_panel__button} ${styles.toggle_meta}`}
          src={icListButton}
          alt="Кнопка сокрытия мета информации"
        />
      </div>
    </div>
  );
};
