import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import BannerModel from '../models/banner.model';
import { IBannerDocument } from '../models/interfaces';

export const createBanner = async (input: DocumentDefinition<Omit<IBannerDocument, 'createdAt' | 'updatedAt'>>) => {
    return BannerModel.create(input);
}

export const findAllUserBanners = async (query: FilterQuery<IBannerDocument>) => {
    return BannerModel.find({ userId: query });
}

export const findBanner = async (
    query: FilterQuery<IBannerDocument>,
    options: QueryOptions = { lean: true }
) => {
    return BannerModel.findOne({ _id: query.bannerId }, {}, options);
}

export const findAndUpdateBanner = async (
    query: FilterQuery<IBannerDocument>,
    update: UpdateQuery<IBannerDocument>,
    options: QueryOptions
) => {
    return BannerModel.findByIdAndUpdate({ _id: query.bannerId }, update, options);
}

export const deleteBanner = async (query: FilterQuery<IBannerDocument>) => {
    return BannerModel.deleteOne({ _id: query.banner._id });
}