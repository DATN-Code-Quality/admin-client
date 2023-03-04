import { JobPost } from "src/domain/jobPost";

import { ResponseData } from "src/constant";

export function mockJobPost() {
  return {
    async getAllJobPosts(): Promise<ResponseData<JobPost[]>> {
      return {
        success: true,
        code: null,
        msg: null,
        data: [
          {
            id: 84,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 85,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 86,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 87,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 88,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 89,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 90,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 91,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 92,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 93,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 94,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 95,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 96,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 97,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 98,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 99,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 100,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 101,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 102,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 103,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842552000,
            updated_at: 1675842552000,
            salary_info_type: 2,
          },
          {
            id: 14,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 1,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 15,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 16,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 17,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 18,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 19,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 20,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 21,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 22,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 23,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 24,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 25,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 26,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 27,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 28,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 29,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 30,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 31,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 32,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 33,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 34,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 35,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 36,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 37,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 38,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 39,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 40,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 41,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 42,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 43,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 44,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 45,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 46,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 47,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 48,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 49,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 50,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 51,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 52,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 53,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 54,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 55,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 56,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 57,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 58,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 59,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 60,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842551000,
            updated_at: 1675842551000,
            salary_info_type: 2,
          },
          {
            id: 3,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \r\n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 3,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842550000,
            updated_at: 1675842550000,
            salary_info_type: 2,
          },
          {
            id: 5,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 3,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842550000,
            updated_at: 1675842550000,
            salary_info_type: 2,
          },
          {
            id: 6,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842550000,
            updated_at: 1675842550000,
            salary_info_type: 2,
          },
          {
            id: 7,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \r\n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 1,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842550000,
            updated_at: 1675842550000,
            salary_info_type: 2,
          },
          {
            id: 8,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842550000,
            updated_at: 1675842550000,
            salary_info_type: 2,
          },
          {
            id: 10,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV làm việc cho Ninja Van ca 22:00 - 6:00 (nhận thù lao ngày thứ 5)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 1,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 1,
            job_address_district: 1,
            job_address_ward: 1,
            job_address_detail:
              "Số 1,Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842550000,
            updated_at: 1675842550000,
            salary_info_type: 2,
          },
          {
            id: 11,
            owner_id: 1,
            company_id: 1,
            title:
              "CTV phân loại hàng Ca (Kho Chính + Cố định) bảo đảm trả lương đúng hạn",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 768,
            job_address_ward: 27043,
            job_address_detail:
              "Số 1, Phường 04, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842550000,
            updated_at: 1675842550000,
            salary_info_type: 2,
          },
          {
            id: 12,
            owner_id: 1,
            company_id: 1,
            title: "CTV phân loại hàng Ca (Kho Chính + Cố định)",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 5,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 769,
            job_address_ward: 26863,
            job_address_detail:
              "Số 1, Phường Phước Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh",
            total_candidate: 0,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842550000,
            updated_at: 1675842550000,
            salary_info_type: 2,
          },
          {
            id: 13,
            owner_id: 1,
            company_id: 1,
            title: "CTV chăm sóc khách hàng",
            salary: 40000,
            salary_type: 2,
            salary_unit: 0,
            career_type_id: 3,
            job_description:
              "Giao hàng: Nhận hàng từ kho của công ty và chuyển đến tận tay khách hàng\r\nTrả hàng: Trả các đơn hàng từ kho của công ty về cho các đối tác (Shop)\r\nThời gian: từ 7h00 đến 18h00 (Xong sớm nghỉ sớm) \n\r\nĐược phân công tuyến đường cụ thể, được hỗ trợ hướng dẫn di chuyển.",
            job_requirement:
              "Ưu tiên tuyển nam\nTuổi 18-25 \nCó sức khoẻ tốt, làm được ca đêm",
            job_benefit:
              "Lương cơ bản: 6.000.000 đồng - 8.000.000 đồng\nĐược cấp cơm trong ca làm việc và phụ cấp gửi xe.\nThưởng Lễ, Tết, theo quy định của công ty.",
            job_address_city: 79,
            job_address_district: 778,
            job_address_ward: 27466,
            job_address_detail:
              "Số 1, Phường Tân Thuận Đông, Quận 7 ,Thành phố Hồ Chí Minh",
            total_candidate: 1,
            state: 1,
            deadline_at: 1675842550000,
            created_at: 1675842550000,
            updated_at: 1675842550000,
            salary_info_type: 2,
          },
        ],
        not_empty: true,
        empty: false,
      };
    },

    async getDetailJobPost(id: number): Promise<ResponseData<JobPost>> {
      return {
        success: true,
        code: null,
        msg: null,
        data: {
          id: 420,
          owner_id: 0,
          company_id: 1,
          title:
            "Ninja Van tuyển nhân viên giao hàng Quận 9 - Phú Nhuận - Bình Thạnh",
          salary: 15000000,
          salary_type: 0,
          salary_unit: 0,
          career_type_id: 1,
          job_description:
            "<ol><li>Lấy hàng</li><li>Giao hàng</li><li>Nộp COD</li><li>Một số công việc khác tại trạm</li></ol>",
          job_requirement:
            "<ul><li>Từ đủ 18 tuổi trở lên</li><li>Có xe máy và điện thoại Android 4.0 trở lên</li></ul>",
          job_benefit:
            "<ul><li>Nhân viên vui vẻ, nhiệt tình</li><li>Thu nhập hấp dẫn, lên đến 18tr</li><li>Tham gia công đoàn, team building, tiệc tất niên, BHXH,... các phong trào hoạt động khác của công ty</li></ul>",
          job_address_city: 79,
          job_address_district: null,
          job_address_ward: null,
          job_address_detail:
            "Quận 9: 215/3 Hoàng Hữu Nam, Phường Tân Phú, Quận 9, Phú Nhuận: Hẻm 21 Đào Duy Anh, Phường 9, Quận Phú Nhuận, Bình Thạnh: 268/9/20, 268/9/22 Đặng Thùy Trâm, Phường 13, Quận Bình Thạnh",
          total_candidate: null,
          state: 1,
          deadline_at: 0,
          created_at: 1676967859000,
          updated_at: 1676967945000,
          salary_info_type: 2,
        },
      };
    },
  };
}
