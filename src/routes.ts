import { Express } from 'express';
import { createUserHandler } from './controller/user.controller';
import { createUserSchema } from './schema/user.schema';
import validateResources from './middleware/validateResources';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from './controller/session.controller';
import { sessionSchema } from './schema/session.schema';
import { requireUser } from './middleware/requireUser';
import { createBannerSchema, deleteBannerSchema, findAndUpdateBannerSchema, findSingleBannerSchema } from './schema/banner.schema';
import { createBannerHandler, deleteBannerHandler, findAllUserBannersHandler, findBannerAndUpdateHandler, findSingleBannerHandler } from './controller/banner.controller';

export default (app: Express) => {
    app.post('/api/users', validateResources(createUserSchema), createUserHandler);

    app.post('/api/sessions', validateResources(sessionSchema), createUserSessionHandler);

    app.get('/api/sessions', requireUser, getUserSessionsHandler);

    app.delete('/api/sessions', requireUser, deleteSessionHandler);

    app.post('/api/banners', [requireUser, validateResources(createBannerSchema)], createBannerHandler);

    app.get('/api/banners', requireUser, findAllUserBannersHandler);

    app.get('/api/banners/:bannerId', [requireUser, validateResources(findSingleBannerSchema)], findSingleBannerHandler);

    app.put('/api/banners/:bannerId', [requireUser, validateResources(findAndUpdateBannerSchema)], findBannerAndUpdateHandler);

    app.delete('/api/banners/:bannerId', [requireUser, validateResources(deleteBannerSchema)], deleteBannerHandler);
}