
const puppeteer = require('puppeteer');      // 用于模拟用户操作获取网络数据
var db = require('./db'); //mysql配置

let pages = "";         //页数
let urls='';         //爬取地址
let time=new Date(parseInt(new Date().getTime())).toLocaleString(); //记录时间


function selecturl(){
    db.exec('SELECT * FROM img_site WHERE img_id= ?', ["1"], function (err, results) {

        console.log('老司机发车咯: ', time);
        let baseUrl = results[0].url;   //取得原始网址
        pages = parseInt(results[0].url_page) ; //取得页数
        urls = baseUrl + pages  + '#comments'; //拼接成可用网址

        console.log(urls)
        addpage(pages);    //增加页数,用于下次爬取

      });
}


function addpage (number) {
    let newpage  = parseInt(number)+1;
  
    db.exec('UPDATE img_site SET update_time = ? , url_page = ?  WHERE img_id = ?', [time, newpage, "1"], function (err, results) {
      console.log(newpage)
    })
}



selecturl();

(async () => {
    const brower = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});   
    const page = await brower.newPage();   
    await page.goto(urls);

    // await page.click("#gif-click-load-off")           // 模拟用户点击事件

    // page.on('load',async (err) => {            // 获取内容完毕事件
        //   if(err){ console.log(err)}
          console.log("内容加载完毕");
         
            const srcs = await page.evaluate( () => {    // 异步加载完毕
                // 获取图片操作列表
                const srcs = document.querySelectorAll('a.view_img_link');     // 里面可以操作dom的api
                return Array.from(srcs).map( imgs => imgs.href).filter(e=>{
                    return e!=='javascript:;'
                })      // 拿到每张图片的src并删除无效的src
            });
            console.log(srcs)

            //插入图片到数据库
     await srcs.forEach(e=>{
                let imgurl=e;
                let time=new Date(parseInt(new Date().getTime())).toLocaleString();
                let name=e.split("/")[4];
     

            db.exec('INSERT INTO wealimg SET site = ? , title = ? ,imgsrc=?,creat_time=?,page=?', ["煎蛋网妹子图", name, imgurl, time,pages], function (err, results) {
                if(err)console.log(err)
                console.log('强势插入<(￣3￣)> ' + name)

                console.log('插入成功')
            });

            });



           await  brower.close(); //关闭浏览器
    
         
         

    
})();