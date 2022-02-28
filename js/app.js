
const searchBtn=()=>{

    const inputValue= document.getElementById('inputValue').value.toLowerCase();
    document.getElementById('inputValue').value="";

    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    .then(res => res.json())
    .then(data=>getData(data.data));   
     
    document.getElementById('spinner').style.display='block';

}

const getData= phoneData=>{
    const cardBody= document.getElementById('card');
    cardBody.innerHTML="";
    let loopCounter=0;
    
    for(const phone of phoneData){
        loopCounter++;

        const phoneId=(phone.slug);
        const brandName=phone.brand;
        const phonePhoto=(phone.image);
        const phoneModel=(phone.phone_name).slice(0,19);

        
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

    document.getElementById('spinner').style.display='none';
    document.getElementById('resultCounter').style.display='block'
    if(loopCounter==0){
        document.getElementById('resultCounter').innerText=`No Result(s) found`;
    }else{
        document.getElementById('resultCounter').innerText=`${loopCounter} Result(s) found`;
    }
    
}


const moreDetails=detailsId=>{
    const phoneId= detailsId;
    const url=`https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayDetails(data))  
}

const displayDetails=details=>{
    console.log(details);
    const phoneDetails=details.data;


    const phoneimage=(phoneDetails.image);
    const brand=(phoneDetails.brand);
    const name=(phoneDetails.name);
    console.log(name);
    const display=(phoneDetails.mainFeatures.displaySize);
    const ramRom=(phoneDetails.mainFeatures.memory);
    const chipset=(phoneDetails.mainFeatures.chipSet);
    const sensorsArray=(phoneDetails.mainFeatures.sensors);
    const sensors=([...sensorsArray].join(","));
    const wan= (phoneDetails.others.WLAN);
    const bluetooth=(phoneDetails.others.Bluetooth);
    const gps=(phoneDetails.others.GPS);
    const nfc=(phoneDetails.others.NFC);
    const radio=(phoneDetails.others.Radio);
    const usb=(phoneDetails.others.USB);
    let releaseDate=(phoneDetails.releaseDate);
    const releaseDateError='No date Found';
    if(releaseDate==undefined){
        releaseDate='No date Found';
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
                            <td>${name} 5s</td>
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