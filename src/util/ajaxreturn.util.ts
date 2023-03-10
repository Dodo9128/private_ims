import { AjaxConstants } from "../global/commonCode"

export function lmakeSuccess({msg, ...data}:{msg?:string, data?:any[]}) {


}
//
export function makeSuccess({message, data, dataArray}:{message?:string, data?:any, dataArray?:Array<any>}) {

  if(dataArray) {

    let arr = new Array<any>();
    dataArray.forEach(function (value) {
      console.log(value);
      arr.push(value);
    });

    let result = makeSuccesslocal(arr);

    console.log(result);

    return result;
  } else {

    let result = new Map<string, any>();
    result.set(AjaxConstants.RESULT, AjaxConstants.RESULT_OK);
    if(data) {
      result.set(AjaxConstants.DATA, data);
    } else {
      result.set(AjaxConstants.DATA, AjaxConstants.DEFAULT_DATA);
    }
    if(message) {
      result.set(AjaxConstants.MESSAGE, message);
    } else {
      result.set(AjaxConstants.MESSAGE, AjaxConstants.DEFAULT_MESSAGE);
    }

    console.log(result.get(AjaxConstants.RESULT));
    console.log(result.get(AjaxConstants.DATA));
    console.log(result.get(AjaxConstants.MESSAGE));

    return result;
  }
}

// Object makeSuccess에서 call하는 함수
// public static Map< String, Object> makeSuccess( Object... data ){
//     List<Object> result = new ArrayList<Object>();
//     for (Object object : data) {
//         result.add(object);
//     }
//     return makeSuccess( result); -> makeSuccesslocal
// }

function makeSuccesslocal(data: any) {
  let result = new Map<string, any>();
  result.set(AjaxConstants.RESULT, AjaxConstants.RESULT_OK);
  result.set(AjaxConstants.DATA, data);
  result.set(AjaxConstants.MESSAGE, AjaxConstants.DEFAULT_MESSAGE);

  return result;
}

export function makeSuccessVo(data: any) {

  let result = new Map<string, any>();
  result.set(AjaxConstants.RESULT, AjaxConstants.RESULT_OK);
  console.log(data)
  console.log("is type="+(Array.isArray(data)));
  if(Array.isArray(data)) {
    let sbData = JSON.stringify(data);
    console.log("array TRUE lenth="+data.length);
    result.set(AjaxConstants.DATA, sbData);

  } else {
    console.log("array FALSE lenth="+data.length);
    console.log(JSON.stringify(data));
    result.set(AjaxConstants.DATA, JSON.stringify(data));
  }

  result.set(AjaxConstants.MESSAGE, AjaxConstants.DEFAULT_MESSAGE);
  console.log(result);

  return result;
}

export function makeSuccessPaging(retMap: any) {

  return makeSuccessPagingLocal(retMap.get("list"), retMap.get("totalCount"))
}

function makeSuccessPagingLocal(data: any, totalCount: any) {
  let result = new Map<string, any>();
  result.set(AjaxConstants.RESULT, AjaxConstants.RESULT_OK);
  result.set(AjaxConstants.I_TOTAL_COUNT, totalCount);
  let listCount: number = 0;
  if(data instanceof Map) {
    listCount = 1;
  } else if(Array.isArray(data)) {
    listCount = data.length;
  }
  result.set(AjaxConstants.DATA, data);
  result.set(AjaxConstants.I_LIST_COUNT, listCount);
  result.set(AjaxConstants.MESSAGE, AjaxConstants.DEFAULT_MESSAGE);

  return result;

}

// Fail case
export function makeFail() {
  let result = new Map<string, any>();
  result.set(AjaxConstants.RESULT, AjaxConstants.RESULT_FAIL);
  result.set(AjaxConstants.DATA, AjaxConstants.DEFAULT_DATA);
  result.set(AjaxConstants.MESSAGE, AjaxConstants.DEFAULT_MESSAGE);
  console.error(result.toString());
  return result;
}

export function makeFailObj(data: any) {
  let result = new Map<string, any>();
  result.set(AjaxConstants.RESULT, AjaxConstants.RESULT_FAIL);
  result.set(AjaxConstants.DATA, data);
  result.set(AjaxConstants.MESSAGE, AjaxConstants.DEFAULT_MESSAGE);
  console.error(result.toString());
  return result;
}

export function makeFailMsgObj(message: string, data: any) {
  let result = new Map<string, any>();
  result.set(AjaxConstants.RESULT, AjaxConstants.RESULT_FAIL);
  result.set(AjaxConstants.DATA, data);
  result.set(AjaxConstants.MESSAGE, message);
  console.error(result.toString());
  return result;
}

export function makeFailMsg(message: string) {
  let result = new Map<string, any>();
  result.set(AjaxConstants.RESULT, AjaxConstants.RESULT_FAIL);
  result.set(AjaxConstants.DATA, AjaxConstants.DEFAULT_DATA);
  result.set(AjaxConstants.MESSAGE, message);
  return result;
}

export function makeFailExraMsg(message: string, extreaMessage: string, extreaMessageValue: string) {
  let result = new Map<string, any>();
  result.set(AjaxConstants.RESULT, AjaxConstants.RESULT_FAIL);
  result.set(AjaxConstants.DATA, AjaxConstants.DEFAULT_DATA);
  result.set(AjaxConstants.MESSAGE, message+"["+extreaMessage+": "+extreaMessageValue+"]");
  return result;
}

export function makeExceptionResult(message: string) {
  return makeFailMsg(message);
}

