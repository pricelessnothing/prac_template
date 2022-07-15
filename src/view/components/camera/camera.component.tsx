import styles from './camera.style.scss';

export const Camera = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}></div>
      <div className={styles.control}>
        <div className={styles.control__btns}>
          <button className={styles.control__btn}>
            <span />
          </button>
          <button className={styles.control__btn}>
            <span />
          </button>
          <button className={styles.control__btn}>
            <span />
          </button>
          <button className={styles.control__btn}>
            <span />
          </button>
          <button className={styles.control__btn}>
            <span />
          </button>
        </div>
      </div>
    </div>
  );
};
