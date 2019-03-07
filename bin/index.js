#!/usr/bin/env node
var program = require('commander');
const inquirer = require('inquirer')
const path = require('path');
const fs = require('fs');
let {loadjs} = require("./lib/load.js")
const cheerio  = require("cheerio")
// const { copyDir,writeJson } = require("./lib")

// 定义版本和参数选项
program
  .version('1.1.0', '-v, --version')
  .option('-create, --c', '创建项目')

// 必须在.parse()之前，因为node的emit()是即时的
program.on('--help', function(){
  console.log('this is an example:');
  console.log('      cli-web create projectName');
});

program
    .command('create')
    .alias('c')
    .description('html文件名')
    .option('-a, --name [filename]', 'html文件名')
    .action(() => {
        var promps = [{
            type: 'input',
            name: 'filename',
            message: '请输入html文件名',
            validate: function (input){
                if(!input) {
                    return '不能为空'
                }
                return true
            }
          }
        ]
        inquirer.prompt(promps).then(function (answers) {
            let {filename} =answers
            // filename = "./src/index.html"
            let url = path.resolve('./');
            // let sourUrl = path.resolve(__dirname, '..')
            // sourUrl = path.join(sourUrl,'demo')
            let fullfilename =  path.join(url,filename); 

            let basename = path.basename(fullfilename);
            let dirname = path.dirname(fullfilename);

            console.info(fullfilename);
            if(fs.existsSync(fullfilename)){
                let str = fs.readFileSync(fullfilename,'utf-8');
                // console.info(str)
                // debugger;

                // let str1 = str.replace(/\<style id=\"styleTag\"\>.*\<\/style\>/,"")
                let strWithoutCss = str.replace(/([\s\S]*)<style id="styleTag">([\s\S]*)<\/style>([\s\S]*)/,'$1<style id="styleTag"></style>$3')

                strWithoutCss = strWithoutCss.replace("</body>","")
                strWithoutCss = strWithoutCss.replace("</html>","")
                let htmlurl = basename+"._html";
                let cssurl = basename+"._css"
                let newfileName = "paint_html_" + basename
                loadjs = loadjs.replace("#htmlurl#","'"+htmlurl+"'");
                loadjs = loadjs.replace("#cssurl#","'"+cssurl+"'");

                strWithoutCss += loadjs +"</body></html>"
                // fs.writeFileSync(filename+".css", cssString);
                console.info(strWithoutCss);

                fs.writeFileSync(path.join(dirname,newfileName), strWithoutCss);

                let $ = cheerio.load(str);
                let cssString = $("#styleTag").html();
                let htmlString = $("#preview").html();

                

                fs.writeFileSync(path.join(url,cssurl), cssString);
                fs.writeFileSync(path.join(url,htmlurl), htmlString);
                // console.info($("#styleTag").text())
               
            }
            else{
                console.error(`error: ${filename} is not exist`);
            }

            // console.log('文件夹创建完毕....',curUrl)
            // console.log('资源文件夹....',sourUrl);
            // copyDir(sourUrl, curUrl,(e)=>{

            //     console.log('复制资源时错误....');
            //     console.log(e);
                
            // })
            // writeJson(path.join(curUrl,"package.json"),{name,description})

            // console.log('项目创建完毕....');
            // console.log(' - 确保你已经安装 gulp-cli 和 live-server');
            // console.log(`  cd ${name}`)
            // console.log("  npm install")
            // console.log("  阅读 README.md 得到更多内容")

        })
    })
    program.parse(process.argv);