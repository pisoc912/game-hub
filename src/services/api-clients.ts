import axios from 'axios'

export default axios.create({
    baseURL:'https://api.rawg.io/api',
    params:{
        key:'13b30c95d1b1474e83d3b4a6ed97a30b'
    }
})