let shop=(function(){
let list=document.querySelectorAll('.wrap .list li'),
    phoneList=document.querySelector('.phone ul'),
    data=[];
let queryData=function queryData(){
    let xhr=new XMLHttpRequest();
    xhr.open('GET','./json/data.json',false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            data=JSON.parse(xhr.response);
        }
    }
    xhr.send();   
}
let render=function render(){
    let str=``;
    data.forEach(item=>{
        let {img,title,price,num,time}=item;
        str+=`<li>
        <img src="${img}" alt="">
        <h3>${title}</h3>
        <h4>¥${price}<span>多款可选</span></h4>
        <p><span>限时特价</span><span>一站式换新</span></p>
        <h6><span>${num}人评价</span>${time}好评<span></span></h6>
    </li>` ;
        
    })
    phoneList.innerHTML=str;
}

let handle=function handle(){
    Array.from(list).forEach(item=>{
        item.flag=-1;
        item.onclick=function(){
           // console.log(item);
           clear.call(this);
            this.flag*=-1;
            let pai=this.getAttribute('data-pai');
            data.sort((a,b)=>{
                return (a[pai]-b[pai])*this.flag;
            });
            render();
        }      
    });
}

let clear=function clear(){
    Array.from(list).forEach(item=>{
        if(this!==item){
            item.flag=-1;
        }
    });
}
    return {
        init(){
            queryData();
            render();
            handle();
        }
    }
})();
shop.init();