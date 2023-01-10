import { EventEmitter } from 'fbemitter'
import axios from 'axios'

const SERVER = 'http://localhost:8080'

class RequestStore {
    constructor() {
        this.state = {
            reply : null
        }
        this.requests = []
        this.emitter = new EventEmitter()
    }

    async getAll() {
        let token = localStorage.getItem('usertoken')
        return axios.get(`${SERVER}/requests-api/request`, {
            headers : { 'Authorization' : `${token}` }
        }).then(response => {
            this.requests = response.data
            this.emitter.emit('GET_USER_REQUESTS_SUCCESS')
        }).catch(err => {
            console.log(err)
            this.emitter.emit('GET_USER_REQUESTS_ERROR')
        })
    }

    async addOne(request) {
        try {
            let token = localStorage.getItem('usertoken')
            await axios.post(`${SERVER}/requests-api/request`, JSON.stringify(request), {
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `${token}`
                }
            }).then(res => {
                this.state.reply = res.data
            })
            this.getAll()
        } catch (error) {
            console.warn(error)
            this.emitter.emit('ADD_REQUESTS_ERROR')
        }
    }

    async deleteOne(id) {
        try {
            let token = localStorage.getItem('usertoken')
            await fetch(`${SERVER}/requests-api/request/${id}`, {
                method : 'delete',
                headers : {
                    'Authorization' : `${token}`
                }
            })
            this.getAll()
        } catch (error) {
            console.warn(error)
            this.emitter.emit('DELETE_REQUESTS_ERROR')
        }
    }

    async saveOne(id, request) {
        try {
            let token = localStorage.getItem('usertoken')
            await fetch(`${SERVER}/requests-api/request/${id}`, {
                method : 'put',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `${token}`
                },
                body : JSON.stringify(request)
            })
            this.getAll()
        } catch (error) {
            console.warn(error)
            this.emitter.emit('SAVE_REQUESTS_ERROR')
        }
    }
}

export default RequestStore