/*
 *@description: js中??、?.的使用方法
 *@author: codeWen666
 *@date: 2021-11-07 22:03:20
 *@version: V1.0.5
*/

/*
?.的使用方法

  下面代码使用了?.运算符，直接在链式调用的时候判断，左侧的对象是否为null或undefined。如果是的，就不再往下运算，而是返回undefined。

*/
//判断四层才能安全取值
const firstName = (message && message.body && message.body.user && message.body.user.firstName) || 'default';

//使用?.后的写法
const firstName = message?.body?.user?.firstName || 'default';

//使用三目运算符的写法
const fooInput = myForm.querySelector('input[name=foo]')
const fooValue = fooInput ? fooInput.value : undefined

//使用?.简化后的写法
const fooValue = myForm.querySelector('input[name=foo]')?.value

/*
??的使用方法
  使用 || 带来的问题
  开发者的原意是，只要属性的值为null或undefined，默认值就会生效，但是属性的值如果为空字符串或false或0，默认值也会生效。

  ?? 它的行为类似||，但是只有运算符左侧的值为null或undefined时，才会返回右侧的值。

*/
//以前的使用场景
const headerText = response.text || 'Hello, world!'
const animationDuration = response.number || 300
const showSplashScreen = response.isHave || true
//??后的简化
const headerText = response.settings.headerText ?? 'Hello, world!';
const animationDuration = response.settings.animationDuration ?? 300;
const showSplashScreen = response.settings.showSplashScreen ?? true;
 
/*
?. ?? 组合后的使用场景

  下面代码中，如果response.settings是null或undefined，或者response.settings.animationDuration是null或undefined，就会返回默认值300。也就是说，这一行代码包括了两级属性的判断。
  
*/
const animationDuration = response.settings?.animationDuration ?? 300;
