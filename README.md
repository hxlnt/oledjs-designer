# oledjs-designer
[oledjs-designer](http://ojd.azurewebsites.net) helps you draw graphics for small monochrome OLED screens. It's built for use with [oled.js](https://github.com/noopkat/oled-js), a super-rad library for drawing to OLEDs via Javascript.

 - Use a touchscreen stylus, tablet, or mouse to draw screens directly in the browser
 - Draw on a canvas that matches one of several selectable OLED sizes, pixel for pixel
 - Import or export your drawings as Javascript ready for use with `oled-js`

![Screenshot](screenshot.png)

## Usage

1. Design your image on the [oledjs-designer website](http://ojd.azurewebsites.net), then click "Save image buffer" to download the file. The file is saved with the file extension `.js.txt`.

2. Remove the `.txt` extension from the file and include it in your `oledjs` project folder.

3. Include the file at the top of your code like so:
```javascript
const mydrawing = require('path/to/image');
```

4. After initializing the OLED, draw the buffer to the screen like so:
```javascript
oled.clearDisplay();
oled.buffer = mydrawing;
oled.update();
```

The file `examplebuffer.js.txt`, included in this repo, is available for you to use for testing the tools.
 
## //TODO
 - DONE! <s>Choose from multiple OLED resolutions</s>
 - DONE! <s>Upload a `.js` buffer file for editing/preview</s>
 - DONE! <s>Draw with tablet stylus with less difficulty</s>
 - DONE! <s>Add erase tool</s>
 - Improve UI
 - Fix accidental div dragging
 - Upload a `.png` 
 - Select different color schemes, including color-banded monochrome displays
 - Add more drawing tools
 - Add onion-skinned frames for animations (via drawing or `.png` upload)
