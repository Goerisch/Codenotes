import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            //index.js
            build.onResolve({filter: /(^index\.js$)/}, () => {
                return {path: 'index.js', namespace: 'a'};
            });
            //relative Imports in einem Modul
            build.onResolve({filter: /^\.+\//}, async (args: any) => {
                return {
                    namespace: 'a',
                    path: new URL(
                        args.path,
                        'https://unpkg.com' + args.resolveDir + '/',
                    ).href,
                };
            });
            //main-datei in einem Modul
            build.onResolve({filter: /.*/}, async (args: any) => {
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`,
                };
            });
        },
    };
};
