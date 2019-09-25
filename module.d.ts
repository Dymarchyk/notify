import * as React from 'react'

declare module Notify {
    
    interface IMessage {
        id: number
        type: string
        message: string
        postscript: string
    }
    
    interface INotifyState {
        messages: Array<IMessage>
    }
    
    interface INotifyProps {
        customTypes: Map<string, string>
        customContent: boolean
        className: string
        
        duration: number
        
        children(message: IMessage): any
    }
    
    class Notify extends React.Component<INotifyState, INotifyProps> {
        
        static instance: Notify
        
        state: INotifyState
        
        static show(message: IMessage): number
        
        static clearAll(): void
        
        static close(id: number): void
        
        static update(message: IMessage): void
        
        close(): void
        
        render(): any
    }
    
}