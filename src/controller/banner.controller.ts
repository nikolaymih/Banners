import { Request, Response } from 'express';
import { CreateBannerInput, DeleteBannerInput, FindAndUpdateBannerInput, FindSingleBannerInput } from '../schema/banner.schema';
import { createBanner, deleteBanner, findAllUserBanners, findBanner, findAndUpdateBanner } from '../service/banner.service';


export const createBannerHandler = async (
    req: Request<{}, {}, CreateBannerInput['body']>,
    res: Response
) => {
    const userId = res.locals.user._id;

    const input = req.body;

    const banner = await createBanner({ ...input, user: userId });

    return res.status(201).send(banner);
}

export const findAllUserBannersHandler = async (req: Request, res: Response) => {
    const userId = res.locals.user._id;

    const userBanners = await findAllUserBanners(userId);

    return res.status(200).send({ userBanners });
}

export const findSingleBannerHandler = async (
    req: Request<FindSingleBannerInput['params']>,
    res: Response
) => {
    const userId = res.locals.user._id;

    const bannerId = req.params.bannerId;

    const banner = await isUserAuthorized(userId, bannerId);

    if (!banner) {
        return res.sendStatus(400);
    }

    return res.status(200).send(banner);
}

export const findBannerAndUpdateHandler = async (
    req: Request<FindAndUpdateBannerInput['params'], {}, FindAndUpdateBannerInput['body']>,
    res: Response
) => {
    const userId = res.locals.user._id;

    const update = req.body;
    const bannerId = req.params.bannerId;

    const banner = await isUserAuthorized(userId, bannerId);

    if (!banner) {
        return res.sendStatus(400);
    }

    const updatedBanner = await findAndUpdateBanner({ bannerId }, update, { new: true })

    return res.sendStatus(200).send(updatedBanner)

}

export const deleteBannerHandler = async (
    req: Request<DeleteBannerInput['params']>,
    res: Response) => {
    const userId = res.locals.user._id;

    const bannerId = req.params.bannerId;

    const banner = await isUserAuthorized(userId, bannerId);

    if (!banner) {
        return res.sendStatus(400);
    }

    await deleteBanner({ banner });

    res.sendStatus(200);
}

const isUserAuthorized = async (userId: string, bannerId: string ) => {
    const banner = await findBanner({ bannerId });

    if (!banner) {
        return false;
    }

    if (String(banner.user) !== userId) {
        return false;
    }

    return banner;
}

