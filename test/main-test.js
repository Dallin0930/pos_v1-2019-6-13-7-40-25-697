'use strict';

const loadAllItems = require('../main')[0];
const decodeBarcodes = require('../main')[1];
const combineItems = require('../main')[2];
const decodeTags = require('../main')[3];
const loadPromotions = require('../main')[4];
const promotionReceiptItems = require('../main')[5];
const  calculateReceiptItems= require('../main')[6];  
const calculateReceiptTotal = require('../main')[7];
const calculatereceiptSaving = require('../main')[8];         
const calculateReceipt = require('../main')[9];     
const printReceipt = require('../main')[10];   

const tags = [
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000003-2.5',  
  'ITEM000005',  
  'ITEM000005-2',
];

const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;


/*describe('pos', () => {

  it('should print text', () => {

    /* const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',  
      'ITEM000001',
      'ITEM000003-2.5',  
      'ITEM000005',
      'ITEM000005-2',
    ]; */  

   // spyOn(console, 'log'); 

    /*printReceipt(tags);    

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;    

    expect(console.log).toHaveBeenCalledWith(expectText);  
  });


});*/


//测试1：统计ID count 
const count={"ITEM000001":5,"ITEM000003":2.5,"ITEM000005":3};     
it('should return true when decodeBarcodes equal exceptedresult', () => {  
    expect(decodeBarcodes(tags)).toStrictEqual(count);        
}); 

