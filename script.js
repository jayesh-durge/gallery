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
    nextPercentage= Math.max(-82, Math.min(nextPercentage, 0));
    tack.dataset.percentage=nextPercentage;
    tack.animate({
        transform:`translate(${nextPercentage-10}%,-50%)`
    },
    {duration:1200,fill:"forwards"});
    for(const image of document.querySelectorAll(".container .memories img")){

        image.animate({objectPosition:`${nextPercentage+100}% -50%`},{duration:1200,fill:"forwards"});

        if(image.getBoundingClientRect().left<=innerWidth /2 && image.getBoundingClientRect().right>=innerWidth /2){
                document.querySelector("body #yearcounter").innerText=`${image.getAttribute('alt')}`;
        }
    }
}
onmouseup = (e) =>{
    tack.dataset.mouseDownAt="0";
    tack.dataset.perviousPercentage=tack.dataset.percentage;
}