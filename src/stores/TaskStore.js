import { EventEmitter } from 'fbemitter'
import axios from 'axios'

const SERVER = "http://localhost:8080"

class TaskStore {
    constructor() {
        this.tasks = []
        this.emitter = new EventEmitter()
    }

    async getAll(eid, nid) {
        let token = localStorage.getItem('usertoken')
        return axios.get(`${SERVER}/tasks-api/tasks/${eid}/${nid}`, {
            headers : { 'Authorization' : `${token}` }
        }).then(response => {
            this.tasks = response.data
            this.emitter.emit('GET_NOTE_TASKS_SUCCESS')
        }).catch(err => {
            console.log(err)
            this.emitter.emit('GET_NOTE_TASKS_ERROR')
        })
    }

    async getOne(eid, nid, tid) {
        let token = localStorage.getItem('usertoken')
        return axios.get(`${SERVER}/tasks-api/tasks/${eid}/${nid}/${tid}`, {
            headers : { 'Authorization' : `${token}` }
        }).then(response => {
            this.tasks = response.data
            this.emitter.emit('FIND_NOTE_TASK_SUCCESS')
        }).catch(err => {
            console.warn(err)
            this.emitter.emit('FIND_NOTE_TASK_ERROR')
        })
    }

    async addOne(eid, nid, task) {
        try {
            let token = localStorage.getItem('usertoken')
            await fetch(`${SERVER}/tasks-api/tasks/${eid}/${nid}`, {
                method : "post",
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `${token}`
                },
                body : JSON.stringify(task)
            })
            this.getAll(eid, nid)
        } catch (error) {
            console.log(error)
            this.emitter.emit('ADD_NOTE_TASKS_ERROR')
        }
    }

    async deleteOne(eid, nid, tid) {
        try {
            let token = localStorage.getItem('usertoken')
            await fetch(`${SERVER}/tasks-api/tasks/${eid}/${nid}/${tid}`, {
                method : 'delete',
                headers : {
                    'Authorization' : `${token}`
                }
            })
            this.getAll(eid, nid)
        } catch (error) {
            console.log(error)
            this.emitter.emit('DELETE_NOTE_TASKS_ERROR')
        }
    }

    async saveOne(eid, nid, tid, task) {
        try {
            let token = localStorage.getItem('usertoken')
            await fetch(`${SERVER}/tasks-api/tasks/${eid}/${nid}/${tid}`, {
                method : 'put',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `${token}`
                },
                body : JSON.stringify(task)
            })
            this.getAll(eid, nid)
        } catch (error) {
            console.log(error)
            this.emitter.emit('SAVE_NOTE_TASKS_ERROR')
        }
    }
}

export default TaskStore