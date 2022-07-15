import { FC, useEffect, useState } from 'react';

import styles from './player.style.scss';

import { camerasService } from '~/app/cameras/cameras.service';

type PlayerProps = {
  playerId: number;
};

export const Player: FC<PlayerProps> = props => {
  const [isMetaShown, setIsShowed] = useState<boolean>(true);
  const [isStopped, setIsStopped] = useState<boolean>(false);
  let interval: NodeJS.Timer;

  useEffect(() => {
    if (isStopped) {
      clearInterval(interval);
    } else {
      interval = setInterval(() => {
        void playFrames();
      }, 167); // 167 ms ~ 6 fps
    }
    return () => clearInterval(interval);
  }, [isStopped]);

  const showMetaHandler = () => {
    setIsShowed(!isMetaShown);
  };

  const pauseHandler = () => {
    setIsStopped(!isStopped);
  };

  const downloadHandler = () => {
    document.getElementById(`frameLink_${props.playerId}`)?.click();
  };

  const playFrames = async () => {
    const frame = await camerasService.getFrame();
    setMeta(frame.meta);
    setImage(frame.image);
  };

  const setMeta = (meta: Record<string, string>) => {
    for (const key of camerasService.META_KEYS) {
      const metaElement = document.getElementById(`${key}_${props.playerId}`) as HTMLElement;
      metaElement.innerText = `${key}: ${meta[key]}`;
    }
  };

  const setImage = (image: Blob) => {
    const imageElement = document.getElementById(`frame_${props.playerId}`) as HTMLImageElement;
    const downloadLinkElement = document.getElementById(
      `frameLink_${props.playerId}`,
    ) as HTMLLinkElement;

    URL.revokeObjectURL(imageElement.src);
    const imageURL = URL.createObjectURL(image);
    imageElement.src = imageURL;
    downloadLinkElement.href = imageURL;
  };

  return (
    <div className={styles.player}>
      <div className={styles.player__img_view}>
        <img
          className={`${styles.player__img_view} ${styles.img}`}
          alt="Картинка с камеры"
          id={`frame_${props.playerId}`}
        />
        {isMetaShown ? (
          <span className={`${styles.player__img_view} ${styles.meta_inf}`}>
            <ul>
              <li id={`sourceName_${props.playerId}`}></li>
              <li id={`tag_${props.playerId}`}></li>
              <li id={`frameId_${props.playerId}`}></li>
              <li id={`frameTime_${props.playerId}`}></li>
            </ul>
            <ul>
              <li id={`frameGrabTime_${props.playerId}`}></li>
              <li id={`width_${props.playerId}`}></li>
              <li id={`height_${props.playerId}`}></li>
              <li id={`srcWidth_${props.playerId}`}></li>
            </ul>
            <ul>
              <li id={`srcHeight_${props.playerId}`}></li>
              <li id={`shutter_${props.playerId}`}></li>
              <li id={`gain_${props.playerId}`}></li>
              <li id={`temperature_${props.playerId}`}></li>
            </ul>
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
        <div className={`${styles.player__btm_panel__button} ${styles.download}`}>
          <img
            onClick={downloadHandler}
            src="../ic_download_button.svg"
            alt="Скачать изображение"
          />
          <a
            className={`${styles.player__btm_panel__button} ${styles.download} ${styles.link}`}
            id={`frameLink_${props.playerId}`}
            download=""
          />
        </div>
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