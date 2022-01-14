var image_locations = [];
var c = document.getElementById("wallCanvas");
var ctx = c.getContext("2d");

function insert_img(img,x,y) {

    var element = document.getElementById(img);

    ctx.drawImage(element, x, y, element.naturalWidth, element.naturalHeight);
    store_image_data(img, x, y, element.naturalWidth, element.naturalHeight);
}

function store_image_data(img_name, x, y, w, h){
    image_locations.push(
    { 
        points: [
            {
                x: x,
                y: y
            }, {
                x: x+w,
                y: y
            }, {
                x: x+w,
                y: y+h
            }, {
                x: x,
                y: y+h
            }
        ],
        height: h,
        width: w,
        name: img_name,
        onclick: function(){null;},
        onhover: function(){null;},
    });
}

function add_onclick_to_image(img_name, fun){
    for (var i = 0; i < image_locations.length; i++) {
        if (image_locations[i].name == img_name){
            image_locations[i].onclick = fun;
        }
    } 
}
function add_onhover_to_image(img_name, fun){
    for (var i = 0; i < image_locations.length; i++) {
        if (image_locations[i].name == img_name){
            image_locations[i].onhover = fun;
        }
    } 
}

function define(shape) {
    var points = shape.points;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
}

function canvasHandleMouseDown(e) {
    e.preventDefault();

    // iterate each shape in the shapes array
    for (var i = 0; i < image_locations.length; i++) {
        var shape = image_locations[i]; //I dont want to type image_locations[i] over and over...
        // define the current shape
        define(shape);
        // test if the mouse is in the current shape
        if (ctx.isPointInPath(e.offsetX, e.offsetY)) {
            // call the shape's onclick method.
            shape.onclick();
        }
    }

}

function fill_wall(){
    var thumbID = ["thumb_descent", "thumb_helloworld", "thumb_ac-ex", "thumb_osemi"];

    for (i=0;i<thumbID.length;i++){

        var element = document.getElementById(thumbID[i]);
        var c = document.getElementById("wallCanvas");

        var xPos = Math.floor(Math.random() * (c.width - element.naturalWidth));
        var yPos = Math.floor(Math.random() * (c.height - element.naturalHeight));
        
        while ( images_overlapping(xPos, yPos, element.naturalWidth, element.naturalHeight) ){
            console.log("retrying")
            xPos = Math.floor(Math.random() * (c.width - element.naturalWidth));
            yPos = Math.floor(Math.random() * (c.height - element.naturalHeight));
        }

        insert_img(thumbID[i], xPos, yPos);

    }
    c.addEventListener("click", canvasHandleMouseDown);
}

function images_overlapping(xpos, ypos, width, height){
    for (var i = 0; i < image_locations.length; i++) {
        let s = image_locations[i];
        let rect = new MyRect(s.points[0].x, s.points[0].y, s.width, s.height);
        if (rect.intersects(xpos, ypos, width, height)){
            return true;
        }
    }
    console.log("success: "  + xpos + "," + ypos);
    return false;
}

class MyRect {
    constructor(x, y, w, h) {

        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.contains = function (x, y) {
            return this.x <= x && x <= this.x + this.width &&
                this.y <= y && y <= this.y + this.height;
        };

        this.intersects = function (x, y, w, h){
            return !(x+w < this.x || x > this.x + this.width || y+h < this.y || y > this.y + this.height)
        };

        this.draw = function () {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        };
    }
}