Adobe Camera Raw Reprocess Photoshop Script
===========================================

This is a script that will reprocess a RAW file using Adobe Camera RAW into several different versions that you specify within the script settings. It will add each of these versions as new smart object layers (with your choice of layer mask) into the current document.

Installation
------------

Copy the `.jsx` file to the following directory

Mac OS X: `/Applications/Adobe Photoshop (CS3, CS4, CS5, CS6, CC or CC 2014)/Presets/Scripts/`

Windows: `C:\Program Files\Adobe\Adobe Photoshop (CS3, CS4, CS5, CS6, CC or CC 2014)\Presets\Scripts\` and possibly `C:\Program Files (x86)\Adobe\Photoshop (CS3, CS4, CS5, CS6, CC or CC 2014)\Presets\Scripts\`

Lastly, restart Photoshop.


Configuration
-------------

First, choose how you would like layer masks created. By default they are set to Hide All.

```
var config = {
	LayerMask: "Hide"
}
```

The `LayerMask` setting can be set to any of the following: `Reveal`, `Hide`, `None`.

Second, you define the different versions of the RAW file you want to be processed.

```
versions.overexposed = {
	Exposure2012: "1.0",
	Shadows2012: "25"
}

versions.underexposed = {
	Exposure2012: "-1.0",
	Highlights2012: "-25"
}
```

The above example processes two versions of the file one called `overexposed` and one called `underexposed`. These are just example names, and can be named anything you would like.

You can define as many versions as you would like, and change as many properties as you would like. Some common properties include:

- WhiteBalance
- Temperature
- Tint
- Saturation
- Sharpness
- Vibrance
- GrainAmount
- Exposure2012
- Contrast2012
- Highlights2012
- Shadows2012
- Whites2012
- Blacks2012
- Clarity2012

To find a full list of properties you can open a RAW file in Photoshop, and go to File > File Info... in the menu, and then select the Raw Data tab. Any basic tags in the `crs` namespace can be used. E.g. `<crs:Exposure2012>+0.90</crs:Exposure2012>` would convert to `Exposure2012: "+0.90"` in the code.

Normal Usage
------------

- Open a RAW file in Photoshop
- Run File > Scripts > Camera Raw Reprocess
- You'll be prompted to open a RAW file (it can be the same as the currently open file, or a different one)
- The script will process the RAW file as definied in Configuration step above.

Batch+ Integration
------------------

This script was designed to integrate with the [Batch+](http://codeandhustle.com/products/batchplus/) script by [Code & Hustle](http://www.codeandhustle.com/) for ultimate flexibility.

- Create an action that just runs the script (File > Scripts > Camera Raw Reprocess)
- Add this action as a Step in Batch+ (With the 'flatten' checkbox unchecked)
- Ideally add a 'Pause for Interaction' step afterwards so you can make further adjustments