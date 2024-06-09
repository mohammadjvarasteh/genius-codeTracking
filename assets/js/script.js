jQuery(document).ready(function($) {

//     document.getElementById('setCodeTrackingFile').addEventListener('change',(element)=>{
//         setCodeTracking_selectFile(element);
//     });

//     // document.getElementById('fileInput').addEventListener('change', function(e) {
//     //     var file = e.target.files[0];
//     //     var reader = new FileReader();
//     //     reader.onload = function(e) {
//     //       var data = new Uint8Array(e.target.result);
//     //       var workbook = XLSX.read(data, { type: 'array' });
//     //       var sheetName = workbook.SheetNames[0];
//     //       var sheet = workbook.Sheets[sheetName];
//     //       var jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });

//     //       // Reverse the order of columns
//     //       jsonData.forEach(function(row) {
//     //         for (var key in row) {
//     //           var temp = row[key].toString().split("").reverse().join("");
//     //           row[key] = temp;
//     //         }
//     //       });

//     //       console.log(jsonData);
//     //     };
//     //     reader.readAsArrayBuffer(file);
//     //   });

//     async function setCodeTracking_getFile(element) 
//     { 
      
//       return new Promise((resolve, reject) => { 
//           var file = element.target.files[0];
//           var reader = new FileReader();

  
//         reader.onload = function(e) {
//           var data = new Uint8Array(e.target.result);
//           var workbook = XLSX.read(data, { type: 'array' });
//           var sheetName = workbook.SheetNames[0];
//           var sheet = workbook.Sheets[sheetName];
//           var jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });
        
//           // Reverse the order of columns
//           jsonData.forEach(function(row) {
//             for (var key in row) {
//               var temp = row[key].toString().split("").reverse().join("");
//               row[key] = temp;
//             }
//           });
        
//           resolve(jsonData);
//         };
        
//         reader.onerror = function(err) {
//           reject(err);
//         };
        
//         reader.readAsArrayBuffer(file);
//       });
//    }

//     function setCodeTracking_showLoading()
//     {
//         document.getElementById('setCodeTracking_plugin_loading').classList.toggle('setCodeTracking_plugin_loading_display');
//     }


//     async function setCodeTracking_selectFile(element)
//     {
//       setCodeTracking_showLoading();
//       let data = await setCodeTracking_getFile(element);
//       setCodeTracking_sendCodeTrackingData(data);
//       setCodeTracking_showPopup();
//     }

//     function setCodeTracking_sendCodeTrackingData(data)
//     {
//       data = {
//         'action' : 'my_ajax',
//         'data'   : data
//       };
//       $.post(ajaxurl, data, function(response) {
//         // نمایش نتیجه در کنسول
//         console.log(response);
//       });
//     }


// });


// function setCodeTracking_showPopup()
// {
//   document.getElementById('setCodeTracking_popup').classList.toggle('setCodeTracking_popup_main_display');
// }

// function setCodeTracking_addDataToPopup()
// {
//   document.getElementById('addCodeTracking_items').appendChild();
// }


class setCodeTracking 
{
  mainPopup;
  mainItems;
  mainLoading;
  file;
  selectedElement;
  dataFile;
  submitPopupBtn;
  messageBox;
  events = [];
  constructor()
  {
    this.mainPopup      = this.getElementById('setCodeTracking_popup');
    this.mainItems      = this.getElementById('addCodeTracking_items');
    this.mainLoading    = this.getElementById('setCodeTracking_plugin_loading');
    this.file           = this.getElementById('setCodeTrackingFile');
    this.submitPopupBtn = this.getElementById('setCodeTrackingBtn');
    this.messageBox     = {
      main   : this.getElementById('geniusCodeTracking_message'),
      okBtn  : this.getElementById('geniusCodeTracking_message_operator_accept'),
      message: this.getElementById('geniusCodeTracking_messageBox') 
    }
    this.events = [
      {
        type : 'click',
        target : this.messageBox.okBtn,
        methods : ["acceptMessage"],
        listener : null
      }
    ];
    this.addNeedEvents();

  }
  async handler(elementFile)
  {
     this.dataFile = await this.extractDataFile(elementFile);
     console.log(this.dataFile);
     await  this.sendRequest(this.dataFile);
     this.messageInit();
     this.popup().show();
  ///   this.addDataToPopup();
  }


  submitPopup()
  {
     this.loading().show();
  }

  getElementById(element)
  {
     return document.getElementById(element);
  }


  async sendRequest(data)
  {
      data = {
        'action' : 'genius_codeTracking',
        'data'   : data
      };

      this.loading().show();
      this.dataFile = await $.post(ajaxurl, data, async function(response) {
        return response;
      });
      this.loading().close()
  }


  loading()
  {
    this.selectedElement = this.mainLoading;

    return this;
  }

  popup()
  {
    this.selectedElement = this.mainPopup;

    return this;
  }

  show()
  {
    this.selectedElement.classList.remove('displayNone')

    this.selectedElement = null
  }

  addNeedEvents()
  {

    this.events.forEach((item)=>{
        if(item.target != null)
        {
            const listener = (e)=>
                {
                    item.methods.forEach( method => {
                        eval("this." + method + '(e)');
                    });
                }
                item.target.addEventListener(item.type,listener)
                item.listener = listener;
        }
    });

    this.file.addEventListener('change',(elementFile)=>
    {
        this.handler(elementFile);
    });
    
    this.submitPopupBtn.addEventListener('click',()=>
    {
      this.submitPopup();
    });

  }


  close()
  {
    this.selectedElement.classList.add('displayNone')

    this.selectedElement = null
  }

  addDataToPopup()
  {
     let resultTag = document.createDocumentFragment();
     this.dataFile.result.forEach((item)=>{
        let tr = this.createElement('tr');
        let order_id = this.createElement('td',item.code);
        let name = this.createElement('td',item.name);
        let codeTracking = this.createElement('td',item.codeTracking);
        let status = this.createElement('td',item.status);
        tr.appendChild(order_id);
        tr.appendChild(name);
        tr.appendChild(codeTracking);
        tr.appendChild(status);
        resultTag.appendChild(tr);
     });

     this.mainItems.appendChild(resultTag);


  }

  selectingFile()
  {

  }

  acceptMessage()
  {
    this.messageBox.main.classList.add('displayNone')
  }

  createMessageTag(messages)
  {
      if(typeof(messages)  ==  'string')
      {
          messages = [messages];
      }
      console.log(messages);
      while (this.messageBox.message.firstChild) 
      {
          this.messageBox.message.removeChild(this.messageBox.message.firstChild);    
      }
      let result = document.createDocumentFragment();
      messages.forEach(message => {
          const p = document.createElement('p');
          p.innerText = message;
          result.append(p);
      });
      this.messageBox.message.append(result);
      return true;
  
  }

  messageInit()
  {
    this.selectedElement = this.messageBox.main;
    this.show();
    this.createMessageTag(this.dataFile.message);
  }

  createElement(tag,value = '')
  {
    tag = document.createElement(tag);
    tag.innerText = value;
    
    return tag;
  }

  async extractDataFile(element)
  { 
        return new Promise((resolve, reject) => { 
          var file = element.target.files[0];
          var reader = new FileReader();


        reader.onload = function(e) {
          var data = new Uint8Array(e.target.result);
          var workbook = XLSX.read(data, { type: 'array' });
          var sheetName = workbook.SheetNames[0];
          var sheet = workbook.Sheets[sheetName];
          var jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });
      
          resolve(jsonData);
        };
        
        reader.onerror = function(err) {
          reject(err);
        };
        
        reader.readAsArrayBuffer(file);
      });
  }

}

new setCodeTracking();

});