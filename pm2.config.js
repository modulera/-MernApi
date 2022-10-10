module.exports = {
    apps: [{
        name: "mernapi",
        script: "./src/app.js",
        time: true,
        watch: false,
        ignore_watch: ["node_modules"],
        env: {
            PORT: 8090,
            NODE_ENV: "development",
        },
        env_production: {
            PORT: 8090,
            NODE_ENV: "production",
        }
    }]
}