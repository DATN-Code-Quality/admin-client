import { CareerType } from "src/domain/careerType";

import { ResponseData } from "src/constant";

export function mockCareerType() {
  return {
    async getAllCareerTypes(): Promise<ResponseData<CareerType[]>> {
      return {
        success: true,
        code: null,
        msg: null,
        data: [
          {
            id: 1,
            name: "Giao vận",
            parent_id: 0,
            state: 1,
            created_at: 1675847019000,
            updated_at: 1677467490000,
          },
          {
            id: 2,
            name: "Bảo Vệ",
            parent_id: 0,
            state: 1,
            created_at: 1675847019000,
            updated_at: 1677467490000,
          },
          {
            id: 3,
            name: "Phục Vụ",
            parent_id: 0,
            state: 1,
            created_at: 1675847019000,
            updated_at: 1677467490000,
          },
          {
            id: 4,
            name: "Công Nhân",
            parent_id: 0,
            state: 1,
            created_at: 1675847019000,
            updated_at: 1677467490000,
          },
          {
            id: 5,
            name: "Kho bãi",
            parent_id: 0,
            state: 1,
            created_at: 1675847019000,
            updated_at: 1677467490000,
          },
          {
            id: 6,
            name: "Lập trình viên",
            parent_id: 0,
            state: 1,
            created_at: 1675847019000,
            updated_at: 1677467490000,
          },
          {
            id: 7,
            name: "Marketing",
            parent_id: 0,
            state: 1,
            created_at: 1675847019000,
            updated_at: 1677467490000,
          },
          {
            id: 8,
            name: "Sale",
            parent_id: 0,
            state: 1,
            created_at: 1675847019000,
            updated_at: 1677467490000,
          },
          {
            id: 9,
            name: "Nhân viên phục vụ",
            parent_id: 0,
            state: 1,
            created_at: 1676347525000,
            updated_at: 1677467490000,
          },
          {
            id: 10,
            name: "Phụ bếp",
            parent_id: 0,
            state: 1,
            created_at: 1676347565000,
            updated_at: 1677467490000,
          },
          {
            id: 11,
            name: "Nhân viên bán hàng",
            parent_id: 1,
            state: 1,
            created_at: 1676618541000,
            updated_at: 1677467490000,
          },
        ],
        not_empty: true,
        empty: false,
      };
    },
  };
}
