var tutorialSlides = [
        './images/1.png',
        './images/2.png',
        './images/3.png',
        './images/4.png',
        './images/5.png',
        './images/6.png',
        './images/7.png',
        './images/8.png',
        './images/9.png',
        './images/10.png',
        './images/11.png',
        './images/12.png',
        './images/13.png',
        './images/14.png',
        './images/15.png'
    ];

var ImageRotator = function(options) {
    this.width = options.width + 'px';
    this.height = options.height + 'px';
    this.imageUrls = options.images;
    this.transition = options.transition;
    this.imageViewModels = [];
    options.images.forEach(function (image) {
        var imageViewModel = {url: image, active: ko.observable(false)};
        this.imageViewModels.push(imageViewModel);
    }.bind(this));
    this.imageViewModels[0].active(true);
    this.images = ko.observableArray();
    this.loadFirstImage();
};

ImageRotator.prototype.nextImage = function() {
    this.images.valueWillMutate();
    var top = this.images.pop(),
        ind = this.imageViewModels.indexOf(top),
        nextInd = (ind + 2) % this.imageViewModels.length,
        next = this.imageViewModels[nextInd],
        tips = $('.tutorial-tip');

    this.images.unshift(next);
    top.active(false);
    this.images()[1].active(true);
    tips.removeClass('active');
    $(tips[nextInd-1]).addClass('active');
    this.images.valueHasMutated();
};

ImageRotator.prototype.prevImage = function() {
    this.images.valueWillMutate();
    var top = this.images.pop(),
        ind = this.imageViewModels.indexOf(top),
        prevInd = (ind - 1) % this.imageViewModels.length,
        tips = $('.tutorial-tip');

    if (prevInd < 0) {
        prevInd = this.imageViewModels.length - 1
    }
    var prev = this.imageViewModels[prevInd];

    this.images.push(prev);
    this.images()[0] = top;
    top.active(false);
    this.images()[1].active(true);
    tips.removeClass('active');
    $(tips[prevInd]).addClass('active');
    this.images.valueHasMutated();
};

ImageRotator.prototype.onCtrlClick = function(imageVM) {
    if (imageVM === this.images()[1]) {
        return;
    }
    this.images()[0] = imageVM;
    var top = this.images.pop(),
        ind = this.imageViewModels.indexOf(imageVM),
        nextInd = (ind + 1) % this.imageViewModels.length,
        next = this.imageViewModels[nextInd],
        tips = $('.tutorial-tip');

    this.images.unshift(next);
    top.active(false);
    imageVM.active(true);
    tips.removeClass('active');
    $(tips[nextInd-1]).addClass('active');
    this.images.valueHasMutated();
};

ImageRotator.prototype.loadFirstImage = function() {
    var first = this.imageUrls.shift(),
        imageEl = document.createElement('img');

    imageEl.addEventListener('load', function(e) {
        this.images.push(this.imageViewModels[0]);
        this.images.unshift(this.imageViewModels[1]);
        this.imageUrls.shift();
        this.loadOtherImages();
    }.bind(this));
    imageEl.src = first;
};

ImageRotator.prototype.loadOtherImages = function() {
    var tips = $('.tutorial-tip');
    $(tips[0]).addClass('active');
    this.imageUrls.forEach(function (image) {
        var imageEl = document.createElement('img');
        imageEl.src = image;
    }.bind(this));
};

var tutorialSlider = new ImageRotator({
    images: tutorialSlides,
    width: 560,
    height: 540
});

ko.applyBindings(tutorialSlider, document.body);


