const {Schema, model} =  require('mongoose')
const {hash,compare} = require('bcrypt')

const userSchema = new Schema({
    username:{
        type: String,
        unique:true
    },
    email:{
        type: String,
        unique:true,
        reqired:true,
        validate:{
            validator(val){
                return  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val)
            },
            message(){
                return 'must be a valid email adress'
            }
        }
    },
    password:{
        type:String,
        reqired:true,
        minLength: [7, 'password must be longer than 7 characters'],

    }
},{
    methods:{
        async validatePass(formPass){
            const is_valid = await compare(formPass, this.password)
            return is_valid
        }
    },
    toJSON:{
        transform(_,user){
            delete user.__v;
            delete user.password;
            return user
        }
    }
}) 

userSchema.pre('save', async function(next){
    if(this.isNew){
        this.password = await hash(this.password, 10)
        console.log('hi')
    }
    console.log('hello')
    next()
})
const User = model('User', userSchema)

module.exports = User