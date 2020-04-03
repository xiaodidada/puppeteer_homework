//1、添加测试
describe('add todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:3000/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should new todo correct', async function() {
      await page.click('#new-todo', {delay: 500});
      await page.type('#new-todo', 'new todo item', {delay: 50});
      await page.click("#add-button",{delay: 50})
      let todoList = await page.waitFor('#todo-list');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
      expect(expectInputContent).to.eql('new todo item');
    }) 

  });
  //标记已完成测试
  describe('mark done', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:3000/');
    });
  
    after (async function () {
      await page.close();
    });  
    //将第二项任务标记为已完成
    it('should mark done', async function() {
      await page.click('#todo-list > p:nth-child(2) > button',{delay: 50});
      let todoList = await page.waitFor('#todo-list');
      const expectDoneValue = await page.evaluate(todoList => todoList.children[1].querySelector('font').textContent, todoList);
      expect(expectDoneValue).to.eql('☑ ');
    }) 

  });
  //获取整个列表的测试
  describe('get all length', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:3000/');
    });
  
    after (async function () {
      await page.close();
    });  
    //通过判断列表长度
    it('get all length', async function() {
      let todoList = await page.waitFor('#todo-list');
      const expectDoneValue = await page.evaluate(todoList => todoList.children.length, todoList);
      expect(expectDoneValue).to.eql(2);
    }) 

  });