const searchBtn=()=>{

    const inputValue= document.getElementById('inputValue').value;
    document.getElementById('inputValue').value="";

    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    .then(res => res.json())
    .then(data=> {
        console.log(data);
        getData(data.data)
    });
}





const getData= phoneData=>{
    const cardBody= document.getElementById('card');
    cardBody.innerHTML="";
    let loopCounter=0;
    console.log(phoneData);

    for(const phone of phoneData){
        loopCounter++;

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

                <button class="btn btn-outline-success">More Details</button>
            </div>
        `
        cardBody.appendChild(div);
  
    }
    document.getElementById('resultCounter').style.display='block'
    if(loopCounter==0){
        document.getElementById('resultCounter').innerText=`No Result(s) found`;
    }else{
        document.getElementById('resultCounter').innerText=`${loopCounter} Result(s) found`;
    }
    
}