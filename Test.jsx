/* ============================================================================================== */
/* Custom Camera Raw Processing - Version 1.0                                                     */
/* Created by Code & Hustle (http://www.codeandhustle.com/)                                       */
/* Based on code by Michael Hale (https://forums.adobe.com/thread/623234) and Paul Riggott        */
/* (https://forums.adobe.com/thread/290125?start=0&tstart=0)                                      */
/* ============================================================================================== */

#target photoshop 

/*
<javascriptresource> 
<name>Custom Camera Raw Processing</name>
<category>a</category> 
</javascriptresource>
*/

var versions = {};


// -----------------------------------------------------------
//
// EDIT THE FOLLOWING SETTINGS
//
// -----------------------------------------------------------

var config = {
	LayerMask: "Hide" //Options are: Reveal, Hide, None
}


// See README.md for instructions on the following

versions.overexposed = {
	Exposure2012: "1.0",
	Shadows2012: "25"
}

versions.underexposed = {
	Exposure2012: "-1.0",
	Highlights2012: "-25"
}

// -----------------------------------------------------------
//
// STOP EDITING
//
// -----------------------------------------------------------

var docRef = app.activeDocument;

// Grab the file path as set by Batch+ inside of transmissionReference
// To use this script outside of Batch+, change the following line to the path of your RAW file
var rawFilePath = docRef.info.transmissionReference; 
var rawFile;

//TODO: check if path is valid if not, prompt for a file.
try {
	rawFile = new File(rawFilePath);
	if (!rawFile.exists)
		throw new Exception("File doesn't exist");
}
catch(ex)
{
	rawFile = File.openDialog ("Select a RAW file to process", undefined, false);
	rawFilePath = rawFile.fsName;
}

var xmpFilePath = rawFilePath.substr(0, rawFilePath.lastIndexOf(".")) + ".xmp";
var xmpFile = new File(xmpFilePath);

// Establish the beginning XMP state.
xmpFile.open('r');  
xmpFile.encoding = "UTF8";  
xmpFile.lineFeed = "unix";   
xmpFile.open("r", "TEXT", "????");  

var xmpInitial = xmpFile.read();  
xmpFile.close();

for (var v in versions) {
	setXmp( xmpFile, versions[v] )
	placeFile( rawFile ); 

	//name the layer
    docRef.activeLayer.name = v;
}

//Return the XMP file to its original state
setXmp( xmpFile, {} );


function setXmp(file, settings ) {  
     loadXMPLibrary();  
     var xmp = new XMPMeta( xmpInitial );  

     for (var setting in settings)
     	xmp.setProperty( XMPConst.NS_CAMERA_RAW, setting, settings[setting] );  
     
     file.open('w');  
     file.encoding = "UTF8";  
     file.lineFeed = "unix";   
     file.write( xmp.serialize() );  
     file.close();  
};

function placeFile( file) {  
    var desc = new ActionDescriptor();  
    desc.putPath( charIDToTypeID('null'), file );  
    desc.putEnumerated( charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa') );  
        var offsetDesc = new ActionDescriptor();  
        offsetDesc.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0.000000 );  
        offsetDesc.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0.000000 );  
    desc.putObject( charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), offsetDesc );  
    executeAction( charIDToTypeID('Plc '), desc, DialogModes.NO );  

    if (config.LayerMask == "Hide")
    	makeLayerMask('HdAl');
    else if (config.LayerMask == "Reveal")
    	makeLayerMask('RvlA');
 
};  

function loadXMPLibrary() {  
     if ( !ExternalObject.AdobeXMPScript ){  
          try{  
               ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
          }catch (e){  
               alert( ErrStrs.XMPLIB );  
               return false;  
          }  
     }  
     return true;  
};

function makeLayerMask(maskType) {
if( maskType == undefined) maskType = 'RvlS' ; //from selection
//requires a selection 'RvlS'  complete mask 'RvlA' otherThanSelection 'HdSl'
    var desc140 = new ActionDescriptor();
    desc140.putClass( charIDToTypeID('Nw  '), charIDToTypeID('Chnl') );
        var ref51 = new ActionReference();
        ref51.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk ') );
    desc140.putReference( charIDToTypeID('At  '), ref51 );
    desc140.putEnumerated( charIDToTypeID('Usng'), charIDToTypeID('UsrM'), charIDToTypeID(maskType) );
    executeAction( charIDToTypeID('Mk  '), desc140, DialogModes.NO );
}