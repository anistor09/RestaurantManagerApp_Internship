import { shallowMount } from '@vue/test-utils'
import component from '../pages/menus.vue'

jest.mock('../store/restaurant', () => ({
  useRestaurantStore: jest.fn(() => ({
    restaurantGetter: {
      id: 1,
      name: "Pula",
      imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/1200px-Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg",
      latitude: 52.006653613926844,
      longitude: 4.356486959049088,
      rating: 5,
      category: "italian",
      backgroundColor: "#1976D2FF",
      foregroundColor: null,
      font_color: "#1976D2FF",
      description: "The Commons is a central spot where all members of asasas our TSH family can come to together to share drinks, food and the things they have in common.",
      logoUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ8AAAC6CAMAAACHgTh+AAAAflBMVEX///8AAAD5+fnv7++BgYF6enr29vbg4ODb29vz8/Pj4+M7Ozu4uLi0tLRBQUG9vb3Hx8eZmZlGRkYyMjKLi4tpaWktLS1cXFwcHBzNzc2KiopQUFBXV1dLS0tiYmKrq6sWFhaioqIkJCSampp8fHxxcXEZGRkMDAwvLy+srKx/aLrJAAAQQklEQVR4nO2dC5OqOBOGHe43BRRUEEFQxvH//8GPdOeqIMzM2T1b9eWt2loFcnvS6YQ4J71aaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlp/WdkBF7R2vVpgwpPlV2uPddclNgPvDi9VRVNvK3q2zXxAmdRYtP1orKvqpAV3JePpQU7gZe0Vl1taclVdbvGXuAvSvymSg+r6j7GFOZZMZPYS/vtfSzt58lug/dpjbisd6MF72orMmZq3dqn41ja47ZPvW8BkJWkX6M1Eqonm+U/8pm0nbWeKti7nmcSn9PJzlhb4x0o1K+X2Zhap3K0a18UPl6R+PFpUdqPfqRVXrpflLYb6+mkX1ZwlSwbskxFfXnK4dLtUN3znb2lEjHT8OmJ+5Gm3d+fIW9jdUgX/UvBX0PC8/Df1/Od+xNO//FsVvf7Hgv+ujwn3rTLfUmh2vq5jJPCC0yU6xVJm6tj2xIG6KRKk7u+TZLBCVJ5XhKnlVK3sBUFe2rB2zIaCibpVpC4SKJyqzxRSzbSqN1wsoaCPangpK2VkdQ1y2gEB4litp7C6DW51PKUurhGuta3U4Pcia9Su/YJXjVtce1uPdyp+j1KqV097YpCGmXbazw1HIq2kgqO52msWkE4Dd47ciPueS1C0qiAG+wlj9/bo2FeBfecNOrBp4TwVrwf3oZnbXhJj+GCL/xG3Zjva+2vc26g9ZxnNWtex2JmVsPnGz5y0lXDyunaqc5V5Nkswd7zLZbPOVri/iWfbfse65ZPa9F06rbMwphtTtWQlbEsX1DEKsP7t11CEmRmNAl3tNu5VY1QwYhwI70unkgNbo3Zm6eiUTNyiBMsD8NCsTtVVZ/GiaeOhbXiXVvl3rBOTDK7QtVZmxSuQsu8yWlPane5RbLOeprYzgbvqk5lhTKvW0qtTFJrq+KJiWdWEre0C+pJHC3FLbkZ07Oq8GUlcg9Pt0LKXfKEtaixEUT9af+SuNscrvKquxA0M4HK95p6+7qy6s59JHu1lLuCULJos8hOu+cZ9uOyq0qZiUtns3zC063xdiWSRP2btd69lqZwmnZwIrxO12o67cfOFuOCOUNpLBfZ8xpGVpUK6AVdQ9sCUpS/qfWxX4snr3jtNIojxpsl+x5k07kyiVa5MIj516SeS/pxbPkk8oBWsq/Oem7FLQ8sE7DztYRXztdaLCALvHAYwUFvsYxNS6TfHW5lGxeguE1v+Ubc4ysi//SxZzgKsVC8h/kta9eY+NFmdi0WCpeUmWIyLCQYjVbQ2J9t69pg2qRtrf4sBsGWj+ph3mZ0PGm9/lXbZfvAxOuh4IPk5XpGJMCL3Ai4TLzBnGHDXuX2deS9TOimW5Tcq9xovxonika4yI1VBC8uP/BizmQX0Ysxq1HBWHdV+7ox4Adeev6kTxxo1obF0GTsVtgnrxsDphv3jMmFzYEBVuVlZYb2TScfhw39WzI9dXpX2lmdOjcX9PKxnZ6zHf7iZatNTllb4+mpM+Brnod6naF8txNRsPF0os4vQD5Pb6U401pKi7p0NaOYLjHlKZb5qLl1hEHHxVGi5tNxVs6tIzw6oeXSNerSw8dkKvYgxUlriGsu1af68MgZkSWII12yuEnUYbZaIf7NksWtg89+8q4JcFLplxTsoQmLaQVxdM2CF3mnPcqDJH0dMdip2FPIa/dq7IZXjOx1oOEzN4xe2HqtlFuMjJ4CAHQ0VxPt/XUF7XiF98r3Kps0NfDDawWdwnutTVDJDMDKN1IJJjgVdB44nnr5btza0ozSVelDHgyRNJShjncZdbHODtI2W5inkfxukwsgxkYe1kR+0ljbT572srGaRLrtXQSQBE1aytmN0lxaxHzV2VrukUwaMq7SpStqMR0gcM6q/XvX0W3Mz1q8vxY8a/gkHIKR2KPbmJ+SwwNHAIMXDK3nN9yX3R3UVmzI4WRJth1NKCfiiYtytODOFvMDrHnuODRh4J6FCXSCQSmYE+z59K5hmLFxDiu581Ar6A/W/eZ1O5n24xSz0m+0bMgkZ1e9fLRB2Cq+enCh4ia1eLYfazzebFduWlbrhny1ESzcEotJ8m0Pz4HpMF8bzC0ymRkB6wbNjJldM7PI5BMQVN40gCW1Od96n5Y7KDDIG/sfvTazGb1n3GCsorcCK+W2CaWj9yB+pjMlgDyXc35L0zJXfwXY0J6C/KC3aKbOQX7s65CXadrnJ4URbYBJPpfA0pNayXTc5HmW2nmtvlZSmpAsIYa4kRvDCz7neZnl+UH5paBG7AZJFqI5wnVmnPAl4IazlgwZUOTXwnfYw45vRmXF6vaJo8OH5z74XGFyiz1Zj8BnDt7wfa/tuZdDY121pNV38Z33w7HOEpMnHgouUvGqhk4bnPBesPS5SYc9KZjW2nD8YG1zwzljjycin5P4iBC2BsO9E7UkquKx31hcOoUzAOzd74pVpyUfy5F5cngbZ9vG6Kcc2ka6RqTvlR+baKzgYM1wxsrTdBeDbTzk3sgixihKunbeImRSD3yXAzujq3OYJGGqgmUZmge12dP0mpsCQ5ABrQdaIl2Mp5NbqEEu40tlc6E5ddMbeQl9+4EWO9RpF6Ip0uvaixxaVi8aKUrd4jMwMBJ2FacgHxccb7fkg5PUplpqEvbZ7u0eKq5a7jhKP6UmHaT6Tgl542IdEZyhw10cxm/3RN1QeoaYC0wKzp6jMSresQReJVV38hdFKhgWHVTlIdkwsPma+YUWV1CZSNBJhma9TcreCgC4K+UDvvT+fouYvsnXBssH36zBYGEwmF8cTc5woX9530mk8h2H4N25CWMNZzeksWPhYypKA0d0nkvrbASETtgW5Ni+SwhVFTCJJZ8cXoU1rz5OOyeWc0C8ZTfTwywXGCTw8tGJi9O7tLxNO44t4WPT34rWvROkqKCPc27e4A7O82+SYkeNoMHlBbwOpuwadg6xpAtUEDzA2C7ak8C6kULNU9Ri5LyVWL75PEUgjOa9PnhL2uHTDvpYTAzvFQtzPDKjhmswdDzx6ZMZRcSvvZcp3BCZ6XCFRbzK54IfpGJefYdbCvDI36fjhaDNE891AqOAsTbjPYhgbONkEjIeQOHGP8FQdAdaG7C8NR9N74UbafDR5n0DS6QFexgwUMFzAg/oiGKRB1hRj+qyuiLBbJHfoh4z5HVFD8FHvseNlfDYCh4Lfikzas7jyniAzWzeJkN5IzyWdgROJdD2SOWxYCMKZhjhMcVAFTzgVfmJx7w7pWsX+JT+jAfMez/g0SjOWOKxIK3Eo/8GjyW/SVu/5XH4IY/oz/DINQ+FR6V5KDw2mofm8SzNQ5XmoUrzUKV5qNI8VGkeqjQPVZqHKs1DleahSvNQpXmo0jxUaR6qNA9VmocqzUOV5qFK81CleajSPFRpHqo0D1WahyrNQ5XmoUrzUKV5qNI8VGkeqjQPVZqHKs1DleahSvNQpXmo0jxUaR6qNA9VmocqzUOV5qFK81CleajSPFRpHqo0D1WahyrNQ5XmoUrzULWAx9i/z/4ejx/+++wnHtG3eEAN/xEeeNLDn7GPr2/xICcz+L+2D366yU95uCqPIwkKQh67Q3SR/bd4QEQRcixJB4FJ7t/hcYEk5BMU/PUtHiGr9ZFXYTGPOyQhB+Z88SoIHmNazGNEi3mMaTGPMS1Ia45HUtE8/j0e4YK0f42HP3V4N/Bwu3BUC44PEuewybqE4W7++KChmyYK3kfzaVfxfjzxcUHa1dQJh3islTGhJTkbvvOqxYl/UfCvEo/UmchfHGdBS0tLS+sflg/RrrSYrI/L/OmL/0ci69Pt367E31bUtiyUmuZBz86lZw1rHvS0aM2DS/NQZRAe9NhVzcMrErJ9YHtF4XMeXprXlhx7YxXEVl2X8fgeStH2dd8o54l6UV/nWcGzGLIn0VWKLK8bPCk2sup+zfILhtvDZe+a1xj31Yztum7k4oyizeu+FZFoMEujSGsllnGQZHWdt4vCMb4KT59GxcjjbNDz1rci6JdFj6u/qEHykAY7vF/EEPLYgf882inJsmSR2AZjpNGELvQEdLLvsnVoCIGbsYpxy+t+5aXweI6sVnBSe+rTQAosTp7Bw3dtF5ysu4jHQQSao4fT+lK4mPMzkFbagKE7P/JmFz0smBy3W/GoB+uU348FDx6bwIr5bcZT3qhCXwfBmDIe3QyPXBZRGURtvsfjqKR/2i+krgQK3ec1dPrT8lXd6HNfL+Wcx6j2znNzVfkvOFjwgaddMTgeGn7fuPcWnvK/ZEfwSUaSxMR/9EmSmIxH7vkmxgGGHOGc66uzokHsFOwQzePS+D7eI6dcm2Cxlun7axHWBnlYgc8CsKW+n8CDiWhvP9ymxlkOH2FbFAwEjmHuSCkpx0552J4fYObkQcJhS17AwMLmjsGfQPI0v9Ae5ceHQ1gcavbE4pXQXZkgBM7BoPgw3hJENgs5D6gfHkEOzRQncme8XFN0dsDTwJns6J0adhF5YJNzBokQzmhtLvTQ/u/qef1BvYbJ6lWIymAYAzkWFWFFR5VHnyMM2CnyJUsLPPDNmRgNPa+bR5jJRBm5sHSSOWmTK0VP4cd9Iw8sB46zX9O8QwxfFfz0Tf2FB73OeFgf4vcGU2LDGah+C36sZPOCy4yM8MCzz8HGatE2wQOvEfNCp4Le3aDNZaWuaZcBj41ULVINHG11vDzc73Ien5QHcfuXA8adPYuxAIqf+LBLbK6DH8MtyoOa70l09hiPluBXeZC7n6yJBW078GAxBxgPForosv1GBOQZHjSADth9SeuvSIqaQkbzRS2Z9R/y2FFj+BUP4pl2zPihyekEDxqXBJT/YHoZ48HW64zHS1ixVqT9d3jYy3msTClA7M9MZI4Hzim+kORPCY+7Ol4iZbx0f2K8kEUW/3kReKwneZDgohY16eqPzC/PPIjDn/r9tpAbjwIXy/xpwMbXr3go4RbYX4pM8liRUJRShJ3vypl4v2U8RCgBMosNktKKPzsZ2p4OcrFurGcaxutXPAAxC09CuudujvMwRfWuPx4wc/YBfUwLtkW9kQ9McCZPS9YD0iIWhsuOJfwxDwfsHxsKbEggkzEeV/Fc8mMekHHowE/HYzxw4Uli2Pqt3FEg8Oehy+7lrMb3tcMi+ra/5oFm1nnGyik61s4xHjB8c+ie24/HCy5idod+igcGkOp6jLx3UVd9+DpSW/g3GNAhOHa3Nr6vYmyb3/Ggc351w//DIn3Uf8BcuCvTFFa5S/5KY0T05ftrigeNHYZ6ml1XgRx2ka5M5LfkEBelv+ThSDsONDTSKI/gU3ruJ++3RAbuqexXaGVsLuE9MQDha5DqxQRZLL6hX3iQqfap7jjmqJPdisu7CR50vW5z81r5fGOD7RHBpkwl1RWjiYmYpW9iD84BafKqqsk4T5qmYfPWevjMsnSifLPZbO2xPSfD67fhZnNopJ2ioK2HS+eUV6kYMqO4ouEjzScePhbsNv2zKo98NJ4TDS0tq3ATVg3rdCOS7rZN09KeKm7n4bnzrVgQaVpLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS+tP6n9UsV+zZAHG7AAAAABJRU5ErkJggg==",
      addresse: "adresa rest",
      phoneNumber: "0769174798",
      email: "email@email.email",
      averageWaitingTime: 2,
      owner: "d9dcd739-167d-4e9a-b18c-2f21b0baa58a",
      categorySet: [
        {
          id: 14,
          name: "Small bites",
          description: "",
          presentationOrder: 2,
          imageUrl: null,
          subCategorySet: [
            {
              id: 39,
              name: "asd",
              description: null,
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            }
          ]
        },
        {
          id: 47,
          name: "you can add a category and you will be redirected",
          description: "you can add a category and you will be redirected",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 29,
          name: "Alcooltestaddcat",
          description: "test",
          presentationOrder: 0,
          imageUrl: "test",
          subCategorySet: []
        },
        {
          id: 60,
          name: "testifcoestocat2",
          description: "testifcoestocat2",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 62,
          name: "Alex1",
          description: "Alex1",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 64,
          name: "asddas",
          description: "asdsad",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 63,
          name: "sdfsf",
          description: "sdfsdf",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 36,
          name: "Alcooltestaddcat",
          description: "test",
          presentationOrder: 0,
          imageUrl: "test",
          subCategorySet: []
        },
        {
          id: 16,
          name: "Sides",
          description: "",
          presentationOrder: 4,
          imageUrl: null,
          subCategorySet: [
            {
              id: 86,
              name: "a",
              description: null,
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            }
          ]
        },
        {
          id: 20,
          name: "Alcool",
          description: "test",
          presentationOrder: 0,
          imageUrl: "test",
          subCategorySet: [
            {
              id: 89,
              name: "testalexnamemodified22222",
              description: "string",
              presentationOrder: 0,
              imageUrl: "string"
            }
          ]
        },
        {
          id: 59,
          name: "TestifGoestoCat",
          description: "TestifGoestoCat",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 28,
          name: "Secondi",
          description: "",
          presentationOrder: 0,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Secondi.jpeg",
          subCategorySet: []
        },
        {
          id: 54,
          name: "addtest",
          description: "addtest",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: [
            {
              id: 125,
              name: null,
              description: "222",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 124,
              name: null,
              description: "11",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            }
          ]
        },
        {
          id: 61,
          name: "asdasd",
          description: "sadasd",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 13,
          name: "Mains",
          description: "",
          presentationOrder: 1,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/AG.png",
          subCategorySet: []
        },
        {
          id: 15,
          name: "Bread & Buns",
          description: "",
          presentationOrder: 3,
          imageUrl: null,
          subCategorySet: []
        },
        {
          id: 55,
          name: "addnewcat1208",
          description: "addnewcat",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: [
            {
              id: 128,
              name: "222",
              description: "222",
              presentationOrder: 2,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 131,
              name: "555",
              description: "555",
              presentationOrder: 555,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 132,
              name: "666",
              description: "666",
              presentationOrder: 666,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 129,
              name: "333",
              description: "333",
              presentationOrder: 333,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 130,
              name: "444",
              description: "444",
              presentationOrder: 44,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            }
          ]
        },
        {
          id: 22,
          name: "Drinks",
          description: "",
          presentationOrder: 0,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
          subCategorySet: [
            {
              id: 21,
              name: "Sparkling wine ",
              description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
              presentationOrder: 0,
              imageUrl: ""
            },
            {
              id: 23,
              name: "Red wine",
              description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
              presentationOrder: 0,
              imageUrl: ""
            },
            {
              id: 19,
              name: "Beer",
              description: "",
              presentationOrder: 0,
              imageUrl: ""
            },
            {
              id: 20,
              name: "Soft drinks",
              description: "Non alcoholic drinks",
              presentationOrder: 0,
              imageUrl: ""
            },
            {
              id: 24,
              name: "Rosé wine",
              description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
              presentationOrder: 0,
              imageUrl: ""
            },
            {
              id: 22,
              name: "White wine",
              description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
              presentationOrder: 0,
              imageUrl: ""
            }
          ]
        },
        {
          id: 50,
          name: "Alex",
          description: "Descriere Alex",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 56,
          name: "NewCat test",
          description: "NewCat test",
          presentationOrder: 1,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 46,
          name: "it works",
          description: "it works",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 26,
          name: "Starters",
          description: "",
          presentationOrder: 0,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Starters.jpeg",
          subCategorySet: [
            {
              id: 88,
              name: "b",
              description: null,
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            }
          ]
        },
        {
          id: 52,
          name: "Alcooltestaddcat",
          description: "test",
          presentationOrder: 0,
          imageUrl: "test",
          subCategorySet: []
        },
        {
          id: 27,
          name: "Sourdough Pizza",
          description: "We serve fresh, hand-stretched pizza topped with only the very best of ingredients",
          presentationOrder: 0,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/SourdoughPizza.jpeg",
          subCategorySet: []
        },
        {
          id: 24,
          name: "Nibbles",
          description: "",
          presentationOrder: 0,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Nibbles.jpeg",
          subCategorySet: []
        },
        {
          id: 57,
          name: "TestCat2",
          description: "TestCat2",
          presentationOrder: 11,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 42,
          name: "dasda",
          description: "asdasd",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 31,
          name: "asdasda",
          description: null,
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: [
            {
              id: 112,
              name: "asdasd",
              description: "asdasd",
              presentationOrder: 0,
              imageUrl: ""
            },
            {
              id: 109,
              name: "22",
              description: "22222",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 107,
              name: "11111111111",
              description: "111111111111111",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 113,
              name: "11111111111111",
              description: "1111111111",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 114,
              name: "21112",
              description: "1222222222",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 97,
              name: "sdfsdfsd",
              description: "sdfsdfsd",
              presentationOrder: 0,
              imageUrl: ""
            },
            {
              id: 110,
              name: "qqq",
              description: "qqqq",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 95,
              name: "dfsds",
              description: "dfsds",
              presentationOrder: 0,
              imageUrl: ""
            },
            {
              id: 116,
              name: "zzzzz",
              description: "zzzzzzzzz",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 111,
              name: "1111",
              description: "111111111111",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 96,
              name: "sdfs",
              description: "sdfs",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 104,
              name: "1222",
              description: "1222",
              presentationOrder: 0,
              imageUrl: ""
            },
            {
              id: 93,
              name: "dd",
              description: "dd",
              presentationOrder: 0,
              imageUrl: ""
            },
            {
              id: 118,
              name: "hei",
              description: "hei",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 103,
              name: "asd",
              description: "asdasd",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 115,
              name: "222222222222222223",
              description: "23232323",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 92,
              name: "asd",
              description: "asd",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 106,
              name: "asdassad",
              description: "asdasd",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 94,
              name: "asdsadas",
              description: "asdsadas",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 108,
              name: "1111111",
              description: "1111111111",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 117,
              name: "1111222",
              description: "11112222",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            },
            {
              id: 105,
              name: "sdf",
              description: "sdf",
              presentationOrder: 0,
              imageUrl: ""
            }
          ]
        },
        {
          id: 40,
          name: "dasdasd",
          description: "dassad",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 32,
          name: "Newtest",
          description: null,
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 44,
          name: "dsasdasd",
          description: "asdasd",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 45,
          name: "aaaa",
          description: "test close window",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 53,
          name: "CatNameTest",
          description: "CatNameDesc",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: [
            {
              id: 123,
              name: null,
              description: "Subcateg1",
              presentationOrder: 0,
              imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
            }
          ]
        },
        {
          id: 43,
          name: "dasda",
          description: "dasdasd",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 33,
          name: "dsads",
          description: null,
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        },
        {
          id: 65,
          name: "ggggg",
          description: "ggggg",
          presentationOrder: 0,
          imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png",
          subCategorySet: []
        }
      ],
      subCategorySet: [],
      itemSet: [
        {
          id: 90,
          name: "Bacca Nera, 2018",
          price: 6,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/BaccaNera.jfif",
          allergen: "",
          description: "Glass 125 ml",
          longDescription: "Corte Figaretto, Veneto, Italy Full-bodied, jammy red, dark fruit, almond, black cherry and dark chocolate notes.",
          presentationOrder: 0,
          category: {
            id: 22,
            name: "Drinks",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
            subCategorySet: [
              {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 24,
                name: "Rosé wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              }
            ]
          },
          subCategory: {
            id: 23,
            name: "Red wine",
            description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
            presentationOrder: 0,
            imageUrl: ""
          },
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 39,
          name: "DAILY VEGGIE SARNIE ",
          price: 9,
          imageUrl: "",
          allergen: null,
          description: "Daily changing vegetarian sandwich. Please ask your waiter for description .",
          longDescription: "",
          presentationOrder: 0,
          category: {
            id: 15,
            name: "Bread & Buns",
            description: "",
            presentationOrder: 3,
            imageUrl: null,
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 105,
          name: "Burrata",
          price: 11,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Burrata.jpeg",
          allergen: "",
          description: "",
          longDescription: "With grilled baby carrots, rucola, aceto balsamico",
          presentationOrder: 0,
          category: {
            id: 24,
            name: "Nibbles",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Nibbles.jpeg",
            subCategorySet: []
          },
          subCategory: {
            id: 21,
            name: "Sparkling wine ",
            description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
            presentationOrder: 0,
            imageUrl: ""
          },
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 80,
          name: "Homemade Iced Tea ",
          price: 4,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/IceTea.jfif",
          allergen: "",
          description: "Bottle",
          longDescription: "Classic /Peach /Passionfruit I",
          presentationOrder: 0,
          category: {
            id: 22,
            name: "Drinks",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
            subCategorySet: [
              {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 24,
                name: "Rosé wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              }
            ]
          },
          subCategory: {
            id: 20,
            name: "Soft drinks",
            description: "Non alcoholic drinks",
            presentationOrder: 0,
            imageUrl: ""
          },
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 32,
          name: "THE AMERICANA PIZZA",
          price: 12,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/download.jpeg",
          allergen: null,
          description: "Our classic base with pepperoni and jalapenos.",
          longDescription: "",
          presentationOrder: 0,
          category: {
            id: 13,
            name: "Mains",
            description: "",
            presentationOrder: 1,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/AG.png",
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 31,
          name: "THE CLASSIC PIZZA",
          price: 9,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/pizza-margarita.jpeg",
          allergen: null,
          description: "Our own tomato sauce, mozzarella cheese and fresh basil leaves",
          longDescription: "",
          presentationOrder: 0,
          category: {
            id: 13,
            name: "Mains",
            description: "",
            presentationOrder: 1,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/AG.png",
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 108,
          name: "Zuchinni spaghetti",
          price: 8,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/ZucchiniSpaghetti.jpeg",
          allergen: "",
          description: "",
          longDescription: "With basil, cashew, vegan parmesan, hempseeds",
          presentationOrder: 0,
          category: {
            id: 26,
            name: "Starters",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Starters.jpeg",
            subCategorySet: [
              {
                id: 88,
                name: "b",
                description: null,
                presentationOrder: 0,
                imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
              }
            ]
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 109,
          name: "Silky smooth polenta",
          price: 6.5,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Polenta.jpeg",
          allergen: "",
          description: "",
          longDescription: "With parmesan, lardo di collonato",
          presentationOrder: 0,
          category: {
            id: 26,
            name: "Starters",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Starters.jpeg",
            subCategorySet: [
              {
                id: 88,
                name: "b",
                description: null,
                presentationOrder: 0,
                imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
              }
            ]
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 111,
          name: "Crocchette di patate",
          price: 6.5,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Crocchette.jpeg",
          allergen: "",
          description: "",
          longDescription: "With parmesan, potato, parsley",
          presentationOrder: 0,
          category: {
            id: 26,
            name: "Starters",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Starters.jpeg",
            subCategorySet: [
              {
                id: 88,
                name: "b",
                description: null,
                presentationOrder: 0,
                imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
              }
            ]
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 84,
          name: "Moscato d’Asti",
          price: 5,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Moscato.jfif",
          allergen: "",
          description: "Glass 125 ml",
          longDescription: "Rocca dei Forti Moscato d’Asti DOC, Italy Sweet sparkling Moscato.",
          presentationOrder: 0,
          category: {
            id: 22,
            name: "Drinks",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
            subCategorySet: [
              {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 24,
                name: "Rosé wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              }
            ]
          },
          subCategory: {
            id: 21,
            name: "Sparkling wine ",
            description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
            presentationOrder: 0,
            imageUrl: ""
          },
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 112,
          name: "Margherita",
          price: 10,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Margherita.jpeg",
          allergen: "",
          description: "Pizza",
          longDescription: "Housemade tomato sauce, fior di latte, basil",
          presentationOrder: 0,
          category: {
            id: 27,
            name: "Sourdough Pizza",
            description: "We serve fresh, hand-stretched pizza topped with only the very best of ingredients",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/SourdoughPizza.jpeg",
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 88,
          name: "Nero d’Avola, 2018",
          price: 4,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/NeroDAvola.jfif",
          allergen: "",
          description: "Glass 125 ml",
          longDescription: "Vigneti Zabú, Nero d’Avola Sicilia DOC, Italy Medium-bodied red, full of flavour with notes of prunes, blackberries and floral undertones.",
          presentationOrder: 0,
          category: {
            id: 22,
            name: "Drinks",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
            subCategorySet: [
              {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 24,
                name: "Rosé wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              }
            ]
          },
          subCategory: {
            id: 23,
            name: "Red wine",
            description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
            presentationOrder: 0,
            imageUrl: ""
          },
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 40,
          name: "FISHERMANS CHOICE ",
          price: 10,
          imageUrl: "",
          allergen: null,
          description: "Daily changing fish sandwich. Please ask your waiter for description.",
          longDescription: "",
          presentationOrder: 0,
          category: {
            id: 15,
            name: "Bread & Buns",
            description: "",
            presentationOrder: 3,
            imageUrl: null,
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 116,
          name: "test",
          price: 12,
          imageUrl: "",
          allergen: "a,g,a,g",
          description: "test",
          longDescription: "test",
          presentationOrder: 0,
          category: {
            id: 27,
            name: "Sourdough Pizza",
            description: "We serve fresh, hand-stretched pizza topped with only the very best of ingredients",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/SourdoughPizza.jpeg",
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 59,
          name: "De Koperen Kat Special",
          price: 6,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Koperen.jfif",
          allergen: "",
          description: "Bottle - 20 cl",
          longDescription: "Ask your server for details of our local specialities",
          presentationOrder: 2,
          category: {
            id: 22,
            name: "Drinks",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
            subCategorySet: [
              {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 24,
                name: "Rosé wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              }
            ]
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 81,
          name: "Lambrusco Frizzante Rosso",
          price: 3,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/lambrusco.jfif",
          allergen: "",
          description: "Glass 125ml",
          longDescription: "Dedicato, Emilia-Romagna, Moscato, Italy Honest, sweet sparkling red wine with ripe fruit flavours",
          presentationOrder: 0,
          category: {
            id: 22,
            name: "Drinks",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
            subCategorySet: [
              {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 24,
                name: "Rosé wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              }
            ]
          },
          subCategory: {
            id: 21,
            name: "Sparkling wine ",
            description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
            presentationOrder: 0,
            imageUrl: ""
          },
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 106,
          name: "TESTING",
          price: 100,
          imageUrl: "",
          allergen: "e",
          description: "1",
          longDescription: "1",
          presentationOrder: 0,
          category: {
            id: 26,
            name: "Starters",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Starters.jpeg",
            subCategorySet: [
              {
                id: 88,
                name: "b",
                description: null,
                presentationOrder: 0,
                imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
              }
            ]
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 86,
          name: "Chardonnay, Fiano, no vintage ",
          price: 4.5,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Fiano.jfif",
          allergen: "",
          description: "Glass 125 ml",
          longDescription: "Brave Italian Growers, Veneto, Italy Vegan friendly, mild white wine with notes of fresh apple and some peach. Made the modern way: vintage free and varietal free, promoting natural viticulture.",
          presentationOrder: 0,
          category: {
            id: 22,
            name: "Drinks",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
            subCategorySet: [
              {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 24,
                name: "Rosé wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              }
            ]
          },
          subCategory: {
            id: 22,
            name: "White wine",
            description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
            presentationOrder: 0,
            imageUrl: ""
          },
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 61,
          name: "Moretti La Bianca",
          price: 5.5,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/MorettiBianca.jfif",
          allergen: "",
          description: "Draft Beer",
          longDescription: "Heineken Wheat Beer 5%",
          presentationOrder: 1,
          category: {
            id: 22,
            name: "Drinks",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
            subCategorySet: [
              {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 24,
                name: "Rosé wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              }
            ]
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 33,
          name: "THE HOUSE FAVOURITE",
          price: 14,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/AG.png",
          allergen: null,
          description: "Garlic white sauce, mozzarella, parmesan, crispy potatoes, pancetta and rosemary",
          longDescription: "",
          presentationOrder: 0,
          category: {
            id: 13,
            name: "Mains",
            description: "",
            presentationOrder: 1,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/AG.png",
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 119,
          name: "big",
          price: 1,
          imageUrl: "string",
          allergen: "string",
          description: "string",
          longDescription: "string",
          presentationOrder: 1,
          category: {
            id: 15,
            name: "Bread & Buns",
            description: "",
            presentationOrder: 3,
            imageUrl: null,
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 110,
          name: "Roasted baby squid",
          price: 8,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Squid.jpeg",
          allergen: "",
          description: "",
          longDescription: "With fresh parsley, garlic, lemon, colatura di alici",
          presentationOrder: 0,
          category: {
            id: 26,
            name: "Starters",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Starters.jpeg",
            subCategorySet: [
              {
                id: 88,
                name: "b",
                description: null,
                presentationOrder: 0,
                imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
              }
            ]
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 78,
          name: "Polara",
          price: 3.5,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Polara.jfif",
          allergen: "",
          description: "Bottle",
          longDescription: "Aranciata /Chinotto /Mandarino Verde /Limonata",
          presentationOrder: 0,
          category: {
            id: 22,
            name: "Drinks",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
            subCategorySet: [
              {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 24,
                name: "Rosé wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              }
            ]
          },
          subCategory: {
            id: 20,
            name: "Soft drinks",
            description: "Non alcoholic drinks",
            presentationOrder: 0,
            imageUrl: ""
          },
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 57,
          name: "Moretti - 20 cl  ",
          price: 3.25,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Moretti.jfif",
          allergen: "",
          description: "Draft",
          longDescription: "Heineken 4.6%",
          presentationOrder: 4,
          category: {
            id: 22,
            name: "Drinks",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
            subCategorySet: [
              {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 24,
                name: "Rosé wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              }
            ]
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 35,
          name: "GARLIC BREAD",
          price: 5,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Sourdough-Bread-Recipe-for-Beginners.jpeg",
          allergen: null,
          description: "Hand stretched pizza dough with home-made garlic & rosemary butter.",
          longDescription: "",
          presentationOrder: 0,
          category: {
            id: 14,
            name: "Small bites",
            description: "",
            presentationOrder: 2,
            imageUrl: null,
            subCategorySet: [
              {
                id: 39,
                name: "asd",
                description: null,
                presentationOrder: 0,
                imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
              }
            ]
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 114,
          name: "Puttanesca",
          price: 14,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Puttanesca.jpeg",
          allergen: "",
          description: "Pizza",
          longDescription: "Homemade tomato sauce, tagiasche olives, red onion, capers, tuna, fior di latte, colatura di alici, oregano",
          presentationOrder: 0,
          category: {
            id: 27,
            name: "Sourdough Pizza",
            description: "We serve fresh, hand-stretched pizza topped with only the very best of ingredients",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/SourdoughPizza.jpeg",
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 91,
          name: "Pinot Grigio Blush, 2019",
          price: 4,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/PinotGrigioBlush.jfif",
          allergen: "",
          description: "Glass 125 ml",
          longDescription: "Cielo e Terra, Venezie DOC, Italy Refreshing, uncomplicated rosato with notes of strawberries and raspberries.",
          presentationOrder: 0,
          category: {
            id: 22,
            name: "Drinks",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
            subCategorySet: [
              {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 24,
                name: "Rosé wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              }
            ]
          },
          subCategory: {
            id: 24,
            name: "Rosé wine",
            description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
            presentationOrder: 0,
            imageUrl: ""
          },
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 55,
          name: "Gateau au chocolat",
          price: 15.5,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/eway-logo.jpeg",
          allergen: "g",
          description: "Trés bon gateau au chocolat",
          longDescription: "",
          presentationOrder: 0,
          category: {
            id: 14,
            name: "Small bites",
            description: "",
            presentationOrder: 2,
            imageUrl: null,
            subCategorySet: [
              {
                id: 39,
                name: "asd",
                description: null,
                presentationOrder: 0,
                imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
              }
            ]
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 97,
          name: "Cerignola",
          price: 3.8,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Cerignola.jpeg",
          allergen: "",
          description: "Green olives from Sicily",
          longDescription: "",
          presentationOrder: 0,
          category: {
            id: 24,
            name: "Nibbles",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Nibbles.jpeg",
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 37,
          name: "BBQ CHICKEN WINGS",
          price: 6.5,
          imageUrl: "",
          allergen: null,
          description: "Crispy chicken wings served with a tangy BBQ sauce, spring onion and sesame seeds",
          longDescription: "",
          presentationOrder: 0,
          category: {
            id: 14,
            name: "Small bites",
            description: "",
            presentationOrder: 2,
            imageUrl: null,
            subCategorySet: [
              {
                id: 39,
                name: "asd",
                description: null,
                presentationOrder: 0,
                imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
              }
            ]
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: [
            {
              id: 12,
              mandatory: true,
              description: "Choose a sauce",
              name: "Sauce",
              choiceSet: [
                {
                  id: 12,
                  name: "Ketchup",
                  description: "Favorite red sauce"
                }
              ]
            }
          ]
        },
        {
          id: 115,
          name: "Crispy pork chop",
          price: 21,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/CrispyPorkChop.jpeg",
          allergen: "",
          description: "",
          longDescription: "Crispy pork chop",
          presentationOrder: 0,
          category: {
            id: 28,
            name: "Secondi",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Secondi.jpeg",
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 118,
          name: "string",
          price: 1,
          imageUrl: "string",
          allergen: "string",
          description: "string",
          longDescription: "string",
          presentationOrder: 1,
          category: {
            id: 15,
            name: "Bread & Buns",
            description: "",
            presentationOrder: 3,
            imageUrl: null,
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 89,
          name: "Primitivo, 2017 Zonello",
          price: 4.5,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Zonello.jfif",
          allergen: "",
          description: "Glass 125 ml",
          longDescription: "Zonello, Salento DOC, Italy Full-bodied, silky red with dark fruit, blackberries and cherry topped with some subtle herbal notes",
          presentationOrder: 0,
          category: {
            id: 22,
            name: "Drinks",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
            subCategorySet: [
              {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 24,
                name: "Rosé wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              }
            ]
          },
          subCategory: {
            id: 23,
            name: "Red wine",
            description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
            presentationOrder: 0,
            imageUrl: ""
          },
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 85,
          name: "Grillo, 2018",
          price: 4,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Grillo2018.jfif",
          allergen: "",
          description: "Glass 125 ml",
          longDescription: "Vigneti Zabú, Grillo Sicilia DOC, Italy Notes of lime, exotic fruits and a touch of fennel. Crispy white, easy drinking, exclusively from the island of Sicily",
          presentationOrder: 0,
          category: {
            id: 22,
            name: "Drinks",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
            subCategorySet: [
              {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 24,
                name: "Rosé wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              }
            ]
          },
          subCategory: {
            id: 22,
            name: "White wine",
            description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
            presentationOrder: 0,
            imageUrl: ""
          },
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 28,
          name: "BUDDHA BOWL",
          price: 10,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/AG.png",
          allergen: null,
          description: "",
          longDescription: "Quinoa, lentils, baby spinach, broccoli, avocado, green beans, pomegranate tossed in a sherry vinegar dressing. ADD CHICKEN OR HALLOUMII - 3.50",
          presentationOrder: 0,
          category: {
            id: 13,
            name: "Mains",
            description: "",
            presentationOrder: 1,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/AG.png",
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: [
            {
              id: 1,
              mandatory: false,
              description: "Not a lot",
              name: "Test option",
              choiceSet: [
                {
                  id: 2,
                  name: "Test option",
                  description: "Not a lot"
                },
                {
                  id: 4,
                  name: "Oyster Sauce",
                  description: "Huile aux mollards"
                },
                {
                  id: 1,
                  name: "Test option",
                  description: "Not a lot"
                },
                {
                  id: 3,
                  name: "Test option",
                  description: "Not a lot"
                }
              ]
            },
            {
              id: 12,
              mandatory: true,
              description: "Choose a sauce",
              name: "Sauce",
              choiceSet: [
                {
                  id: 12,
                  name: "Ketchup",
                  description: "Favorite red sauce"
                }
              ]
            }
          ]
        },
        {
          id: 82,
          name: "Moretti 40 cl",
          price: 6.5,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Moretti.jfif",
          allergen: "",
          description: "Draft Beer",
          longDescription: "Heineken 4.6%",
          presentationOrder: 0,
          category: {
            id: 22,
            name: "Drinks",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
            subCategorySet: [
              {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 24,
                name: "Rosé wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              }
            ]
          },
          subCategory: {
            id: 19,
            name: "Beer",
            description: "",
            presentationOrder: 0,
            imageUrl: ""
          },
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 104,
          name: "Cavolo nero, Brussels sprouts",
          price: 7,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/BrusslesSprouts.jpeg",
          allergen: "",
          description: "",
          longDescription: "With Brussels sprouts, toasted almonds, lemon dressing",
          presentationOrder: 0,
          category: {
            id: 26,
            name: "Starters",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Starters.jpeg",
            subCategorySet: [
              {
                id: 88,
                name: "b",
                description: null,
                presentationOrder: 0,
                imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
              }
            ]
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 36,
          name: "BITTER BALLEN",
          price: 5,
          imageUrl: "",
          allergen: null,
          description: "Crispy fried beef bitter ballen served with whole grain mustard.",
          longDescription: "",
          presentationOrder: 0,
          category: {
            id: 14,
            name: "Small bites",
            description: "",
            presentationOrder: 2,
            imageUrl: null,
            subCategorySet: [
              {
                id: 39,
                name: "asd",
                description: null,
                presentationOrder: 0,
                imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
              }
            ]
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 87,
          name: "Pecorino, 2019 Vanitá",
          price: 5,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Pecorino.jfif",
          allergen: "",
          description: "Glass 125 ml",
          longDescription: "Vanitá, IGP Terre di Chieti, Italy Refreshing white wine with notes of citrus and undertones of papaya.",
          presentationOrder: 0,
          category: {
            id: 22,
            name: "Drinks",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
            subCategorySet: [
              {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 24,
                name: "Rosé wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              }
            ]
          },
          subCategory: {
            id: 22,
            name: "White wine",
            description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
            presentationOrder: 0,
            imageUrl: ""
          },
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 117,
          name: "string",
          price: 1,
          imageUrl: "string",
          allergen: "string",
          description: "string",
          longDescription: "string",
          presentationOrder: 1,
          category: {
            id: 15,
            name: "Bread & Buns",
            description: "",
            presentationOrder: 3,
            imageUrl: null,
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 96,
          name: "Homemade focaccia",
          price: 4,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Focaccia.jpeg",
          allergen: "",
          description: "",
          longDescription: "Rock salt, Sicilian extra virgin olive oil",
          presentationOrder: 0,
          category: {
            id: 24,
            name: "Nibbles",
            description: "",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Nibbles.jpeg",
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 34,
          name: "CREATE YOUR OWN",
          price: 11.5,
          imageUrl: "",
          allergen: null,
          description: "Garlic white sauce or house tomato sauce then add the toppings you want.",
          longDescription: "Add 1.50 per topping: Mushroom/Courgette/Onion/Jalapenos Pepperoni/Pancetta Anchovies.",
          presentationOrder: 0,
          category: {
            id: 13,
            name: "Mains",
            description: "",
            presentationOrder: 1,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/AG.png",
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        },
        {
          id: 113,
          name: "Giardinera",
          price: 10,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Giardiniera.jpeg",
          allergen: "",
          description: "Pizza",
          longDescription: "Our bechamel, wild spinach, courgette ribbons, bimi, rucola, lemon zest",
          presentationOrder: 0,
          category: {
            id: 27,
            name: "Sourdough Pizza",
            description: "We serve fresh, hand-stretched pizza topped with only the very best of ingredients",
            presentationOrder: 0,
            imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/SourdoughPizza.jpeg",
            subCategorySet: []
          },
          subCategory: null,
          sideItemSet: [],
          optionSet: []
        }
      ],
      choiceSet: [
        {
          id: 2,
          name: "Test option",
          description: "Not a lot"
        },
        {
          id: 12,
          name: "Ketchup",
          description: "Favorite red sauce"
        },
        {
          id: 4,
          name: "Oyster Sauce",
          description: "Huile aux mollards"
        },
        {
          id: 1,
          name: "Test option",
          description: "Not a lot"
        },
        {
          id: 3,
          name: "Test option",
          description: "Not a lot"
        }
      ],
      optionSet: [
        {
          id: 7,
          mandatory: false,
          description: "Not a lot",
          name: "Test option",
          choiceSet: []
        },
        {
          id: 10,
          mandatory: false,
          description: "Test",
          name: "Test",
          choiceSet: []
        },
        {
          id: 13,
          mandatory: true,
          description: "string",
          name: "string",
          choiceSet: []
        },
        {
          id: 1,
          mandatory: false,
          description: "Not a lot",
          name: "Test option",
          choiceSet: [
            {
              id: 2,
              name: "Test option",
              description: "Not a lot"
            },
            {
              id: 4,
              name: "Oyster Sauce",
              description: "Huile aux mollards"
            },
            {
              id: 1,
              name: "Test option",
              description: "Not a lot"
            },
            {
              id: 3,
              name: "Test option",
              description: "Not a lot"
            }
          ]
        },
        {
          id: 4,
          mandatory: false,
          description: "Not a lot",
          name: "Test option",
          choiceSet: []
        },
        {
          id: 5,
          mandatory: false,
          description: "Not a lot",
          name: "Test option",
          choiceSet: []
        },
        {
          id: 9,
          mandatory: true,
          description: "Les sauces",
          name: "Sauce",
          choiceSet: []
        },
        {
          id: 12,
          mandatory: true,
          description: "Choose a sauce",
          name: "Sauce",
          choiceSet: [
            {
              id: 12,
              name: "Ketchup",
              description: "Favorite red sauce"
            }
          ]
        },
        {
          id: 8,
          mandatory: true,
          description: "Les sauces",
          name: "Sauce",
          choiceSet: []
        },
        {
          id: 3,
          mandatory: false,
          description: "Not a lot",
          name: "Test option",
          choiceSet: []
        },
        {
          id: 6,
          mandatory: false,
          description: "Not a lot",
          name: "Test option",
          choiceSet: []
        },
        {
          id: 11,
          mandatory: false,
          description: null,
          name: null,
          choiceSet: []
        },
        {
          id: 2,
          mandatory: false,
          description: "Not a lot",
          name: "Test option",
          choiceSet: []
        }
      ],
      carteSet: [
        {
          id: 0,
          name: "Carte de déjeuner",
          description: "Ceci est la carte du déjeuner qu'on mange au déjeuner",
          version: 4,
          active: true,
          imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/AG.png",
          itemSet: [
            {
              id: 55,
              name: "Gateau au chocolat",
              price: 15.5,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/eway-logo.jpeg",
              allergen: "g",
              description: "Trés bon gateau au chocolat",
              longDescription: "",
              presentationOrder: 0,
              category: {
                id: 14,
                name: "Small bites",
                description: "",
                presentationOrder: 2,
                imageUrl: null,
                subCategorySet: [
                  {
                    id: 39,
                    name: "asd",
                    description: null,
                    presentationOrder: 0,
                    imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
                  }
                ]
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 118,
              name: "string",
              price: 1,
              imageUrl: "string",
              allergen: "string",
              description: "string",
              longDescription: "string",
              presentationOrder: 1,
              category: {
                id: 15,
                name: "Bread & Buns",
                description: "",
                presentationOrder: 3,
                imageUrl: null,
                subCategorySet: []
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 33,
              name: "THE HOUSE FAVOURITE",
              price: 14,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/AG.png",
              allergen: null,
              description: "Garlic white sauce, mozzarella, parmesan, crispy potatoes, pancetta and rosemary",
              longDescription: "",
              presentationOrder: 0,
              category: {
                id: 13,
                name: "Mains",
                description: "",
                presentationOrder: 1,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/AG.png",
                subCategorySet: []
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 119,
              name: "big",
              price: 1,
              imageUrl: "string",
              allergen: "string",
              description: "string",
              longDescription: "string",
              presentationOrder: 1,
              category: {
                id: 15,
                name: "Bread & Buns",
                description: "",
                presentationOrder: 3,
                imageUrl: null,
                subCategorySet: []
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            }
          ],
          hoursSet: []
        },
        {
          id: 38,
          name: "test menu",
          description: "descriere 1",
          version: 1,
          active: true,
          imageUrl: "https://img.favpng.com/23/21/6/knife-fork-spoon-clip-art-png-favpng-g0zSCK2EGgjPqfDQWPh6qVtmY.jpg",
          itemSet: [],
          hoursSet: []
        },
        {
          id: 14,
          name: "Only for testing",
          description: "Only for testing ",
          version: 1,
          active: true,
          imageUrl: null,
          itemSet: [
            {
              id: 106,
              name: "TESTING",
              price: 100,
              imageUrl: "",
              allergen: "e",
              description: "1",
              longDescription: "1",
              presentationOrder: 0,
              category: {
                id: 26,
                name: "Starters",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Starters.jpeg",
                subCategorySet: [
                  {
                    id: 88,
                    name: "b",
                    description: null,
                    presentationOrder: 0,
                    imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
                  }
                ]
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            }
          ],
          hoursSet: []
        },
        {
          id: 36,
          name: "test menu",
          description: "descriere 1",
          version: 1,
          active: true,
          imageUrl: "https://img.favpng.com/23/21/6/knife-fork-spoon-clip-art-png-favpng-g0zSCK2EGgjPqfDQWPh6qVtmY.jpg",
          itemSet: [],
          hoursSet: []
        },
        {
          id: 40,
          name: "À La Carte",
          description: null,
          version: 1,
          active: true,
          imageUrl: null,
          itemSet: [
            {
              id: 57,
              name: "Moretti - 20 cl  ",
              price: 3.25,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Moretti.jfif",
              allergen: "",
              description: "Draft",
              longDescription: "Heineken 4.6%",
              presentationOrder: 4,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 40,
              name: "FISHERMANS CHOICE ",
              price: 10,
              imageUrl: "",
              allergen: null,
              description: "Daily changing fish sandwich. Please ask your waiter for description.",
              longDescription: "",
              presentationOrder: 0,
              category: {
                id: 15,
                name: "Bread & Buns",
                description: "",
                presentationOrder: 3,
                imageUrl: null,
                subCategorySet: []
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 39,
              name: "DAILY VEGGIE SARNIE ",
              price: 9,
              imageUrl: "",
              allergen: null,
              description: "Daily changing vegetarian sandwich. Please ask your waiter for description .",
              longDescription: "",
              presentationOrder: 0,
              category: {
                id: 15,
                name: "Bread & Buns",
                description: "",
                presentationOrder: 3,
                imageUrl: null,
                subCategorySet: []
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 37,
              name: "BBQ CHICKEN WINGS",
              price: 6.5,
              imageUrl: "",
              allergen: null,
              description: "Crispy chicken wings served with a tangy BBQ sauce, spring onion and sesame seeds",
              longDescription: "",
              presentationOrder: 0,
              category: {
                id: 14,
                name: "Small bites",
                description: "",
                presentationOrder: 2,
                imageUrl: null,
                subCategorySet: [
                  {
                    id: 39,
                    name: "asd",
                    description: null,
                    presentationOrder: 0,
                    imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
                  }
                ]
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: [
                {
                  id: 12,
                  mandatory: true,
                  description: "Choose a sauce",
                  name: "Sauce",
                  choiceSet: [
                    {
                      id: 12,
                      name: "Ketchup",
                      description: "Favorite red sauce"
                    }
                  ]
                }
              ]
            },
            {
              id: 82,
              name: "Moretti 40 cl",
              price: 6.5,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Moretti.jfif",
              allergen: "",
              description: "Draft Beer",
              longDescription: "Heineken 4.6%",
              presentationOrder: 0,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 80,
              name: "Homemade Iced Tea ",
              price: 4,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/IceTea.jfif",
              allergen: "",
              description: "Bottle",
              longDescription: "Classic /Peach /Passionfruit I",
              presentationOrder: 0,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 32,
              name: "THE AMERICANA PIZZA",
              price: 12,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/download.jpeg",
              allergen: null,
              description: "Our classic base with pepperoni and jalapenos.",
              longDescription: "",
              presentationOrder: 0,
              category: {
                id: 13,
                name: "Mains",
                description: "",
                presentationOrder: 1,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/AG.png",
                subCategorySet: []
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 33,
              name: "THE HOUSE FAVOURITE",
              price: 14,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/AG.png",
              allergen: null,
              description: "Garlic white sauce, mozzarella, parmesan, crispy potatoes, pancetta and rosemary",
              longDescription: "",
              presentationOrder: 0,
              category: {
                id: 13,
                name: "Mains",
                description: "",
                presentationOrder: 1,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/AG.png",
                subCategorySet: []
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 34,
              name: "CREATE YOUR OWN",
              price: 11.5,
              imageUrl: "",
              allergen: null,
              description: "Garlic white sauce or house tomato sauce then add the toppings you want.",
              longDescription: "Add 1.50 per topping: Mushroom/Courgette/Onion/Jalapenos Pepperoni/Pancetta Anchovies.",
              presentationOrder: 0,
              category: {
                id: 13,
                name: "Mains",
                description: "",
                presentationOrder: 1,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/AG.png",
                subCategorySet: []
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            }
          ],
          hoursSet: []
        },
        {
          id: 33,
          name: "new menu",
          description: "",
          version: 1,
          active: true,
          imageUrl: "https://img.favpng.com/23/21/6/knife-fork-spoon-clip-art-png-favpng-g0zSCK2EGgjPqfDQWPh6qVtmY.jpg",
          itemSet: [],
          hoursSet: []
        },
        {
          id: 37,
          name: "test menu",
          description: "descriere 1",
          version: 1,
          active: true,
          imageUrl: "https://img.favpng.com/23/21/6/knife-fork-spoon-clip-art-png-favpng-g0zSCK2EGgjPqfDQWPh6qVtmY.jpg",
          itemSet: [],
          hoursSet: []
        },
        {
          id: 1,
          name: "Carte du soir",
          description: "Ceci est la carte du soir que l'on utilise le soir",
          version: 2,
          active: false,
          imageUrl: null,
          itemSet: [
            {
              id: 90,
              name: "Bacca Nera, 2018",
              price: 6,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/BaccaNera.jfif",
              allergen: "",
              description: "Glass 125 ml",
              longDescription: "Corte Figaretto, Veneto, Italy Full-bodied, jammy red, dark fruit, almond, black cherry and dark chocolate notes.",
              presentationOrder: 0,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 55,
              name: "Gateau au chocolat",
              price: 15.5,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/eway-logo.jpeg",
              allergen: "g",
              description: "Trés bon gateau au chocolat",
              longDescription: "",
              presentationOrder: 0,
              category: {
                id: 14,
                name: "Small bites",
                description: "",
                presentationOrder: 2,
                imageUrl: null,
                subCategorySet: [
                  {
                    id: 39,
                    name: "asd",
                    description: null,
                    presentationOrder: 0,
                    imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
                  }
                ]
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            }
          ],
          hoursSet: []
        },
        {
          id: 13,
          name: "ALL DAY MENU",
          description: "Menu you can use all day long",
          version: 1,
          active: true,
          imageUrl: null,
          itemSet: [
            {
              id: 78,
              name: "Polara",
              price: 3.5,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Polara.jfif",
              allergen: "",
              description: "Bottle",
              longDescription: "Aranciata /Chinotto /Mandarino Verde /Limonata",
              presentationOrder: 0,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 57,
              name: "Moretti - 20 cl  ",
              price: 3.25,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Moretti.jfif",
              allergen: "",
              description: "Draft",
              longDescription: "Heineken 4.6%",
              presentationOrder: 4,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 90,
              name: "Bacca Nera, 2018",
              price: 6,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/BaccaNera.jfif",
              allergen: "",
              description: "Glass 125 ml",
              longDescription: "Corte Figaretto, Veneto, Italy Full-bodied, jammy red, dark fruit, almond, black cherry and dark chocolate notes.",
              presentationOrder: 0,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 91,
              name: "Pinot Grigio Blush, 2019",
              price: 4,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/PinotGrigioBlush.jfif",
              allergen: "",
              description: "Glass 125 ml",
              longDescription: "Cielo e Terra, Venezie DOC, Italy Refreshing, uncomplicated rosato with notes of strawberries and raspberries.",
              presentationOrder: 0,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: {
                id: 24,
                name: "Rosé wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 105,
              name: "Burrata",
              price: 11,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Burrata.jpeg",
              allergen: "",
              description: "",
              longDescription: "With grilled baby carrots, rucola, aceto balsamico",
              presentationOrder: 0,
              category: {
                id: 24,
                name: "Nibbles",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Nibbles.jpeg",
                subCategorySet: []
              },
              subCategory: {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 115,
              name: "Crispy pork chop",
              price: 21,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/CrispyPorkChop.jpeg",
              allergen: "",
              description: "",
              longDescription: "Crispy pork chop",
              presentationOrder: 0,
              category: {
                id: 28,
                name: "Secondi",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Secondi.jpeg",
                subCategorySet: []
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 80,
              name: "Homemade Iced Tea ",
              price: 4,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/IceTea.jfif",
              allergen: "",
              description: "Bottle",
              longDescription: "Classic /Peach /Passionfruit I",
              presentationOrder: 0,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: {
                id: 20,
                name: "Soft drinks",
                description: "Non alcoholic drinks",
                presentationOrder: 0,
                imageUrl: ""
              },
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 109,
              name: "Silky smooth polenta",
              price: 6.5,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Polenta.jpeg",
              allergen: "",
              description: "",
              longDescription: "With parmesan, lardo di collonato",
              presentationOrder: 0,
              category: {
                id: 26,
                name: "Starters",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Starters.jpeg",
                subCategorySet: [
                  {
                    id: 88,
                    name: "b",
                    description: null,
                    presentationOrder: 0,
                    imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
                  }
                ]
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 108,
              name: "Zuchinni spaghetti",
              price: 8,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/ZucchiniSpaghetti.jpeg",
              allergen: "",
              description: "",
              longDescription: "With basil, cashew, vegan parmesan, hempseeds",
              presentationOrder: 0,
              category: {
                id: 26,
                name: "Starters",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Starters.jpeg",
                subCategorySet: [
                  {
                    id: 88,
                    name: "b",
                    description: null,
                    presentationOrder: 0,
                    imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
                  }
                ]
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 84,
              name: "Moscato d’Asti",
              price: 5,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Moscato.jfif",
              allergen: "",
              description: "Glass 125 ml",
              longDescription: "Rocca dei Forti Moscato d’Asti DOC, Italy Sweet sparkling Moscato.",
              presentationOrder: 0,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 112,
              name: "Margherita",
              price: 10,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Margherita.jpeg",
              allergen: "",
              description: "Pizza",
              longDescription: "Housemade tomato sauce, fior di latte, basil",
              presentationOrder: 0,
              category: {
                id: 27,
                name: "Sourdough Pizza",
                description: "We serve fresh, hand-stretched pizza topped with only the very best of ingredients",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/SourdoughPizza.jpeg",
                subCategorySet: []
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 89,
              name: "Primitivo, 2017 Zonello",
              price: 4.5,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Zonello.jfif",
              allergen: "",
              description: "Glass 125 ml",
              longDescription: "Zonello, Salento DOC, Italy Full-bodied, silky red with dark fruit, blackberries and cherry topped with some subtle herbal notes",
              presentationOrder: 0,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 88,
              name: "Nero d’Avola, 2018",
              price: 4,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/NeroDAvola.jfif",
              allergen: "",
              description: "Glass 125 ml",
              longDescription: "Vigneti Zabú, Nero d’Avola Sicilia DOC, Italy Medium-bodied red, full of flavour with notes of prunes, blackberries and floral undertones.",
              presentationOrder: 0,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: {
                id: 23,
                name: "Red wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 85,
              name: "Grillo, 2018",
              price: 4,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Grillo2018.jfif",
              allergen: "",
              description: "Glass 125 ml",
              longDescription: "Vigneti Zabú, Grillo Sicilia DOC, Italy Notes of lime, exotic fruits and a touch of fennel. Crispy white, easy drinking, exclusively from the island of Sicily",
              presentationOrder: 0,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 82,
              name: "Moretti 40 cl",
              price: 6.5,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Moretti.jfif",
              allergen: "",
              description: "Draft Beer",
              longDescription: "Heineken 4.6%",
              presentationOrder: 0,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: {
                id: 19,
                name: "Beer",
                description: "",
                presentationOrder: 0,
                imageUrl: ""
              },
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 104,
              name: "Cavolo nero, Brussels sprouts",
              price: 7,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/BrusslesSprouts.jpeg",
              allergen: "",
              description: "",
              longDescription: "With Brussels sprouts, toasted almonds, lemon dressing",
              presentationOrder: 0,
              category: {
                id: 26,
                name: "Starters",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Starters.jpeg",
                subCategorySet: [
                  {
                    id: 88,
                    name: "b",
                    description: null,
                    presentationOrder: 0,
                    imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
                  }
                ]
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 87,
              name: "Pecorino, 2019 Vanitá",
              price: 5,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Pecorino.jfif",
              allergen: "",
              description: "Glass 125 ml",
              longDescription: "Vanitá, IGP Terre di Chieti, Italy Refreshing white wine with notes of citrus and undertones of papaya.",
              presentationOrder: 0,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 81,
              name: "Lambrusco Frizzante Rosso",
              price: 3,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/lambrusco.jfif",
              allergen: "",
              description: "Glass 125ml",
              longDescription: "Dedicato, Emilia-Romagna, Moscato, Italy Honest, sweet sparkling red wine with ripe fruit flavours",
              presentationOrder: 0,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: {
                id: 21,
                name: "Sparkling wine ",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 86,
              name: "Chardonnay, Fiano, no vintage ",
              price: 4.5,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Fiano.jfif",
              allergen: "",
              description: "Glass 125 ml",
              longDescription: "Brave Italian Growers, Veneto, Italy Vegan friendly, mild white wine with notes of fresh apple and some peach. Made the modern way: vintage free and varietal free, promoting natural viticulture.",
              presentationOrder: 0,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: {
                id: 22,
                name: "White wine",
                description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                presentationOrder: 0,
                imageUrl: ""
              },
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 96,
              name: "Homemade focaccia",
              price: 4,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Focaccia.jpeg",
              allergen: "",
              description: "",
              longDescription: "Rock salt, Sicilian extra virgin olive oil",
              presentationOrder: 0,
              category: {
                id: 24,
                name: "Nibbles",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Nibbles.jpeg",
                subCategorySet: []
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 113,
              name: "Giardinera",
              price: 10,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Giardiniera.jpeg",
              allergen: "",
              description: "Pizza",
              longDescription: "Our bechamel, wild spinach, courgette ribbons, bimi, rucola, lemon zest",
              presentationOrder: 0,
              category: {
                id: 27,
                name: "Sourdough Pizza",
                description: "We serve fresh, hand-stretched pizza topped with only the very best of ingredients",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/SourdoughPizza.jpeg",
                subCategorySet: []
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 61,
              name: "Moretti La Bianca",
              price: 5.5,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/MorettiBianca.jfif",
              allergen: "",
              description: "Draft Beer",
              longDescription: "Heineken Wheat Beer 5%",
              presentationOrder: 1,
              category: {
                id: 22,
                name: "Drinks",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/drinks.jfif",
                subCategorySet: [
                  {
                    id: 21,
                    name: "Sparkling wine ",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 23,
                    name: "Red wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 19,
                    name: "Beer",
                    description: "",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 20,
                    name: "Soft drinks",
                    description: "Non alcoholic drinks",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 24,
                    name: "Rosé wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  },
                  {
                    id: 22,
                    name: "White wine",
                    description: "All our wines are supplied by our really good friend Michel, a Dutch native with a French name and deep knowledge of Italian wine. Take your pick!",
                    presentationOrder: 0,
                    imageUrl: ""
                  }
                ]
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            },
            {
              id: 110,
              name: "Roasted baby squid",
              price: 8,
              imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Squid.jpeg",
              allergen: "",
              description: "",
              longDescription: "With fresh parsley, garlic, lemon, colatura di alici",
              presentationOrder: 0,
              category: {
                id: 26,
                name: "Starters",
                description: "",
                presentationOrder: 0,
                imageUrl: "https://ewai-restaurant-manager-image-repo.s3.eu-central-1.amazonaws.com/restaurant/file/Starters.jpeg",
                subCategorySet: [
                  {
                    id: 88,
                    name: "b",
                    description: null,
                    presentationOrder: 0,
                    imageUrl: "https://assets.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298fa16b93cd8_DrawKit0094_Food_%26_Drink_Icons_Banner-min.png"
                  }
                ]
              },
              subCategory: null,
              sideItemSet: [],
              optionSet: []
            }
          ],
          hoursSet: []
        },
        {
          id: 35,
          name: "test menu",
          description: "descriere 1",
          version: 1,
          active: true,
          imageUrl: "https://img.favpng.com/23/21/6/knife-fork-spoon-clip-art-png-favpng-g0zSCK2EGgjPqfDQWPh6qVtmY.jpg",
          itemSet: [],
          hoursSet: []
        }
      ],
      hoursSet: [
        {
          id: 0,
          opening: "20:00",
          closing: "21:00",
          day: 2,
          hoursSet: []
        }
      ],
      tableRestaurantSet: [
        {
          id: 57,
          number: 25,
          capacity: 10,
          url: "https://ewai-qr-code-generated.s3.eu-central-1.amazonaws.com/1685024856433-621.png"
        },
        {
          id: 61,
          number: 10,
          capacity: 3,
          url: "https://ewai-qr-code-generated.s3.eu-central-1.amazonaws.com/1685454457835-309.png"
        },
        {
          id: 19,
          number: 4,
          capacity: 10,
          url: "https://ewai-qr-code-generated.s3.eu-central-1.amazonaws.com/1684245696613-939.png"
        },
        {
          id: 60,
          number: 3,
          capacity: 30,
          url: "https://ewai-qr-code-generated.s3.eu-central-1.amazonaws.com/1685453897777-151.png"
        },
        {
          id: 59,
          number: 1,
          capacity: 10,
          url: "https://ewai-qr-code-generated.s3.eu-central-1.amazonaws.com/1685453170207-313.png"
        },
        {
          id: 62,
          number: 11,
          capacity: 25,
          url: "https://ewai-qr-code-generated.s3.eu-central-1.amazonaws.com/1685454581436-977.png"
        }
      ]
    },
    getRestaurant: jest.fn(), // Mock the getRestaurant action if needed
  })),
}));

test('Menu test', () => {
    const wrapper = shallowMount(component)
})