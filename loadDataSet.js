const loadDataSet=()=>{
    const XLSX = require('xlsx');
const path = require('path');
    const { parse } = require('date-fns');

const excelFilePath = path.join(__dirname, 'data-file/Assignment-Data.xlsx')
const workbook = XLSX.readFile(excelFilePath);


const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];


const data = XLSX.utils.sheet_to_json(sheet,{raw:false});

data.forEach(row => {
    const dataValue = row['Age'];
    const dateValue=row['Day'].split("/");

    if(dataValue==='15-25'){
        row['isUnderAger']=true
    }else{
        row['isUnderAge']=false
    }
    row['Date']=new Date(Number(dateValue[2]),Number(dateValue[1])-1,Number(dateValue[0]));
  });
  

return data;
}
module.exports=loadDataSet;