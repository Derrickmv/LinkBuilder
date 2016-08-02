$(document).ready(function() {
   $('.btn-parse').on('click', linkbuilder_trigger);

   function linkbuilder_trigger() {

   	// ID of the Google Spreadsheet
   	var spreadsheetID = "1U-1F-acZnLHhWVJt7bPwxuRx8S4kqMaPYnt9hOLnJ_E";
   	// Make sure it is public or set to Anyone with link can view 
   	var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
   	var text = $('#pastedText').val();
   	var anchorArr = [];
      var linkHref = "";
      var entryArr = [];
   	var counter = 0;
      var hrefStripped = {}
   	anchorObj = $.parseHTML(text);
   	var anchors = $(anchorObj).find('a');
      var hrefArr = [];
      var newArr = [];
      var entries;
      var linkName, linkUrl;
      var gsLinkArr = [];

      // From Google Sheets
   	$.getJSON(url, function(data) {

   		entries = data.feed.entry;
         // console.log($(entries));
         $(entries).each( function() {
            // console.log(this.gsx$linkname.$t);
            gsLinkArr.push({
               gsLinkName: this.gsx$linkname.$t,
               gsLinkHref: this.gsx$linkurl.$t
            });
         });


         for (var j = 0; j < anchors.length; j++) {
            testVar = $(anchors[j]).attr("href");
            // console.log(testVar);
            for (var k = 0; k < gsLinkArr.length; k++) {
               if (testVar.indexOf(gsLinkArr[k].gsLinkName) > -1) {
                  // console.log("Replace " + $(anchors[j]).attr("href") + " with " + gsLinkArr[k].gsLinkHref);
                  // $(anchors[j]).attr("href").replace(/./g,gsLinkArr[k].gsLinkHref + "");
                  $(anchors[j]).attr("href",gsLinkArr[k].gsLinkHref);
                  console.log($(anchors[j]).attr("href"));
               }
            }
         }
         console.log(anchorObj);
         // console.log($(anchors));
         console.log($('#pastedText').append(anchorObj));
         $(anchorObj).appendTo('.preview-container div.preview');
         console.log($('.preview').html());
         $('.preview-container').addClass('show-me');
         $('#results').text($('.preview').html());
      });

      
   }

});

/*
function stripClickthrough(str) {
         var re = /\$clickthrough\((.*),/;
         var subStr = str.match(re);
         try {
            return subStr[1];
         } catch (e) {

         }
      }*/