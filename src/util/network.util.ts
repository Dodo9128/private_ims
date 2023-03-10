import { Request } from "express";
export class NetworkUtil {
  static getRemoteIP(request: Request) {
    let ip: string = request.get("X-Forwarded-For");
    if (ip === null || ip.length === 0 || ip === 'unknown' || ip === '127.0.0.1' || ip === 'localhost') {
      ip = request.get("Proxy-Client-IP");
    };
    if (ip === null || ip.length === 0 || ip === 'unknown' || ip === '127.0.0.1' || ip === 'localhost') {
      ip = request.get("WL-Proxy-Client-IP");
    };
    if (ip === null || ip.length === 0 || ip === 'unknown' || ip === '127.0.0.1' || ip === 'localhost') {
      ip = request.get("HTTP_X_FORWARDED_FOR");
    };
    if (ip == null || ip.length == 0 || "unknown" === ip) {
      ip = request.get("X-Real-IP");
    }
    if (ip == null || ip.length == 0 || "unknown" === ip) {
      ip = request.get("X-RealIP");
    }
    if (ip == null || ip.length == 0 || "unknown" === ip) {
      ip = request.get("REMOTE_ADDR");
    }
    return ip
  }
}