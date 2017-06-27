let oledwidth = 128;
let oledheight = 64;
let oledbytearray = [];

// Create OLED rows and pages (1x8-pixel groupings)
for (i=0; i<oledheight/8; i++) {
    let createrow = document.createElement("div");
    let createpage = document.createElement("div");
    document.getElementById("screen").appendChild(createrow).className = "screenrow";
    let getscreenrow = document.querySelectorAll("div.screenrow");
    for (j=0; j<oledwidth; j++) { 
        getscreenrow[i].appendChild(createpage.cloneNode(true)).className = "page"; 
    }
}

// Create 8 "off" pixels inside each page
for (k=0; k<(oledwidth*oledheight/8); k++){
    let createpage = document.createElement("div");
    let getpage = document.querySelectorAll("div.page");
    for (l=0; l<8; l++){
        getpage[k].appendChild(createpage.cloneNode(true)).className = "pixel off";
    }
}

// Click handler for turning on individual pixel
document.getElementById("screen").addEventListener("click", function(e) {
    if (e.target && e.target.matches("div.pixel")) {
        e.target.className = "pixel on";
    }
});

// Mouseover handler for click-and-drag drawing
document.getElementById("screen").addEventListener("mouseover", function(e) {
        if (e.target && e.target.matches("div.pixel") && (e.buttons == 1) ) {
            e.target.className = "pixel on";
        }
    });

// Click handler for Clear button
document.getElementById("clear").addEventListener("click", function(e) {
    let pixels = document.querySelectorAll("div.pixel")
    for( i=0; i < pixels.length; i++ ) {
        pixels[i].className = "pixel off";
    }
});

// Click handler for Download button--calculates byte codes for drawing
    document.getElementById("download").addEventListener("click", function(e) {
        let pixels = document.querySelectorAll("div.pixel")
        for(i=0; i<(pixels.length/8); i++) {
        oledbytearray[i] = 0;
        if (pixels[i*8+7].className == "pixel on") {
            oledbytearray[i] += 0x80;
        }
        if (pixels[i*8+6].className == "pixel on") {
            oledbytearray[i] += 0x40; 
        }
        if (pixels[i*8+5].className == "pixel on") {
            oledbytearray[i] += 0x20;
        }
        if (pixels[i*8+4].className == "pixel on") {
            oledbytearray[i] += 0x10;
        }
        if (pixels[i*8+3].className == "pixel on") {
            oledbytearray[i] += 0x08;
        }
        if (pixels[i*8+2].className == "pixel on") {
            oledbytearray[i] += 0x04;
        }
        if (pixels[i*8+1].className == "pixel on") {
            oledbytearray[i] += 0x02;            
        }
        if (pixels[i*8].className == "pixel on") {
            oledbytearray[i] += 0x01;
        }
    }
    console.log(oledbytearray);
    let exportdata = "module.exports = [" + oledbytearray.toString() + "];"
    let blob = new Blob([exportdata], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "oled-design.js");
});