import React, { Component } from 'react'
import classNames from 'classnames'
import 'animate.css/animate.min.css'
import styles from './styles.css'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'

export default class Notify extends Component {
  static instance
  /**
   * @param type {string}
   * @param message {string}
   * @param postscript {string}
   */
  static show({ type = 'info', message = '', ...rest }) {
    let id = Date.now()
    Notify.instance.setState((prev) => ({
      messages: prev.messages.concat({
        id,
        type, message,
        ...rest
      })
    }))
    setTimeout(() => {
      Notify.instance.close(id)
    }, Notify.instance.props.duration)
    return id
  }
  
  static clearAll() {
    Notify.instance.setState({ messages: [] })
  }
  
  /**
   * Close notification by id
   * @param id {number}
   */
  static close(id) {
    Notify.instance.setState(prev => ({
      messages: prev.messages.filter(el => el.id !== id)
    }))
  }
  
  /**
   * Update notification message
   * @param params {Object}
   * @param id {number}
   */
  static update({ id, ...params }) {
    Notify.instance.setState(prev => ({
      messages: prev.messages.map(row => {
        if (row.id === id) return { ...row, ...params }
        return row
      })
    }))
  }
  
  constructor(props) {
    super(props)
    if (Notify.instance) return Notify.instance
    Notify.instance = this
  }
  
  static propTypes = {
    customTypes: PropTypes.arrayOf(PropTypes.array),
    customContent: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.func,
    duration: PropTypes.number
  }
  
  state = {
    messages: []
  }
  /**
   * Close notification and clear message
   * @param id {number}
   */
  close = (id) => {
    this.setState(prev => ({
      messages: prev.messages.filter((el) => el.id !== id)
    }))
  }
  
  render() {
    
    const { messages } = this.state
    const {
      customTypes, customContent, children,
      duration
    } = this.props
    const {
      container,
      wrapper,
      error, success, warn, info,
      progress
    } = styles
    
    const typesMap = new Map([
      ['info', info],
      ['error', error],
      ['success', success],
      ['warn', warn],
      ...customTypes
    ])
    return (
      <TransitionGroup className={wrapper}>
        {
          messages && messages.length > 0 && !customContent &&
          messages.map(row => (
            <CSSTransition
              key={row.id}
              timeout={500}
              className={classNames(container, typesMap.get(row.type))}
              classNames={classNames(container)}
            >
              <div className='notify-content'>
                <button
                  onClick={this.close.bind(this, row.id)}
                  title='close'
                  className={styles.close_btn}>&times;</button>
                {children && children(row)}
                
                <p className='notify-message'>
                  {row.message}
                </p>
                {
                  row.postscript &&
                  <div className='notify-postscript'>
                    <hr/>
                    <p>
                      {row.postscript}
                    </p>
                  </div>
                }
                <div style={{ animationDuration: duration + 'ms' }} className={progress + ' notify-progress'}/>
              </div>
            </CSSTransition>
          ))
        }
        {
          messages && messages.length > 0 && customContent &&
          messages.map(row => (
            <CSSTransition
              key={row.id}
              timeout={500}
              classNames={classNames(container)}
            >
              {children(row)}
            </CSSTransition>
          ))
        }
      </TransitionGroup>
    )
  }
}
Notify.defaultProps = {
  customTypes: [],
  customContent: false,
  duration: 5000
}
