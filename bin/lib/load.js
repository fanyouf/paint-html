let str =  `<script>
        function loadText(url){
           return new Promise((resolve,reject)=>{
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {   
                    return resolve(xhr.responseText)  
                };
                try {
                    xhr.open("get", url, true);
                    xhr.send();
                }
                catch (ex) {
                    console.error(ex.message);
                    return resolve("")
                    // reject(ex.message);
                }   
            })
        }

        

        window.addEventListener("load",function(){
            let htmlPreObj = document.getElementById("preview");
            let codeWrapperObj = document.getElementById("code-wrapper");
            let loadingObj = document.getElementById("loading")
            let styleObj = document.getElementById("styleTag");
            let cssCode = document.getElementById("cssCode")
            let curIndex = 1;
            let totalIndex = 0;
            let timer = null;
            let htmlurl = #htmlurl#;
            let cssurl = #cssurl#;
            
      
            load()

        
            async function load(){

                let htmlString = await loadText(htmlurl)
                htmlPreObj.innerHTML = htmlString;

                cssString =  await loadText(cssurl)
                
                console.dir(cssString)
                if(cssString.length > 0){
                    totalIndex = cssString.length;

                    timer = setInterval(()=>{
                        writeCss();
                    })
                }
                
            }

            function writeCss(){
                styleObj.innerHTML = cssString.substr(0,curIndex);
                cssCode.innerHTML = styleObj.innerHTML
                loadingObj.style.width = curIndex/totalIndex * 100 + "%"
                codeWrapperObj.scroll(0,codeWrapperObj.scrollHeight)
                curIndex +=2;
                curIndex = Math.min(totalIndex,curIndex);

                if(curIndex === totalIndex){
                    clearInterval(timer);
                }
            }
            
        })
            
    </script>`

    exports.loadjs =  str;