module.exports = (webDevWorkspacePath, component_mark, version) => `
/**
 * @description 大屏配置
 */
window.DATAVI_ENV = (function() {
    var appPath = '${webDevWorkspacePath}/${component_mark}/${version}';

    function formatEditorThumbSrc(imgName){
        return 'asserts/img/components/' + imgName;
    }

    return {
        debug: true,
        apiDomain: 'http://10.0.1.154:9090',
        componentsDir: appPath.replace(/^\\//, '') + '/components',

        // 大屏编辑器组件菜单枚举
        componentsMenuForEditor: [
            {
                name: '组件',
                icon: 'changyongzujian',
                components: [
                    {
                        type: '${component_mark}',
                        name: '组件开发',
                        author: 'Cloudwise',
                        description: '',
                        thumb: formatEditorThumbSrc('system-hchart-line.png')
                    }
                ]
            }
        ]

    }
})();
`;