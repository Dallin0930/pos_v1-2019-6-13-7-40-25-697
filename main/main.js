'use strict';

//生成Tags对象数组
var decodeBarcodes = (tags) =>{
  tags.reduce((result,element) =>{
    let ch = element.includes('-') ? element.split('-')[0] : element;
    let num = element.includes('-') ? parseFloat(element.split('-')[1])  : 1;
    result.find(x => x.key == ch)?
    result.find(x => x.key === ch).count+=num 
    :result.push({key:ch,count:num}); 
    return result;     
  },[])    
}


//加载原始数据
function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
}



//由字典匹配原始数据，生成含count的对象数组  
var combineItems= (tags) =>{
  let  decodeBarcodes= decodeBarcodes(tags);
  const allItems=loadAllItems();
  
  var items={};   

  allItems.map((x,decodeBarcodes) =>{
      decodeBarcodes.key == x.barcode;
      let item_form={
        barcode:x.barcode,
        name:x.name,
        unit:x.unit,
        price:x.price,
        count:decodeBarcodes[key][value]
      }
      items.push(item_form);
  }
  ) 
      return items;  
}


//由原始输入Tags，得到Items对象数组输出``````````````````````
var decodeTags = tags =>{
     return  combineItems(tags);
}

//加载促销信息
function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ] 
    } 
  ]; 
}

//由Items和促销方式计算单个商品小计
var promotionReceiptItems=(tags) =>{
  let items = decodeTags(tags);
  let promotions = loadPromotions();
  
  var receiptitems={};
  items.fiter(
     (itemlist,promotions) => {
         if(c.barcode in promotions[0].barcodes)
         {
            let item_form={
              barcode:itemlist.barcode,
              name:itemlist.name,
              unit:itemlist.unit,
              price:itemlist.price,
              count:decodeBarcodes[key][value],
              subtotal:itemlist.count/3*itemlist.price*2+itemlist%3*itemlist.price
            }
         }
         receiptitems.push(item_form);
     }
  )
    return receiptitems;
}

//由输入Items，输出receiptitems``````````````````````````
var calculateReceiptItems= (tags) =>{
     return promotionReceiptItems(tags);
}  

//由输入receiptitems，得到总计totalnumber
var calculateReceiptTotal=(tags) =>{
    let receiptitems=promotionReceiptItems(tags);
    
    let total=receiptitems.map(receiptitems.subtotal).reduce();
    
    return total;
}


//由输入receiptitems，得到节省的钱
var calculatereceiptSaving=(tags) =>{
  let receiptitems=promotionReceiptItems(tags);
  return receiptitems.price * receiptitems.count - calculateReceiptTotal(tags);
 
}

//得到receipt ``````````````````````````````
var calculateReceipt=(tags) =>{
   let receiptitems=calculateReceiptItems(tags);
   let total=calculateReceiptTotal(tags);
   let saving=calculatereceiptSaving(tags);

   let receipt=" ";
   receipt += 
    `***<没钱赚商店>收据***
`;
    for (let i = 0; i < receiptitems.length; i++) {
        receipt += `名称：${receiptitems[i].name}，数量：${receiptitems[i].count}${receiptitems[i].unit}，单价：${receiptitems[i].price}(元)，小计：${receiptitems[i].subtotal}(元)
`;
    }
    receipt += `----------------------
`;
    receipt += "总计："+ total +"(元)"+"\n"+"节省："+"saving"+"(元)"+"\n";
    receipt += `**********************`;
    return receipt ;
}


//printReceipt打印
var printReceipt= (tags) =>{

  return calculateReceipt(tags) ;
}



exports=[loadAllItems,decodeBarcodes,combineItems,decodeTags,
         loadPromotions,promotionReceiptItems,calculateReceiptItems,
         calculateReceiptTotal,calculatereceiptSaving,calculateReceipt,
         printReceipt];