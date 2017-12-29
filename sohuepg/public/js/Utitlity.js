function test()
{
	alert("bbss");
}

// ============================ Utility ==============================
function toJson(url)
{ 
	return '[{mediaUrl:"'+url
	+'",mediaCode:"code1",'
	+'mediaType:2,'
	+'audioType:1,'
	+'videoType:1,'
	+'streamType:1,'
	+'drmType:1,'
	+'fingerPrint:0,'
	+'copyProtection:1,'
	+'allowTrickmode:1,'
	+'startTime:0,'
	+'endTime:5000,'
	+'entryID:"entry1"}]';	
}

// ===============================PlayList=============================================
var MediaOneStr = "rtsp://10.63.13.17/VOD/147242";
var MediaTwoStr = "rtsp://10.63.13.17/VOD/125311";
var MediaThreeStr = "rtsp://10.63.12.17/VOD/23625";
var MediaFourStr = "rtsp://10.63.13.17/VOD/159613";
var MediaFiveStr = "rtsp://10.63.13.17/VOD/159614";
var MediaSixStr = "rtsp://172.25.4.180/vod/15728977";
var MediaSevenStr = "rtsp://172.25.4.180/vod/15728977";

var OneStr =  '{mediaUrl:"'+MediaOneStr
+'",mediaCode: "CodeOne",'
+'mediaType:2,'
+'audioType:1,'
+'videoType:1,'
+'streamType:1,'
+'drmType:1,'
+'fingerPrint:0,'
+'copyProtection:1,'
+'allowTrickmode:1,'
+'startTime:0,'
+'endTime:0,'
+'entryID:"MediaOne"}';	

var TwoStr =  '{mediaUrl:"'+MediaTwoStr
+'",mediaCode: "CodeTwo",'
+'mediaType:2,'
+'audioType:1,'
+'videoType:1,'
+'streamType:1,'
+'drmType:1,'
+'fingerPrint:0,'
+'copyProtection:1,'
+'allowTrickmode:1,'
+'startTime:0,'
+'endTime:0,'
+'entryID:"MediaTwo"}';	

var ThreeStr =  '{mediaUrl:"'+MediaThreeStr
+'",mediaCode: "CodeThree",'
+'mediaType:2,'
+'audioType:1,'
+'videoType:1,'
+'streamType:1,'
+'drmType:1,'
+'fingerPrint:0,'
+'copyProtection:1,'
+'allowTrickmode:1,'
+'startTime:0,'
+'endTime:0,'
+'entryID:"MediaThree"}';	

var FourStr =  '{mediaUrl:"'+MediaFourStr
+'",mediaCode: "CodeFour",'
+'mediaType:2,'
+'audioType:1,'
+'videoType:1,'
+'streamType:1,'
+'drmType:1,'
+'fingerPrint:0,'
+'copyProtection:1,'
+'allowTrickmode:1,'
+'startTime:0,'
+'endTime:0,'
+'entryID:"MediaFour"}';

var FiveStr =  '{mediaUrl:"'+MediaFiveStr
+'",mediaCode: "CodeFive",'
+'mediaType:2,'
+'audioType:1,'
+'videoType:1,'
+'streamType:1,'
+'drmType:1,'
+'fingerPrint:0,'
+'copyProtection:1,'
+'allowTrickmode:1,'
+'startTime:0,'
+'endTime:0,'
+'entryID:"MediaFive"}';

var SixStr =  '{mediaUrl:"'+MediaSixStr
+'",mediaCode: "CodeSix",'
+'mediaType:2,'
+'audioType:1,'
+'videoType:1,'
+'streamType:1,'
+'drmType:1,'
+'fingerPrint:0,'
+'copyProtection:1,'
+'allowTrickmode:1,'
+'startTime:0,'
+'endTime:0,'
+'entryID:"MediaSix"}';

var SevenStr =  '{mediaUrl:"'+MediaSevenStr
+'",mediaCode: "CodeSeven",'
+'mediaType:2,'
+'audioType:1,'
+'videoType:1,'
+'streamType:1,'
+'drmType:1,'
+'fingerPrint:0,'
+'copyProtection:1,'
+'allowTrickmode:1,'
+'startTime:0,'
+'endTime:0,'
+'entryID:"MediaSeven"}';

// ����JSON����
function PlayListtoJson( MediaOne, MediaTwo, MediaThree, MediaFour )
{ 
	var TotalStr = '[' + OneStr + ',' + TwoStr + ',' + ThreeStr + ',' + FourStr + ']';
	return TotalStr;
}
// �ȽϺ��� 0�� һ�£� -1����һ��
function CompareFunc( inputstr, resultstr, size )
{
	if(inputstr==resultstr)return 0;
	else return -1;
}


// Step 11 ��moveMediaByIndex('MediaOne', 3)��
var str4moveMediaByIndex = '[' + TwoStr + ',' + ThreeStr + ',' + FourStr + ',' + OneStr + ']';
// Step 12 ��moveMediaByIndex1( 1, 3)��
var str4moveMediaByIndex1 =  '[' + TwoStr + ',' + FourStr + ',' + OneStr + ',' + ThreeStr + ']';

// Step 13 ��moveMediaByOffset('MediaOne',-1 )��

var str4moveMediaByOffset =  '[' + TwoStr + ',' + OneStr + ',' + FourStr + ',' + ThreeStr + ']';

// Step 14 ��moveMediaByOffset1(2,-1 )��

var str4moveMediaByOffset1 =  '[' + TwoStr + ',' + FourStr + ',' + OneStr + ',' + ThreeStr + ']';

// Step 15 ��moveMediaToNext ('MediaTwo')��
var str4moveMediaToNext = '[' + FourStr + ',' + TwoStr + ',' + OneStr + ',' + ThreeStr + ']';

// Step 16 ��moveMediaToPrevious ('MediaTwo')��
var str4moveMediaToPrevious = '[' + TwoStr + ',' + FourStr + ',' + OneStr + ',' + ThreeStr + ']';

// Step 17 ��moveMediaToFirst (��MediaOne��)��
var str4moveMediaToFirst  = '['+OneStr+',' + TwoStr + ',' + FourStr + ',' + ThreeStr + ']';

// Step 18 ��moveMediaToLast (��MediaOne��)��
var str4moveMediaToLast  = '[' + TwoStr + ',' + FourStr + ',' + ThreeStr + ',' + OneStr + ']';

// Step 19 ��moveMediaToNext1(3)��
var str4moveMediaToNext1 = '[' + TwoStr + ',' + FourStr + ',' + ThreeStr + ',' + OneStr + ']';

// Step 20 ��moveMediaToPrevious1(3)��
var str4moveMediaToPrevious1 = '[' + TwoStr + ',' + FourStr + ',' + OneStr + ',' + ThreeStr + ']';

// Step 21 moveMediaToFirst1(2)��
var str4moveMediaToFirst1 =  '[' + OneStr+','+TwoStr + ',' + FourStr + ',' + ThreeStr + ']';

// Step 22 moveMediaToLast1(2)��
var str4moveMediaToLast1 =  '[' + OneStr+','+TwoStr + ',' + ThreeStr + ',' + FourStr + ']';

// Step 23 addSingleMedia(index, mediaStr)��
var str4addSingleMedia = '[' + FiveStr + ',' + OneStr + ',' + TwoStr + ',' + ThreeStr + ','+ FourStr + ']';

// Step 24 addBatchMedia(BatchMedia)��
var str4addBatchMedia = '[' + FiveStr + ',' + OneStr + ',' + TwoStr + ',' + ThreeStr + ','+ FourStr + ',' + SixStr + ',' + SevenStr + ']';

// Step 25 removeMediaByEntryID('MediaOne')��
var str4removeMediaByEntryID = '['+ FiveStr + ',' + TwoStr + ',' + ThreeStr + ','+ FourStr + ',' + SixStr + ',' + SevenStr + ']';

// Step 26 removeMediaByIndex (1)��
var str4removeMediaByIndex = '['+ FiveStr + ',' + ThreeStr + ','+ FourStr + ',' + SixStr + ',' + SevenStr + ']';

// Step 27 clearAllMedia()��
var str4clearAllMedia  = '';
