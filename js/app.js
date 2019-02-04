//show cart

(function(){
	const cartInfo = document.getElementById('cart-info');
	const cart = document.getElementById('cart');

	cartInfo.addEventListener('click', function(){
	cart.classList.toggle('show-cart');

	});
})();

//add items to the cart
(function(){
 const cartBtn = document.querySelectorAll('.store-item-icon');
 cartBtn.forEach(function(btn){
 	btn.addEventListener('click', function(event){
 		// console.log(event.target);
 	if(event.target.parentElement.classList.contains('store-item-icon')){
        let fullPath = event.target.parentElement.previousElementSibling.src;
        //Метод IndexOf () возвращает позицию первого вхождения заданного значения в строке. //Найти первое вхождение буквы «е» в строке: var n = str.indexOf("e");
        //Найти первое вхождение буквы «е» в строке, начиная поиск в позиции 5: var n = str.indexOf("e", 5);
        let pos = fullPath.indexOf('img') + 3;

        //Метод slice() извлекает текст из одной строки и возвращает новую строку. Изменения текста в одной строке не влияют на другую строку.
        //Метод slice() извлекает все символы до индекса endSlice, не включая сам этот индекс. Вызов str.slice(1, 4) извлечёт символы со второго по четвёртый
        let partPath = fullPath.slice(pos);

        const item = {};
        item.img = `img-cart${partPath}`;

        let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
		item.name = name;
         //Метод trim() удаляет пробельные символы с начала и конца строки. var orig = '   foo  '; console.log(orig.trim()); // 'foo'
        let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
        let finalPrice = price.slice(1).trim();
        item.price = finalPrice;
        


        const cartItem = document.createElement('div');
       
        cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');
        cartItem.innerHTML = `
        	<img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="item-text">
              <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
            </div>
            <a href="#" id='cart-item-remove' class="cart-item-remove">
              <i class="fas fa-trash"></i>
            </a>
           `;

        //select cart
        const cart = document.getElementById('cart');
        const total = document.querySelector('.cart-total-container');
          cart.insertBefore(cartItem, total);    //insert cartItem before total
          alert('item added to the cart');
          showTotals();
        }
 	});
 });

//show totals
function showTotals(){
	const total = [];
	const items = document.querySelectorAll('.cart-item-price');

	items.forEach(function(item){
		//Функция parseFloat() принимает строку в качестве аргумента и возвращает десятичное число (число с плавающей точкой)
		total.push(parseFloat(item.textContent));
	});

	const totalMoney = total.reduce(function(total, item){
		total += item;
		return total;
	},0);
    // Метод toFixed() форматирует число, используя запись с фиксированной запятой. Количество цифр после десятичной запятой;
	const finalMoney = totalMoney.toFixed(2);

	document.getElementById('cart-total').textContent = finalMoney;
	document.querySelector('.item-total').textContent = finalMoney;
	document.getElementById('item-count').textContent = total.length;
};
})();

//filter btns
(()=>{
  const filterBtn = document.querySelectorAll('.filter-btn');
 // console.log(filterBtn)
  filterBtn.forEach(btn => {
    btn.addEventListener('click', event =>{
    event.preventDefault();

    const value = event.target.dataset.filter;
    //console.log(value);
    const items = document.querySelectorAll('.store-item');
    //console.log(items);
      items.forEach(function(item){
        if(value === 'all'){
          item.style.display = 'block';
        }else 
        if (item.classList.contains(value)){
          item.style.display = 'block';
        }
          else {
            item.style.display = 'none';
          }
      });
    });
  });

})();

//search input
(()=>{
  //target search box
const search = document.getElementById('search-item');

search.addEventListener('keyup', function(){
  let value = search.value.toLowerCase().trim();

  const items = document.querySelectorAll('.store-item');
   items.forEach(function(item){
      let type = item.dataset.item;

    //  if(type.includes(value)){
    //    item.style.display = 'block'
   //   } else {
   //     item.style.display = 'none'
   //   }
   let length = value.length;
   let match = type.slice(0, length);
   if (value === match) {
     item.style.display = 'block'
   } else {
     item.style.display = 'none'
   }

   });
})


})();