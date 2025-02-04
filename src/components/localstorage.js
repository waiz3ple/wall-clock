/* import logger from "./logger";
class LocalStorage {
	set setTheme(theme){
		try {
			localStorage.setItem('theme', JSON.stringify({ theme }));
		} catch (err) {
			logger.setError = `Error setting local storage, ${err.message}`;
		}
	}

	get getTheme(){
		try {
			return JSON.parse(localStorage.getItem('theme')).theme;
		} catch (err) {
			logger.setError = `Error retrieving from local storage ${err.message}`;
		}
	}
}

export default new LocalStorage(); */