import React, { Component } from 'react'
import classNames from 'classnames'
import 'animate.css/animate.min.css'
import styles from './styles.css'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'

let _instance = null

export default class Notify extends Component {
  /**
   * @param type {string}
   * @param message {string}
   * @param postscript {string}
   */
  static show({ type = 'info', message = '', ...rest }) {
    let id = Date.now()
    _instance.setState((prev) => ({
      messages: prev.messages.concat({
        id,
        type, message,
        ...rest
      })
    }))
    setTimeout(() => {
      _instance.close(id)
    }, 5000)
  }
  
  static clearAll() {
    _instance.setState({ messages: [] })
  }
  
  constructor(props) {
    super(props)
    _instance = this
  }
  
  static propTypes = {
    customTypes: PropTypes.arrayOf(PropTypes.array),
    customContent: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.func
  }
  
  state = {
    messages: []
  }
  /**
   * Close notification and clear message
   */
  close = (id) => {
    this.setState(prev => ({
      messages: prev.messages.filter((el) => el.id !== id)
    }))
  }
  
  render() {
    
    const { messages } = this.state
    const { customTypes, customContent, children } = this.props
    const {
      container,
      wrapper,
      error, success, warn, info,
      progress
    } = styles
    
    const typesMap = new Map([
      ['info', info, 'notify--info'],
      ['error', error, 'notify--error'],
      ['success', success, 'notify--success'],
      ['warn', warn, 'notify--warn'],
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
              classNames={classNames(container, typesMap.get(row.type), container)}
            >
              <div className='notify-content'>
                <button
                  onClick={this.close.bind(this, row.id)}
                  title='close'
                  className={styles.close_btn}>&times;</button>
                
                {this.props.children && this.props.children(row)}
                
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
                <div className={progress + ' notify-progress'}/>
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
  customContent: false
}
