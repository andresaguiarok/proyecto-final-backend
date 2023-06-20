const { Command } = require("commander")
const commander = new Command

commander
    .option('--mode <mode>', 'modo de trabajo', 'development')
    .parse()

module.exports = { 
    commander
}