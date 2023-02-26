const left = document.querySelector(".left") 
const right = document.querySelector(".right")
const slider = document.querySelector(".slider")
const images = document.querySelectorAll(".image") //Vì có nhiều obj nên sẽ dừng lệnh all để lấy hết các obj
const bottom = document.querySelector(".bottom")


let slideNumber = 1;
const length = images.length

for(let i = 0; i < length; i++){
    const div = document.createElement("div");
    div.className = "button";
    bottom.appendChild(div); //một nút con div đã được gắn vào sau của bottm 
};

const buttons = document.querySelectorAll(".button")
buttons[0].style.backgroundColor = " black"

const resetBg = () =>{
    buttons.forEach((button)=>{
        button.style.backgroundColor = "transparent"; 
    });
};

//Thao tác trên button
buttons.forEach((button,i) => {
    button.addEventListener("click",()=>{
        resetBg();
        slider.style.transform = `translateX(-${i * 800}px)`;
        slideNumber = i + 1; //index = 0
        button.style.backgroundColor = " black"; //di chuyển button 
    });
});

const nextSlide = () => {
    slider.style.transform = `translateX(-${slideNumber * 800}px)`; //Ký hiệu ${} viết tắc cho hàm document.getElementById().
    slideNumber++; //Khai báo Lệnh trong hàm`;
};

const prevSlide = () => {
    slider.style.transform = `translateX(-${(slideNumber - 2) * 800}px)`; 
    slideNumber--;
};

const getFirstSlide = () => {
    slider.style.transform = `translateX(0px)`;
    slideNumber = 1;
};

const getLastSlide = () => {
    slider.style.transform = `translateX(-${(length - 1)*800}px)`;
    slideNumber = length;
};

const changeColor = () => {
    resetBg();
    buttons[slideNumber-1].style.backgroundColor = "black";
};

right.addEventListener("click",() => {
    (slideNumber < length) ? nextSlide() :  getFirstSlide();
    changeColor();
});

left.addEventListener("click",() => {
    (slideNumber > 1) ? prevSlide() : getLastSlide();
    changeColor();
});

