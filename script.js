// desktop

const tack=document.querySelector(".imagestrip");
onmousedown = (e) =>{
    tack.dataset.mouseDownAt=e.clientX;
}
onmousemove= (e) =>{
    if(tack.dataset.mouseDownAt==='0'){
        return;
    }
    const mouseDelta = parseFloat(tack.dataset.mouseDownAt)-e.clientX , maxDelta = (innerWidth)/2;
    const percent=-(mouseDelta/maxDelta)*100;
    let nextPercentage=parseFloat(tack.dataset.perviousPercentage)+percent;
    nextPercentage= Math.max(-91, Math.min(nextPercentage, 0));
    tack.dataset.percentage=nextPercentage;
    tack.animate({
        transform:`translate(${nextPercentage-4.5}%,-50%)`
    },
    {duration:1200,fill:"forwards"});
    for(const image of document.querySelectorAll(".container .memories img")){

        image.animate({objectPosition:`${nextPercentage+80}% -50%`},{duration:1200,fill:"forwards"});

        if(image.getBoundingClientRect().left<=innerWidth /2 && image.getBoundingClientRect().right>=innerWidth /2){
            image.animate({transform:"scale(1.2)",margin:"5vmin"}
                ,{duration:500,fill:"forwards"});
                document.querySelector("body #yearcounter").innerText=`${image.getAttribute('alt')}`;
        }
        else{
        image.animate({transform:`scale(1)`,margin:"0vmin"},{duration:500,fill:"forwards"});
        }
    }
}
onmouseup = (e) =>{
    tack.dataset.mouseDownAt="0";
    tack.dataset.perviousPercentage=tack.dataset.percentage;
}

// mobile view 

let idx=0;
let startx=0;
let endx=0;
function showidximage(index,images){
    if(index<0){
        index= images.length+index;
    }
    images.forEach((image,i) => {
        if(i==index){
            image.classList.add("active");
        }
        else{
            image.classList.remove("active");
        }
    });
}
function direction(st,ed,idx,images){
    if(st>ed){
        idx=(idx-1)% images.length;
        showidximage(idx,images);
    }
    else if(st<ed) {
        idx=(idx+1)% images.length;
        showidximage(idx,images);
    }
    return idx;
}

for( val of document.querySelectorAll(".add") ) {

    let button1=val.querySelector(".one");
    let button2=val.querySelector(".two");
    let images=val.querySelectorAll(".imagestrip .memories img");
    images.forEach(image=>{
        image.addEventListener("touchstart", (e)=>{
            startx=e.clientX;
        });
    
        image.addEventListener("touchend", (e)=>{
            endx=e.clientX;
            idx=direction(startx,endx,idx,images);
            endx=0;
            startx=0;
        });    
    })
    button1.addEventListener("click", ()=>{
        idx=(idx-1)% images.length;
        showidximage(idx,images);
    });
    
    button2.addEventListener("click",()=>{
        idx=(idx+1)% images.length;
        showidximage(idx,images);
    });
}