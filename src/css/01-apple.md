### 移动端H5适配iphoneX底部白条，css快速解决方案

- env()和constant()介绍
- 注意点
- 用法

#### env和constant

env()和constant()，是IOS11新增特性，Webkit的css函数，用于设定安全区域与边界的距离 ，有4个预定义变量：

- safe-area-inset-left：安全区域距离左边边界的距离
- safe-area-inset-right：安全区域距离右边边界的距离
- safe-area-inset-top：安全区域距离顶部边界的距离（34px）
- safe-area-inset-bottom ：安全距离底部边界的距离 （44px)

#### 注意点

env()和constant()函数有个必要的使用前提，H5网页设置viewport-fit=cover的时候才生效，小程序里的viewport-fit默认是cover。

padding-bottom: constant(safe-area-inset-bottom);//兼容IOS<11.2

padding-bottom: env(safe-area-inset-bottom);//兼容 IOS>11.2

#### 用法

```html
<head>
    <style>
        @supports (env(safe-area-inset-bottom)){
          body,
          .footer-apple（底部元素）{
              padding-bottom: constant(safe-area-inset-bottom);
              padding-bottom: env(safe-area-inset-bottom);
          }
        }
	</style>
</head>
<body>
    <div class='footer-apple'>     
    </div>
</body>



```





