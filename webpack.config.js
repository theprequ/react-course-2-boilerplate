const path = require("path"); // Load path module (https://nodejs.org/api/path.html#path_path_join_paths)
const webpack = require("webpack") // S15 L155
const ExtractTextPlugin = require("extract-text-webpack-plugin") // S13 L134




// Environment variable (stores the environment we're currently in)
// This gets automatically set up in Heroku to production mode
// process.env.NODE_ENV is set to itself, OR if it doesn't exist, its value will be "development" (S15L155)
// process.env.NODE_ENV will be:
//      - "production" in Heroku
//      - "test" in test environment
//      - "development" otherwise
process.env.NODE_ENV = process.env.NODE_ENV || "development";
if (process.env.NODE_ENV === "test") {
    require("dotenv").config({ path: ".env.test" });
} else if (process.env.NODE_ENV === "development") {
    require("dotenv").config({ path: ".env.development" })
}

// Was changed from exporting an object to returning a function
// ^^ In S13 L133
module.exports = (env) => {
    const isProduction = env === "production";
    const CSSExtract = new ExtractTextPlugin("styles.css");

    return {
        entry: ["babel-polyfill", "./src/app.js"],
        output: {
            path: path.join(__dirname, "public", "dist"),
            filename: "bundle.js"
        },
        module: {
            rules: [{
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({ // S15 L155
                "process.env.FIREBASE_API_KEY": JSON.stringify(process.env.FIREBASE_API_KEY),
                "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                "process.env.FIREBASE_DATABASE_URL": JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                "process.env.FIREBASE_PROJECT_ID": JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            }) 
        ],
        devtool: isProduction ? "source-map" : "inline-source-map",
        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            publicPath: "/dist/"
        }
    };
};

// THIS FILE WAS LAST MODIFIED IN SECTION 13 LECTURE 134 <-- old
// THIS FILE WAS LAST MODIFIED IN SECTION 13 LECTURE 137
