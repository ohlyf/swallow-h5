import storage from "good-storage";

export class ImgLoader {
  static imglist: Record<string, any> = {};

  // 存储所有图片到本地缓存
  static storageAllImg() {
    this.imglist = storage.get("imglist") || {};
    if (!ImgLoader.imglist || !ImgLoader.isNotEmptyImgList()) {
      ImgLoader.imglist = ImgLoader.loadAllImg();
      storage.set("imglist", ImgLoader.imglist);
    }
  }

  static isNotEmptyImgList() {
    return Object.getOwnPropertyNames(ImgLoader.imglist).length;
  }

  // 根据图片名获取图片。
  static getImg(imgName: string): string {
    ImgLoader.imglist = ImgLoader.isNotEmptyImgList()
      ? ImgLoader.imglist
      : storage.get("imglist");
    return ImgLoader.imglist[imgName];
  }

  // 加载所有图片到内存。
  static loadAllImg(): any {
    const imgList: any = {};
    const viewImgModules = import.meta.globEager(`../assets/img/**/**/*.png`);

    for (const path in viewImgModules) {
      // @ts-ignore
      const imgFullPath = viewImgModules[path].default;
      if (imgFullPath) {
        const imgName = path.substring(path.lastIndexOf("/") + 1);
        imgList[imgName] = imgFullPath;
      }
    }
    return imgList;
  }
}

export default ImgLoader.getImg;
