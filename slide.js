const target = document.getElementById("target");
const boxes = target.querySelectorAll(".slider-item");

// <div class="col-12 d-flex flex-nowrap overflow-hiddens"> -- sliderShow
//     <div class="main full-width"> -- main
//     </div>
//     <div class="extra full-width"> -- extra
//     </div>
// </div>

let sliderShow = document.createElement("div");
let main = document.createElement("div");
let extra = document.createElement("div");

sliderShow.classList.add("col-12", "d-flex", "flex-nowrap", "overflow-hiddens");
main.classList.add("main", "full-width");
extra.classList.add("extra", "full-width");

main.append(boxes.item(0));

sliderShow.append(main);
sliderShow.append(extra);

target.append(sliderShow);

// <div class="offset-5 mt-2">
//      <button class="btn btn-light"> < </button>
//      <button class="btn btn-light"> > </button>
// </div>

let btnDiv = document.createElement("div");
let leftBtn = document.createElement("button");
let rightBtn = document.createElement("button");

btnDiv.classList.add("offset-5", "mt-2");
leftBtn.classList.add("btn", "btn-light");
rightBtn.classList.add("btn", "btn-light");

leftBtn.innerHTML = "<";
rightBtn.innerHTML = ">";

btnDiv.append(leftBtn);
btnDiv.append(rightBtn);

target.append(btnDiv);

// changing the index in response to the parameter
main.setAttribute("data-index", "0");
// REQUIRES: step must be either 1 or -1;
function slideJump(step) {
    let index = Number(main.getAttribute("data-index"));
    let currentElement = boxes[index];

    index += step;
    if (index < 0) index = boxes.length - 1;
    if (index >= boxes.length) index = 0;

    let nextElement = boxes[index];

    console.log(index);
    console.log(currentElement);
    console.log(nextElement);

    main.setAttribute("data-index", String(index));
}

function animateMain(currentElement, nextElement, animationType) {
    main.innerHTML = "";
    main.append(nextElement);

    extra.innerHTML = "";
    extra.append(currentElement);

    main.classList.add("expand-animation");
    extra.classList.add("deplete-animation");

    if (animationType === "right") {
        sliderShow.innerHTML = "";
        sliderShow.append(extra);
        sliderShow.append(main);
    } else {
        sliderShow.innerHTML = "";
        sliderShow.append(main);
        sliderShow.append(extra);
    }
}

leftBtn.addEventListener("click", function() {
    slideJump(-1);
    animateMain(main.querySelectorAll("div")[0], boxes[main.getAttribute("data-index")], "left");
});

rightBtn.addEventListener("click", function() {
    slideJump(1);
    animateMain(main.querySelectorAll("div")[0], boxes[main.getAttribute("data-index")], "right");
});