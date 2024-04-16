//This is an array object for business type

const businessLikes = [
  "Grocery/ Sari Sari Stores",
  "Fashion apparel Stores / Ukay2 Stores",
  "Convenience Stores",
  "Food and Beverage Stores",
  "Bakeries",
  "Printing Services",
  "Small Hardwares",
  "Furnitures",
  "Small Drugstores",
  "Pharmacies",
  "Barbershops",
  "Small Salons and Beauty Services",
  "Handmade Art Craft Shops",
  "Photobooth Gallery",
  // Add more businesses as needed
  "Restaurants",
  "Cafes",
  "Bars & Pubs",
  "Specialty Food Stores",
  "Online Retailers",
  "E-commerce Marketplaces",
  "Fashion E-commerce",
  "Electronics E-commerce",
  "Food Delivery Apps",
  "Food Carts",
  "Street Food Vendors",
  "Artisanal Craft Stalls",
  "Secondhand Vendors",
  "Local Farmers' Markets",
  "Water Refilling Station",
  "Local Bookstores",
  "Mobile Repair Shops",
  "Artisanal Soap Shops",
  "Coffee Shops",
  "Event Planning Services",
  "Tutoring Services",
  // Add more businesses as needed
];



  const bussinesTypeList = [
    { id: "01", bussiness_type: "Retails", bussine_type_code: "001" },
    { id: "02", bussiness_type: "Technology", bussine_type_code: "002" },
    { id: "03", bussiness_type: "Manufacturing", bussine_type_code: "003" },
    { id: "04", bussiness_type: "Health Services", bussine_type_code: "004" },
    { id: "05", bussiness_type: "Personal Care Services", bussine_type_code: "005" },
    { id: "06", bussiness_type: "Arts and Crafts", bussine_type_code: "006" },
    { id: "07", bussiness_type: "Food and Beverage", bussine_type_code: "007" },
    { id: "08", bussiness_type: "Home Services", bussine_type_code: "008" },
    { id: "09", bussiness_type: "Entertainment", bussine_type_code: "009" },
    { id: "10", bussiness_type: "Education", bussine_type_code: "010" },
    // Add more categories as needed
  ];
  
  
  
  //This are business list of each business type
  const bussinessList = [
    {
      id: "01",
      bussiness_name: "Grocery/ Sari Sari Stores",
      bussine_type_code: "001",
      bussiness_type: "Retails",
    },
    {
      id: "02",
      bussiness_name: "Fashion apparel Stores / Ukay2 Stores",
      bussine_type_code: "001",
      bussiness_type: "Retails",
    },
    {
      id: "03",
      bussiness_name: "Convenience Stores",
      bussine_type_code: "001",
      bussiness_type: "Retails",
    },
    {
      id: "04",
      bussiness_name: "Food and Beverage Stores",
      bussine_type_code: "001",
      bussiness_type: "Retails",
    },
    {
      id: "05",
      bussiness_name: "Bakeries",
      bussine_type_code: "001",
      bussiness_type: "Retails",
    },
    {
      id: "06",
      bussiness_name: "Printing Services",
      bussine_type_code: "002",
      bussiness_type: "Technology",
    },
    {
      id: "07",
      bussiness_name: "Small Hardwares",
      bussine_type_code: "003",
      bussiness_type: "Manufacturing",
    },
    {
      id: "08",
      bussiness_name: "Furnitures",
      bussine_type_code: "003",
      bussiness_type: "Manufacturing",
    },
    {
      id: "09",
      bussiness_name: "Small Drugstores",
      bussine_type_code: "004",
      bussiness_type: "Health Services",
    },
    {
      id: "10",
      bussiness_name: "Pharmacies",
      bussine_type_code: "004",
      bussiness_type: "Health Services",
    },
    {
      id: "11",
      bussiness_name: "Barbershops",
      bussine_type_code: "005",
      bussiness_type: "Personal Care Services",
    },
    {
      id: "12",
      bussiness_name: "Small Salons and Beauty Services",
      bussine_type_code: "005",
      bussiness_type: "Personal Care Services",
    },
    {
      id: "13",
      bussiness_name: "Handmade Art Craft Shops",
      bussine_type_code: "006",
      bussiness_type: "Arts and Crafts",
    },
    {
      id: "14",
      bussiness_name: "Photobooth Gallery",
      bussine_type_code: "006",
      bussiness_type: "Arts and Crafts",
    },
    {
      id: "15",
      bussiness_name: "Local Bookstores",
      bussine_type_code: "007",
      bussiness_type: "Food and Beverage",
    },
    {
      id: "16",
      bussiness_name: "Mobile Repair Shops",
      bussine_type_code: "008",
      bussiness_type: "Home Services",
    },
    {
      id: "17",
      bussiness_name: "Artisanal Soap Shops",
      bussine_type_code: "006",
      bussiness_type: "Arts and Crafts",
    },
    {
      id: "18",
      bussiness_name: "Coffee Shops",
      bussine_type_code: "007",
      bussiness_type: "Food and Beverage",
    },
    {
      id: "19",
      bussiness_name: "Event Planning Services",
      bussine_type_code: "009",
      bussiness_type: "Entertainment",
    },
    {
      id: "20",
      bussiness_name: "Tutoring Services",
      bussine_type_code: "010",
      bussiness_type: "Education",
    },
    // Add more businesses as needed
  ];
  
  
  //When you call this function in your .js file this will return all the business type
  function bussinessTypes() {
    return bussinesTypeList;
  }
  
  //When you call this function it has a parameteres which is the code of the business type
  //and it will return the business list that has the busiess type code of it
  function bussinessesName(code) {
    //This function use to filter the business type code of the business list that is match on the code you pass as a parameters
    return bussinessList.filter((item) => item.bussine_type_code === code);
  }
  
  export { bussinessTypes, bussinessesName, businessLikes };
  