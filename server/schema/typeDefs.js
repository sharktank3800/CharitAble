const gql = String.raw;


const typeDefs = gql`

type User {
    username: String
    _id: ID
    email: String
    createdAt: String
    updatedAt: String
}

type Query{
    authenticate: User
}

type Mutation{
    register(email: String!, username: String!, password:String!):User
    login(email: String!, password:String!):User
    logout: String
}
`

module.exports =  typeDefs;