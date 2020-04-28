import CryptoJS from "crypto-js";
import JSEncrypt from 'jsencrypt';
/**
  * 
  * 第一个参数word是待加密或者解密的字符串；
  * 第二个参数keyStr是aes加密需要用到的16位字符串的key；
  * 第三个参数是初始化向量 iv。
  */
export default {
  // 加密
  encrypt(word, keyStr, ivStr) {
    keyStr = keyStr ? keyStr : "absoietlj32fai12";
    ivStr = ivStr ? ivStr : "absoietlj32fai12";
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);
    let srcs = CryptoJS.enc.Utf8.parse(word);

    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  },
  // 解密
  decrypt(word, keyStr, ivStr) {
    keyStr = keyStr ? keyStr : "absoietlj32fai12";
    ivStr = ivStr ? ivStr : "absoietlj32fai12";
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);
    var decrypt = CryptoJS.AES.decrypt(word, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
    // return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },
  getRsaCode(str){ // 注册方法
    let pubKey = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvvj1daEHvF9ZP8/LSZLsFDcjiFLabzy1YNaXFFMANtf8AeKrHkOHpsMthj/IYi6DPoi2Oyd7J8QK+TEeq5uWzfEkcvcCCPThfjfaW7kYWIlhZWi+ktmO17fN8yaJvCpaQ3XXMOA6NuwyLOBT5MXYrAUwCKSeK5V5FLX81hFvOpEbh/kFygQsK8FxmFfhOdMEKhhGmbo4hjWlqa8K/6SmunEukAaj84SCWItAaxNiVaEpX0E7zrLMG4/IoEM6fqTNKq15y14JPLo0lnEsPsqD29hCFIociWgMFdtRQLEuohCsiqNFTrTTf7vF7oW25ThMJIKAUgKlSgJwuxx2WyYlDwIDAQAB
    -----END PUBLIC KEY-----`;// ES6 模板字符串 引用 rsa 公钥
    let encryptStr = new JSEncrypt();
    encryptStr.setPublicKey(pubKey); // 设置 加密公钥
    // let  data = encryptStr.encrypt(str.toString());  // 进行加密
    let  data = encryptStr.encrypt(str)
    return data;
  },
  getRsaCodeJie(str){ // 注册方法
    let pubKey = `-----BEGIN PRIVATE KEY-----
    MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCOFp1XWxFbPSFrsvFyXNoL1DnYLg+ti32B1r+6HStQsHtq1Bj736Y8+ta3tasSmFmn99CKMDV+0qRqMfNJkGYpTcpbDlNl2TwlG/iZAO0LmZGlKvMgzIZ9DkfTj70zr+5v/dOoDLjJ4q3qje+Lql1U7cVfM+CHdgrTr0rH0CnaEJqRX1hikJsVgycrwqjpXFKldIY8cLPwiAh+CFTZeqr8IG1wbVagaWie3lXTz1H//bMnKMDCygvgRS8XOD7VwIs9WxL7pDU1m2glEpeOx26CuFMfCWGqctCT6FPgrti6BAse1NVvV7rnMxiG6Le1gm5vdVh1eGYzP7wn/wLWnNc1AgMBAAECggEANiAtPaqmOPBXe9RFn3/5W8ozYsNhG4XogH5SuM4Fww4HZZF4FvKCO/Z9tquQiFvaw15mZU2qAy6wjPeMKrjEAfXtILSbVk/jVmuKTpaItgOA9L8gsJzYmmjHObMmqrrZBHZXm0uFVPpxr8jzuGtkdEbDCdoULOXth+fdf7IvTy60su11xHRVxv6LvzgdMpklgaIpBDZPYy9F3cHOFWlrkxZLOh962T4lWVpIqDFlgJx49ttu2IKvd5NEmMtiaOZNUe3iZDWCLib2WxOFlOGDUhtVlZBLlPWYQdUg7qPYq+toDQNgizn7hwWVWQ6GwYG+5Cx9JytFuhK1CbCShNn1nQKBgQDAhnEQFqiBWdLnbnl2vVWDnRgx0fpiB9bpusOv1+mNONSOqrrP2/hACIO+aNvTD3BKaWwybbNlv3pfPDjvRJDkD+Htbm5oooFnc9O+Be6Mb/laxXByUc87Mq1yXUchblVmz6If5zpptVCkjapbk8beuMmrnHPvXP4iH/wZ5WdxawKBgQC87zDtuH0tDIpu/m7q4FsuNKHTvYolTsRoeIRrA/iyFkFltH5aQYuT9KA9LK+n+j41d0uY1/rZf+9TcE+pbvMma+uPvqhd9t//tSIW/Brt6SCIgbvzu4Ua+BvQCDDp3L1Q7Uj8cdOPYzJXRn2utbKoEYfSllbZSRSAe867zvbh3wKBgQCj7tY/GMwKuG15WvxaOwWhuBZt9Zn59yrsgnc2N+dKtOVpRb8kVu2fuKBVdfwYT8ER24qhtf9X2B9fEGx6cCvfxhZekfW5awY9DMdzuqFRO9dbj1scPMT0Z0aBZyO2N7jIfmxSNhXrBNTSCT7SE5b29uniEqo1Wz2Z2RpVAp1+WQKBgCbeotdVbFNXUCezqsghrkCcTWrNhN1WDixcFwoZQBILaBrvfks9TuT6n/jV97F8V04So/fm/1G981PcOFdoXxfZfhYNqH/kaYMnFcNazIODwdCzuCJVwvWgc8Bh3wZOBpjeqHRfSqImS1YPR44pDX9sU+AsU+PSGCiyz/5tfvdLAoGBAMBTCGVMmrErQsMP3mtM0wZwW0dIMwgjrTimsfqRU+SoZSkM21J2wt48M1YL5XYFqfZQsu1kZBkrj2A+XafSyrUPziJemYX0BMxF1UF3R+zOr2ri81HLxnyg0pqUbJXvXuNX39RXX+QwROScnTk8l2jcqH84AMs5eXeUI5BaH8dJ
    -----END PRIVATE KEY-----`;// ES6 模板字符串 引用 rsa 公钥
    let encryptStr = new JSEncrypt();
    encryptStr.setPrivateKey(pubKey); // 设置 加密公钥
    let  data = encryptStr.decrypt(str)
    return data;
  },
  randomWord(randomFlag, min, max){
        var str = "",
            pos = '',
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        // 随机产生
        if(randomFlag){
            range = Math.round(Math.random() * (max-min)) + min;
        }
        for(var i=0; i<range; i++){
            pos = Math.round(Math.random() * (arr.length-1));
            str += arr[pos];
        }
        return str;
    },
    isString(str){ 
        return (typeof str=='string')&&str.constructor==String; 
    } 
}