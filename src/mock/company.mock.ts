import { Company } from "src/domain/company";

import { ResponseData } from "src/constant";

export function mockCompany() {
  return {
    async getAllCompanies(): Promise<ResponseData<Company[]>> {
      return {
        success: true,
        code: "0",
        msg: "Success",
        data: [
          {
            id: 1,
            owner_id: 1,
            name: "Công Ty TNHH Nin Sing Logistics (Ninja Van)",
            logo_url:
              "https://f45-zpg-r.zdn.vn/8318972485478075529/92a272dfa3c7799920d6.jpg",
            state: 1,
            created_at: 1676967589000,
            updated_at: 1676967589000,
          },
          {
            id: 2,
            owner_id: 1,
            name: "GHTK",
            logo_url:
              "https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHTK-Green.png",
            state: 1,
            created_at: 1676256044000,
            updated_at: 1676256044000,
          },
          {
            id: 3,
            owner_id: 1,
            name: "VNG",
            logo_url:
              "https://e7.pngegg.com/pngimages/233/813/png-clipart-vng-corporation-zalo-logo-company-video-games-ho-chi-minh-city-game-angle.png",
            state: 1,
            created_at: 1675846859000,
            updated_at: 1675846859000,
          },
          {
            id: 4,
            owner_id: 1,
            name: "Zalo",
            logo_url: "https://stc-zalo-careers.zdn.vn/static/images/logo.png",
            state: 1,
            created_at: 1675846859000,
            updated_at: 1675846859000,
          },
          {
            id: 5,
            owner_id: 1,
            name: "FamilyMart",
            logo_url:
              "https://stc-fin.zdn.vn/fin/stg/hr/image/IMAGE_URL_de1868ef096b53333c6fbd9bca612c21.jpg",
            state: 1,
            created_at: 1676618499000,
            updated_at: 1676618499000,
          },
          {
            id: 6,
            owner_id: 1,
            name: "GOLDSUN FOOD",
            logo_url:
              "https://stc-fin.zdn.vn/fin/stg/hr/image/IMAGE_URL_85a14e3799e4f98e71aa1da35cc074e1.jpg",
            state: 1,
            created_at: 1676347448000,
            updated_at: 1676347448000,
          },
        ],
        not_empty: true,
        empty: false,
      };
    },
  };
}
