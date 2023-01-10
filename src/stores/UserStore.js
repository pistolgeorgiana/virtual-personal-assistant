import {EventEmitter} from 'fbemitter'
import axios from 'axios'
// import { use } from '../../../simple-persistence/routers/bot'

const SERVER = "http://localhost:8080"

class UserStore {
    constructor() {
        this.users = []
        this.emitter = new EventEmitter()
    }

    async getAll() {
        try {
            let response = await fetch(`${SERVER}/user-api/users`)
            let data = await response.json()
            this.users = data
            this.emitter.emit('GET_USERS_SUCCESS')
        } catch (error) {
            console.warn(error)
            this.emitter.emit('GET_USERS_ERROR')
        }
    }

    async addOne(user) {
        try {
            await fetch(`${SERVER}/user-api/users`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            })
            this.getAll()
        } catch (error) {
            console.warn(error)
            this.emitter.emit('ADD_USER_ERROR')
        }
    }

    async deleteOne(id) {
        try {
            await fetch(`${SERVER}/user-api/users/${id}`, {
                method : 'delete'
            })
            this.getAll()
        } catch (error) {
            console.warn(error)
            this.emitter.emit('DELETE_USER_ERROR')
        }
    }

    async saveOne(id, user) {
        try {
            await fetch(`${SERVER}/user-api/users/${id}`, {
                method : 'put', 
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            })
        } catch (error) {
            console.warn(error)
            this.emitter.emit('SAVE_USER_ERROR')
        }
    }

    async register(newUser) {
        return axios
            .post(`${SERVER}/user-api/register`, {
                name : newUser.name,
                email : newUser.email,
                password : newUser.password,
                birthdate : newUser.birthdate
            })
            .catch(err => {
                console.log(err)
            })
    }

    async login(user) {
        return axios
            .post(`${SERVER}/user-api/login`, {
                email : user.email,
                password : user.password
            })
            .then(response => {
                localStorage.setItem('usertoken', response.data)
                localStorage.setItem('uid', user.id)
                return response.data
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export default UserStore