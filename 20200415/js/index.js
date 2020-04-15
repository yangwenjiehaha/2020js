let flow = (function () {
    let columns = Array.from(document.querySelectorAll('.column')),
        data = [];

    let queryData = function queryData() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', './json/data.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.response);
            }
        }
        xhr.send();
        //console.log(data);
    }

    let render = function render() {
        data.map(item => {
            let h=(item.height*230)/item.width;
            item.width=300;
            item.height=h;
            return item;
        });
        for (let i = 0; i < data.length; i += 3) {
            let group = data.slice(i, i + 3);
            group.sort((a, b) => {
                return a.height - b.height;
            })
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            })
            group.forEach((item, index) => {
                let {pic,height,title,link}=item;
                let card = document.createElement('card');
                card.className = 'card';
                card.innerHTML = ` <a href="${link}">
                <div class="lazyImage" style="height:${height}px;">
                    <img src="" alt="" data-image="${pic}">
                </div>
                <p>${title}</p>
            </a>`;
            columns[index].appendChild(card);
            })
        }


    }


    let lazy=function lazy(){
        let lazyImages=document.querySelectorAll('.lazyImage');
        [].forEach.call(lazyImages,lazyImage=>{
            let isLoad=lazyImage.getAttribute('isLoad');
            if(isLoad)return;
            let HTML=document.documentElement;
            let A=HTML.scrollTop+HTML.clientHeight;
            let B=utils.offset(lazyImage).top+lazyImage.offsetHeight;
            if(A>=B){
                let img=lazyImage.querySelector('img'),
                    dataImage=img.getAttribute('data-image'),
                    tempImage=new Image();
                    tempImage.src=dataImage;
                    tempImage.onload=()=>{
                        img.src=dataImage;
                        utils.css(img,'opacity',1);
                    }
                    img.removeAttribute('data-image');
                    tempImage=null;
                    lazyImage.setAttribute('isLoad','true');
            }
        })

    }
    let isRender;
    let moreData=function moreData(){
        let HTML=document.documentElement;
        if(HTML.scrollTop+HTML.clientHeight*1.5>=HTML.scrollHeight){
            if(isRender)return;
            isRender=true;
            queryData();
            render();
            lazy();
            isRender=false;
        }
    }

    return {
        init() {
            queryData();
            render();
            lazy();
            window.onscroll=()=>{
                lazy();
                moreData();
            }
        }
    }
})();
flow.init();