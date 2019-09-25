import React, { Component } from 'react'

import Notify from 'r-notify'

export default class App extends Component {
  
  handleWithUpdate = () => {
    let id = Notify.show({
      type: 'info',
      message: 'Sending...'
    })
    setTimeout(() => {
      Notify.update({
        id,
        type: 'success',
        message: 'Sent successfully!'
      })
    }, 1000)
  }
  
  render() {
    let messages = {
      info: {
        type: 'info',
        message: 'Very important text goes here.',
        postscript: 'And here is not so important things.',
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
        <h1 style={{textAlign: 'center'}}>Notification example</h1>
        
        <div className='d-flex flex-column flex-start'>
          <button
            onClick={() => Notify.show(messages.info)}>
            Show info message
          </button>
          
          <button
            onClick={() => Notify.show(messages.error)}>
            Show error message
          </button>
          
          <button
            onClick={() => Notify.show(messages.warn)}>
            Show warning message
          </button>
          
          <button
            onClick={() => Notify.show(messages.success)}>
            Show success message
          </button>
          
          <button
            onClick={() => Notify.show(messages.custom)}>
            Show custom message
          </button>
          
          <button
            onClick={this.handleWithUpdate}>
            With update
          </button>
          
          <button
            onClick={() => Notify.clearAll()}>
            Hide all
          </button>
  
         
        </div>
        
        <Notify customTypes={[['custom', 'my-custom-css']]}>
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
