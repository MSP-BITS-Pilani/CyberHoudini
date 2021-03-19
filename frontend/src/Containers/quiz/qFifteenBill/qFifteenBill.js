import "./qFifteenBill.css";

function QFifteenBill() {
    return (
      <div className="bill">
        <p>Wisdom Bookstore</p>
        <p>Since - 1/1/1970</p>
        <br></br>
        <div>
            <p>Bill Date - 1/1/2021, Time - 00:00:00 GMT</p>
            <h3>Your Items</h3>
            <ul>
              <li>Item number - 1609470421  David Copperfield</li>
              <li>Item number - 1609481645  Gulliver's travels</li>
              <li>Item number - 1609478101  To Kill a Mockingbird</li>
              <li>Item number - 1609531563  <a href="https://www.adobe.com/be_en/active-use/pdf/Alice_in_Wonderland.pdf">Alice in Wonderland</a></li>
            </ul>    
        </div>
      </div>
    );
}

/*
Make an image like a bill with date 1/1/1970 on the top left corner.
Give the bookshop a random name and add some details, step down and add the date 1/1/2021 00:00:00 GMT
In the bill itself, give 4 items - each with an item number as those epoch times listed below. 
In the name of the product column, provide 3 dead links and one live link (the one below).
*/


export default QFifteenBill;