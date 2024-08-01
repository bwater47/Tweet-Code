const typeDefs = `
  
type User {
    _id: ID!
    name: String!
}
type Query {
    user: [User]
} 

`;

module.exports = typeDefs;