1、
function fn(x,y){
            return function sum(n){
                return x+y+n;
            }
        }
        let res = fn(1,2)(3);
        console.log(res);

2、
- 7
- 10
- 16 15
3、图
4、图
5、图
6、图
7、图
8、
Number.prototype.plus=function plus(value){
            return this+value;
        }
Number.prototype.minus=function minus(val){
            return this-val;
        }
        let n = 10;
        let m = n.plus(10).minus(5);
        console.log(m); //=>15（10+10-5）

9、
Array.prototype.unique=function unique(){
            let obj=[];
            for(let i=0;i<this.length;i++){
                let item=this[i];
                if(typeof obj[item]!=='undefined'){
                    this[i]=this[this.length-1];
                    this.length--;
                    i--;
                    continue;
                }
                obj[item]=item;
            }
            return this;
        }
        let ary = [12,23,12,13,13,12,23,14,8];
        ary.unique().sort((a,b)=>a-b);
        console.log(ary);


10、
Object.prototype.getParam = function getParam(key) {
            let obj = {};
            let ask = this.indexOf('?');
            askText = this.substring(ask + 1);
            let sp = askText.split('&');
            sp.forEach(item => {
                item = item.split('=');
                obj[item[0]] = item[1];
            });
            console.log(obj);
            return obj[key];
            return this;
        }
        let url = "locallhost?key1=val1&key2=val2&key3=val3";
        console.log(url.getParam("key3"));




附加题：
1、
2、
let a = {
            i: 1,
            valueOf() { //或者valueOf 
                return a.i++ //先返回后加 
            }
        }
        if (a == 1 && a == 2 && a == 3) {
            console.log('1');
        }
3、
    2: 3,
    3: 4,
    length: 4,
    push: Array.prototype.push
