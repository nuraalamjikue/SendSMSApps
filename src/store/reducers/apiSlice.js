// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://prod.saraemart.com/api/',
        // baseUrl: 'http://prod.saraemart.com/api/Content/GetAllSingleContent',

        baseUrl: 'https://prod.saralifestyle.com/api/',
    }),
    endpoints: builder => ({
        // =======> SaRa
        getSaRaSingleContentData: builder.query({
            query: () => {
                return `Content/GetAllSingleContent`;
            },
        }),

        getNewCollection: builder.query({
            query: ({ categoryId, currentPage, itemPerPage }) => {
                return `Product/GetProductByFilterOptions?categoryId=${categoryId}&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`;
            },
        }),

        getPopularCollection: builder.query({
            query: ({ categoryId, currentPage, itemPerPage }) => {
                return `Product/GetProductByFilterOptions?categoryId=${categoryId}&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`;
            },
        }),
        getBudgetDeal: builder.query({
            query: ({ categoryId, currentPage, itemsPerPage, maxPrice }) => {
                return `Product/GetProductByFilterOptions?categoryId=${categoryId}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&maxPrice=${maxPrice}`;
            },
        }),

        // http://prod.saraemart.com/api/Product/GetProductByFilterOptions?currentPage=1&itemsPerPage=20&categoryId=1&cname=clothing-and-fashion&variants=1083

        // =========> AddsLink
        getAddsLinkData: builder.query({
            query: ({ currentPage, itemsPerPage, categoryId, cname, variants }) => {
                return `Product/GetProductByFilterOptions?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&categoryId=${categoryId}&cname=${cname}&variants=${variants}`;
            },
        }),

        // =========> Dhue

        getDhueNewCollection: builder.query({
            query: ({ numofpage, brandId }) => {
                return `/Product/GetNewArrivalProduct?itemsPerPage=${numofpage}&brandId=${brandId}`;
            },
        }),

        getDhueMenCollection: builder.query({
            query: ({ categoryId, currentPage, itemsPerPage, brandId }) => {
                return `/Product/GetProductByFilterOptions?categoryId=${categoryId}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&brands=${brandId}`;
            },
        }),

        // =======> Single Product Screen
        getSingleProduct: builder.query({
            query: ({ ProductID }) => {
                return `Product/GetProductDetailsById?productId=${ProductID}&currency=bdt`;
            },
        }),

        // =======> Address Screen
        getAddressScreenAllCountriesContentData: builder.query({
            query: () => {
                return `DivisionCitiesArea/AllCountries?getAll=Y`;
            },
        }),

        getAddressScreenCityDataByID: builder.query({
            query: ({ CountryId }) => {
                return CountryId === undefined
                    ? null
                    : `DivisionCitiesArea/AllCities?countryId=${CountryId}&getAll=Y`;
            },
        }),

        getAddressScreenThanaDataByID: builder.query({
            query: ({ DistrictId }) => {
                return DistrictId === undefined
                    ? null
                    : `DivisionCitiesArea/AllAreas?cityId=${DistrictId}&getAll=Y`;
            },
        }),

        // =======> MarketPlace
        getPopularTopCategories: builder.query({
            query: ({ actionName, numOfCategory }) => {
                return `Home/GetCategoryByAction?actionName=${actionName}&numOfCategory=${numOfCategory}`;
            },
        }),

        // getMarketplaceBestDeal: builder.query({
        //   query: ({categoryId, currentPage, itemPerPage}) => {
        //     return `Product/GetProductByFilterOptions?categoryId=${categoryId}&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`;
        //   },
        // }),
        getMarketplaceBestDeal: builder.query({
            query: () => {
                return `Campaign/GetBestDealsProduct`;
            },
        }),
        getMarketplaceNewArrival: builder.query({
            query: ({ categoryId, currentPage, itemPerPage }) => {
                return `Product/GetProductByFilterOptions?categoryId=${categoryId}&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`;
            },
        }),
        getMarketplaceBestProduct: builder.query({
            query: ({ categoryId, currentPage, itemPerPage }) => {
                return `Product/GetProductByFilterOptions?categoryId=${categoryId}&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`;
            },
        }),

        // http://prod.saraemart.com/api/Brand/GetBrand?shownHomePage=Y&isActive=Y&getAll=Y
        getShopWithBrandsData: builder.query({
            query: ({ shownHomePage, isActive, getAll }) => {
                return `Brand/GetBrand?shownHomePage=${shownHomePage}&isActive=${isActive}&getAll=${getAll}`;
            },
        }),

        getMarketplaceRecommendedData: builder.query({
            query: ({ categoryId, currentPage, itemPerPage }) => {
                return `Product/GetProductByFilterOptions?categoryId=${categoryId}&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`;
            },
        }),

        // Best Deal
        // http://prod.saraemart.com/api/Campaign/GetAllCampaigns?getAll=Y
        getBestDealAllCampaigns: builder.query({
            query: ({ getAll }) => {
                return `Campaign/GetAllCampaigns?getAll=${getAll}`;
            },
        }),
        getBestDealSeeMoreData: builder.query({
            query: ({ campaignId, itemsPerPage, currentPage }) => {
                return `Campaign/GetAllCampaigns?campaignId=${campaignId}&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`;
            },
        }),

        //=======> Categories
        getAllCategoryWithSubCategory: builder.query({
            query: () => {
                return 'Category/GetCategoryWithSubCategory';
            },
        }),

        // marketplace and cid

        getCategoryIdBasedProducts: builder.query({
            // query: ({currentPage, itemsPerPage, categoryId, cname}) => {
            query: ({
                currentPage,
                itemsPerPage,
                categoryId,
                brandId,
                variants,
                cname,
            }) => {
                let queryString = `Product/GetProductByFilterOptions?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&categoryId=${categoryId}`;
                if (cname) {
                    queryString += `&cname=${cname}`;
                }
                if (variants && variants.length > 0) {
                    queryString += `&variants=${variants}`;
                }
                if (brandId && brandId.length > 0) {
                    queryString += `&brands=${brandId}`;
                }

                // console.log('Categories queryString checking: ', queryString);

                return queryString;
            },
        }),

        // getCategoryIdBasedProducts: builder.query({
        //   query: ({currentPage, itemsPerPage, categoryId, cname}) => {
        //     return `Product/GetProductByFilterOptions?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&categoryId=${categoryId}&cname=${cname}`;
        //   },
        // }),

        // Product/GetProductByFilterOptions?currentPage=1&itemsPerPage=20&categoryId=147&cname=footwear
        comGetProductByFilterOptions: builder.query({
            query: ({
                currentPage,
                itemsPerPage,
                categoryId,
                brandId,
                variants,
                cname,
                keywords,
                minPrice,
                maxPrice,
            }) => {
                let queryString = `Product/GetProductByFilterOptions?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&categoryId=${categoryId}`;
                if (cname) {
                    queryString += `&cname=${cname}`;
                }
                if (keywords && keywords.length > 0) {
                    queryString += `&keywords=${keywords}`;
                }
                if (variants && variants.length > 0) {
                    queryString += `&variants=${variants}`;
                }
                if (brandId) {
                    queryString += `&brands=${brandId}`;
                }

                if (minPrice) {
                    queryString += `&minPrice=${minPrice}`;
                }
                if (maxPrice) {
                    queryString += `&maxPrice=${maxPrice}`;
                }

                return queryString;
            },
        }),

        // Product/v1/ProductFilterOption?keywords=SaRa&currency=BDT&isApprove=Y
        comProductFilterOption: builder.query({
            query: ({ filterKeywords, currency, isApprove }) => {
                let queryString = `Product/v1/ProductFilterOption?keywords=${filterKeywords}&currency=${currency}&isApprove=${isApprove}`;

                console.log('ProductFilterOption query: ', queryString);

                return queryString;
            },
        }),

        // Store APIs
        getSellerStoreBanner: builder.query({
            query: ({ getAll }) => {
                return `Seller/GetSellerStoreBannerSetup?getAll=${getAll}`;
            },
        }),

        // /Product/GetNewArrivalProduct?itemsPerPage=6&shopId=62
        getStoreNewArrival: builder.query({
            query: ({ itemsPerPage, shopId }) => {
                return `Product/GetNewArrivalProduct?itemsPerPage=${itemsPerPage}&shopId=${shopId}`;
            },
        }),

        getStoreCategories: builder.query({
            query: ({ shopId, getAll }) => {
                return `Seller/GetSellerStoreCategories?shopId=${shopId}&getAll=${getAll}`;
            },
        }),

        // Store filtering Options by categoryId and shopId
        // Seller/GetSellerStoreProductByFilterOptions?categoryId=191&currentPage=1&itemsPerPage=6&shopId=62
        storeProductsFilteringByCategoryShopId: builder.query({
            query: ({ categoryId, currentPage, itemsPerPage, shopId }) => {
                return `Seller/GetSellerStoreProductByFilterOptions?categoryId=${categoryId}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&shopId=${shopId}`;
            },
        }),

        // filtering Options by categoryId
        getFilteringOptionsByCategoryId: builder.query({
            query: ({ categoryId, keywords }) => {
                let queryString = `Product/GetFilterOptions?`;
                if (categoryId && !keywords) {
                    queryString += `categoryId=${categoryId}`;
                }
                if (keywords && keywords.length > 0) {
                    queryString += `keywords=${keywords}`;
                }

                return queryString;
            },
        }),
        // v2/Customer/GetAddressByCusId
        getAddressByCusId: builder.query({
            query: ({ token }) => {
                return `v2/Customer/GetAddressByCusId`;
            },
        }),

        getProductCarts: builder.query({
            query: ({ cartType }) => {
                console.log('cartType OKAY===========>: ', cartType);
                return `Product/GetProductCarts?cartType=${cartType}`;
            },
        }),
    }),
});

export const {
    useGetAddressScreenThanaDataByIDQuery,
    useGetAddressScreenCityDataByIDQuery,
    useGetAddressScreenAllCountriesContentDataQuery,
    useGetSingleProductQuery,
    useGetDhueNewCollectionQuery,
    useGetDhueMenCollectionQuery,
    useGetSaRaSingleContentDataQuery,
    useGetNewCollectionQuery,
    useGetPopularCollectionQuery,
    useGetBudgetDealQuery,
    useGetAddsLinkDataQuery,
    useGetPopularTopCategoriesQuery,
    useGetMarketplaceBestDealQuery,
    useGetMarketplaceNewArrivalQuery,
    useGetMarketplaceBestProductQuery,
    useGetShopWithBrandsDataQuery,
    useGetMarketplaceRecommendedDataQuery,
    useGetBestDealAllCampaignsQuery,
    useGetBestDealSeeMoreDataQuery,
    useGetAllCategoryWithSubCategoryQuery,
    useGetCategoryIdBasedProductsQuery,
    useComGetProductByFilterOptionsQuery,
    useComProductFilterOptionQuery,
    useGetSellerStoreBannerQuery,
    useGetStoreNewArrivalQuery,
    useGetStoreCategoriesQuery,
    useStoreProductsFilteringByCategoryShopIdQuery,
    useGetFilteringOptionsByCategoryIdQuery,
    useGetAddressByCusIdQuery,
    useGetProductCartsQuery,
} = apiSlice;
