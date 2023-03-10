import {AjaxConstants} from "../../global/commonCode";

export class JsonResult {
  public static makeSuccessPaging(Data: Map<string, any>): Map<string, any> {
    let result = new Map<string, any>();
    let listCount: number = 1;
    listCount = (Data.get("list")).size;

    result
      .set(AjaxConstants.RESULT, AjaxConstants.RESULT_OK)
      .set(AjaxConstants.I_TOTAL_COUNT, Data.get("totalCount"))
      .set(AjaxConstants.DATA, (Data.get("list")).get('data'))
      .set(AjaxConstants.MESSAGE, AjaxConstants.DEFAULT_MESSAGE)
      .set(AjaxConstants.I_LIST_COUNT, listCount);

    return result;
  }

  public static makeSuccessArray(Data: object): Map<string, any> {
    let result = new Map<string, any>();
    result
      .set(AjaxConstants.RESULT, AjaxConstants.RESULT_OK)
      .set(AjaxConstants.DATA, Data)
      .set(AjaxConstants.MESSAGE, AjaxConstants.DEFAULT_MESSAGE)

    return result;
  }

  public static makeSuccessBool(Data: boolean): Map<string, any> {
    let result = new Map<string, any>();
    result
      .set(AjaxConstants.RESULT, AjaxConstants.RESULT_OK)
      .set(AjaxConstants.DATA, Data)
      .set(AjaxConstants.MESSAGE, AjaxConstants.DEFAULT_MESSAGE)

    return result;
  }
}