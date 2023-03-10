export class PageUtil {
  public static setPageDataMap(dataList: Map<string, any>, totalCount: number): Map<string, any> {
    let retMap = new Map<string, any>();

    retMap
      .set("totalCount", totalCount)
      .set("listCount", dataList.size)
      .set("list", dataList)

    return retMap;
  }
}