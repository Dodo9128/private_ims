import { IResultReturn } from "../../global/interface";

export const sendOk = (msg: string, data: any) => {
  const returnObject: IResultReturn = {
    result: "ok",
    message: msg,
    data: data,
  };
  return returnObject;
};

export const sendFail = (msg: string, data: any) => {
  const returnObject: IResultReturn = {
    result: "fail",
    message: msg,
    data: data,
  };
  return returnObject;
};

export const objectToStringForDebug = (result: object) => {
  return JSON.stringify(result);
};

/**
 * current Timezone timestamp maker
 *
 * @return "YYYY-MM-DD HH:mm:ss"
 */
export const currentTimeMaker = () => {
  const offset = new Date().getTimezoneOffset() * 60000;

  const currentTime = new Date(new Date().getTime() - offset).toISOString();

  return `${currentTime.substring(0, 10)} ${currentTime.substring(11, 19)}`;
};

/**
 * SQL Order / Limit 쿼리를 위한 4개의 params 만드는 함수
 *
 * pageSize = key: "pageSize", elem: pageNo, totalCount: totalCount
 *
 * sortColumn = key: "sortColumn", elem: sortColumn
 *
 * offset = key: "offset", elem: pageNo, totalCount: pageSize
 *
 * sortOption = key: "sortOption", elem: isDecending
 * @param {ICreateOrderParams} data key, elem1, elem2 의 인자를 가짐
 * @param {string} key 생성할 인자를 판단할 키
 * @param {string | number | boolean} elem1 인자 생성 시 필요한 값 1
 * @param {number | undefined} elem2 인자 생성 시 필요한 값 2
 */
// export const createOrderParams = (data: ICreateOrderParams) => {
export const createOrderParams = data => {
  const { key, elem1, elem2 } = data;
  switch (key) {
    case "pageSize":
      return elem2 ? Math.round(elem2 / elem1) : 9999;
    case "sortColumn":
      return elem1 ? elem1 : "name";
    case "offset":
      return elem2 ? elem2 * (elem1 - 1) : 0;
    case "sortOption":
      return elem1 ? "ASC" : "DESC";
  }
};
