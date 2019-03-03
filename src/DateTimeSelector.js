import React from 'react'
import PropTypes from 'prop-types'
import Calendar from './Calendar'
import { Button, InputGroup, InputGroupAddon, Input } from 'reactstrap'
import moment from 'moment'

export default class DateTimeSelector extends React.Component {

  state = {
    moment: null,
    value: '',
    isValid: true,
    isCalendarVisible: false
  }

  static propTypes = {
    defaultValue: (props, propName) => {
      if (props[propName] && !moment.isMoment(props[propName])) {
        throw new Error('Not a moment object')
      }
    },
    onChange: PropTypes.func,
    buttonClasses: PropTypes.string,
    inputClasses: PropTypes.string,
    format: PropTypes.string,
    disableTime: PropTypes.bool
  }

  static defaultProps = {
    defaultValue: null,
    onChange: null,
    buttonClasses: '',
    inputClasses: '',
    format: '',
    disableTime: false
  }

  attachOutsideClickListener = () => {
    document.addEventListener('click', this.toggleCalendar, false)
  }

  detachOutsideClickListener = () => {
    document.removeEventListener('click', this.toggleCalendar, false)
  }

  handleChange = (e) => {
    this.update(e.target.value)
  }

  constructor (props) {
    super(props)

    if (props.defaultValue && moment.isMoment(props.defaultValue)) {
      this.state.moment = props.defaultValue
    }
  }

  update (value) {
    const mo = moment(value, this.props.format, true) // true means strict parsing

    const isValid = mo.isValid()

    const newState = {
      value: value,
      isValid,
      moment: isValid ? mo : null
    }

    this.setState(newState, () => {
      if (this.props.onChange && isValid) {
        this.props.onChange({value: value, moment: mo})
      }
    })
  }

  toggleCalendar = event => {
    if (event) {
      if (event.target.closest('.picker')) return

      event.stopPropagation()
    }

    if (this.state.isCalendarVisible) {
      this.detachOutsideClickListener()
    } else {
      this.attachOutsideClickListener()
    }

    this.setState({ isCalendarVisible: !this.state.isCalendarVisible })
  }

  handleCalendarSelection = (mo) => {
    const value = mo ? mo.format(this.props.format) : ''

    this.setState({ isValid: true, value, moment: mo }, () => {
      this.toggleCalendar()

      if (this.props.onChange) {
        this.props.onChange({value, moment: mo})
      }
    })
  }

  render () {
    const { value, isValid, isCalendarVisible, moment: mo } = this.state
    const { buttonClasses, inputClasses, defaultValue, format } = this.props

    let currentValue = value

    if (!value && defaultValue) {
      currentValue = defaultValue.format(format)
    }

    return (
      <div className='position-relative'>
        <InputGroup>
          <Input
            className={`form-control ${isValid ? '' : 'is-invalid'} ${inputClasses}`}
            value={currentValue}
            onChange={this.handleChange}
          />
          <InputGroupAddon addonType='append'>
            <Button
              className={buttonClasses}
              onClick={this.toggleCalendar} >
              <i className='fa fa-calendar' />
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <Calendar
          asDropDown
          visible={isCalendarVisible}
          value={mo}
          onSubmit={this.handleCalendarSelection}
          format={this.props.format}
          disableTime={this.props.disableTime}
        />
      </div>
    )
  }
}
