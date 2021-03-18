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

export default QFifteenBill;