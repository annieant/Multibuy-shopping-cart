(function() {
    "use strict";
    var cartItems = [];
  
    var productList = [{
      product: "A",
      price: 50,
      offer: [3, 130]
    }, {
      product: "B",
      price: 30,
      offer: [2, 45]
    }, {
      product: "C",
      price: 20
    }, {
      product: "D",
      price: 15
    }]
  
    ///click events 
    $(".empty-cart-btn").on('click',function(){cartItems = [];updateCart();});
    
    $(document).on('click', '.remove_product', function() {
      $(this).closest('li').remove();
      cartItems.splice($(this).closest('li').attr("key"), 1);
      updateCart();
    });
  
    function generateCart() {     
      productList.forEach(function(x) {
        $('<div/>', {
          'class': 'product',
          'data-product': x.product,
          'html': 'Product ' + x.product + "<a  class='button add-to-cart' > Add </a>"
        }).on('click', function() {
          addToCart(this);
        }).appendTo('.body');
      });
  
    }
  
    function updateCart(item) {
      $(".cart").empty();
      $(".product-quantity").html(cartItems.length);
      cartItems.forEach(function(item, index) {
        $('<li/>', {
          "class": "cartList",
          "key": index,
          "html": item.product + "<a  class='button remove_product' > Delete </a>",
        }).appendTo(".cart");
  
  $(".total-price").html('£'+getTotal());     
      });
    }
  
    function getPriceOffer(product) {
      return productList.filter(function(el) {
        return el.product == product;
      });
  
    }
  
    function getTotal() {
      var results = {};
      var total = 0;
      for (var i = 0; i < cartItems.length; ++i) {
        var item = cartItems[i];
        results[item.product] |= 0;
        results[item.product] += item.qty;
      }
        
      for (var product in results) {
        var productPrice = getPriceOffer(product);
        if (productPrice[0].offer) {
          total += Math.trunc(results[product] / productPrice[0].offer[0]) * productPrice[0].offer[1] + (results[product] % productPrice[0].offer[0]) * productPrice[0].price;
        } else {
          total += results[product] * productPrice[0].price;
        }
      }
          return total;
    }
  
    function addToCart(ele) {
      cartItems.push({
        "product": $(ele).attr("data-product"),
        "qty": 1
      });
      updateCart();
    }
    generateCart();
   
  })();
  