# 模块文档

seajs 模块包，快速开始开发调用

## uploader/image

图片上传模块,基于webuploader
 
### 方法

#### uploader.create(url,element,data)
  
  默认预览图是 200 * 200，质量100%
  
  - 参数  
    - `(string) url` 上传接口服务器地址
    - `(string) element` 上传id
    - `(object) data` 上传附带参数
    
 - 示例代码
 
```js
//上传身份证

todo
```
 
## message

消息提示模块,基于layer

### 方法

#### message.success(msg)

成功提示消息

 - 参数
    - `(string) msg`  提示信息文本
    
#### message.error(msg)

错误提示消息

 - 参数
    - `(string) msg`  提示信息文本
    
#### message.toast(msg)

提示消息 toast 形式

 - 参数
    - `(string) msg`  提示信息文本
    

## validator

表单验证模块

* 应用场景
    * 表单提交

### 方法

#### validator(options)

初始化表单认证

- 参数
  - `(object) options` 参数配置
    - `(object) fields` 字段
    - `(function) valid` 提交表单回调
    
- 示例代码
 
```js
todo
```

## popup

弹窗模块（popupWindow更容易理解），同样基于layer，弹出自定义内容的窗口

主要使用layer.open方法，content 动态传入

layer过于全面，popup和message拆分，可以让模块更简洁专注

## table

表格模块

* 应用场景
    * xmlHttpRequrest读取数据生成表格
    * 已有表格html渲染

#### 为什么选择

 * 先尝试datatable的感觉配置复杂不灵活太臃肿不够简洁，不适合用
 * bootstraptable 简洁文件小，易配置，更合适



  