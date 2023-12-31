const gql = String.raw;


const typeDefs = gql`



type Donations{
    _id: ID
    name: String
    amount: Int
    categories: [String]  #  to accept an array of strings 
    Date: String
    description: String
    image: String
    username:String
    website: String
    
}

type User {
    username: String
    _id: ID
    email: String
    password: String
    createdAt: String
    updatedAt: String
    donations: [Donations]
    token: String
}

type Query{
    authenticate: User
    category(name: String): [Donations]
}

type Mutation {
    register(email: String!, username: String!, password:String!):User
    login(email: String!, password:String!):User
    createDonation (
        id:ID,
        name: String!, 
        amount: Int!, 
        username:String!,
        categories: [String],
        image:String):Donations
        logout: String
    showDonations(id:ID): User
}
`

module.exports =  typeDefs;