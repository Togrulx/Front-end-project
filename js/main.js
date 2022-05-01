var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  $('.slider').slick({
    arrows:true,
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover:false,
    prevArrow: '<div class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
    nextArrow: '<div class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay:true,
          dots:false,
          arrows:false
        }
      }
    ]
  });


  $('.productslayder').slick({
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 999,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      }
    ]
  });



  let carts = document.querySelectorAll('.carts');

let addbtn = document.querySelectorAll('#addbtn');


addbtn.forEach(e => {
  e.addEventListener('click',()=>{

    if(localStorage.getItem('basket')===null) {
      localStorage.setItem('basket',JSON.stringify([]))
    }

    let basket = JSON.parse(localStorage.getItem('basket'));

    var maindiv = e.parentElement.parentElement.children[1];
    var productimg = maindiv.children[0].children[0].children[0].src;
    var productname = maindiv.children[1].children[1].innerHTML;
    var productprice = maindiv.children[1].children[4].children[1].innerHTML;
    var productid = maindiv.parentElement.getAttribute('id');
    var nproductname = document.querySelector('#nproductname');
    var nproductcount = document.querySelector('#nproductcount');
    var notification = document.querySelector('#notification');

    let exists = false;

    for(let product of basket){
      if(product.Id == productid){
        product.Count++;
        exists = true;

        notification.style.visibility = 'visible';
        notification.style.opacity = '1';
        nproductcount.innerHTML ='x' + product.Count;
        nproductname.innerHTML = product.Name + ' has been added to your cart';

        setTimeout(() => {
          notification.style.visibility = 'hidden';
          notification.style.opacity = '0';
        }, 500);
        
        

      }

      localStorage.setItem('basket',JSON.stringify(basket));

    }

    if(!exists){

        basket.push({
          Img:productimg,
          Name:productname,
          Price:productprice,
          Count : 1,
          Id : productid
        });

        nproductcount.innerHTML ='x' + 1;
        nproductname.innerHTML = productname + ' has been added to your cart';
        notification.style.visibility = 'visible';
        notification.style.opacity = '1';

        setTimeout(() => {
          notification.style.visibility = 'hidden';
          notification.style.opacity = '0';
        }, 500);



        localStorage.setItem('basket',JSON.stringify(basket));

        CountBasket();

    }

    CountBasket();
  });
  
});

function CountBasket(){

  let basket = JSON.parse(localStorage.getItem('basket'));

  let count = basket.length;

  document.querySelector('#countproduct').innerHTML = count;

  let totalmainindex = 0;

  for(let product of basket){


    mainprice = Number(product.Price.slice(1));

    totalindex = product.Count * mainprice

    totalmainindex+=totalindex;

  }  

  document.querySelector('#basketprice').innerHTML = kesr(totalmainindex);

}

CountBasket();