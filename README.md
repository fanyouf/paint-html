# paint-html

把一个指定格式的html文件拆分成三个文件。通过ajax请求分别载入html，和css 部分，并`慢慢加载`css，实现动画的效果。


### 使用

- 准备html文件 . 具体的html内容如下文。
- 全局安装paint-html

```
npm install -g paint-html
```
- 运行命令

进入到你第一步建立的html文件所在的目录，

```
paint-html c
```

### html的格式 
```
<!DOCTYPE html>
<html lang="zh-Hans">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>标题</title>
    <style>
        body {
            box-sizing: border-box;
            margin: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding:2em;
        }
        .title{margin-bottom:1em;}
        .title h2{padding-bottom:0;margin-bottom: 0.5em;}
        .loadingbar{
            width: 100%;
            height: 4px;
            background-color: #ccc;
            position: relative;
        }
        #loading{
            position: absolute;
            width: 0%;
            bottom:0;
            top:0;
            left:0;
            height: 4px;
            background-color: red;
        }
        #wrapper{
            display: flex;
            width: 100%;
            height: 100vh;
            /* height: 100%; */
        }
        .code-wrapper{
            flex: 1 1 auto;
            border:1px solid #ccc;
            overflow: auto;
            margin-right: 2em;
        }
        .code{padding:1em;}
        .preview-wrapper{
            flex:1 1 auto;
            border:1px solid #ccc;
            display: flex;
        }
        .preview-wrapper .preview{
            margin: auto;
        }
    </style>
    <!-- <link rel="stylesheet" href="./index.source.css"> -->
    <style id="styleTag">
      <!-- 
      
      
      
      css的内容 （1）
      
      
      
      -->
    </style>
</head>

<body>
    <div class="title">
        <h2>标题</h2>
        <div class="loadingbar"><div id="loading"></div></div>
    </div>
    <div id="wrapper">
        <div class="code-wrapper" id="code-wrapper">
            <pre class="code" id="cssCode">
            </pre>
        </div>
        <div class="preview-wrapper">
            <div class="preview" id="preview">
                    <!--



                        html的主体内容 （2）



                    -->
            </div>
        </div>
    </div>
</body>
</html>
```

你只能在(1)处写css代码， （2）处写html代码。 其它内容均不能修改。



