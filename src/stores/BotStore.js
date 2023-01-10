import { EventEmitter } from 'fbemitter'
import axios from 'axios'

const SERVER = 'http://localhost:8080'

class BotStore {
    constructor() {
        this.bot = []
        this.emitter = new EventEmitter()
    }

    async getAll() {
        let token = localStorage.getItem('usertoken')
        return axios.get(`${SERVER}/bot-api/bot`, {
            headers : { 'Authorization' : `${token}` }
        }).then(response => {
            this.bot = response.data
            this.emitter.emit('GET_USER_BOT_SUCCESS')
        }).catch(err => {
            console.warn(err)
            this.emitter.emit('GET_USER_BOT_ERROR')
        })
    }

    async addOne(bot) {
        try {
            let token = localStorage.getItem('usertoken')
            await fetch(`${SERVER}/bot-api/bot`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'applications/json',
                    'Authorization' : `${token}`
                },
                body : JSON.stringify(bot)
            })
            this.getAll()
        } catch (error) {
            console.warn(error)
            this.emitter.emit('ADD_USER_BOT_ERROR')
        }
    }

    async saveOne(bot) {
        try {
            let token = localStorage.getItem('usertoken')
            await fetch(`${SERVER}/bot-api/bot`, {
                method : 'put',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `${token}`
                },
                body : JSON.stringify(bot)
            })
            this.getAll()
        } catch (error) {
            console.warn(error)
            this.emitter.emit('SAVE_USER_BOT_ERROR')
        }
    }
}

export default BotStore