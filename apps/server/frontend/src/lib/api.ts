import ky from 'ky';
import type { User } from './types/user';
import type { LoginResponse } from './types/auth';

export class Api {
	private readonly httpClient = ky.extend({});

	public async getCurrentUser(): Promise<User> {
		return this.httpClient
			.get<{ data: User }>('api/me')
			.json()
			.then((resp) => resp.data);
	}

	public async login(username: string, password: string) {
		return this.httpClient
			.post('api/signin', {
				json: { username, password }
			})
			.json<LoginResponse>();
	}

	public async logout(): Promise<void> {
		return this.httpClient.delete('api/logout').json();
	}
}

export const api = new Api();
