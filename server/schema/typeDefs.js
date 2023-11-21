const gql = String.raw;


const typeDefs = gql`

type Category{
    _id: ID
    name: String
}

type Donations{
    _id: ID
    name: String!
    Amount: Int
    category: [String]  #  to accept an array of strings 
    Date: String
    description: String
    image: String
    user: User
}

type User {
    username: String
    _id: ID
    email: String
    password: String
    createdAt: String
    updatedAt: String
    donations: [Donations]
}

type Query{
    authenticate: User
    category(name: String): [Donations]
}

type Mutation{
    register(email: String!, username: String!, password:String!):User
    login(email: String!, password:String!):User
    categories(name: String): [Category]
    createDonation(
        name: String!, 
        Amount: Int!, 
        category: [String]):Donations
    logout: String
}
`

module.exports =  typeDefs;