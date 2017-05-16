/**
 * Created by TianXX on 2017/5/8.
 */

export default class GEO {
    static data = {
        xishan: ["西山赢府", 39.962536, 116.229567, "中国北京市海淀区杏石口路99号"],
        jinrongjie: ["金融街", 39.917384, 116.364749, "中国北京市西城区金融大街31号"],
        dongsi: ["东四", 39.932435, 116.439415, "中国北京市东城区朝阳门北大街21号"],
    }

    static _float(longitude, latitude) {
        longitude = longitude + GEO._getRandomInt(10, 20) * 0.000001;
        latitude = latitude + GEO._getRandomInt(10, 20) * 0.000001;

        return `${longitude.toFixed(6)},${latitude.toFixed(6)}`
    }

    static _getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static getGeo(key) {
        const [, longitude, latitude, addr] = GEO.data[key];
        return [GEO._float(longitude, latitude), addr]
    }
}