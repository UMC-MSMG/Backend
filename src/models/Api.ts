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

import { PointsDetailData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name PointsDetail
   * @request GET:/api/points/{userId}
   * @response `200` `PointsDetailData` OK
   */
  pointsDetail = (userId: string, params: RequestParams = {}) =>
    this.request<PointsDetailData, any>({
      path: `/api/points/${userId}`,
      method: "GET",
      ...params,
    });
}
