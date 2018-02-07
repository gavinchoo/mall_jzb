
/**
 *  路径需配置全路径
 */
const entryConfig = {
    web: {
        'web/admin': './src/clients/admin/admin',
    },
    mobile: {
        'mobile/portal': './src/clients/mobile/portal',
        'mobile/personal': './src/clients/mobile/personal',
        'autofinance/home': './src/clients/itopview/home',
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