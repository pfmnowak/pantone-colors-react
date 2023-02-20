import { rest } from 'msw';
import { setupServer } from 'msw/node';

export function createServer(handlerConfig) {
	const handlers = handlerConfig.map(config => {
		return rest[config.method || 'get'](config.path, (req, res, ctx) => {
			return res(ctx.status(config.status || 200), ctx.json(config.res));
		});
	});
	const server = setupServer(...handlers);

	beforeAll(() => {
		server.listen();
	});
	afterEach(() => {
		server.resetHandlers();
	});
	afterAll(() => {
		server.close();
	});
}
