import { AppDispatch } from '..';
import { collectionSlice } from '../slices/collection.slice';
import collectionService from '../../services/collectionService';

export const fetchCollections = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(collectionSlice.actions.fetchingCollections());
        const response = await collectionService.getCollections();

        response
            .mapRight(({ data: collections }) => {
                dispatch(
                    collectionSlice.actions.fetchCollectionsSuccess(collections)
                );
            })
            .mapLeft((e: any) => {
                dispatch(collectionSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};

export const fetchUserCollections = (userId: number) => {
    return async (dispatch: AppDispatch) => {
        dispatch(collectionSlice.actions.fetchingUsersCollections());
        const response = await collectionService.getUserCollections(userId);

        response
            .mapRight(({ data: collections }) => {
                dispatch(
                    collectionSlice.actions.fetchCollectionsUserSuccess(
                        collections
                    )
                );
            })
            .mapLeft((e: any) => {
                dispatch(collectionSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};

export const fetchTopAmountCollections = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(collectionSlice.actions.fetchingTopAmountCollections());
        const response = await collectionService.getTopAmountCollections();

        response
            .mapRight(({ data: collections }) => {
                dispatch(
                    collectionSlice.actions.fetchTopAmountSuccess(collections)
                );
            })
            .mapLeft((e: any) => {
                dispatch(collectionSlice.actions.fetchError(e.response?.data));
                console.error({
                    type: e.response.statusText,
                    code: e.response.status,
                    message: e.response.data,
                });
            });
    };
};

// export const setCollectionsEmpty = () => {
//     return async (dispatch: AppDispatch) => {
//         dispatch(collectionSlice.actions.setUserCollectionsEmpty([]));
//     };
// };
