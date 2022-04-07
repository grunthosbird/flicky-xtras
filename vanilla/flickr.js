/*
** flickr.js
** Developed 10-06-2017, David Bird.
** Library for extrating and processing information from the Flickr API.
*/

var Flickr = (function () {
    // This module requires Utils.js

    // Loading Bar functions
    var loadingBar = {};
    var barCss = { on: "block", off: "none" };

    var setLoadingBar = function (htmlElementId) {
        loadingBar = document.getElementById(htmlElementId);
    };
    var showLoadingBar = function () {
        loadingBar.style.display = barCss.on;
    };
    var hideLoadingBar = function () {
        loadingBar.style.display = barCss.off;
    };
    var isLoading = function () {
        return (loadingBar.style.display == barCss.on);
    };

    // Error Bar functions
    var errorBar = {};

    var setErrorBar = function (htmlElementId) {
        errorBar = document.getElementById(htmlElementId);
    };
    var showError = function (errorMsg) {
        errorBar.innerHTML = "Please try to reload the page.<hr/>The following error has occured:<br/>" + errorMsg;
        errorBar.style.display = "block";
    };
    var hideError = function () { // Currently unused
        errorBar.style.display = "none";
    };

    // HTML template for the display for images and info
    var htmlImageTemplate = '<div class="pic-card">'
        + '<div class="pic-fix"><img class="pic-image" src="[[filename]]"></div>'
        + '<a class="pic-link" target="_blank" href="[[pic-link]]">[[title]]</a> by '
        + '<a class="pic-link" target="_blank" href="[[author-link]]">[[author]]</a>'
        + '<div class="pic-desc">Description: [[desc]]</div>'
        + '<div class="pic-tags">Tags: [[tags]]</div>'
        + '</div>';

    // Private function to process the Flickr info, and build the "cards"
    var displayPicutres = function (objPictureBlock) {
        Utils.log("Loaded " + objPictureBlock.items.length + " image record(s).");
        for (var iPic = 0; iPic < objPictureBlock.items.length; iPic++) {
            var thisPic = objPictureBlock.items[iPic];
            var htmlCard = htmlImageTemplate;
            if (thisPic.title.replace(/ /g, '').length < 1) {
                thisPic.title = "[untitled]";
            };
            htmlCard = htmlCard.replace("[[filename]]", thisPic.media.m);
            htmlCard = htmlCard.replace("[[title]]", thisPic.title);
            htmlCard = htmlCard.replace("[[pic-link]]", thisPic.link);
            htmlCard = htmlCard.replace("[[author]]", thisPic.author.split('"')[1]);
            htmlCard = htmlCard.replace("[[author-link]]", Utils.textBetween(thisPic.description, 'href="', '">'));
            htmlCard = htmlCard.replace("[[desc]]", Utils.textBetween(thisPic.description, 'title="', '">'));
            htmlCard = htmlCard.replace("[[tags]]", thisPic.tags);
            document.getElementById("pictures-block").innerHTML += htmlCard;
        };
    };

    // Main Flickr info download function
    var getMorePictures = function () {
        showLoadingBar();
        var httpGet = new XMLHttpRequest();
        httpGet.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                try {
                    var objPictureBlock = JSON.parse(this.responseText);
                    displayPicutres(objPictureBlock);
                }
                catch (eek) {
                    Flickr.showError(eek);
                };
                hideLoadingBar();
            }
        };
        httpGet.open("GET", "../api/flicky-pull.php", true);
        httpGet.send();
    };

    return {
        setLoadingBar: function (eleId) { setLoadingBar(eleId); },
        showLoadingBar: showLoadingBar,
        hideLoadingBar: hideLoadingBar,
        isLoading: isLoading,

        setErrorBar: function (eleId) { setErrorBar(eleId); },
        showError: function (errorMsg) { showError(errorMsg); },
        hideError: hideError,

        getMorePictures: getMorePictures
    };
})();