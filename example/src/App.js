import React, { Component } from 'react'

import Notify from 'notifier'

export default class App extends Component {
  render() {
    let messages = {
      info: {
        type: 'info',
        message: 'Very important text goes here.',
        postscript: 'And here is not so important things.'
      },
      error: {
        type: 'error',
        message: 'Sorry. Error happened.',
        postscript: <a href="https://google.com">Click here</a>
      },
      warn: {
        type: 'warn',
        message: 'Field must not be empty!',
        postscript: 'Try again.'
      },
      success: {
        type: 'success',
        message: 'Great! You just do it!',
      },
      custom: {
        type: 'custom',
        message: 'And it is custom notification!',
      },
    }
    return (
      <div className={'main'}>
        <div className='d-flex flex-column flex-start'>
          <button onClick={() => Notify.show(messages.info)}>Show info message</button>
          
          <button onClick={() => Notify.show(messages.error)}>Show error message</button>
          
          <button onClick={() => Notify.show(messages.warn)}>Show warning message</button>
          
          <button onClick={() => Notify.show(messages.success)}>Show success message</button>
          
          <button onClick={() => Notify.show(messages.custom)}>Show custom message</button>
          
          <button onClick={() => Notify.clearAll()}>Hide all</button>
        </div>
        
        <Notify customTypes={[['custom', 'custom']]}>
          {
            ({type}) => (
              <span className={`icon ${type}`}/>
            )
          }
        </Notify>
      </div>
    )
  }
}
