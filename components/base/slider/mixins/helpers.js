import { getTrackCSS, getTrackLeft, getTrackAnimateCSS } from './trackHelper'

export default {
  method: {
    initialize: function (props) {
      var slideCount = React.Children.count(props.children);
      var listWidth = this.getWidth(this.refs.list.getDOMNode());
      var trackWidth = this.getWidth(this.refs.track.getDOMNode());
      var slideWidth = this.getWidth(this.getDOMNode())/props.slidesToShow;

      var currentSlide = props.rtl ? slideCount - 1 - props.initialSlide : props.initialSlide;

      this.setState({
        slideCount: slideCount,
        slideWidth: slideWidth,
        listWidth: listWidth,
        trackWidth: trackWidth,
        currentSlide: currentSlide

      }, function () {

        var targetLeft = getTrackLeft(assign({
          slideIndex: this.currentSlide,
          trackRef: this.refs.track
        }, props, this));
        // getCSS function needs previously set state
        var trackStyle = getTrackCSS(assign({left: targetLeft}, props, this));

        this.setState({trackStyle: trackStyle});

        this.autoPlay(); // once we're set up, trigger the initial autoplay.
      });
    },
    update: function (props) {
      // This method has mostly same code as initialize method.
      // Refactor it
      var slideCount = React.Children.count(props.children);
      var listWidth = this.getWidth(this.refs.list.getDOMNode());
      var trackWidth = this.getWidth(this.refs.track.getDOMNode());
      var slideWidth = this.getWidth(this.getDOMNode())/props.slidesToShow;

      this.setState({
        slideCount: slideCount,
        slideWidth: slideWidth,
        listWidth: listWidth,
        trackWidth: trackWidth
      }, function () {

        var targetLeft = getTrackLeft(assign({
          slideIndex: this.currentSlide,
          trackRef: this.refs.track
        }, props, this));
        // getCSS function needs previously set state
        var trackStyle = getTrackCSS(assign({left: targetLeft}, props, this));

        this.setState({trackStyle: trackStyle});
      });
    },
    getWidth: function getWidth(elem) {
      return elem.getBoundingClientRect().width || elem.offsetWidth;
    },
    adaptHeight: function () {
      if (this.adaptiveHeight) {
        var selector = '[data-index="' + this.currentSlide +'"]';
        if (this.refs.list) {
          var slickList = this.refs.list.getDOMNode();
          slickList.style.height = slickList.querySelector(selector).offsetHeight + 'px';
        }
      }
    },
    slideHandler: function (index) {
      // Functionality of animateSlide and postSlide is merged into this function
      // console.log('slideHandler', index);
      var targetSlide, currentSlide;
      var targetLeft, currentLeft;
      var callback;

      if (this.animating === true || this.currentSlide === index) {
        return;
      }

      if (this.fade) {
        currentSlide = this.currentSlide;

        //  Shifting targetSlide back into the range
        if (index < 0) {
          targetSlide = index + this.slideCount;
        } else if (index >= this.slideCount) {
          targetSlide = index - this.slideCount;
        } else {
          targetSlide = index;
        }

        if (this.lazyLoad && this.lazyLoadedList.indexOf(targetSlide) < 0) {
          this.setState({
            lazyLoadedList: this.lazyLoadedList.concat(targetSlide)
          });
        }

        callback = () => {
          this.setState({
            animating: false
          });
          if (this.afterChange) {
            this.afterChange(currentSlide);
          }
          ReactTransitionEvents.removeEndEventListener(this.refs.track.getDOMNode().children[currentSlide], callback);
        };

        this.setState({
          animating: true,
          currentSlide: targetSlide
        }, function () {
          ReactTransitionEvents.addEndEventListener(this.refs.track.getDOMNode().children[currentSlide], callback);
        });

        if (this.beforeChange) {
          this.beforeChange(this.currentSlide, currentSlide);
        }

        this.autoPlay();
        return;
      }

      targetSlide = index;
      if (targetSlide < 0) {
        if(this.infinite === false) {
          currentSlide = 0;
        } else if (this.slideCount % this.slidesToScroll !== 0) {
          currentSlide = this.slideCount - (this.slideCount % this.slidesToScroll);
        } else {
          currentSlide = this.slideCount + targetSlide;
        }
      } else if (targetSlide >= this.slideCount) {
        if(this.infinite === false) {
          currentSlide = this.slideCount - this.slidesToShow;
        } else if (this.slideCount % this.slidesToScroll !== 0) {
          currentSlide = 0;
        } else {
          currentSlide = targetSlide - this.slideCount;
        }
      } else {
        currentSlide = targetSlide;
      }

      targetLeft = getTrackLeft(assign({
        slideIndex: targetSlide,
        trackRef: this.refs.track
      }, this, this));

      currentLeft = getTrackLeft(assign({
        slideIndex: currentSlide,
        trackRef: this.refs.track
      }, this, this));

      if (this.infinite === false) {
        targetLeft = currentLeft;
      }

      if (this.beforeChange) {
        this.beforeChange(this.currentSlide, currentSlide);
      }

      if (this.lazyLoad) {
        var loaded = true;
        var slidesToLoad = [];
        for (var i = targetSlide; i < targetSlide + this.slidesToShow; i++ ) {
          loaded = loaded && (this.lazyLoadedList.indexOf(i) >= 0);
          if (!loaded) {
            slidesToLoad.push(i);
          }
        }
        if (!loaded) {
          this.setState({
            lazyLoadedList: this.lazyLoadedList.concat(slidesToLoad)
          });
        }
      }

      // Slide Transition happens here.
      // animated transition happens to target Slide and
      // non - animated transition happens to current Slide
      // If CSS transitions are false, directly go the current slide.

      if (this.useCSS === false) {

        this.setState({
          currentSlide: currentSlide,
          trackStyle: getTrackCSS(assign({left: currentLeft}, this, this))
        }, function () {
          if (this.afterChange) {
            this.afterChange(currentSlide);
          }
        });

      } else {

        var nextStateChanges = {
          animating: false,
          currentSlide: currentSlide,
          trackStyle: getTrackCSS(assign({left: currentLeft}, this, this)),
          swipeLeft: null
        };

        callback = () => {
          this.setState(nextStateChanges);
          if (this.afterChange) {
            this.afterChange(currentSlide);
          }
          ReactTransitionEvents.removeEndEventListener(this.refs.track.getDOMNode(), callback);
        };

        this.setState({
          animating: true,
          currentSlide: targetSlide,
          trackStyle: getTrackAnimateCSS(assign({left: targetLeft}, this, this))
        }, function () {
          ReactTransitionEvents.addEndEventListener(this.refs.track.getDOMNode(), callback);
        });

      }

      this.autoPlay();
    },
    swipeDirection: function (touchObject) {
      var xDist, yDist, r, swipeAngle;

      xDist = touchObject.startX - touchObject.curX;
      yDist = touchObject.startY - touchObject.curY;
      r = Math.atan2(yDist, xDist);

      swipeAngle = Math.round(r * 180 / Math.PI);
      if (swipeAngle < 0) {
          swipeAngle = 360 - Math.abs(swipeAngle);
      }
      if ((swipeAngle <= 45) && (swipeAngle >= 0) || (swipeAngle <= 360) && (swipeAngle >= 315)) {
          return (this.rtl === false ? 'left' : 'right');
      }
      if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
          return (this.rtl === false ? 'right' : 'left');
      }

      return 'vertical';
    },
    autoPlay: function () {
      var play = () => {
        if (this.mounted) {
          this.slideHandler(this.currentSlide + this.slidesToScroll);
        }
      };
      if (this.autoplay) {
        window.clearTimeout(this.autoPlayTimer);
        this.setState({
          autoPlayTimer: window.setTimeout(play, this.autoplaySpeed)
        });
      }
    }
  }
}
