const pg = require("pg")

const client = new pg.Pool({connectionString: "postgres://postgres:123456@localhost:5432/postgres"})

async function queryPostgres(query){
    const pgClient = await client.connect();
    try{
        return await pgClient.query(query)
    }catch(error){
        console.log(`ERRO NO BANCO DE DADOS ${error}`);
        throw error;
    }
}

module.exports= {queryPostgres}