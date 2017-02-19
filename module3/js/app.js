(function () {
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', '//davids-restaurant.herokuapp.com')
  .directive('foundItems', FoundItems);

  function FoundItems () {
    ddo = {
      templateUrl: 'narrow_it_down_template.html',
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      controller: NarrowedMenuListDirectiveController,
      controllerAs: 'narrowedMenu',
      bindToController: true

    };

    return ddo;
  }

  function NarrowedMenuListDirectiveController () {
    var narrowedMenu = this;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController (MenuSearchService) {
    var narrowedMenu = this;
    narrowedMenu.searchTerm = "";

    narrowedMenu.getMatchedMenuItems = function () {
      if (narrowedMenu.searchTerm) {
        MenuSearchService.getMatchedMenuItems(narrowedMenu.searchTerm)
        .then (function (response) {
          MenuSearchService.foundItems = response;
          narrowedMenu.found = MenuSearchService.foundItems;
        });
      } else {
        MenuSearchService.foundItems = [];
        narrowedMenu.found = MenuSearchService.foundItems;
      }

    }

    narrowedMenu.removeFoundItem = function (itemIndex) {
      MenuSearchService.removeFoundItemFromList(itemIndex);
    }
  }

  
  MenuSearchService.$inject = ['$http', 'ApiBasePath', '$filter'];
  function MenuSearchService ($http, ApiBasePath, $filter) {
    var service = this;


    service.getMatchedMenuItems = function (searchTerm) {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });

      searchTerm = $filter('lowercase')(searchTerm);

      return response.then(function(response) {
        var foundItems = [];
        var menuCategories = response.data.menu_items;

        for (let i=0; i<menuCategories.length; i++) {
          let item = menuCategories[i];
          if (~$filter('lowercase')(item.description).indexOf(searchTerm)) {
            foundItems.push(item);
          }
        }

        return foundItems; 
      });
    };

    service.removeFoundItemFromList = function (itemIndex) {
      service.foundItems.splice(itemIndex, 1);
    }

  };
}());
