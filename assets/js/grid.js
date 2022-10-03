const galleryGrid = document.querySelector('.gallery-wrapper');
const closeBtn = galleryGrid.querySelector('.close');

// Content
const galleryMain = galleryGrid.querySelector('.gallery');
const galleryItem = galleryGrid.querySelectorAll('.gallery-item img');
const modal = galleryGrid.querySelector('.modal');
const modalImg = modal.querySelector('.modal-figure img');
const modalContent = modal.querySelector('.modal-content');

// Add Items to Slider
let addSliderItems = (function() {
  const imageElements = [...galleryMain.querySelectorAll('.gallery-item img')];
  
  function pushItems() {
    imageElements.push.apply(imageElements);
    
    renderHTML();
  };
  
  function renderHTML() {
    const sliderItems = imageElements.map(image => image.currentSrc);
  
    modalContent.innerHTML = sliderItems.map(
      (sliderItem) => 
      `<figure class="modal-figure">
        <div class="modal-img">
          <img data-src="${sliderItem}" class="img-responsive"/>
        </div>
      </figure>`
    ).join('');
  };
  
  renderHTML();
  
  return {
    pushMore: pushItems,
    addItems: renderHTML
  };
})();

let addShowModal = (function() {
  for(let i = 0; i < galleryItem.length; i++) {
    (function(index){
        galleryItem[i].onclick = function() {
          showModal(index);
        }
    })(i);
  }
})();

// Standard Utility Functions
function $(elem) {
  return document.querySelector(elem);
}

function hasClass(el, className) {
  return el.classList ? el.classList.contains(className) : new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

function addClass(el, className) {
  if (el.classList) {
   el.classList.add(className);
  } else {
   el.className += ' ' + className
  }
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}

function $extendObj(_def, addons) {
  if (typeof addons !== "undefined") {
    for (var prop in _def) {
      if (addons[prop] != undefined) {
        _def[prop] = addons[prop];
      }
    }
  }
}

// Slider
const createSlider = (function() {
  const theSlider = function(settings) {
    const _ = this;
    _.def = {
      target: '',
      arrowLeft: '',
      arrowRight: '',
      currentSlide: '',
      transition: {
        speed: 300,
        easing: ''
      },
      swipe: true,
      autoHeight: true,
      afterChangeSlide: function afterChangeSlide() {}
    }

    $extendObj(_.def, settings);
    _.init();
  }
  
  theSlider.prototype.getCurLeft = function () {
    var _ = this;
    _.curLeft = parseInt(_.sliderInner.style.left.split('px')[0]);
  }
  theSlider.prototype.gotoSlide = function () {
    var _ = this;
    
    _.sliderInner.style.transition = 'left ' + _.def.transition.speed / 1000 + 's ' + _.def.transition.easing;
    _.sliderInner.style.left = -_.curSlide * _.slideW + 'px';
    addClass(_.def.target[0], 'isAnimating');
    setTimeout(function () {
      _.sliderInner.style.transition = '';
      removeClass(_.def.target[0], 'isAnimating');
    }, _.def.transition.speed);
    if (_.def.autoHeight) {
      _.def.target[0].style.height = _.allSlides[_.curSlide].offsetHeight + "px";
    }
    _.def.afterChangeSlide(_);
  }
  theSlider.prototype.gotoSlide2 = function () {
    var _ = this;
    _.def.currentSlide = _.def.currentSlide + 1;
    
    _.updateSliderDimension2();
    
    _.sliderInner.style.transition = 'left ' + _.def.transition.speed / 1000 + 's ' + _.def.transition.easing;
    _.sliderInner.style.left = -_.def.currentSlide * _.slideW + 'px';
    addClass(_.def.target[0], 'isAnimating');
    setTimeout(function () {
      _.sliderInner.style.transition = '';
      removeClass(_.def.target[0], 'isAnimating');
    }, _.def.transition.speed);
    if (_.def.autoHeight) {
      _.def.target[0].style.height = _.allSlides[_.curSlide].offsetHeight + "px";
    }
    _.def.afterChangeSlide(_);
  }
  theSlider.prototype.init = function () {
    var _ = this;

    function on_resize(c, t) {
      onresize = function() {
        clearTimeout(t);
        t = setTimeout(c, 100);
      }
      return onresize;
    }

    function loadedImg(el) {
      var loaded = false;
      function loadHandler() {
        if (loaded) {
          return;
        }
        loaded = true;
        _.loadedCnt++;
        if (_.loadedCnt >= _.totalSlides + 2) {
          _.updateSliderDimension2();
        }
      }
      var img = el.querySelector('img');
      if (img) {
        img.onload = loadHandler;
        img.src = img.getAttribute('data-src');
        img.style.display = 'block';
        if (img.complete) {
          loadHandler();
        }
      } else {
        _.updateSliderDimension();
      }
    }

    window.addEventListener("resize", on_resize(function () {
      _.updateSliderDimension();
    }), false);

    // wrap slider-inner
    var nowHTML = _.def.target[0].innerHTML;
    _.def.target[0].innerHTML = '<div class="modal-slider">' + nowHTML + '</div>';
    _.allSlides = 0;
    _.curSlide = _.def.currentSlide;
    _.curLeft = 0;
    _.totalSlides = _.def.target[0].querySelectorAll('.modal-figure').length;

    _.sliderInner = _.def.target[0].querySelector('.modal-slider');
    _.loadedCnt = 0;

    // append clones
    var cloneFirst = _.def.target[0].querySelectorAll('.modal-figure')[0].cloneNode(true);
    _.sliderInner.appendChild(cloneFirst);
    var cloneLast = _.def.target[0].querySelectorAll('.modal-figure')[_.totalSlides - 1].cloneNode(true);
    _.sliderInner.insertBefore(cloneLast, _.sliderInner.firstChild);
   
    _.curSlide++;
    _.allSlides = _.def.target[0].querySelectorAll('.modal-figure');

    //_.def.target[0].style.height = "1px";
    _.sliderInner.style.width = (_.totalSlides + 2) * 100 + "%";
    for (var _i = 0; _i < _.totalSlides + 2; _i++) {
      _.allSlides[_i].style.width = 100 / (_.totalSlides + 2) + "%";
      loadedImg(_.allSlides[_i]);
    }

    _.initArrows();

    function addListenerMulti(el, s, fn) {
      s.split(' ').forEach(function (e) {
        return el.addEventListener(e, fn, false);
      });
    }
    function removeListenerMulti(el, s, fn) {
      s.split(' ').forEach(function (e) {
        return el.removeEventListener(e, fn, false);
      });
    }

    if (_.def.swipe) {
      addListenerMulti(_.sliderInner, 'mousedown touchstart', startSwipe);
    }

    _.isAnimating = false;

    function startSwipe(e) {
      var touch = e;
      _.getCurLeft();
      if (!_.isAnimating) {
        if (e.type == 'touchstart') {
          touch = e.targetTouches[0] || e.changedTouches[0];
        }
        _.startX = touch.pageX;
        _.startY = touch.pageY;
        addListenerMulti(_.sliderInner, 'mousemove touchmove', swipeMove);
        addListenerMulti($('body'), 'mouseup touchend', swipeEnd);
      }
    }

    function swipeMove(e) {
      var touch = e;
      if (e.type == 'touchmove') {
        touch = e.targetTouches[0] || e.changedTouches[0];
      }
      _.moveX = touch.pageX;
      _.moveY = touch.pageY;

      // for scrolling up and down
      if (Math.abs(_.moveX - _.startX) < 40) return;

      _.isAnimating = true;
      addClass(_.def.target[0], 'isAnimating');
      e.preventDefault();

      if (_.curLeft + _.moveX - _.startX > 0 && _.curLeft == 0) {
        _.curLeft = -_.totalSlides * _.slideW;
      } else if (_.curLeft + _.moveX - _.startX < -(_.totalSlides + 1) * _.slideW) {
        _.curLeft = -_.slideW;
      }
      _.sliderInner.style.left = _.curLeft + _.moveX - _.startX + "px";
    }

    function swipeEnd(e) {
      var touch = e;
      _.getCurLeft();

      if (Math.abs(_.moveX - _.startX) === 0) return;

      _.stayAtCur = Math.abs(_.moveX - _.startX) < 40 || typeof _.moveX === "undefined" ? true : false;
      _.dir = _.startX < _.moveX ? 'left' : 'right';

      if (_.stayAtCur) {} else {
        _.dir == 'left' ? _.curSlide-- : _.curSlide++;
        if (_.curSlide < 0) {
          _.curSlide = _.totalSlides;
        } else if (_.curSlide == _.totalSlides + 2) {
          _.curSlide = 1;
        }
      }

      _.gotoSlide();

      delete _.startX;
      delete _.startY;
      delete _.moveX;
      delete _.moveY;

      _.isAnimating = false;
      removeClass(_.def.target[0], 'isAnimating');
      removeListenerMulti(_.sliderInner, 'mousemove touchmove', swipeMove);
      removeListenerMulti($('body'), 'mouseup touchend', swipeEnd);
    }
    
    _.gotoSlide2();
  }
  theSlider.prototype.initArrows = function () {
    var _ = this;
    //_.def.currentSlide = _.def.currentSlide + 1;
    
    if (_.def.arrowLeft[0] != '') {
      _.def.arrowLeft[0].addEventListener('click', function () {
        if (!hasClass(_.def.target[0], 'isAnimating')) {
          if (_.curSlide == 1) {
            _.curSlide = _.totalSlides + 1;
            _.sliderInner.style.left = -_.curSlide * _.slideW + 'px';
          }
          _.curSlide--;
          setTimeout(function () {
            _.gotoSlide();
          }, 20);
        }
      }, false);
    }

    if (_.def.arrowRight[0] != '') {
      _.def.arrowRight[0].addEventListener('click', function () {
        if (!hasClass(_.def.target[0], 'isAnimating')) {
          if (_.curSlide == _.totalSlides) {
            _.curSlide = 0;
            _.sliderInner.style.left = -_.curSlide * _.slideW + 'px';
          }
          _.curSlide++;
          setTimeout(function () {
            _.gotoSlide();
          }, 20);
        }
      }, false);
    }
  }
  theSlider.prototype.updateSliderDimension = function () {
    var _ = this;

    _.slideW = parseInt(_.def.target[0].querySelectorAll('.modal-figure')[0].offsetWidth);
    _.sliderInner.style.left = -_.slideW * _.curSlide + "px";

    if (_.def.autoHeight) {
      _.def.target[0].style.height = _.allSlides[_.curSlide].offsetHeight + "px";
    } else {
      for (var i = 0; i < _.totalSlides + 2; i++) {
        if (_.allSlides[i].offsetHeight > _.def.target[0].offsetHeight) {
          _.def.target[0].style.height = _.allSlides[i].offsetHeight + "px";
        }
      }
    }
    _.def.afterChangeSlide(_);
  }
  theSlider.prototype.updateSliderDimension2 = function () {
    var _ = this;

    _.slideW = parseInt(_.def.target[0].querySelectorAll('.modal-figure')[0].offsetWidth);

    if (_.def.autoHeight) {
      _.def.target[0].style.height = _.allSlides[_.curSlide].offsetHeight + "px";
    } else {
      for (var i = 0; i < _.totalSlides + 2; i++) {
        if (_.allSlides[i].offsetHeight > _.def.target[0].offsetHeight) {
          _.def.target[0].style.height = _.allSlides[i].offsetHeight + "px";
        }
      }
    }
    _.def.afterChangeSlide(_);
  }
  
  return theSlider;
})()

const showModal = function(index) {
  const imageSrc = this.src;
  modal.classList.add('open');
  
  addSliderItems.addItems();
  
  // Start Sliders
  const slider = new createSlider({
    target: $('.modal-content'),
    arrowLeft: $('.left'),
    arrowRight: $('.right'),
    currentSlide: index
  });
}

const hideModal = function() {
  modal.classList.remove('open');
  modalContent.innerHTML = '';
  modalContent.style.removeProperty('height');
}

closeBtn.addEventListener('click', hideModal);