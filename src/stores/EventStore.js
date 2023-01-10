import { EventEmitter } from "fbemitter"
import axios from 'axios'

const SERVER = "http://localhost:8080"

class EventStore {
    constructor() {
        this.events = []
        this.emitter = new EventEmitter()
    }

    async getOne(id) {
        let token = localStorage.getItem('usertoken')
        return axios.get(`${SERVER}/events-api/events/${id}`, {
            headers : { 'Authorization' : `${token}` }
        }).then(response => {
            this.events = response.data
            this.emitter.emit('GET_USER_EVENTS_SUCCESS')
        }).catch(err => {
            console.log(err)
            this.emitter.emit('GET_USER_EVENTS_ERROR')
        })
    }

    async addOne(event) {
        try {
            let token = localStorage.getItem('usertoken')
            await fetch(`${SERVER}/events-api/events`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `${token}`
                },
                body : JSON.stringify(event)
            })
            this.getAll()
        } catch (error) {
            console.warn(error)
            this.emitter.emit('ADD_EVENTS_ERROR')
        }
    }

    async deleteOne(id) {
        try {
            let token = localStorage.getItem('usertoken')
            await fetch(`${SERVER}/events-api/events/${id}`, {
                method : 'delete',
                headers : {
                    'Authorization' : `${token}`
                }
            })
            this.getAll()
        } catch (error) {
            console.warn(error)
            this.emitter.emit('DELETE_EVENTS_ERROR')
        }
    }

    async saveOne(id, event) {
        try {
            let token = localStorage.getItem('usertoken')
            await fetch(`${SERVER}/events-api/events/${id}`, {
                method : 'put',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `${token}`
                },
                body : JSON.stringify(event)
            })
            this.getAll()
        } catch (error) {
            console.warn(error)
            this.emitter.emit('SAVE_EVENTS_ERROR')
        }
    }

    async getAll() {
        let token = localStorage.getItem('usertoken')
        return axios.get(`${SERVER}/events-api/events`, {
            headers : { 'Authorization' : `${token}` }
        }).then(response => {
            this.events = response.data
            this.emitter.emit('GET_USER_EVENTS_SUCCESS')
        }).catch(err => {
            console.log(err)
            this.emitter.emit('GET_USER_EVENTS_ERROR')
        })
    }
}

export default EventStore