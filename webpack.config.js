// importamos la libreria path para manipular rutas facilmente
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


// webpack.config.js exporta un objeto con la configuracion
module.exports = {
    // configuracion general
    // ================================================================================================
    mode: 'development', // development | production -> especifica si se realizan o no optimizaciones. En desarrollo no comprime codigo-> npm run build +rapido
    devtool: 'source-map', // genera sourcemaps para facilitar el debugging
    entry: "./src/js/main.js", // determina el punto de entrada a partir del cual va deshilando los imports
    output: {
        path: path.resolve(__dirname, 'dist'), // carpeta donde pondremos la build
        filename: 'build.js', // nombre del fichero empaquetado
    },

    // configuracion modulos (loaders, parsers, etc.)
    // ================================================================================================
    module: {
        // el objeto rules contiene expresiones regulares. Si el fichero a importar cumple la expresion,
        // se utilizan los modulos especificados en esa regla
        rules: [
            {
                test: /\.(js|jsx)$/, // los ficheros .js y .jsx activan esta regla
                exclude: /node_modules/, // excepto los ficheros en node_modules
                use: {
                    loader: "babel-loader" // los ficheros seran procesados por babel
                }
            },
            {
                test: /\.(scss|css)$/, // los ficheros .scss y .css activan esta regla
                use: [
                    // 3. crea un bundle de todos los ficheros .css (eliminar si usamos style-loader ya
                    // que lo cargariamos enlazandolo en index.html)
                    MiniCssExtractPlugin.loader,  

                    //'style-loader',     // 3. aplica los estilos (eliminar si usamos MiniCssExtractPlugin)
                    'css-loader',       // 2. convierte los ficheros css a imports de JS
                    'sass-loader',      // 1. transpila de scss a css
                ],
            },
            {
                // Now we apply rule for images
                test: /(png|jpe?g|gif|svg)$/,
                use: [
                       {
                         // Using file-loader for these files
                         loader: "file-loader",
          
                         // In options we can set different things like format
                         // and directory to save
                         options: {
                           outputPath: 'images'
                         }
                       }
                     ]
              }
            // {
            //     test: /\.(gif|png|jpe?g|svg)$/i,
            //     use: [
            //       'file-loader',
            //       {
            //         loader: 'image-webpack-loader',
            //         options: {
            //           bypassOnDebug: true, // webpack@1.x
            //           disable: true, // webpack@2.x and newer
            //           outputPath: 'media/img'
            //         },
            //       },
            //     ],
            //   }

        ]
    },
    plugins: [ new MiniCssExtractPlugin({
            filename: 'build.css',
        }),
    ]
}

// mas documentacion: https://webpack.js.org/configuration/