/**
 * Created by TianXX on 2017/4/26.
 */



const address = "http://www.yijitongoa.com:9090";

const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "apiVer": "1",
    "clientVersion": "android_10641",
    "Host": "www.yijitongoa.com:9090",
    "User-Agent": "yjt-oa",
    "Connection": "Keep-Alive",
    "Accept-Encoding": "gzip, deflate",
};

export let spawn = (phone, password, iccid, geo, _console) => {
    const context = {
        headers: headers,
        console: _console,
        phone: phone,
        password: password,
        iccid: iccid,
        geo: geo,
    };
    _console('开始签到');
    return new Promise(function (resolve, reject) {
        resolve(context);
    });
}

export let clientLogin = (context) => {
    context.console('登录...');
    const url = address + "/yjtoa/s/clientlogin";
    const fileds = {
        "iccid": context.iccid,
        "password": context.password,
        "loginName": context.phone,
    };
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(fileds),
    }).then(function (response) {
        return response.json()
    }).then((json) => {
        let payload = json.payload[0];
        context['custName'] = payload.custName;
        context['custUniqueId'] = payload.custUniqueId;
        context['contentId'] = payload.contentId;
        context['custVCode'] = payload.custVCode;
        context['userId'] = payload.userId;
        return context
    })
};

export let realLogin = context => {
    context.console('真的登录...');
    const url = address + "/yjtoa/s/reallogin";
    const fileds = {
        contentId: context['contentId'],
        custUniqueId: context['custUniqueId'],
        custVCode: context['custVCode'],
        iccid: context['iccid'],
        password: context['password'],
        phone: context['loginName'],
        userId: context['userId'],
    };
    return fetch(url, {
        method: 'POST',
        headers: context.headers,
        body: JSON.stringify(fileds),
    }).then(function (response) {
        return response.headers;
    }).then((newHeaders) => {
        let cookies = newHeaders.get('Set-Cookie');
        context.headers['Cookie'] = cookies;
        return context;
    })
};

export let attendance = context => {
    context.console('签到...');
    const positionData = "39.962536,116.229567";
    const positionDescription = "中国北京市海淀区杏石口路99号";
    const url = address + '/yjtoa/s/signins/attendances';
    const fileds = {
        descColor: 0,
        id: 0,
        iccid: context['iccid'],
        userId: context['userId'],
        positionData: positionData,
        positionDescription: positionDescription,
        resultColor: 0,
        signResult: 0,
        type: "VISIT",
    };
    return fetch(url, {
        method: 'POST',
        headers: context.headers,
        body: JSON.stringify(fileds),
    }).then(function (response) {
        return response.json();
    }).then((json) => {
        let rslt = json.payload.signResultDesc;
        context.console(rslt);
    })
};


