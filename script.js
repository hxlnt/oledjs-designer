let oledbytearray = [];

// Draw empty screen (default: 128 x 64)
drawOLED(128, 64);

// Click handler for turning on individual pixel
document.getElementById("screen").addEventListener("pointerdown", function (e) {
    if (e.target && e.target.matches("div.pixel")) {
        e.target.className = "pixel on";
    }
});

// Mouseover handler for click-and-drag drawing
document.getElementById("screen").addEventListener("pointerover", function (e) {
    if (e.target && e.target.matches("div.pixel") && (e.buttons == 1)) {
        e.target.className = "pixel on";
    }
});

// Click handler for Clear button
document.getElementById("clear").addEventListener("click", function (e) {
    clearPixels();
});

//Handler for dimension change
document.getElementById("oledsize").addEventListener("change", function (e) {
    document.getElementById("screen").innerHTML = "";
    if (document.getElementById("oledsize").value == "128x64") { drawOLED(128, 64);}
    else if (document.getElementById("oledsize").value == "128x32") { drawOLED(128, 32); }
    else if (document.getElementById("oledsize").value == "96x16") { drawOLED(96, 16); }
    else { drawOLED(64, 48); }
});

// Handler for .js upload
document.getElementById("uploadjs").addEventListener("change", function (e) {
    var file = document.getElementById("uploadjs").files[0];
    var textType = /text.*/;
    if (file.type.match(textType)) {
        var reader = new FileReader();
        reader.onload = function (e) {
            oledbytearray = JSON.parse((reader.result).slice(17));
            let pixels = document.querySelectorAll("div.pixel")
            for (i = 0; i < pixels.length; i++) {
                pixels[i].className = "pixel off";
            }
            for (i = 0; i < (pixels.length / 8); i++) {
                if ((oledbytearray[i] & 0x01) == 0x01) { pixels[i * 8].className = "pixel on"; }
                if ((oledbytearray[i] & 0x02) == 0x02) { pixels[i * 8 + 1].className = "pixel on"; }
                if ((oledbytearray[i] & 0x04) == 0x04) { pixels[i * 8 + 2].className = "pixel on"; }
                if ((oledbytearray[i] & 0x08) == 0x08) { pixels[i * 8 + 3].className = "pixel on"; }
                if ((oledbytearray[i] & 0x10) == 0x10) { pixels[i * 8 + 4].className = "pixel on"; }
                if ((oledbytearray[i] & 0x20) == 0x20) { pixels[i * 8 + 5].className = "pixel on"; }
                if ((oledbytearray[i] & 0x40) == 0x40) { pixels[i * 8 + 6].className = "pixel on"; }
                if ((oledbytearray[i] & 0x80) == 0x80) { pixels[i * 8 + 7].className = "pixel on"; }
            }
        }
        reader.readAsText(file);
    } else {
        console.log("oops");
    }
})


// Click handler for Download button--calculates byte codes for drawing
document.getElementById("download").addEventListener("click", function (e) {
    let pixels = document.querySelectorAll("div.pixel")
    for (i = 0; i < (pixels.length / 8); i++) {
        oledbytearray[i] = 0;
        if (pixels[i * 8 + 7].className == "pixel on") {
            oledbytearray[i] += 0x80;
        }
        if (pixels[i * 8 + 6].className == "pixel on") {
            oledbytearray[i] += 0x40;
        }
        if (pixels[i * 8 + 5].className == "pixel on") {
            oledbytearray[i] += 0x20;
        }
        if (pixels[i * 8 + 4].className == "pixel on") {
            oledbytearray[i] += 0x10;
        }
        if (pixels[i * 8 + 3].className == "pixel on") {
            oledbytearray[i] += 0x08;
        }
        if (pixels[i * 8 + 2].className == "pixel on") {
            oledbytearray[i] += 0x04;
        }
        if (pixels[i * 8 + 1].className == "pixel on") {
            oledbytearray[i] += 0x02;
        }
        if (pixels[i * 8].className == "pixel on") {
            oledbytearray[i] += 0x01;
        }
    }
    console.log(oledbytearray);
    let exportdata = "module.exports = [" + oledbytearray.toString() + "]"
    let blob = new Blob([exportdata], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "oled-design.js");
});

// Create OLED rows and pages (1x8-pixel groupings)
function drawOLED(oledwidth, oledheight) {
    for (i = 0; i < oledheight / 8; i++) {
        let createrow = document.createElement("div");
        let createpage = document.createElement("div");
        document.getElementById("screen").appendChild(createrow).className = "screenrow";
        let getscreenrow = document.querySelectorAll("div.screenrow");
        for (j = 0; j < oledwidth; j++) {
            getscreenrow[i].appendChild(createpage.cloneNode(true)).className = "page";
        }
    }

    // Create 8 "off" pixels inside each page
    for (k = 0; k < (oledwidth * oledheight / 8); k++) {
        let createpage = document.createElement("div");
        let getpage = document.querySelectorAll("div.page");
        for (l = 0; l < 8; l++) {
            getpage[k].appendChild(createpage.cloneNode(true)).className = "pixel off";
        }
    }
}

function clearPixels() {
    let pixels = document.querySelectorAll("div.pixel")
    for (i = 0; i < pixels.length; i++) {
        pixels[i].className = "pixel off";
    }
}
