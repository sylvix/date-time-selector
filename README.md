# date-time-selector

A(nother) date time selector.

This one...

- Is a React Component.
- Uses Reactstrap bindings (Bootstrap 4)
- Uses icons from [fontawesome](http://fontawesome.io/icons/ "Font Awesome Homepage")

All internal date manipulation is achieved using [Moment.js](https://momentjs.com/docs/#/parsing/ "Moment.js Homepage")

The component renders an [input-group](https://getbootstrap.com/docs/4.0/components/input-group/)

## Demo

https://codesandbox.io/s/881mmkvlwl (outdated)

## Getting Started
### Install

#### npm
`npm install --save date-time-selector`

#### yarn
`yarn add date-time-selector`

## Usage


### Import

`import {DateTimeSelector} from 'date-time-selector'`

### JSX

```
<DateTimeSelector 
  onChange={this.onDateTimeChange} 
  disableTime={true} 
  format='L' 
  defaultValue={moment()} 
/>
```

## Props

| Prop | Type | Required | Description | Default |
| :--- | :--- | :---: | :--- | :--- |
| `defaultValue` | Object | | A moment.js object.  This will be the default value selected in the selector |  |
| `onChange` | Function | | Will be called when a date is submitted or valid date is entered in the input. Argument passed into onChange is an object, containing `value` and `moment`. `value` - is value from input, `moment` - is a Moment object. | |
| `format` | String | | [moment.js format string](https://momentjs.com/docs/#/displaying/format/). | 'L LTS' |
| `disableTime` | Boolean | | Set it to `true` if you'd like to hide the time inputs. | false |
| `buttonClasses` | String | | Additional classes for toggle button | |
| `inputClasses` | String | | Additional classes for input | |
