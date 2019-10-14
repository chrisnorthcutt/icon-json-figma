// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 400, height: 440 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    debugger;
    let data = "";
    let count = 0;
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'generate-icons') {
        const currentSelection = figma.currentPage.selection;
        if (currentSelection.length === 0) {
            figma.notify("Nothing is selected.");
        } else {
            data += "var images = {<br>\r"
            for (let i = 0; i < currentSelection.length; i++) {
                if (currentSelection[i].type != "FRAME") {
                    figma.notify("Please make sure you have selected only Frames");
                    return;
                } else {
                    for (let l = 0; l < currentSelection[i].children.length; l++) {
                        if (currentSelection[i].children[l].type != "FRAME") {

                        } else {
                            data += currentSelection[i].children[l].name + ": '../resources/img/icon/" + currentSelection[i].name.toLowerCase() + "/" + currentSelection[i].children[l].name + ".png',\r";
                            data += "<br>";
                            count++
                        }

                    }
                }


            }

            data += "}"
        }



    }

    figma.ui.postMessage([data, count])
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
};
