const canvas = document.querySelector("canvas");
const fillColor = document.querySelector("#fill-color");
const sizeSlider = document.querySelector("#size-slider");
const colorBtns = document.querySelectorAll(".colors .option");
const colorPicker = document.querySelector("#color-picker");
const clearCanvas = document.querySelector(".clear-canvas");
const saveImg = document.querySelector(".save-img");
toolBtns = document.querySelectorAll(".tool");
ctx = canvas.getContext("2d");


let prevMouseX, prevMouseY, snapshot,
isDrawing = false,
brushWidth = 5,
selectedColor = "#000",
selectedTool= "brush";

const setCanvasBackground = () =>{
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
}

window.addEventListener("load",()=>{
    //cài đặt canvas width/heigh 
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
})

const drawRect = (e) => {
    if(!fillColor.checked){
        return ctx.strokeRect(e.offsetX, e.offsetY, (prevMouseX - e.offsetX), (prevMouseY - e.offsetY)); 
    }
    ctx.fillRect(e.offsetX, e.offsetY, (prevMouseX - e.offsetX), (prevMouseY - e.offsetY));
    //là phương pháp vẽ hình chữ nhật (không có nền)
    //strokeRect(tọa độ của x [x-coordinate], tọa độ y [...], width, heigh)
}

const drawCircle = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX),2) + Math.pow((prevMouseY - e.offsetY),2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0 , 2*Math.PI); //arc(tọa độ x, tọa độ y, bán kính, start, end)
    //tạo ra hình tròn theo đường chuột
    fillColor.checked ? ctx.fill() : ctx.stroke();
    //nếu đã tíc vào fill thì tràn nền không thì rỗng nền
}

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY); //vẽ hình ngay vị trí chuột
    ctx.lineTo(e.offsetX,e.offsetY);    //tạo 1 đường thẳng theo chuột chạy
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);  //tạo 1 đường ở phần dưới tam giác
    ctx.closePath(); //đóng đường thẳng nên đường t3 sẽ tự động được tạo
    fillColor.checked ? ctx.fill() : ctx.stroke();
    //nếu đã nhấp vào filled thì vẽ tràn nền không thì rỗng nền
}

const startDraw = (e) =>{
    isDrawing = true;
    prevMouseX = e.offsetX; //lia chuột dến vị trí mouseX set cho giá trị của preMouseX
    prevMouseY = e.offsetY; //tương tự với Y
    ctx.beginPath(); // tạo ra 1 đường vẽ mới
    ctx.lineWidth = brushWidth; //set thuộc tính size lineW = brushWidth
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0,0,canvas.width,canvas.height);
}

const drawing = (e) => {
    if(!isDrawing) return; //nếu giá trị là false thì trả về 
    ctx.putImageData(snapshot, 0, 0); //chèn vào data của canvas

    if(selectedTool === "brush" || selectedTool === "eraser"){
        //để xóa thì chuyển màu qua trắng
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); //phương pháp tạo ra 1 đường (từ x đến y)
        ctx.stroke(); //vẽ với màu 
    }else if(selectedTool === "rectangle"){
        drawRect(e);
    }else if(selectedTool === "circle"){
        drawCircle(e);
    }else {
        drawTriangle(e);
    }
    
}

toolBtns.forEach(btn => {
    btn.addEventListener("click", ()=>{
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        //ClassList lấy các thuộc tính ở trong class gắn vô mảng
        selectedTool = btn.id;        
        console.log(selectedTool);
    })
})

sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value);

colorBtns.forEach(btn => {
    btn.addEventListener("click",() => {
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected"); //di chuyển các btn color
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    })
})

colorPicker.addEventListener("change", () => {
    //chuyển giá trị của colorPicker đến nút btn picker
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
})

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    setCanvasBackground();
})

saveImg.addEventListener("click", () => {
    const link = document.createElement("a"); //tạo biến <a>
    link.download = `${Date.now()}.jpg` //đặt ngày hiện tại
    link.href = canvas.toDataURL();
    link.click();
})

canvas.addEventListener("mousedown",startDraw)
canvas.addEventListener("mousemove",drawing)
canvas.addEventListener("mouseup",() => isDrawing = false)