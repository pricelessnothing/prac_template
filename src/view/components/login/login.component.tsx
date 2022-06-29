import styles from "./login.style.scss"

export const Login = () => {
	return (
		<div>
			<form className={styles.loginForm}>
				<div>
					<select className={styles.loginForm__role + " " + styles.input}>
						<option value="admin">Администратор</option>
						<option value="guest">Гость</option>
						<option value="anoter">Другой...</option>
					</select>
					<input
						type="password"
						className={styles.loginForm__password + " " + styles.input} />
				</div>
				<button className={styles.loginForm__button}>
					Войти
				</button>
		</form>
		</div>
	);
};