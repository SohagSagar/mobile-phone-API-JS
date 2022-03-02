// load searched api
const searchBtn=()=>{
    const inputValue= document.getElementById('inputValue').value.toLowerCase();
    document.getElementById('inputValue').value="";
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    .then(res => res.json())
    .then(data=>getData(data.data));   
    document.getElementById('spinner').style.display='block';
}

// get api data
const getData= phoneData=>{
    let responseCounter=0;
    for(const phoneCounter of phoneData ){
        responseCounter++;
    }

    loadData(phoneData.slice(0,20));
    document.getElementById('showMore').addEventListener('click',()=>{
        loadData(phoneData.slice(0,responseCounter));
    })  
}

// display api data
const loadData=phoneData=>{
    const cardBody= document.getElementById('card');
    cardBody.innerHTML="";
    document.getElementById('showMore').style.display='none';
    let productCounter=0;


    for(const phone of phoneData){
        productCounter++;

        const phoneId=(phone.slug);
        const brandName=phone.brand;
        const phonePhoto=(phone.image);
        const phoneModel=(phone.phone_name.slice(0,19));

        const div=document.createElement('div');
        div.classList.add('card-body');
        div.innerHTML=`
            <div>
                <img src="${phonePhoto}" alt="">
            </div>
            <div>
                <table class=" table">
                    <tr>
                        <th>Brand</th>
                        <td>${brandName}</td>
                    </tr>
                    <tr>
                        <th>Model</th>
                        <td>${phoneModel}</td>
                    </tr>
                </table>

                <button onclick="moreDetails('${phoneId}')" type="button" class="btn btn-outline-success" data-bs-toggle="modal"    data-bs-target="#staticBackdrop">More Details</button>
                     
            </div>
        `
        cardBody.appendChild(div);
  
    }

    if(productCounter>=20){
        document.getElementById('showMore').style.display='block';
    }
    if(productCounter>20){
        document.getElementById('showMore').style.display='none';
    }

    document.getElementById('spinner').style.display='none';
    document.getElementById('resultCounter').style.display='block'
    if(productCounter==0){
        document.getElementById('resultCounter').innerText=`No Result(s) found`;
    }else{
        document.getElementById('resultCounter').innerText=`${productCounter}+ Result(s) found.`;
    }
}

// display phone details
const moreDetails=detailsId=>{
    const phoneId= detailsId;
    const url=`https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayDetails(data))  
}

const displayDetails=details=>{
    const phoneDetails=details.data;

    const phoneimage=(phoneDetails.image);
    const brand=(phoneDetails.brand);
    const name=(phoneDetails.name);
    console.log(name);
    const display=(phoneDetails.mainFeatures.displaySize);
    const ramRom=(phoneDetails.mainFeatures.memory);
    let chipset=(phoneDetails.mainFeatures.chipSet);
     if(chipset==undefined || chipset==""){
         chipset="Data not Found !!"
     }
     else{
         chipset=(phoneDetails.mainFeatures.chipSet);
     }
    const sensorsArray=(phoneDetails.mainFeatures.sensors);
    const sensors=([...sensorsArray].join(","));
    const wan= (phoneDetails.others.WLAN);
    const bluetooth=(phoneDetails.others.Bluetooth);
    const gps=(phoneDetails.others.GPS);
    const nfc=(phoneDetails.others.NFC);
    const radio=(phoneDetails.others.Radio);
    const usb=(phoneDetails.others.USB);
    let releaseDate=(phoneDetails.releaseDate);

    if(releaseDate==undefined || releaseDate==""){
        releaseDate='Date not Found !!';
    }
    else{
        let releaseDate=(phoneDetails.releaseDat);
    }
    
    const modalContent=document.getElementById('modalContent');
    modalContent.innerHTML="";
    const div=document.createElement('div');
    div.classList.add('modal-body');

    div.innerHTML=`
            <p class="text-center details-heading">Mobile Details</p><hr>
            <div class="modal-info">

                <div class="phone-image">
                    <img src="${phoneimage}" alt="">
                </div>

                <div class="phone-details">
                    <table class="table table-details">
                        <tr>
                            <th>Brand</th>
                            <td>${brand}</td>
                        </tr>
                        <tr>
                            <th>Model</th>
                            <td>${name}</td>
                        </tr>
                        <tr>
                            <th>Display</th>
                            <td>${display}</td>
                        </tr>
                        <tr>
                            <th>Ram-Rom</th>
                            <td>${ramRom}</td>
                        </tr>
                        <tr>
                            <th>Chipset</th>
                            <td>${chipset}</td>
                        </tr>
                        <tr>
                            <th>Sensors</th>
                            <td>${sensors}</td>
                        </tr>
                        <tr>
                            <th>WLAN</th>
                            <td>${wan}</td>
                        </tr>
                        <tr>
                            <th>Bluetooth</th>
                            <td>${bluetooth}</td>
                        </tr>
                        <tr>
                            <th>GPS</th>
                            <td>${gps}</td>
                        </tr>
                        <tr>
                            <th>NFC</th>
                            <td>${nfc}</td>
                        </tr>
                        <tr>
                            <th>Radio</th>
                            <td>${radio}</td>
                        </tr>
                        <tr>
                            <th>USB</th>
                            <td>${usb}</td>
                        </tr>
                        <tr>
                            <th>Release Date</th>
                            <td>${releaseDate}</td>
                        </tr>
                    </table>
                </div>

            </div>
        </div>

        <div class="modal-footer">
            <button id="modalBtn" type="button" class="btn btn-outline-success" data-bs-dismiss="modal">Close</button>
        </div>
    
    `
    modalContent.appendChild(div);

}