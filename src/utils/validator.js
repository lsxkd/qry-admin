import {
    validateURL,
    validateNumber,
    validateUserName,
    validatePhone,
    validateEmail,
    validateChNumEn,
    validateNumEn,
} from '@/utils/validate'


/* 验证是否是合法的  url*/
export const validatorJumpUrl = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入跳转URL'))
    } else if (!validateURL(value)) {
        callback(new Error('请输入正确的URL地址'))
    } else {
        callback()
    }
}
/* 验证是否是合法的  排序*/
export const validatorOrderNum = (rule, value, callback) => {
    if (!value && value != 0) {
        callback(new Error('请输入排序'))
    } else if (!validateNumber(value)) {
        callback(new Error('排序只能为大于等于0的数字'))
    } else {
        callback()
    }
}
/* 验证是否是合法的 用户名*/
export const validatorUserName = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入用户名'))
    } else if (!validateUserName(value)) {
        callback(new Error('用户名只能为2到16位（字母，数字，下划线，减号）'))
    } else {
        callback()
    }
}
/* 验证是否是合法的  密码*/
export const validatorPassword = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入密码'))
    } else if (value.length < 6) {
        callback(new Error('密码长度至少为6位'))
    } else {
        callback()
    }
}

/* 验证是否是合法的  编辑密码  可以为空*/
export const validatorPasswordEdit = (rule, value, callback) => {
    if (!value) {
        callback()
    } else if (value.length < 6) {
        callback(new Error('密码长度至少为6位'))
    } else {
        callback()
    }
}

/* 验证是否是合法的  分类名称*/
export const validatorClassifiedName = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入分类名称'))
    } else {
        callback()
    }
}

/* 验证是否是合法的  手机号码 */
export const validatorPhone = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入手机号码'))
    } else if (!validatePhone(value)) {
        callback(new Error('请输入正确的手机号'))
    } else {
        callback()
    }
}

/* 验证是否是合法的  邮箱 */
export const validatorEmail = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入邮箱'))
    } else if (!validateEmail(value)) {
        callback(new Error('请输入正确的邮箱'))
    } else {
        callback()
    }
}

/* 验证是否是合法的  名称 */
export const validatorColumnName = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入名称'))
    } else if (!validateChNumEn(value)) {
        callback(new Error('名称只能包含数字、字母、中文及下划线'))
    } else {
        callback()
    }
}

/* 验证是否是合法的  编码 */
export const validatorEncoded = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入正确的编码'))
    } else if (!validateNumEn(value)) {
        callback(new Error('名称只能包含数字及字母'))
    } else {
        callback()
    }
}