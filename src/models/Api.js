/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
import { HttpClient } from "./http-client";
export class Api extends HttpClient {
    /**
     * No description
     *
     * @name PointsDetail
     * @request GET:/api/points/{userId}
     * @response `200` `PointsDetailData` OK
     */
    pointsDetail = (userId, params = {}) => this.request({
        path: `/api/points/${userId}`,
        method: "GET",
        ...params,
    });
}
