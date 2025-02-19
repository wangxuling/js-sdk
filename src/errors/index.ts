export enum QiniuErrorName {
  // 输入错误
  InvalidFile = 'InvalidFile',
  InvalidToken = 'InvalidToken',
  InvalidMetadata = 'InvalidMetadata',
  InvalidChunkSize = 'InvalidChunkSize',
  InvalidCustomVars = 'InvalidCustomVars',
  NotAvailableUploadHost = 'NotAvailableUploadHost',

  // 缓存相关
  ReadCacheFailed = 'ReadCacheFailed',
  InvalidCacheData = 'InvalidCacheData',
  WriteCacheFailed = 'WriteCacheFailed',
  RemoveCacheFailed = 'RemoveCacheFailed',

  // 图片压缩模块相关
  InvalidTransformOrientation = 'InvalidTransformOrientation',
  GetCanvasContextFailed = 'GetCanvasContextFailed',
  UnsupportedFileType = 'UnsupportedFileType',

  // 运行环境相关
  FileReaderReadFailed = 'FileReaderReadFailed',
  NotAvailableXMLHttpRequest = 'NotAvailableXMLHttpRequest',
  InvalidProgressEventTarget = 'InvalidProgressEventTarget',

  // 请求错误
  RequestError = 'RequestError'
}

export class QiniuError implements Error {
  public stack: string | undefined
  constructor(public name: QiniuErrorName, public message: string) {
    this.stack = new Error().stack
  }
}

export class QiniuRequestError extends QiniuError {

  /**
   * @description 标记当前的 error 类型是一个 QiniuRequestError
   * @deprecated 下一个大版本将会移除，不推荐使用，推荐直接使用 instanceof 进行判断
   */
  public isRequestError = true

  constructor(public code: number, public reqId: string, message: string) {
    super(QiniuErrorName.RequestError, message)
  }
}

/**
 * @description 由于跨域、证书错误、断网、host 解析失败、系统拦截等原因导致的错误
 */
export class QiniuNetworkError extends QiniuRequestError {
  constructor(reqId = '', message: string) {
    super(0, reqId, message)
  }
}
