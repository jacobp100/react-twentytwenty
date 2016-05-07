# React TwentyTwenty

A [TwentyTwenty](http://zurb.com/playground/twentytwenty) component for React

```bash
npm install --save react-twentytwenty
```

## [Demo](http://jacobp100.github.io/react-twentytwenty/)

* Images can be different sizes
* Only uses valid CSS1, so works on older browsers
  * Doesn't use [clip](https://developer.mozilla.org/en/docs/Web/CSS/clip)
* Mobile Friendly

# Docs

TL;DR,

```js
<TwentyTwenty>
  <img src="left" />
  <img src="right" />
</TwentyTwenty>
```

## Properties

* `verticalAlign`: One of 'top', 'middle', or 'bottom'
* `leftHorizontalAlign`: One of 'left', 'center', or 'right'
* `rightHorizontalAlign`: One of 'left', 'center', or 'right'

### Slider

You can include a third child to be a slider. The slider is placed inside a zero-width, full height element, positioned to the correct left offset: basically just set `height: 100%` on your slider.

```js
<TwentyTwenty>
  <img src="left" />
  <img src="right" />
  <div className="slider" />
</TwentyTwenty>
```

```css
.slider {
  height: 100%;
  width: 1px;
  background: mediumaquamarine;
}
```
