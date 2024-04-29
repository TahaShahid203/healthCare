const config = {
    user: 'healthCareLogin',
    password: 'dustbin12',
    server: 'TAHAS-LAPTOP',
    database: 'healthCare',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: 'MSSQLSERVER01'
    },
    port: 1433
}

module.exports = config;