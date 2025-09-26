interface BaseResponse {
  message: string;
}

interface RESSUCCESS<T> extends BaseResponse {
  success: true;
  data: T;
}

interface RESFAIL extends BaseResponse {
  success: false;
  error?: {
    code: string | number;
  };
}

export type APIRESPONSE<T> = RESSUCCESS<T> | RESFAIL;
