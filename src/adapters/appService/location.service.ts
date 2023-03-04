import { Location } from "src/domain/location";

import { LocationType } from "src/constant";
import API from "src/constant/api";

import { formatResponse, getWithPath } from "../api.http";

export function useLocationService() {
  return {
    async getCity(): Promise<Location[]> {
      const data = await getWithPath(API.LOCATION.GET.LOCATION, {
        type: LocationType.CITY,
        parentCode: 0,
      });
      return formatResponse(data);
    },

    async getDistrictByCityCode(cityCode: number): Promise<Location[]> {
      const data = await getWithPath(API.LOCATION.GET.LOCATION, {
        type: LocationType.DISTRICT,
        parentCode: cityCode,
      });
      return formatResponse(data);
    },

    async getWardByDistrictCode(districtCode: number): Promise<Location[]> {
      const data = await getWithPath(API.LOCATION.GET.LOCATION, {
        type: LocationType.WARD,
        parentCode: districtCode,
      });
      return formatResponse(data);
    },
  };
}
