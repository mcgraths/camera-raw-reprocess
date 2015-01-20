Adobe Camera Raw Reprocess Photoshop Script
===========================================

This is a script that will reprocess a RAW file using Adobe Camera RAW into several different versions that you specify within the script settings. It will add each of these versions as new smart object layers (with your choice of layer mask) into the current document.

Installation
------------

Configuration
-------------


Normal Usage
------------

- Open a RAW file in Photoshop
- Run File > Scripts > Camera Raw Reprocess
- You'll be prompted to open a RAW file (it can be the same as the currently open file, or a different one)
- The script will process the RAW file as definied in Configuration step above.

Batch+ Integration
------------------

This script was designed to integrate with the Batch+ script by Code & Hustle for ultimate flexibility.

- Create an action that just runs the script (File > Scripts > Camera Raw Reprocess)
- Add this action as a Step in Batch+ (With the 'flatten' checkbox unchecked)
- Ideally add a 'Pause for Interaction' step afterwards so you can make further adjustments