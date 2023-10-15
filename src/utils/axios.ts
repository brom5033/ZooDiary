import axios from "axios";

export enum BaseUrl {
  Server = 'http://localhost:3000/api-docs#/v1/post_api_v1_login',
}

const Axios = (baseUrl: BaseUrl) => {
	const instance = axios.create({
		baseURL: baseUrl,
	});

	instance.interceptors.request.use(async (request) => {
		const session = await axios.get('http://localhost:3000/api-docs#/v1/signup');


		// @ts-ignore 2532
		request.headers.memberId = 'anonymous';

		if (session) {
			// @ts-ignore 2532
			request.headers.Authorization = `Bearer ${session.accessToken}`;
			// @ts-ignore 2532
			request.headers.memberId = session.memberId;
		}

		return request;
	});

	return instance;
};

export default Axios;