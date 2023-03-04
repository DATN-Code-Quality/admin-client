import { ResponseData } from "src/constant";

export function mockAuth() {
  return {
    async checkLogin(): Promise<ResponseData<any>> {
      return {
        code: "0",
        success: true,
        msg: "Đăng nhập thành công",
        data: {
          user_id: 162995127778837980,
          name: "Tien",
          avatar:
            "https://s240.avatar.talk.zdn.vn/b/6/8/f/6/240/44a5399483aa1c232bc7eb8d6f38663f.jpg",
          roles: '["admin"]',
        },
      };
    },
    async loginMicrosoft(): Promise<ResponseData<string>> {
      return {
        code: "0",
        success: true,
        msg: "Đăng nhập thành công",
        data: "http://localhost:3000/",
      };
    },
    async logout(): Promise<ResponseData<string>> {
      return {
        code: "0",
        success: true,
        msg: "Đăng nhập thành công",
        data: "",
      };
    },
  };
}
