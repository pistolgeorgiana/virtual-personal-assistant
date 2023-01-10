import { EventEmitter } from 'fbemitter'
import axios from 'axios'

const SERVER = 'http://localhost:8080'

class NoteStore {
    constructor() {
        this.notes = []
        this.emitter = new EventEmitter()
    }

    async getAll(eid) {
        let token = localStorage.getItem('usertoken')
        return axios.get(`${SERVER}/notes-api/notes/${eid}`, {
            headers : { 'Authorization' : `${token}` }
        }).then(response => {
            this.notes = response.data
            this.emitter.emit('GET_EVENT_NOTES_SUCCESS')
        }).catch(err => {
            console.log(err)
            this.emitter.emit('GET_EVENT_NOTES_ERROR')
        })
    }

    async getOne(eid, nid) {
        let token = localStorage.getItem('usertoken')
        return axios.get(`${SERVER}/notes-api/notes/${eid}/${nid}`, {
            headers : { 'Authorization' : `${token}` }
        }).then(response => {
            this.notes = response.data
            this.emitter.emit('GET_EVENT_NOTES_SUCCESS')
        }).catch(err => {
            console.log(err)
            this.emitter.emit('GET_EVENT_NOTES_ERROR')
        })
    }

    async addOne(eid, note) {
        try {
            let token = localStorage.getItem('usertoken')
            await fetch(`${SERVER}/notes-api/notes/${eid}`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `${token}`
                },
                body : JSON.stringify(note)
            })
            this.getAll(eid)
            this.emitter.emit('ADD_EVENT_NOTE_SUCCESS')
        } catch (error) {
            console.warn(error)
            this.emitter.emit('ADD_EVENT_NOTE_ERROR')
        }
    }

    async deleteOne(eid, nid) {
        try {
            let token = localStorage.getItem('usertoken')
            await fetch(`${SERVER}/notes-api/notes/${eid}/${nid}`, {
                method : 'delete',
                headers : {
                    'Authorization' : `${token}`
                }
            })
            this.getAll(eid)
        } catch (error) {
            console.warn(error)
            this.emitter.emit('DELETE_EVENT_NOTES_ERROR')
        }
    }
}

export default NoteStore