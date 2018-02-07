
/**
 *  路径需配置全路径
 */
const entryConfig = {
    web: {
        'web/admin': './src/entries/web/admin',
    },
    mobile: {
        'mobile/portal': './src/entries/mobile/portal',
        'mobile/personal': './src/entries/mobile/personal',
        'autofinance/portal': './src/clients/itopview/portal',
    },
}

function allEntry() {
    var entry = {}
    for (var key in entryConfig) {
        entry = Object.assign(entry, entryConfig[key])
    }
    return entry
}

module.exports = {entryConfig, allEntry}