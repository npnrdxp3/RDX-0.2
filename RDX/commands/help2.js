module.exports.config = {
    name: "help2",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "Kashif Raza",
    description: "Shows all available commands",
    commandCategory: "system",
    usages: "",
    cooldowns: 1
};

module.exports.run = function ({ api, event, args }) {
    const { commands } = global.client;
    const { threadID } = event;
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

    // Show all commands in a simple list
    let msg = "╭─『 ALL COMMANDS 』\n";
    const commandList = [];

    for (const [name] of commands) {
        commandList.push(name);
    }

    commandList.sort();

    commandList.forEach((cmd, index) => {
        const connector = (index === commandList.length - 1) ? "╰─" : "├─";
        msg += `${connector} ${prefix}${cmd}\n`;
    });

    msg += `\n📌 Total: ${commands.size} commands`;

    return api.sendMessage(msg, threadID);
};
