const fs = require('fs');
let thunkFile = Thunk(fs.readFile)

thunkFile('../assets/test.txt')((err,data)=>{
    console.log('读取异步数据->>');
    console.log(data.toString('utf-8'))
})

function Thunk (fn){
    return function(){
        let args = Array.from(arguments);
        return function (callback){
            args.push(callback);
            fn.apply(this,args)
        }
    }
}