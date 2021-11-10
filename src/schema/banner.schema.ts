import { object, string, number, TypeOf } from 'zod';

const payload = {
    body: object({
        text: string({
            required_error: 'Text is required'
        }).min(0, 'Texy should be at least 10 characters'),
        image: string({
            required_error: 'Image is required'
        })
    })
}

const params = {
    params: object({
        bannerId: string({
            required_error: 'bannerId is required'
        })
    })
}

export const createBannerSchema = object({
    ...payload
})

export const findSingleBannerSchema = object({
    ...params
})

export const findAndUpdateBannerSchema = object({
    ...payload, ...params
})

export const deleteBannerSchema = object({
    ...params
})

export type CreateBannerInput = TypeOf<typeof createBannerSchema>

export type FindSingleBannerInput = TypeOf<typeof findSingleBannerSchema>

export type FindAndUpdateBannerInput = TypeOf<typeof findAndUpdateBannerSchema>

export type DeleteBannerInput = TypeOf<typeof deleteBannerSchema>