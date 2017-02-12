(function() {
  'use strict';
  angular.module("ShoppingListCheckOff", [])
  .controller('toBuyController', ToBuyController)
  .controller('alreadyBoughtController', AlreadyBoughtController)
  .service('shoppingListCheckOffService', ShoppingListCheckOffService);
  ToBuyController.$inject = ['shoppingListCheckOffService'];
  function ToBuyController (shoppingListCheckOffService) {
    var tobuy = this;
    tobuy.items = shoppingListCheckOffService.getItemsToBuyList();

    tobuy.markAsBought = function(itemIndex) {
      shoppingListCheckOffService.moveItemToAlreadyBoughtItemsList(itemIndex);
    }

  }
  AlreadyBoughtController.$inject = ['shoppingListCheckOffService'];
  function AlreadyBoughtController (shoppingListCheckOffService) {
    var bought = this;

    bought.items = shoppingListCheckOffService.getAlreadyBoughtItemsList();
  }

  function ShoppingListCheckOffService () {
    var service = this;

    var itemsToBuy = [
                        {name: "meat", quantity: "1 kilogram"},
                        {name: "milk", quantity: "2 packs"},
                        {name: "soda", quantity: "5 bottles"},
                        {name: "cookies", quantity: 16},
                        {name: "chips", quantity: "10 bags"}
                     ];
    var alreadyBoughtItems = [];
    service.getItemsToBuyList = function () {
      return itemsToBuy;
    }

    service.getAlreadyBoughtItemsList = function () {
      return alreadyBoughtItems;
    }

    service.moveItemToAlreadyBoughtItemsList = function(itemIndex) {
      alreadyBoughtItems.push(itemsToBuy[itemIndex]);
      itemsToBuy.splice(itemIndex, 1);
    }


  }
})() ;
