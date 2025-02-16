import { store } from '@redux';
import { setMessage } from '@redux';

export class Message {
	static success(message: string) {
		store.dispatch(setMessage({ type: 'success', message }));
		setTimeout(() => {
			store.dispatch(setMessage(null));
		}, 5000);
	}

	static danger(message: string) {
		store.dispatch(setMessage({ type: 'danger', message }));
		setTimeout(() => {
			store.dispatch(setMessage(null));
		}, 5000);
	}
}
