# r-notify

> react notification component

[![npm version](https://badge.fury.io/js/r-notify.svg)](https://badge.fury.io/js/r-notify)
## Install

```bash
npm install r-notify
```
or
```bash
yarn add r-notify
```
## Usage

```jsx
import React, { Component } from 'react'

import Notify from 'r-notify'

class App extends Component {
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
      <div>
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
                onClick={() => Notify.clearAll()}>
                Hide all
            </button>
        </div>
        
        <Notify customTypes={[['custom', 'custom']]}>
          {
            (message) => (
              <span className={'icon i-' + message.type}/>
            )
          }
        </Notify>
      </div>
    )
  }
}
```
You can pass any message object your want. But fields 'type' and 'message' required.

You can specify your icons or other in header of notification using child as a function.

If your want custom content - select **'customContent'** to **true** and specify render function. No key required in it.

Duration of showing notification depends on **duration** property.
#### Example
```jsx 
 <Notify customContent={true}>
          {
            ({message, type}) => (
                <div className={`my-notify-${type}`}>
                    <p>
                        {message}
                    </p>
                </div>
            )
          }
 </Notify>
```

Also you can delete single notification:
```jsx 
    handler = () => {
        const id = Notify.show({
            type: 'info',
            message: 'Creating cool things ...'
        })
        
        fetch('https://my-api.com/some-data')
            .then(data => {
                Notify.update({
                    id,
                    type: 'Success',
                    message: 'Go to go now.',
                    postscript: data
                })
            })
    }
```
You can dismiss single notification by calling **Notify.close(id)** with id from **show()** function.
## License

MIT © [Dymarchyk](https://github.com/Dymarchyk)
